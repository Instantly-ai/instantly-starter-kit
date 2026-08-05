"""Incident Response (CLI) — a thin wrapper over the OutboundOps class.

The logic lives in app/ops.py so you can also use it in your own service:

    ops = OutboundOps(client)
    diag = ops.diagnose(domains=["acme.com"])  # read-only
    if not diag["ready"]:
        ops.contain(diag)                       # execute on your call

DIAGNOSE IS READ-ONLY. Containment runs only with --confirm.
"""
import os
from datetime import datetime, timezone

from .ops import OutboundOps
from .render import render_diagnosis


def run(argv=None) -> None:
    argv = argv or []
    confirm = "--confirm" in argv
    domains = [s.strip() for s in os.environ.get("DOMAINS", "").split(",") if s.strip()]
    ops = OutboundOps.from_env()
    diag = ops.diagnose(domains)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M") + " UTC"
    print(render_diagnosis(now, diag))

    if not diag["plan"]:
        return
    if not confirm:
        print("\nDry run. Re-run with --confirm to apply the containment above.")
        return
    print("\nApplying containment…")
    for r in ops.contain(diag):
        why = "" if r["ok"] else f" — {r.get('error')}"
        print(f"   {'✓' if r['ok'] else '✗'} {r['action']['label']}{why}")
