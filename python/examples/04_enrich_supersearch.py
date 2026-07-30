"""04 · Enrich leads from SuperSearch

Estimate + preview are FREE (no credits, nothing created) and run by default.
Enrichment spends credits and creates a list, so it's gated behind CONFIRM_ENRICH=1.

Run:  INSTANTLY_API_KEY=... python 04_enrich_supersearch.py             (preview only)
      INSTANTLY_API_KEY=... CONFIRM_ENRICH=1 python 04_enrich_supersearch.py   (enrich)
"""
import json
import os
import sys
from datetime import datetime, timezone

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.supersearchenrichment import (
    count_leads_from_supersearch,
    preview_leads_from_supersearch,
    enrich_leads_from_supersearch,
    get_enrichment_for_resource,
)

FILTERS = {"title": {"include": ["Founder", "CEO"]}, "department": ["Sales"]}


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        sys.exit("Set INSTANTLY_API_KEY in your environment.")

    client = create_instantly_client(api_key)
    try:
        # 1) Estimate (free). The API returns `number_of_leads`.
        counted = count_leads_from_supersearch(client, {"body": {"search_filters": FILTERS}})
        number_of_leads = counted.get("number_of_leads") if isinstance(counted, dict) else None
        print(f"Estimated matches: {number_of_leads}")

        # 2) Preview (free) — a redacted sample, no credits.
        preview = preview_leads_from_supersearch(client, {"body": {"search_filters": FILTERS}})
        print("Preview:", json.dumps(preview, indent=2))

        # 3) Enrich — spends credits + creates a list. Opt in only.
        if os.environ.get("CONFIRM_ENRICH") != "1":
            print("\nPreview only (free). Set CONFIRM_ENRICH=1 to enrich (spends credits + creates a list).")
            return

        run = enrich_leads_from_supersearch(client, {
            "body": {
                "search_filters": FILTERS,
                "limit": 25,
                "list_name": f"SuperSearch — {datetime.now(timezone.utc).isoformat()}",
                "work_email_enrichment": True,
            },
        })
        resource_id = run.get("resource_id", "") if isinstance(run, dict) else ""
        print("✓ Enrichment started for resource:", resource_id)

        if resource_id:
            # Enrichment is async — poll on a real workflow.
            progress = get_enrichment_for_resource(client, {"path": {"resource_id": resource_id}})
            print("Progress:", json.dumps(progress, indent=2))
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
