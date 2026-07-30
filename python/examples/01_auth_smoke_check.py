"""01 · Auth smoke-check (read-only)

Confirms your API key works by listing campaigns. The "~90s, does my key work?"
check — a READ, never a write.

Run:  INSTANTLY_API_KEY=... python 01_auth_smoke_check.py
"""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import list_campaign


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        sys.exit("Set INSTANTLY_API_KEY in your environment.")

    client = create_instantly_client(api_key)
    try:
        result = list_campaign(client, {"query": {"limit": 10}})
        print("✓ Key works. First page of campaigns:")
        print(json.dumps(result, indent=2))
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
