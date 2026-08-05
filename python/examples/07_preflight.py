"""07 · Send preflight (readiness check before you launch)

Answers "is this campaign actually ready to send?" BEFORE you activate -- so you
never launch a campaign that's set up to fail. READ-ONLY: it never activates.
Checks: connected senders, campaign sending status, and (if you pass LIST_ID)
verified-lead stats. Prints a readiness report with the fix + doc link for
anything that's short.

Run:  INSTANTLY_API_KEY=... CAMPAIGN_ID=... [LIST_ID=...] python 07_preflight.py
"""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.account import list_account
from instantly.resources.campaign import get_campaign_sending_status
from instantly.resources.leadlist import get_verification_stats


def items_of(res):
    """Extract a list from a paginated response without assuming the exact envelope."""
    if isinstance(res, list):
        return res
    if isinstance(res, dict):
        for key in ("items", "data", "accounts", "results"):
            if isinstance(res.get(key), list):
                return res[key]
    return None


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    campaign_id = os.environ.get("CAMPAIGN_ID")
    if not api_key or not campaign_id:
        sys.exit("Set INSTANTLY_API_KEY and CAMPAIGN_ID (optionally LIST_ID for verified-lead stats).")
    list_id = os.environ.get("LIST_ID")

    client = create_instantly_client(api_key)
    checks = []

    try:
        # 1) Connected senders -- you cannot send without at least one.
        accounts = list_account(client, {"query": {"limit": 100}})
        senders = items_of(accounts)
        if senders is None:
            print("Senders: could not parse the accounts payload -- review it manually:")
            print(json.dumps(accounts, indent=2))
        else:
            checks.append({
                "ok": len(senders) > 0,
                "label": f"Connected senders: {len(senders)}",
                "fix": "Connect at least one sender via OAuth (docs/api/accounts.md), then warm it before sending (docs/api/deliverability.md).",
            })

        # 2) Campaign sending status -- why it would / wouldn't send.
        status = get_campaign_sending_status(client, {"path": {"id": campaign_id}})
        print("Sending status:", json.dumps(status, indent=2))

        # 3) Verified leads (optional -- verification is opt-in in this kit).
        if list_id:
            stats = get_verification_stats(client, {"path": {"id": list_id}})
            print("Verification stats:", json.dumps(stats, indent=2))
            print("-> Aim for verified leads > 0 before launch. Verify on import (docs/api/verification.md); verification spends Credits.")
        else:
            print("No LIST_ID given -- skipping verified-lead stats. Pass LIST_ID to include them.")

        # Readiness summary
        print("\nReadiness:")
        for c in checks:
            print(f"  {'✓' if c['ok'] else '✗'} {c['label']}")
            if not c["ok"] and c.get("fix"):
                print(f"      -> {c['fix']}")
        ready = all(c["ok"] for c in checks)
        print("\n" + ("✓ No blockers in the checks above."
                       if ready else "✗ Not ready -- resolve the ✗ items before you activate."))
        print("This is read-only. To launch after fixing, use example 05 with CONFIRM_LAUNCH=1.")
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
