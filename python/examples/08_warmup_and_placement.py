"""08 · Deliverability: warmup + inbox placement

The deliverability surface you already pay for on your Outreach plan, wired up.
READ by default: warmup analytics for your senders + your existing inbox-
placement tests. Enabling warmup is a WRITE (a background job) -- opt in with
CONFIRM_WARMUP=1.

Run:  INSTANTLY_API_KEY=... EMAILS=s1@acme.com,s2@acme.com [CONFIRM_WARMUP=1] python 08_warmup_and_placement.py
"""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError, polling
from instantly.resources.account import get_warmup_analytics, enable_warmup_for_accounts
from instantly.resources.inboxplacementtest import list_inbox_placement_test


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    emails = [s.strip() for s in os.environ.get("EMAILS", "").split(",") if s.strip()]
    if not api_key or not emails:
        sys.exit("Set INSTANTLY_API_KEY and EMAILS=sender1@acme.com,sender2@acme.com")

    client = create_instantly_client(api_key)

    try:
        # 1) Warmup analytics for your senders (read) -- how warmup is progressing.
        warmup = get_warmup_analytics(client, {"body": {"emails": emails}})
        print("Warmup analytics:", json.dumps(warmup, indent=2))

        # 2) Existing inbox-placement tests (read) -- where your mail lands (inbox/spam) across ESPs.
        tests = list_inbox_placement_test(client, {"query": {"limit": 20}})
        print("Inbox-placement tests:", json.dumps(tests, indent=2))
        print("-> Run a new test with create_inbox_placement_test, then read the blacklist/SpamAssassin report -- see docs/api/deliverability.md.")

        # 3) Enable warmup (WRITE -- a background job). Opt in explicitly.
        if os.environ.get("CONFIRM_WARMUP") == "1":
            job = enable_warmup_for_accounts(client, {"body": {"emails": emails}})
            job_id = job.get("id") if isinstance(job, dict) else None
            print(f"Enabling warmup... job {job_id or '(no id returned)'}")
            if job_id:
                done = polling.wait_for_background_job(client, job_id)
                print("Warmup-enable job finished:", json.dumps(done, indent=2))
        else:
            print("\nRead-only. Re-run with CONFIRM_WARMUP=1 to enable warmup on these senders (a background job).")
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
