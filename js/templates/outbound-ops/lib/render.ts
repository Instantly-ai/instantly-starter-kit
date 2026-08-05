import type { SenderHealth } from "./reads.js"
import type { Action, Diagnosis } from "./ops.js"

/** Pull the first-present numeric field from a loosely-typed analytics object. */
function num(obj: unknown, keys: string[]): number | undefined {
  const o = obj as Record<string, unknown> | null
  for (const k of keys) {
    const v = o?.[k]
    if (typeof v === "number") return v
  }
  return undefined
}

export function renderBrief(opts: {
  now: string
  health: SenderHealth
  replies: number | null
  overview: unknown
  actions: Action[]
}): string {
  const { now, health, replies, overview, actions } = opts
  const lines: string[] = [`☀️  Outbound brief — ${now}`]

  const sent = num(overview, ["emails_sent_count", "sent", "emails_sent", "total_sent"])
  const replied = num(overview, ["total_replies", "replies", "reply_count", "emails_replied_count"])
  const bounced = num(overview, ["bounced", "bounces", "bounced_count", "total_bounces"])
  if (sent !== undefined || replied !== undefined) {
    const parts: string[] = []
    if (sent !== undefined) parts.push(`${sent} sent`)
    if (replied !== undefined) parts.push(`${replied} replies`)
    if (bounced !== undefined) parts.push(`${bounced} bounced`)
    lines.push(`Yesterday: ${parts.join(" · ")}`)
  } else if (overview !== null) {
    lines.push(`Yesterday: analytics pulled (field names vary — run with --raw to inspect)`)
  } else {
    lines.push(`Yesterday: analytics unavailable (read failed)`)
  }

  if (health.total === null) {
    lines.push(`Senders: could not parse accounts payload (run with --raw)`)
  } else {
    lines.push(`Senders: ${health.green}/${health.total} healthy${health.flagged.length ? ` · ⚠️ ${health.flagged.length} flagged` : ""}`)
    for (const f of health.flagged.slice(0, 5)) lines.push(`   • ${f.email} (${f.reason})`)
  }

  if (replies !== null) lines.push(`Replies waiting: ${replies}`)

  if (actions.length) {
    lines.push(`Fix today:`)
    ;[...actions].sort((a, b) => a.priority - b.priority).slice(0, 2).forEach((a, i) => {
      lines.push(`  ${i + 1}) ${a.text}${a.command ? `  →  ${a.command}` : ""}`)
    })
  } else {
    lines.push(`✓ Nothing urgent — outbound looks healthy.`)
  }

  return lines.join("\n")
}

export function renderDiagnosis(now: string, diag: Diagnosis): string {
  const out: string[] = [`🚨 Incident diagnosis — ${now}`]
  out.push(diag.health.total === null ? "Senders: could not parse accounts payload" : `Senders: ${diag.health.flagged.length} flagged of ${diag.health.total}`)
  for (const f of diag.health.flagged.slice(0, 8)) out.push(`   • ${f.email} (${f.reason})`)
  if (diag.worstCampaign) out.push(`Worst campaign: "${diag.worstCampaign.name}" — bounce ${(diag.worstCampaign.bounceRate * 100).toFixed(1)}% over ${diag.worstCampaign.sent} sent`)
  for (const d of diag.dns) out.push(`DNS ${d.domain}: SPF ${d.spf} · DMARC ${d.dmarc} · DKIM check your selector`)
  out.push("Likely cause:")
  for (const c of diag.causes) out.push(`   → ${c}`)
  out.push("Containment:")
  if (!diag.plan.length) out.push("   (nothing to auto-contain — review the causes above)")
  for (const a of diag.plan) out.push(`   - ${a.label}`)
  out.push("Shift active sequences to warmed backup senders — do this in-app (reserves aren't auto-picked).")
  out.push("External checks (not automated): Google Postmaster (postmaster.google.com) · MXToolbox (mxtoolbox.com/blacklists.aspx).")
  return out.join("\n")
}
