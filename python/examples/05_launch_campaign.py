"""05 · Launch a campaign (preflight → activate)

Activating SENDS real email. This runs a preflight (sending status + connected
accounts) and only activates when you opt in with CONFIRM_LAUNCH=1.

Run:  INSTANTLY_API_KEY=... CAMPAIGN_ID=... [CONFIRM_LAUNCH=1] python 05_launch_campaign.py
"""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import get_campaign_sending_status, activate_campaign
from instantly.resources.account import list_account


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    campaign_id = os.environ.get("CAMPAIGN_ID")
    if not api_key or not campaign_id:
        sys.exit("Set INSTANTLY_API_KEY and CAMPAIGN_ID.")

    client = create_instantly_client(api_key)
    try:
        status = get_campaign_sending_status(client, {"path": {"id": campaign_id}})
        accounts = list_account(client, {"query": {"limit": 100}})
        print("Sending status:", json.dumps(status, indent=2))
        print("Connected accounts:", json.dumps(accounts, indent=2))

        if os.environ.get("CONFIRM_LAUNCH") != "1":
            print("\nDry run. Review the preflight above, then re-run with CONFIRM_LAUNCH=1 to activate.")
            return

        activate_campaign(client, {"path": {"id": campaign_id}})
        print(f"✓ Activated campaign {campaign_id}. It is now sending.")
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
