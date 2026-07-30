from typing import Any, Dict, List


def dedupe_by_email(leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Dedupe leads by normalized email; drops rows without an email. Pure + testable."""
    seen = set()
    out: List[Dict[str, Any]] = []
    for lead in leads:
        key = (lead.get("email") or "").strip().lower()
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(lead)
    return out
