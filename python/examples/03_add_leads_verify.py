"""03 · Add leads to a list + (optionally) verify them on import

Creates a REAL lead list and adds a lead, then cleans up after itself.
Verification is OFF by default (it spends a credit per lead) — set VERIFY_ON_IMPORT=1
to enable. Set KEEP=1 to keep the list instead of deleting it.

Run:  INSTANTLY_API_KEY=... python 03_add_leads_verify.py
"""
import json
import os
import sys
from datetime import datetime, timezone

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.leadlist import create_lead_list, get_verification_stats, delete_lead_list
from instantly.resources.lead import bulk_add_leads, bulk_delete_leads


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        sys.exit("Set INSTANTLY_API_KEY in your environment.")

    verify = os.environ.get("VERIFY_ON_IMPORT") == "1"  # spends a verification credit per lead
    keep = os.environ.get("KEEP") == "1"  # by default we delete what we created

    client = create_instantly_client(api_key)
    try:
        lead_list = create_lead_list(client, {"body": {"name": f"Example list — {datetime.now(timezone.utc).isoformat()}"}})
        list_id = lead_list["id"]
        try:
            bulk_add_leads(client, {
                "body": {
                    "list_id": list_id,  # provide list_id XOR campaign_id; max 1000 leads/call
                    "leads": [{"email": "ada@example.com", "first_name": "Ada", "company_name": "Analytical Engines"}],
                    "verify_leads_on_import": verify,  # off by default (no credit spend)
                    "skip_if_in_workspace": True,      # dedupe
                },
            })
            stats = get_verification_stats(client, {"path": {"id": list_id}})
            print(f"✓ Added lead to list {list_id}{' (verifying on import)' if verify else ''}. Verification stats:")
            print(json.dumps(stats, indent=2))
        finally:
            if not keep:
                # Leave nothing behind: delete the leads in the list, then the list.
                try:
                    bulk_delete_leads(client, {"body": {"list_id": list_id}})
                except InstantlyApiError:
                    pass
                try:
                    delete_lead_list(client, {"path": {"id": list_id}})
                except InstantlyApiError:
                    pass
                print(f"Cleaned up list {list_id}. (Set KEEP=1 to keep it.)")
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
