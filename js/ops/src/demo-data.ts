// Synthetic fixtures for demo mode with no API key — a deterministic fake agency
// so the whole dashboard is fully explorable with zero setup (public demo). Numbers
// are seeded (stable per id), names/emails/text reuse the demo maskers. Nothing here
// touches the API. Served only when useFixtures() (isDemo() && no key).
import type { Tone } from "./types.js"
import type { ClientsResult } from "./types.js"
import type { OverviewData, RosterRow, Severity } from "./rollup.js"
import type { SenderHealthData, SenderRow } from "./health.js"
import type { CampaignsData, CampaignRow, CampaignDetailData, StepRow } from "./campaigns.js"
import type { DeliverabilityData, DeliverabilityRow } from "./deliverability.js"
import type { AnalyticsData, DailyPoint } from "./analytics.js"
import type { RepliesData, ReplyRow, ThreadData } from "./replies.js"
import type { LeadsData, LeadRow, LeadListRow } from "./leads.js"
import type { EnrichmentData, EnrichmentRow } from "./enrichment.js"
import type { AgencyInbox, AgencyReply, AgencyCampaigns, AgencyCampaign, AgencyDeliverabilityData, AgencyDeliverability, AgencyAnalytics, AgencyLeads, AgencyLeadList, AgencyLead, AgencyEnrichment, AgencyEnrichmentRow } from "./agency.js"
import { maskCompany, maskEmail, maskPerson, maskCampaignName, maskSubject, maskReply, maskOutbound, seedInt } from "./demo.js"

export const DEMO_CLIENT_IDS = ["demo-c1", "demo-c2", "demo-c3", "demo-c4"]
const clientName = (id: string) => maskCompany(id)
const round = Math.round

function lastNDates(n: number): string[] {
  const out: string[] = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    out.push(d.toISOString().slice(0, 10))
  }
  return out
}
function isoDaysAgo(days: number, seed = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(9 + (seed % 9), (seed * 7) % 60, 0, 0)
  return d.toISOString()
}
function demoDaily(seed: string, base: number): DailyPoint[] {
  return lastNDates(30).map((date, i) => {
    const ramp = 0.55 + 0.5 * (i / 29)
    const noise = 0.8 + seedInt(seed + date, 0, 40) / 100
    const sent = round(base * ramp * noise)
    return { date, sent, opened: round(sent * 0.42), replies: round(sent * 0.02), opportunities: round(sent * 0.004) }
  })
}

// ---- per-client ----
export function demoSenders(id: string): SenderHealthData {
  const total = seedInt(id + "sn", 10, 22)
  const flagged = seedInt(id + "fl", 0, 2)
  const rows: SenderRow[] = Array.from({ length: total }, (_, i) => {
    const bad = i < flagged
    return {
      email: maskEmail(`${id}-sender-${i}`),
      status: bad ? -1 : 1,
      statusLabel: bad ? "Connection error" : "Active",
      statusTone: (bad ? "danger" : "ok") as Tone,
      warmupStatus: bad ? -1 : 1,
      warmupLabel: bad ? "Banned" : "Active",
      warmupTone: (bad ? "danger" : "ok") as Tone,
      warmupScore: bad ? seedInt(`${id}${i}w`, 20, 55) : seedInt(`${id}${i}w`, 82, 99),
      dailyLimit: 30,
      setupPending: false,
      message: bad ? "550 5.4.5 mailbox temporarily unavailable" : null,
      flagged: bad,
    }
  })
  const scores = rows.map((r) => r.warmupScore).filter((v): v is number => v != null)
  return {
    rows,
    total,
    active: total - flagged,
    warming: total - flagged,
    flagged,
    setupPending: 0,
    avgWarmupScore: scores.length ? round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
  }
}

const CSTATUS: Record<number, { label: string; tone: Tone }> = {
  0: { label: "Draft", tone: "neutral" },
  1: { label: "Active", tone: "ok" },
  2: { label: "Paused", tone: "warn" },
  3: { label: "Completed", tone: "info" },
}
function demoCampaignRows(id: string): CampaignRow[] {
  const count = seedInt(id + "cc", 4, 7)
  return Array.from({ length: count }, (_, i) => {
    const cid = `demo-cmp-${id}-${i}`
    const status = i === 0 ? 1 : [1, 1, 2, 0, 3][seedInt(cid + "st", 0, 4)]
    const sent = status === 0 ? 0 : seedInt(cid + "s", 1200, 22000)
    const replies = round(sent * (seedInt(cid + "r", 12, 28) / 1000))
    const opens = round(sent * 0.42)
    const opps = round(replies * 0.35)
    const s = CSTATUS[status]
    return {
      id: cid,
      name: maskCampaignName(cid),
      status,
      statusLabel: s.label,
      statusTone: s.tone,
      leads: seedInt(cid + "l", 500, 9000),
      sent,
      opens,
      replies,
      opportunities: opps,
      replyRate: sent > 0 ? replies / sent : null,
      openRate: sent > 0 ? opens / sent : null,
      canActivate: status === 0 || status === 2,
      canPause: status === 1,
    }
  }).sort((a, b) => b.sent - a.sent)
}
export function demoCampaigns(id: string): CampaignsData {
  const rows = demoCampaignRows(id)
  const rates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    active: rows.filter((r) => r.status === 1).length,
    sent: rows.reduce((s, r) => s + r.sent, 0),
    replies: rows.reduce((s, r) => s + r.replies, 0),
    avgReplyRate: rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : null,
  }
}

