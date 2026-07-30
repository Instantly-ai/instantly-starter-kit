from typing import Any, Dict, List

_replies: List[Dict[str, Any]] = []


def record(reply: Dict[str, Any]) -> None:
    _replies.append(reply)


def recent(limit: int = 50) -> List[Dict[str, Any]]:
    return list(reversed(_replies[-limit:]))
