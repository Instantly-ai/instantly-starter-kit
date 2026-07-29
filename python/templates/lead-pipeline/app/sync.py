from typing import Any, Dict, List, Protocol


class SyncAdapter(Protocol):
    """Implement against your DB/CRM (Postgres, HubSpot, Salesforce, …)."""

    name: str

    def sync(self, leads: List[Dict[str, Any]]) -> int: ...


class ConsoleSync:
    """Default stub: writes to stdout. Replace with a real adapter."""

    name = "console"

    def sync(self, leads: List[Dict[str, Any]]) -> int:
        for lead in leads:
            print("[sync]", lead.get("email"))
        return len(leads)


console_sync = ConsoleSync()
