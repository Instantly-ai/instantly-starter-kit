"""Morning Brief (CLI) — a thin wrapper over the OutboundOps class.

The logic lives in app/ops.py so you can also use it in your own service:

    from app.ops import OutboundOps
    brief = OutboundOps(client).brief()
"""
import json
from datetime import datetime, timezone

from .ops import OutboundOps
from .render import render_brief


def run(argv=None) -> None:
    argv = argv or []
    raw = "--raw" in argv
    result = OutboundOps.from_env().brief()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M") + " UTC"
    print(render_brief(now, result["health"], result["replies"], result["overview"], result["actions"]))
    if raw:
        print("\n--- raw ---\n" + json.dumps(result, indent=2))
