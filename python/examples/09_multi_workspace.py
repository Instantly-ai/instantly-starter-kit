"""09 · Agency multi-workspace (one admin key -> many client sub-workspaces)

With an ADMIN-workspace key you act on each client's sub-workspace by setting the
`x-as-workspace: <sub_workspace_id>` header (see
docs/conventions.md#admin-acting-as-a-sub-workspace). This example is READ-ONLY:
for each sub-workspace it lists connected senders and pulls campaign analytics --
the per-client reporting an agency runs across N clients from a single key. It
never moves accounts and never sends.

Reuse pattern: one client per sub-workspace = same admin key + a different
`default_headers["x-as-workspace"]`. Nothing per-client to re-auth.

Run:  INSTANTLY_API_KEY=<admin-key> SUB_WORKSPACE_IDS=ws1,ws2,ws3 python 09_multi_workspace.py
"""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.account import list_account
from instantly.resources.campaign import get_campaign_analytics


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
    ids = [s.strip() for s in os.environ.get("SUB_WORKSPACE_IDS", "").split(",") if s.strip()]
    if not api_key or not ids:
        sys.exit("Set INSTANTLY_API_KEY (an admin-workspace key) and SUB_WORKSPACE_IDS=ws1,ws2,...")

    for ws_id in ids:
        print(f"\n=== sub-workspace {ws_id} ===")
        try:
            # One client per sub-workspace: same admin key, different x-as-workspace header.
            client = create_instantly_client(api_key, default_headers={"x-as-workspace": ws_id})
            accounts = list_account(client, {"query": {"limit": 100}})
            senders = items_of(accounts)
            print(f"connected senders: {len(senders) if senders is not None else '(review payload below)'}")
            if senders is None:
                print("accounts:", json.dumps(accounts, indent=2))
            analytics = get_campaign_analytics(client, {"query": {}})  # omit id -> all campaigns
            print("campaign analytics:", json.dumps(analytics, indent=2))
        except InstantlyApiError as err:
            # Isolate per-client failures so one bad client doesn't abort the rest.
            print(f"  x {ws_id}: API error {err.status}", err.payload)

    print("\n✓ Per-client report complete (read-only, no changes made).")
    print("Note: move_accounts (cross-workspace) is DESTRUCTIVE and admin-only — guard it. Not run here.")


if __name__ == "__main__":
    main()
