"""Minimal in-memory state store. Swap for a real DB in production."""
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

_runs: Dict[str, Dict[str, Any]] = {}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def create_run(run_id: str) -> Dict[str, Any]:
    run = {"id": run_id, "status": "created", "leads": 0, "replies": [], "updated_at": _now()}
    _runs[run_id] = run
    return run


def update_run(run_id: str, **patch: Any) -> Optional[Dict[str, Any]]:
    run = _runs.get(run_id)
    if run is None:
        return None
    run.update(patch)
    run["updated_at"] = _now()
    return run


def get_run(run_id: str) -> Optional[Dict[str, Any]]:
    return _runs.get(run_id)


def list_runs() -> List[Dict[str, Any]]:
    return list(_runs.values())
