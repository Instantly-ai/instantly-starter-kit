// Agency-wide aggregates: fan out a per-client read across every client workspace
// and merge. Powers the global rail pages (/campaigns, /inbox, /deliverability,
// /analytics). Single-workspace keys just aggregate the one workspace.
import { listClients } from "./workspaces.js"
import { listCampaigns, type CampaignRow } from "./campaigns.js"
import { listReplies, type ReplyRow } from "./replies.js"
import { listDeliverability, type DeliverabilityRow } from "./deliverability.js"
import { analyticsFor, type DailyPoint } from "./analytics.js"
import { leadsFor, type LeadRow, type LeadListRow } from "./leads.js"
import { enrichmentOverview, type EnrichmentRow } from "./enrichment.js"
import { type OpsConfig } from "./client.js"
import { useFixtures } from "./demo.js"
import { demoAllInbox, demoAllCampaigns, demoAllDeliverability, demoAllAnalytics, demoAllLeads, demoAllEnrichment } from "./demo-data.js"

export interface ClientRef {
  clientId: string
  clientName: string
}

/** Run a per-client read against every client, tagging each result with its client.
 * Reads that throw drop to null so one bad client doesn't blank the page. */
async function fanOut<T>(fn: (id: string) => Promise<T>, cfg?: OpsConfig): Promise<{ ref: ClientRef; data: T | null }[]> {
  const { clients } = await listClients(cfg)
  return Promise.all(
    clients.map(async (c) => ({ ref: { clientId: c.id, clientName: c.name }, data: await fn(c.id).catch(() => null) })),
  )
}

// ---- Inbox (all replies) ----
export type AgencyReply = ReplyRow & ClientRef
export interface AgencyInbox {
  rows: AgencyReply[]
  unread: number
  clients: number
}
export async function allInbox(cfg?: OpsConfig): Promise<AgencyInbox> {
  if (useFixtures()) return demoAllInbox()
  const results = await fanOut((id) => listReplies(id, cfg), cfg)
  const rows: AgencyReply[] = []
  let unread = 0
  for (const r of results) {
    if (!r.data) continue
    unread += r.data.unread
    for (const row of r.data.rows) rows.push({ ...row, ...r.ref })
  }
  rows.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
  return { rows: rows.slice(0, 100), unread, clients: results.length }
}

// ---- Campaigns (all campaigns) ----
export type AgencyCampaign = CampaignRow & ClientRef
export interface AgencyCampaigns {
  rows: AgencyCampaign[]
  total: number
  active: number
  sent: number
  replies: number
  avgReplyRate: number | null
  clients: number
}
export async function allCampaigns(cfg?: OpsConfig): Promise<AgencyCampaigns> {
  if (useFixtures()) return demoAllCampaigns()
  const results = await fanOut((id) => listCampaigns(id, cfg), cfg)
  const rows: AgencyCampaign[] = []
  for (const r of results) if (r.data) for (const row of r.data.rows) rows.push({ ...row, ...r.ref })
  rows.sort((a, b) => b.sent - a.sent)
  const rates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    active: rows.filter((r) => r.status === 1).length,
    sent: rows.reduce((s, r) => s + r.sent, 0),
    replies: rows.reduce((s, r) => s + r.replies, 0),
    avgReplyRate: rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : null,
    clients: results.length,
  }
}

// ---- Deliverability (all placement tests) ----
export type AgencyDeliverability = DeliverabilityRow & ClientRef
export interface AgencyDeliverabilityData {
  rows: AgencyDeliverability[]
  total: number
  avgInboxPercent: number | null
  clients: number
}
export async function allDeliverability(cfg?: OpsConfig): Promise<AgencyDeliverabilityData> {
  if (useFixtures()) return demoAllDeliverability()
  const results = await fanOut((id) => listDeliverability(id, cfg), cfg)
  const rows: AgencyDeliverability[] = []
  for (const r of results) if (r.data) for (const row of r.data.rows) rows.push({ ...row, ...r.ref })
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
  const inbox = rows.map((r) => r.inboxPercent).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    avgInboxPercent: inbox.length ? Math.round(inbox.reduce((a, b) => a + b, 0) / inbox.length) : null,
    clients: results.length,
  }
}

