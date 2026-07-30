# Generated file. Do not edit manually.
import time
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA

_TERMINAL = {"completed", "success", "failed", "error"}


def wait_for_background_job(
    client: InstantlyClient, job_id: str, *, interval_s: float = 2.0, max_attempts: int = 60
) -> Any:
    for _ in range(max_attempts):
        result = execute_operation(client, OPERATION_METADATA["getBackgroundJob"], {"path": {"id": job_id}})
        status = result.get("status") if isinstance(result, dict) else None
        if status in _TERMINAL:
            return result
        time.sleep(interval_s)
    raise TimeoutError(f"Background job polling exceeded {max_attempts} attempts")
