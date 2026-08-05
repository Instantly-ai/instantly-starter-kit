from instantly.resources.account import list_account
from instantly.resources.campaign import get_campaign_analytics_overview
from instantly.resources.email import count_unread_emails


def items_of(res):
    """Extract a list from a paginated response without assuming the exact envelope."""
    if isinstance(res, list):
        return res
    if isinstance(res, dict):
        for key in ("items", "data", "accounts", "results"):
            if isinstance(res.get(key), list):
                return res[key]
    return None


def sender_health(client):
    """Read sender health. Negative status (connection/bounce error) or negative
    warmup_status (banned/spam/suspension) means the sender is in trouble
    (docs/api/accounts.md). Conservative: total=None if the payload is unfamiliar
    (never a false "0 healthy")."""
    res = list_account(client, {"query": {"limit": 100}})
    lst = items_of(res)
    if lst is None:
        return {"total": None, "green": 0, "flagged": [], "raw": res}
    flagged = []
    for a in lst:
        acc = a if isinstance(a, dict) else {}
        problems = []
        status = acc.get("status")
        warmup = acc.get("warmup_status")
        if isinstance(status, (int, float)) and status < 0:
            problems.append(f"status {status}")
        if isinstance(warmup, (int, float)) and warmup < 0:
            problems.append(f"warmup {warmup}")
        if problems:
            flagged.append({"email": acc.get("email", "(unknown)"), "reason": ", ".join(problems)})
    return {"total": len(lst), "green": len(lst) - len(flagged), "flagged": flagged}


def replies_waiting(client):
    res = count_unread_emails(client, {})
    if isinstance(res, (int, float)):
        return int(res)
    if isinstance(res, dict):
        for k in ("count", "unread"):
            if isinstance(res.get(k), (int, float)):
                return int(res[k])
    return None


def overview(client):
    return get_campaign_analytics_overview(client, {"query": {}})
