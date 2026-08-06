def _num(obj, keys):
    if isinstance(obj, dict):
        for k in keys:
            v = obj.get(k)
            if isinstance(v, (int, float)):
                return v
    return None


def render_brief(now, health, replies, overview, actions):
    lines = [f"☀️  Outbound brief — {now}"]

    sent = _num(overview, ["emails_sent_count", "sent", "emails_sent", "total_sent"])
    replied = _num(overview, ["total_replies", "replies", "reply_count", "emails_replied_count"])
    bounced = _num(overview, ["bounced", "bounces", "bounced_count", "total_bounces"])
    if sent is not None or replied is not None:
        parts = []
        if sent is not None:
            parts.append(f"{sent} sent")
        if replied is not None:
            parts.append(f"{replied} replies")
        if bounced is not None:
            parts.append(f"{bounced} bounced")
        lines.append("Yesterday: " + " · ".join(parts))
    elif overview is not None:
        lines.append("Yesterday: analytics pulled (field names vary — run with --raw to inspect)")
    else:
        lines.append("Yesterday: analytics unavailable (read failed)")

    if health["total"] is None:
        lines.append("Senders: could not parse accounts payload (run with --raw)")
    else:
        extra = f" · ⚠️ {len(health['flagged'])} flagged" if health["flagged"] else ""
        lines.append(f"Senders: {health['green']}/{health['total']} healthy{extra}")
        for f in health["flagged"][:5]:
            lines.append(f"   • {f['email']} ({f['reason']})")

    if replies is not None:
        lines.append(f"Replies waiting: {replies}")

    if actions:
        lines.append("Fix today:")
        for i, a in enumerate(sorted(actions, key=lambda x: x["priority"])[:2], 1):
            cmd = f"  →  {a['command']}" if a.get("command") else ""
            lines.append(f"  {i}) {a['text']}{cmd}")
    else:
        lines.append("✓ Nothing urgent — outbound looks healthy.")

    return "\n".join(lines)


def render_diagnosis(now, diag):
    out = [f"🚨 Incident diagnosis — {now}"]
    out.append("Senders: could not parse accounts payload" if diag["health"]["total"] is None
               else f"Senders: {len(diag['health']['flagged'])} flagged of {diag['health']['total']}")
    for f in diag["health"]["flagged"][:8]:
        out.append(f"   • {f['email']} ({f['reason']})")
    w = diag.get("worst_campaign")
    if w:
        out.append(f'Worst campaign: "{w["name"]}" — bounce {w["bounce_rate"] * 100:.1f}% over {w["sent"]} sent')
    for d in diag["dns"]:
        out.append(f"DNS {d['domain']}: SPF {d['spf']} · DMARC {d['dmarc']} · DKIM check your selector")
    out.append("Likely cause:")
    for c in diag["causes"]:
        out.append(f"   → {c}")
    out.append("Containment:")
    if not diag["plan"]:
        out.append("   (nothing to auto-contain — review the causes above)")
    for a in diag["plan"]:
        out.append(f"   - {a['label']}")
    out.append("Shift active sequences to warmed backup senders — do this in-app (reserves aren't auto-picked).")
    out.append("External checks (not automated): Google Postmaster (postmaster.google.com) · MXToolbox (mxtoolbox.com/blacklists.aspx).")
    return "\n".join(out)
