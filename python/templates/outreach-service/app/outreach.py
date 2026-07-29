"""Orchestration: the campaign-build-and-launch flow, composed from SDK calls.
Each function is a thin wrapper — the SDK does the API work; we add sequencing,
batching, and polling. Grounded in docs/api/* and workflows.json.
"""
from typing import Any, Dict, List, Optional

from instantly import create_instantly_client, InstantlyClient
from instantly.resources.leadlist import create_lead_list, get_verification_stats
from instantly.resources.lead import bulk_add_leads
from instantly.resources.supersearchenrichment import enrich_leads_from_supersearch
from instantly.resources.campaign import create_campaign, get_campaign_sending_status, activate_campaign
from instantly.resources.account import list_account
from instantly.resources.webhook import create_webhook


def get_client(api_key: Optional[str]) -> InstantlyClient:
    if not api_key:
        raise ValueError("INSTANTLY_API_KEY is not set")
    return create_instantly_client(api_key)


def create_list(client: InstantlyClient, name: str) -> str:
    result = create_lead_list(client, {"body": {"name": name}})
    return result.get("id", "") if isinstance(result, dict) else ""


def enrich_into_list(client: InstantlyClient, name: str, search_filters: Dict[str, Any], limit: int) -> str:
    run = enrich_leads_from_supersearch(client, {
        "body": {"search_filters": search_filters, "limit": limit, "list_name": name, "work_email_enrichment": True},
    })
    return run.get("resource_id", "") if isinstance(run, dict) else ""


def add_and_verify_leads(client: InstantlyClient, list_id: str, leads: List[Dict[str, Any]],
                         verify: bool = False) -> Any:
    # verify_leads_on_import spends a credit per lead — opt in explicitly.
    for i in range(0, len(leads), 1000):
        bulk_add_leads(client, {
            "body": {
                "list_id": list_id,
                "leads": leads[i:i + 1000],
                "verify_leads_on_import": verify,
                "skip_if_in_workspace": True,
            },
        })
    return get_verification_stats(client, {"path": {"id": list_id}})


def create_campaign_draft(client: InstantlyClient, params: Dict[str, Any]) -> str:
    campaign = create_campaign(client, {
        "body": {
            "name": params["name"],
            "campaign_schedule": {
                "schedules": [{
                    "name": "Business hours",
                    "timing": {"from": "09:00", "to": "17:00"},
                    "days": {"1": True, "2": True, "3": True, "4": True, "5": True},
                    "timezone": "America/Chicago",
                }],
            },
            "sequences": [{"steps": [{"type": "email", "delay": 0,
                                      "variants": [{"subject": params["subject"], "body": params["body"]}]}]}],
            "email_list": params.get("senders", []),
            "stop_on_reply": True,
        },
    })
    return campaign.get("id", "") if isinstance(campaign, dict) else ""


def preflight(client: InstantlyClient, campaign_id: str) -> Dict[str, Any]:
    status = get_campaign_sending_status(client, {"path": {"id": campaign_id}})
    accounts = list_account(client, {"query": {"limit": 100}})
    return {"status": status, "accounts": accounts}


def launch(client: InstantlyClient, campaign_id: str) -> Any:
    return activate_campaign(client, {"path": {"id": campaign_id}})


def register_reply_webhook(client: InstantlyClient, target_url: str, secret: str) -> Any:
    return create_webhook(client, {
        "body": {"target_hook_url": target_url, "event_type": "reply_received",
                 "headers": {"x-shared-secret": secret}},
    })
