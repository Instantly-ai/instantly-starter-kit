# Generated file. Do not edit manually.
from typing import Any


class InstantlyApiError(Exception):
    def __init__(self, status: int, status_text: str, payload: Any) -> None:
        super().__init__(f"Instantly API request failed ({status} {status_text})")
        self.status = status
        self.status_text = status_text
        self.payload = payload