const SENDING_CHOICES: { status: string; label: string; tone: Tone }[] = [
  { status: "healthy", label: "Healthy — sending", tone: "ok" },
  { status: "waiting_for_leads", label: "Waiting for leads", tone: "warn" },
  { status: "out_of_schedule", label: "Outside sending schedule", tone: "warn" },
  { status: "daily_limit_met", label: "Daily limit met", tone: "warn" },
]
export function demoCampaignDetail(campaignId: string): CampaignDetailData {
  const sent = seedInt(campaignId + "s", 4000, 26000)
  const replies = round(sent * (seedInt(campaignId + "r", 14, 26) / 1000))
  const opens = round(sent * 0.42)
  const opps = round(replies * 0.4)
  const stepCount = seedInt(campaignId + "steps", 3, 5)
  let remaining = sent
  const steps: StepRow[] = Array.from({ length: stepCount }, (_, i) => {
    const stSent = i === stepCount - 1 ? remaining : round(remaining * (0.42 + seedInt(campaignId + i, 0, 15) / 100))
    remaining = Math.max(0, remaining - stSent)
    const stReplies = round(stSent * (seedInt(campaignId + i + "r", 12, 26) / 1000))
    return { step: `Step ${i}`, variant: null, sent: stSent, opened: round(stSent * 0.42), replies: stReplies, clicks: round(stSent * 0.03), replyRate: stSent > 0 ? stReplies / stSent : null }
  })
  return {
    id: campaignId,
    name: maskCampaignName(campaignId),
    status: 1,
    statusLabel: "Active",
    statusTone: "ok",
    canActivate: false,
    canPause: true,
    sending: SENDING_CHOICES[seedInt(campaignId + "snd", 0, SENDING_CHOICES.length - 1)],
    kpis: { sent, contacted: round(sent * 0.94), opens, replies, opportunities: opps, opportunityValue: opps * 1000, openRate: 0.42, replyRate: replies / sent },
    steps,
    daily: demoDaily(campaignId, Math.max(40, round(sent / 30))),
  }
}

export function demoDeliverability(id: string): DeliverabilityData {
  const count = seedInt(id + "dl", 2, 4)
  const rows: DeliverabilityRow[] = Array.from({ length: count }, (_, i) => {
    const inbox = seedInt(`${id}-dt-${i}`, 82, 98)
    const spam = seedInt(`${id}-dt-${i}s`, 1, 8)
    return {
      id: `demo-dt-${id}-${i}`,
      name: `Placement test ${i + 1}`,
      status: 3,
      statusLabel: "Completed",
      statusTone: "info" as Tone,
      createdAt: isoDaysAgo(i * 6 + 2, i),
      count: seedInt(`${id}-dt-${i}c`, 30, 90),
      inboxPercent: inbox,
      spamPercent: spam,
      categoryPercent: 100 - inbox - spam,
    }
  })
  const inbox = rows.map((r) => r.inboxPercent).filter((v): v is number => v != null)
  return { rows, total: rows.length, avgInboxPercent: round(inbox.reduce((a, b) => a + b, 0) / inbox.length), latestInboxPercent: rows[0]?.inboxPercent ?? null }
}

export function demoAnalytics(id: string): AnalyticsData {
  const daily = demoDaily(id + "an", seedInt(id + "base", 300, 1400))
  const sent = daily.reduce((s, d) => s + d.sent, 0)
  const opens = daily.reduce((s, d) => s + d.opened, 0)
  const replies = daily.reduce((s, d) => s + d.replies, 0)
  const opps = daily.reduce((s, d) => s + d.opportunities, 0)
  return {
    hasData: true,
    sent,
    contacted: round(sent * 0.94),
    opens,
    replies,
    opportunities: opps,
    opportunityValue: opps * 1000,
    interested: round(opps * 1.6),
    meetingsBooked: round(opps * 0.5),
    closed: round(opps * 0.15),
    openRate: sent ? opens / sent : null,
    replyRate: sent ? replies / sent : null,
    oppRate: sent ? opps / round(sent * 0.94) : null,
    daily,
  }
}

