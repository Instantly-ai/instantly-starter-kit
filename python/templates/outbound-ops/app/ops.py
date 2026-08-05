"""OutboundOps — the daily-ops logic as an importable class, so you can use it
in your own service instead of only from the CLI.

    from app.ops import OutboundOps
    ops = OutboundOps(client)                 # your own configured client
    brief = ops.brief()                        # structured data — no printing
    diag = ops.diagnose(domains=["acme.com"])  # read-only
    if not diag["ready"]:
        ops.contain(diag)                      # execute containment on YOUR call

The CLI commands (app/brief.py, app/incident.py) are thin wrappers over this.
Formatting lives in app/render.py — this module never prints.
"""
import os

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import get_campaign_analytics, pause_campaign
from instantly.resources.account import patch_account

from .reads import sender_health, replies_waiting, overview, items_of
from .dns import verify_dns
from .thresholds import THRESHOLDS


def _num(obj, keys):
    if isinstance(obj, dict):
        for k in keys:
            v = obj.get(k)
            if isinstance(v, (int, float)):
                return v
    return None


def _empty_health():
    return {"total": None, "green": 0, "flagged": []}


def _safe(fn, fallback):
    try:
        return fn()
    except Exception:
        return fallback


class OutboundOps:
    def __init__(self, client, thresholds=None):
        self.client = client
        self.thresholds = thresholds or THRESHOLDS

    @classmethod
    def from_env(cls):
        """Convenience for scripts: build from INSTANTLY_API_KEY (+ optional AS_WORKSPACE)."""
        api_key = os.environ.get("INSTANTLY_API_KEY")
        if not api_key:
            raise RuntimeError("INSTANTLY_API_KEY is not set")
        as_ws = os.environ.get("AS_WORKSPACE")
        client = (create_instantly_client(api_key, default_headers={"x-as-workspace": as_ws})
                  if as_ws else create_instantly_client(api_key))
        return cls(client)

    def brief(self):
        """The morning picture — structured, no side effects."""
        health = _safe(lambda: sender_health(self.client), _empty_health())
        replies = _safe(lambda: replies_waiting(self.client), None)
        ov = _safe(lambda: overview(self.client), None)
        actions = []
        if health["flagged"]:
            actions.append({"priority": 1, "text": f"{len(health['flagged'])} sender(s) unhealthy — deliverability risk",
                            "command": "ops.diagnose() → contain()  ·  python main.py incident"})
        if replies and replies > 0:
            actions.append({"priority": 2, "text": f"{replies} replies waiting",
                            "command": "Instantly Unibox → app.instantly.ai"})
        return {"health": health, "replies": replies, "overview": ov, "actions": actions}

    def diagnose(self, domains=None):
        """Diagnose deliverability trouble. READ-ONLY — returns an inspectable plan; does not execute it."""
        health = _safe(lambda: sender_health(self.client), _empty_health())
        raw = _safe(lambda: get_campaign_analytics(self.client, {"query": {}}), None)
        campaigns = []
        for c in (items_of(raw) or (raw if isinstance(raw, list) else [])):
            co = c if isinstance(c, dict) else {}
            cid = co.get("campaign_id") or co.get("id")
            if not cid:
                continue
            sent = _num(co, ["emails_sent_count", "sent", "emails_sent"]) or 0
            bounced = _num(co, ["bounced", "bounces", "bounced_count"]) or 0
            replies = _num(co, ["total_replies", "replies", "reply_count"]) or 0
            campaigns.append({"id": cid, "name": co.get("campaign_name") or co.get("name") or cid, "sent": sent,
                              "bounce_rate": (bounced / sent) if sent else 0.0,
                              "reply_rate": (replies / sent) if sent else 0.0})
        eligible = [c for c in campaigns if c["sent"] >= 50]
        worst = max(eligible, key=lambda c: c["bounce_rate"], default=None)
        dns = verify_dns(domains) if domains else []

        causes = []
        high_bounce = [c for c in eligible if c["bounce_rate"] >= self.thresholds["bounce_crit"]]
        if len(high_bounce) >= 2:
            causes.append("List quality — high bounce across multiple campaigns; verify/refresh the list before more sends.")
        elif worst and worst["bounce_rate"] >= self.thresholds["bounce_crit"]:
            causes.append(f'Campaign "{worst["name"]}" bounce {worst["bounce_rate"] * 100:.1f}% — likely a bad list segment or a cold domain.')
        if health["flagged"]:
            causes.append(f"{len(health['flagged'])} sender(s) in a bad state — deliverability/reputation.")
        for d in dns:
            if d.get("spf") != "ok" or d.get("dmarc") != "ok":
                causes.append(f"Authentication — {d['domain']}: SPF {d['spf']}, DMARC {d['dmarc']} (fix DNS; DKIM needs your selector).")
        if not causes:
            causes.append("No clear cause from Instantly-side signals — check external reputation (Postmaster / MXToolbox).")

        plan = []
        if worst and worst["bounce_rate"] >= self.thresholds["bounce_crit"]:
            plan.append({"kind": "pause-campaign", "label": f'Pause "{worst["name"]}" (bounce {worst["bounce_rate"] * 100:.1f}%)', "campaign_id": worst["id"]})
        for f in health["flagged"]:
            plan.append({"kind": "drop-daily-limit", "label": f"Drop {f['email']} daily_limit → 25", "email": f["email"], "daily_limit": 25})
        return {"health": health, "campaigns": campaigns, "worst_campaign": worst, "dns": dns,
                "causes": causes, "plan": plan, "ready": len(plan) == 0}

    def contain(self, diagnosis):
        """Execute a diagnosis's containment plan (pause worst campaign, drop limits). This WRITES."""
        results = []
        for a in diagnosis["plan"]:
            try:
                if a["kind"] == "pause-campaign":
                    pause_campaign(self.client, {"path": {"id": a["campaign_id"]}})
                else:
                    patch_account(self.client, {"path": {"email": a["email"]}, "body": {"daily_limit": a["daily_limit"]}})
                results.append({"action": a, "ok": True})
            except InstantlyApiError as e:
                results.append({"action": a, "ok": False, "error": f"API {e.status}"})
        return results
