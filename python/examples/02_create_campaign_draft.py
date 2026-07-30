"""02 · Create a campaign as a DRAFT (+ a one-step sequence)

Creates a REAL campaign, but it does NOT send: new campaigns are Draft (status 0).
Launching is a separate, explicit step — see example 05.

Run:  INSTANTLY_API_KEY=... python 02_create_campaign_draft.py
"""
import json
import os
import sys
from datetime import datetime, timezone

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import create_campaign


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        sys.exit("Set INSTANTLY_API_KEY in your environment.")

    client = create_instantly_client(api_key)
    try:
        draft = create_campaign(client, {
            "body": {
                "name": f"Example draft — {datetime.now(timezone.utc).isoformat()}",
                "campaign_schedule": {
                    "schedules": [{
                        "name": "Business hours",
                        "timing": {"from": "09:00", "to": "17:00"},
                        "days": {"1": True, "2": True, "3": True, "4": True, "5": True},  # Mon–Fri
                        "timezone": "America/Chicago",
                    }],
                },
                "sequences": [{
                    "steps": [{
                        "type": "email",
                        "delay": 0,
                        "variants": [
                            {"subject": "Quick question, {{firstName}}", "body": "Hi {{firstName}},\n\n…\n\nBest,"},
                        ],
                    }],
                }],
                "stop_on_reply": True,
            },
        })
        print("✓ Created DRAFT campaign (status 0 — not sending):")
        print(json.dumps(draft, indent=2))
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