export function demoReplies(id: string): RepliesData {
  const count = seedInt(id + "rp", 12, 22)
  const unread = seedInt(id + "un", 3, 14)
  const rows: ReplyRow[] = Array.from({ length: count }, (_, i) => {
    const seed = `${id}-eml-${i}`
    return {
      id: `demo-eml-${id}-${i}`,
      from: maskEmail(`${seed}-lead`),
      subject: maskSubject(seed),
      preview: maskReply(seed),
      account: maskEmail(`${seed}-acct`),
      campaignId: `demo-cmp-${id}-0`,
      date: isoDaysAgo(Math.floor(i / 3), i),
      unread: i < unread,
    }
  })
  return { rows, total: rows.length, unread }
}
export function demoCountReplies(id: string): number {
  return seedInt(id + "un", 3, 14)
}

export function demoThread(emailId: string): ThreadData {
  const lead = maskEmail(`${emailId}-lead`)
  const acct = maskEmail(`${emailId}-acct`)
  return {
    subject: maskSubject(emailId),
    lead,
    account: acct,
    messages: [
      { id: `${emailId}-m0`, direction: "sent", from: acct, to: lead, date: isoDaysAgo(4, 1), text: maskOutbound(emailId) },
      { id: `${emailId}-m1`, direction: "sent", from: acct, to: lead, date: isoDaysAgo(2, 2), text: maskOutbound(emailId + "b") },
      { id: `${emailId}-m2`, direction: "received", from: lead, to: acct, date: isoDaysAgo(1, 3), text: maskReply(emailId) },
    ],
  }
}

export function demoLeads(id: string): LeadsData {
  const listCount = seedInt(id + "lc", 3, 6)
  const lists: LeadListRow[] = Array.from({ length: listCount }, (_, i) => ({
    id: `demo-list-${id}-${i}`,
    name: `${maskCompany(`${id}-list-${i}`)} list`,
    createdAt: isoDaysAgo(i * 3 + 1, i),
    hasEnrichment: i < 2,
  }))
  const leads: LeadRow[] = Array.from({ length: 25 }, (_, i) => {
    const seed = `${id}-ld-${i}`
    return {
      id: `demo-lead-${id}-${i}`,
      email: maskEmail(seed),
      name: maskPerson(seed),
      company: maskCompany(seed),
      title: ["Founder", "VP Sales", "Head of Growth", "SDR Lead", "COO"][seedInt(seed + "t", 0, 4)],
      opens: seedInt(seed + "o", 0, 6),
      replies: seedInt(seed + "r", 0, 2),
      clicks: seedInt(seed + "c", 0, 3),
    }
  })
  return { lists, leads, listCount, leadCount: leads.length }
}

export function demoEnrichment(id: string): EnrichmentData {
  const enriched = seedInt(id + "en", 1, 3)
  const rows: EnrichmentRow[] = Array.from({ length: enriched }, (_, i) => ({
    id: `demo-enr-${id}-${i}`,
    listName: `${maskCompany(`${id}-list-${i}`)} list`,
    status: "completed",
    createdAt: isoDaysAgo(i * 4 + 2, i),
    count: seedInt(`${id}-enr-${i}`, 120, 1400),
  }))
  return { rows, total: rows.length, enrichedLists: enriched }
}

// ---- agency-wide ----
export function demoClients(): ClientsResult {
  return { mode: "agency", clients: DEMO_CLIENT_IDS.map((id) => ({ id, name: clientName(id), status: "accepted" })) }
}

export function demoOverview(): OverviewData {
  const rows: RosterRow[] = DEMO_CLIENT_IDS.map((id) => {
    const sn = demoSenders(id)
    const cp = demoCampaigns(id)
    const unread = demoCountReplies(id)
    const severity: Severity = sn.flagged >= 2 ? "critical" : sn.flagged === 1 ? "watch" : "ok"
    return {
      id,
      name: clientName(id),
      sendersOk: sn.active,
      sendersTotal: sn.total,
      flagged: sn.flagged,
      campaigns: cp.total,
      replyRate: cp.avgReplyRate,
      replies: unread,
      severity,
      note: sn.flagged > 0 ? `${sn.flagged} sender${sn.flagged > 1 ? "s" : ""} flagged` : unread > 10 ? `${unread} replies waiting` : "All systems normal",
    }
  })
  const rank: Record<Severity, number> = { critical: 0, watch: 1, ok: 2 }
  rows.sort((a, b) => rank[a.severity] - rank[b.severity])
  const rates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  return {
    mode: "agency",
    rows,
    stats: {
      clients: rows.length,
      campaigns: rows.reduce((s, r) => s + (r.campaigns ?? 0), 0),
      avgReplyRate: rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : null,
      flaggedSenders: rows.reduce((s, r) => s + r.flagged, 0),
      repliesWaiting: rows.reduce((s, r) => s + (r.replies ?? 0), 0),
    },
  }
}

