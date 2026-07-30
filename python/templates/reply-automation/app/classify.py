"""A tiny, dependency-free reply classifier. Swap in your own model or call
Instantly's test_ai_reply_label_lead_labels for AI labels (rate-limited: 500/30d).

interest_value maps to a lead's lt_interest_status / interest_value:
    1 interested · 2 meeting booked · 0 neutral · -1 not interested · -2 wrong person
"""
import re
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class Classification:
    label: str
    interest_value: int


_RULES: List[Tuple[str, int, List[str]]] = [
    ("not_interested", -1, [r"\bunsubscribe\b", r"not interested", r"\bstop\b", r"remove me", r"no thanks"]),
    ("wrong_person", -2, [r"wrong person", r"not the right", r"no longer with", r"reach out to"]),
    ("out_of_office", 0, [r"out of office", r"\bOOO\b", r"on leave", r"on vacation", r"annual leave"]),
    ("meeting", 2, [r"book (a )?(call|meeting|time)", r"calendar", r"calendly", r"what times?", r"let'?s meet"]),
    ("interested", 1, [
        r"interested", r"tell me more", r"sounds (good|great|interesting)", r"learn more",
        r"pricing", r"how much", r"send me (the )?(info|details|more|deck)", r"yes[, ]*please",
        r"sign me up", r"count me in", r"\bkeen\b", r"let'?s (do it|chat|talk)",
    ]),
]


def classify(text: str) -> Classification:
    body = text or ""
    for label, value, patterns in _RULES:
        if any(re.search(p, body, re.IGNORECASE) for p in patterns):
            return Classification(label=label, interest_value=value)
    return Classification(label="neutral", interest_value=0)
