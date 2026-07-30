"""Pull analytics across campaigns + accounts + webhook events, then normalize
into one stable snapshot. Grounded in docs/api/analytics.md. Respect rate limits —
the scheduler spreads pulls.
"""
from datetime import datetime, timedelta, timezone
from typing import Any, Callable, Dict, Optional

from instantly import create_instantly_client, InstantlyClient, InstantlyApiError
from instantly.resources.campaign import (
    get_campaign_analytics,
    get_campaign_analytics_overview,
    get_daily_campaign_analytics,
)
from instantly.resources.account import get_daily_account_analytics
from instantly.resources.webhookevent import get_webhook_events_summary


def get_client(api_key: Optional[str]) -> InstantlyClient:
    if not api_key:
        raise ValueError("INSTANTLY_API_KEY is not set")
    return create_instantly_client(api_key)


def _last_n_days(n: int) -> Dict[str, str]:
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=n)
    return {"start_date": start.date().isoformat(), "end_date": end.date().isoformat()}


def pull_snapshot(client: InstantlyClient) -> Dict[str, Any]:
    # Bound the daily pulls with a date window — unbounded account analytics 413s on
    # busy workspaces. A failing pull is recorded in `errors` instead of failing all.
    window = _last_n_days(30)
    pulls: Dict[str, Callable[[], Any]] = {
        "campaigns_all": lambda: get_campaign_analytics(client, {"query": dict(window)}),
        "campaigns_overview": lambda: get_campaign_analytics_overview(client, {}),
        "campaigns_daily": lambda: get_daily_campaign_analytics(client, {"query": dict(window)}),
        "accounts_daily": lambda: get_daily_account_analytics(client, {"query": dict(window)}),
        "events_summary": lambda: get_webhook_events_summary(client, {}),
    }
    value: Dict[str, Any] = {}
    errors: Dict[str, str] = {}
    for key, fn in pulls.items():
        try:
            value[key] = fn()
        except InstantlyApiError as err:
            errors[key] = f"{err.status}: {err.payload}"
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "window": window,
        "campaigns": {
            "all": value.get("campaigns_all"),
            "overview": value.get("campaigns_overview"),
            "daily": value.get("campaigns_daily"),
        },
        "accounts": {"daily": value.get("accounts_daily")},
        "events": {"summary": value.get("events_summary")},
        "errors": errors,
    }


_cache: Optional[Dict[str, Any]] = None


def set_cache(snapshot: Dict[str, Any]) -> None:
    global _cache
    _cache = snapshot


def get_cache() -> Optional[Dict[str, Any]]:
    return _cache
