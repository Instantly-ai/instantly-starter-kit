# Generated file. Do not edit manually.
import time
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA

_TERMINAL = {"success", "error", "expired"}


def poll_oauth_session_status(
    client: InstantlyClient, session_id: str, *, interval_s: float = 5.0, max_attempts: int = 60
) -> Any:
    for _ in range(max_attempts):
        result = execute_operation(
            client, OPERATION_METADATA["getOAuthSessionStatus"], {"path": {"sessionId": session_id}}
        )
        status = result.get("status") if isinstance(result, dict) else None
        if status in _TERMINAL:
            return result
        time.sleep(interval_s)
    raise TimeoutError(f"OAuth polling exceeded {max_attempts} attempts")
