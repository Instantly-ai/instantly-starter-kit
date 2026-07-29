"""SuperSearch → enrich → (verify) → dedupe → sync.

preview (free) to see matches, then enrich into a list (async; fills work emails).
Verification: pass verify_leads_on_import when adding, or call create_email_verification.
Then dedupe and sync to your store.
"""
from typing import Any, Dict, List, Optional

from instantly import create_instantly_client, InstantlyClient
from instantly.resources.supersearchenrichment import (
    count_leads_from_supersearch,
    preview_leads_from_supersearch,
    enrich_leads_from_supersearch,
)

from .dedupe import dedupe_by_email
from .sync import SyncAdapter


def get_client(api_key: Optional[str]) -> InstantlyClient:
    if not api_key:
        raise ValueError("INSTANTLY_API_KEY is not set")
    return create_instantly_client(api_key)


def _extract_leads(preview: Any) -> List[Dict[str, Any]]:
    # preview_leads_from_supersearch returns rows under `leads`; fall back to `items`.
    if not isinstance(preview, dict):
        return []
    rows = preview.get("leads")
    if not isinstance(rows, list):
        rows = preview.get("items")
    return rows if isinstance(rows, list) else []


def run(client: InstantlyClient, search_filters: Dict[str, Any], limit: int, sync: SyncAdapter,
        confirm_enrich: bool) -> Dict[str, Any]:
    # 1) Estimate + preview — both free: no credits, no objects created.
    counted = count_leads_from_supersearch(client, {"body": {"search_filters": search_filters}})
    count = counted.get("number_of_leads", 0) if isinstance(counted, dict) else 0
    preview = preview_leads_from_supersearch(client, {"body": {"search_filters": search_filters}})
    previewed = _extract_leads(preview)

    # 2) Enrich only on explicit opt-in — this spends credits and creates a list.
    if not confirm_enrich:
        return {"count": count, "previewed": len(previewed), "enriched": False, "deduped": 0, "synced": 0}
    enrich_leads_from_supersearch(client, {
        "body": {"search_filters": search_filters, "limit": limit, "work_email_enrichment": True},
    })

    # 3) Dedupe (pure) and 4) sync. Enrichment is async — in a real flow, poll
    #    get_enrichment_for_resource and list the enriched leads before syncing.
    deduped = dedupe_by_email(previewed)
    synced = sync.sync(deduped)
    return {"count": count, "previewed": len(previewed), "enriched": True, "deduped": len(deduped), "synced": synced}