export function demoAllInbox(): AgencyInbox {
  const rows: AgencyReply[] = []
  let unread = 0
  for (const id of DEMO_CLIENT_IDS) {
    const r = demoReplies(id)
    unread += r.unread
    for (const row of r.rows) rows.push({ ...row, clientId: id, clientName: clientName(id) })
  }
  rows.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
  return { rows: rows.slice(0, 100), unread, clients: DEMO_CLIENT_IDS.length }
}

export function demoAllCampaigns(): AgencyCampaigns {
  const rows: AgencyCampaign[] = []
  for (const id of DEMO_CLIENT_IDS) for (const row of demoCampaignRows(id)) rows.push({ ...row, clientId: id, clientName: clientName(id) })
  rows.sort((a, b) => b.sent - a.sent)
  const rates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    active: rows.filter((r) => r.status === 1).length,
    sent: rows.reduce((s, r) => s + r.sent, 0),
    replies: rows.reduce((s, r) => s + r.replies, 0),
    avgReplyRate: rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : null,
    clients: DEMO_CLIENT_IDS.length,
  }
}

export function demoAllDeliverability(): AgencyDeliverabilityData {
  const rows: AgencyDeliverability[] = []
  for (const id of DEMO_CLIENT_IDS) for (const row of demoDeliverability(id).rows) rows.push({ ...row, clientId: id, clientName: clientName(id) })
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
  const inbox = rows.map((r) => r.inboxPercent).filter((v): v is number => v != null)
  return { rows, total: rows.length, avgInboxPercent: inbox.length ? round(inbox.reduce((a, b) => a + b, 0) / inbox.length) : null, clients: DEMO_CLIENT_IDS.length }
}

export function demoAllAnalytics(): AgencyAnalytics {
  const per = DEMO_CLIENT_IDS.map((id) => demoAnalytics(id))
  const sum = (f: (a: AnalyticsData) => number) => per.reduce((s, a) => s + f(a), 0)
  const byDate = new Map<string, DailyPoint>()
  for (const a of per)
    for (const p of a.daily) {
      const cur = byDate.get(p.date) ?? { date: p.date, sent: 0, opened: 0, replies: 0, opportunities: 0 }
      cur.sent += p.sent; cur.opened += p.opened; cur.replies += p.replies; cur.opportunities += p.opportunities
      byDate.set(p.date, cur)
    }
  const sent = sum((a) => a.sent)
  return {
    hasData: true,
    sent,
    contacted: sum((a) => a.contacted),
    opens: sum((a) => a.opens),
    replies: sum((a) => a.replies),
    opportunities: sum((a) => a.opportunities),
    opportunityValue: sum((a) => a.opportunityValue),
    interested: sum((a) => a.interested),
    meetingsBooked: sum((a) => a.meetingsBooked),
    closed: sum((a) => a.closed),
    openRate: sent ? sum((a) => a.opens) / sent : null,
    replyRate: sent ? sum((a) => a.replies) / sent : null,
    oppRate: null,
    daily: [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)),
    clients: DEMO_CLIENT_IDS.length,
  }
}

export function demoAllLeads(): AgencyLeads {
  const lists: AgencyLeadList[] = []
  const leads: AgencyLead[] = []
  for (const id of DEMO_CLIENT_IDS) {
    const d = demoLeads(id)
    for (const l of d.lists) lists.push({ ...l, clientId: id, clientName: clientName(id) })
    for (const ld of d.leads) leads.push({ ...ld, clientId: id, clientName: clientName(id) })
  }
  return { lists, leads, listCount: lists.length, leadCount: leads.length, clients: DEMO_CLIENT_IDS.length }
}

export function demoAllEnrichment(): AgencyEnrichment {
  const rows: AgencyEnrichmentRow[] = []
  let enrichedLists = 0
  for (const id of DEMO_CLIENT_IDS) {
    const d = demoEnrichment(id)
    enrichedLists += d.enrichedLists
    for (const row of d.rows) rows.push({ ...row, clientId: id, clientName: clientName(id) })
  }
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
  return { rows, total: rows.length, enrichedLists, clients: DEMO_CLIENT_IDS.length }
}
