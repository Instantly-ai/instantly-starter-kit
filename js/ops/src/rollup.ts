import { listAccount, getCampaignAnalytics, countUnreadEmails, getWorkspacePlanDetails } from "@instantly-ai/sdk"
import { opsClient, forWorkspace, type OpsConfig } from "./client.js"
import { listClients } from "./workspaces.js"
import { useFixtures } from "./demo.js"
import { demoOverview } from "./demo-data.js"

function itemsOf(res: unknown): unknown[] {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) if (r && Array.isArray(r[k])) return r[k] as unknown[]
  return []
}
function num(o: unknown, keys: string[]): number | undefined {
  const r = o as Record<string, unknown> | null
  for (const k of keys) { const v = r?.[k]; if (typeof v === "number") return v }
  return undefined
}

export type Severity = "critical" | "watch" | "ok"

export interface RosterRow {
  id: string
  name: string
  sendersOk: number
  sendersTotal: number | null // null = accounts read failed
  flagged: number
  campaigns: number | null
  replyRate: number | null // fraction 0..1
  replies: number | null
  severity: Severity
  note: string
}

export interface OverviewData {
  mode: "agency" | "single"
  rows: RosterRow[]
  stats: {
    clients: number
    campaigns: number | null
    avgReplyRate: number | null
    flaggedSenders: number
    repliesWaiting: number
  }
}

/** Read one client's rollup (health + campaigns/reply-rate + replies). Each read
 * degrades independently so one failure doesn't blank the row. */
async function rowFor(id: string, name: string, agency: boolean, cfg?: OpsConfig): Promise<RosterRow> {
  const c = agency ? forWorkspace(id, cfg) : opsClient(cfg)

  let sendersOk = 0
  let sendersTotal: number | null = null
  let flagged = 0
  try {
    const accts = itemsOf(await listAccount(c, { query: { limit: 100 } }))
    sendersTotal = accts.length
    for (const a of accts) {
      const acc = a as { status?: number; warmup_status?: number }
      const bad = (typeof acc.status === "number" && acc.status < 0) || (typeof acc.warmup_status === "number" && acc.warmup_status < 0)
      if (bad) flagged++
    }
    sendersOk = sendersTotal - flagged
  } catch { sendersTotal = null }

  let campaigns: number | null = null
  let replyRate: number | null = null
  try {
    const camps = itemsOf(await getCampaignAnalytics(c, { query: {} }))
    campaigns = camps.length
    let sent = 0
    let replies = 0
    for (const cm of camps) {
      sent += num(cm, ["emails_sent_count", "sent", "emails_sent"]) ?? 0
      replies += num(cm, ["reply_count", "total_replies", "replies"]) ?? 0
    }
    replyRate = sent > 0 ? replies / sent : null
  } catch { campaigns = null }

  let replies: number | null = null
  try {
    const r = await countUnreadEmails(c, {})
    replies = typeof r === "number" ? r : num(r, ["count", "unread"]) ?? null
  } catch { replies = null }

  const severity: Severity = flagged >= 2 ? "critical" : flagged === 1 ? "watch" : "ok"
  const note = flagged > 0
    ? `${flagged} sender${flagged > 1 ? "s" : ""} flagged`
    : replies && replies > 15 ? `${replies} replies waiting` : "All systems normal"

  return { id, name, sendersOk, sendersTotal, flagged, campaigns, replyRate, replies, severity, note }
}

/** The agency Overview: enumerate clients (or the single workspace), fan out per
 * client, and roll up into a needs-attention-first roster + headline stats. */
export async function overviewRollup(cfg?: OpsConfig): Promise<OverviewData> {
  if (useFixtures()) return demoOverview()
  const { mode, clients } = await listClients(cfg)
  const agency = mode === "agency"
  const rows = await Promise.all(clients.map((cl) => rowFor(cl.id, cl.name, agency, cfg)))

  const rank: Record<Severity, number> = { critical: 0, watch: 1, ok: 2 }
  rows.sort((a, b) => rank[a.severity] - rank[b.severity] || (b.replies ?? 0) - (a.replies ?? 0))

  return finalizeOverview(mode, rows)
}

function finalizeOverview(mode: "agency" | "single", rows: RosterRow[]): OverviewData {
  const replyRates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  const stats = {
    clients: rows.length,
    campaigns: rows.reduce((s, r) => s + (r.campaigns ?? 0), 0) || null,
    avgReplyRate: replyRates.length ? replyRates.reduce((a, b) => a + b, 0) / replyRates.length : null,
    flaggedSenders: rows.reduce((s, r) => s + r.flagged, 0),
    repliesWaiting: rows.reduce((s, r) => s + (r.replies ?? 0), 0),
  }
  return { mode, rows, stats }
}

/** Best-effort plan name for a client (for the client-header pill). Null if unavailable. */
export async function getPlanName(id: string, agency: boolean, cfg?: OpsConfig): Promise<string | null> {
  if (useFixtures()) return "Scale"
  try {
    const c = agency ? forWorkspace(id, cfg) : opsClient(cfg)
    const p = (await getWorkspacePlanDetails(c, {})) as { plan_name?: string }
    return p.plan_name ?? null
  } catch {
    return null
  }
}