// ---- Analytics (one full-agency aggregate: totals + combined daily trend) ----
export interface AgencyAnalytics {
  hasData: boolean
  sent: number
  contacted: number
  opens: number
  replies: number
  opportunities: number
  opportunityValue: number
  interested: number
  meetingsBooked: number
  closed: number
  openRate: number | null
  replyRate: number | null
  oppRate: number | null
  daily: DailyPoint[] // summed across all clients by date, ascending, last 30
  clients: number
}

/** Sum every client's daily series into one agency-wide trend (grouped by date). */
function mergeDaily(series: DailyPoint[][]): DailyPoint[] {
  const byDate = new Map<string, DailyPoint>()
  for (const arr of series)
    for (const p of arr) {
      const cur = byDate.get(p.date) ?? { date: p.date, sent: 0, opened: 0, replies: 0, opportunities: 0 }
      cur.sent += p.sent
      cur.opened += p.opened
      cur.replies += p.replies
      cur.opportunities += p.opportunities
      byDate.set(p.date, cur)
    }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-30)
}

export async function allAnalytics(cfg?: OpsConfig): Promise<AgencyAnalytics> {
  if (useFixtures()) return demoAllAnalytics()
  const results = await fanOut((id) => analyticsFor(id, cfg), cfg)
  let sent = 0
  let contacted = 0
  let opens = 0
  let replies = 0
  let opportunities = 0
  let opportunityValue = 0
  let interested = 0
  let meetingsBooked = 0
  let closed = 0
  const daily: DailyPoint[][] = []
  for (const r of results) {
    const d = r.data
    if (!d) continue
    sent += d.sent
    contacted += d.contacted
    opens += d.opens
    replies += d.replies
    opportunities += d.opportunities
    opportunityValue += d.opportunityValue
    interested += d.interested
    meetingsBooked += d.meetingsBooked
    closed += d.closed
    if (d.daily.length) daily.push(d.daily)
  }
  const merged = mergeDaily(daily)
  return {
    hasData: sent > 0 || merged.length > 0,
    sent,
    contacted,
    opens,
    replies,
    opportunities,
    opportunityValue,
    interested,
    meetingsBooked,
    closed,
    openRate: sent > 0 ? opens / sent : null,
    replyRate: sent > 0 ? replies / sent : null,
    oppRate: contacted > 0 ? opportunities / contacted : null,
    daily: merged,
    clients: results.length,
  }
}

// ---- Leads (all lead lists + recent leads) ----
export type AgencyLeadList = LeadListRow & ClientRef
export type AgencyLead = LeadRow & ClientRef
export interface AgencyLeads {
  lists: AgencyLeadList[]
  leads: AgencyLead[]
  listCount: number
  leadCount: number
  clients: number
}
export async function allLeads(cfg?: OpsConfig): Promise<AgencyLeads> {
  if (useFixtures()) return demoAllLeads()
  const results = await fanOut((id) => leadsFor(id, cfg), cfg)
  const lists: AgencyLeadList[] = []
  const leads: AgencyLead[] = []
  for (const r of results) {
    if (!r.data) continue
    for (const l of r.data.lists) lists.push({ ...l, ...r.ref })
    for (const ld of r.data.leads) leads.push({ ...ld, ...r.ref })
  }
  return { lists, leads, listCount: lists.length, leadCount: leads.length, clients: results.length }
}

// ---- Enrichment (all runs across enriched lists) ----
export type AgencyEnrichmentRow = EnrichmentRow & ClientRef
export interface AgencyEnrichment {
  rows: AgencyEnrichmentRow[]
  total: number
  enrichedLists: number
  clients: number
}
export async function allEnrichment(cfg?: OpsConfig): Promise<AgencyEnrichment> {
  if (useFixtures()) return demoAllEnrichment()
  const results = await fanOut((id) => enrichmentOverview(id, cfg), cfg)
  const rows: AgencyEnrichmentRow[] = []
  let enrichedLists = 0
  for (const r of results) {
    if (!r.data) continue
    enrichedLists += r.data.enrichedLists
    for (const row of r.data.rows) rows.push({ ...row, ...r.ref })
  }
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
  return { rows, total: rows.length, enrichedLists, clients: results.length }
}
