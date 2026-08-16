import { getCampaignAnalytics, activateCampaign, pauseCampaign, getCampaign, getCampaignSendingStatus, getCampaignStepsAnalytics, getDailyCampaignAnalytics } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import type { Tone } from "./types.js"
import type { DailyPoint } from "./analytics.js"
import { isDemo, maskCampaignName, useFixtures } from "./demo.js"
import { demoCampaigns, demoCampaignDetail } from "./demo-data.js"

// Campaign status codes → label + pill tone, verbatim from the API's
// x-enumDescriptions (see activate-campaign): 0 Draft / 1 Active / 2 Paused /
// 3 Completed / 4 Running Subsequences / -99 Account Suspended /
// -1 Accounts Unhealthy / -2 Bounce Protect.
const STATUS: Record<number, { label: string; tone: Tone }> = {
  0: { label: "Draft", tone: "neutral" },
  1: { label: "Active", tone: "ok" },
  2: { label: "Paused", tone: "warn" },
  3: { label: "Completed", tone: "info" },
  4: { label: "Subsequences", tone: "ok" },
  [-99]: { label: "Account suspended", tone: "danger" },
  [-1]: { label: "Accounts unhealthy", tone: "danger" },
  [-2]: { label: "Bounce protect", tone: "danger" },
}

export interface CampaignRow {
  id: string
  name: string
  status: number
  statusLabel: string
  statusTone: Tone
  leads: number
  sent: number
  opens: number
  replies: number
  opportunities: number
  replyRate: number | null // fraction 0..1 (replies / sent)
  openRate: number | null // fraction 0..1 (opens / sent)
  canActivate: boolean // Draft or Paused → the create-inactive → activate step
  canPause: boolean // Active or Running Subsequences
}

export interface CampaignsData {
  rows: CampaignRow[]
  total: number
  active: number
  sent: number
  replies: number
  avgReplyRate: number | null
}

interface RawAnalytics {
  campaign_id?: string
  campaign_name?: string
  campaign_status?: number
  leads_count?: number
  emails_sent_count?: number
  open_count?: number
  reply_count?: number
  total_opportunities?: number
}

function mapRow(raw: unknown): CampaignRow {
  const a = (raw ?? {}) as RawAnalytics
  const status = typeof a.campaign_status === "number" ? a.campaign_status : 0
  const s = STATUS[status] ?? { label: `Status ${status}`, tone: "neutral" as Tone }
  const sent = a.emails_sent_count ?? 0
  const replies = a.reply_count ?? 0
  const opens = a.open_count ?? 0
  const id = a.campaign_id ?? ""
  return {
    id,
    name: isDemo() ? maskCampaignName(id) : a.campaign_name ?? "Untitled campaign",
    status,
    statusLabel: s.label,
    statusTone: s.tone,
    leads: a.leads_count ?? 0,
    sent,
    opens,
    replies,
    opportunities: a.total_opportunities ?? 0,
    replyRate: sent > 0 ? replies / sent : null,
    openRate: sent > 0 ? opens / sent : null,
    canActivate: status === 0 || status === 2,
    canPause: status === 1 || status === 4,
  }
}

/** All campaigns for one client with their headline analytics, in one call
 * (`getCampaignAnalytics` with no id returns every campaign). Self-contained by id. */
export async function listCampaigns(id: string, cfg?: OpsConfig): Promise<CampaignsData> {
  if (useFixtures()) return demoCampaigns(id)
  const c = await clientFor(id, cfg)
  const raw = await getCampaignAnalytics(c, { query: {} })
  const arr = Array.isArray(raw) ? raw : []
  const rows = arr.map(mapRow).sort((x, y) => y.sent - x.sent)

  const rates = rows.map((r) => r.replyRate).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    active: rows.filter((r) => r.status === 1 || r.status === 4).length,
    sent: rows.reduce((s, r) => s + r.sent, 0),
    replies: rows.reduce((s, r) => s + r.replies, 0),
    avgReplyRate: rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : null,
  }
}

/** Activate (start / resume) a campaign — the explicit, confirm-gated step after
 * create-inactive. Sending only begins here. Async: the API queues a background job. */
export async function activateCampaignFor(clientId: string, campaignId: string, cfg?: OpsConfig): Promise<void> {
  if (useFixtures()) return // demo: no-op, the UI still shows the confirm→done flow
  const c = await clientFor(clientId, cfg)
  await activateCampaign(c, { path: { id: campaignId } })
}

/** Pause an active campaign. */
export async function pauseCampaignFor(clientId: string, campaignId: string, cfg?: OpsConfig): Promise<void> {
  if (useFixtures()) return // demo: no-op
  const c = await clientFor(clientId, cfg)
  await pauseCampaign(c, { path: { id: campaignId } })
}

// Campaign sending diagnostics → label + tone (grounded in getCampaignSendingStatus's
// diagnostics.status enum). Tells you WHY a campaign is or isn't sending.
const SENDING: Record<string, { label: string; tone: Tone }> = {
  healthy: { label: "Healthy — sending", tone: "ok" },
  campaign_paused: { label: "Paused", tone: "neutral" },
  campaign_draft: { label: "Draft — not started", tone: "neutral" },
  campaign_completed: { label: "Completed", tone: "info" },
  campaign_running_subsequences: { label: "Running subsequences", tone: "ok" },
  campaign_bounce_protect: { label: "Bounce protect", tone: "danger" },
  campaign_accounts_unhealthy: { label: "Accounts unhealthy", tone: "danger" },
  campaign_account_suspended: { label: "Account suspended", tone: "danger" },
  out_of_schedule: { label: "Outside sending schedule", tone: "warn" },
  waiting_for_leads: { label: "Waiting for leads", tone: "warn" },
  daily_limit_met: { label: "Daily limit met", tone: "warn" },
  account_daily_limit_met: { label: "Account daily limit met", tone: "warn" },
  new_lead_limit_met: { label: "New-lead limit met", tone: "warn" },
  all_accounts_unhealthy: { label: "All senders unhealthy", tone: "danger" },
  waiting_for_esp_match: { label: "Waiting for ESP match", tone: "warn" },
  domain_limit_reached: { label: "Domain limit reached", tone: "warn" },
  follow_up_delay_not_met: { label: "Follow-up delay not met", tone: "neutral" },
  no_accounts_available: { label: "No senders available", tone: "danger" },
}

export interface StepRow {
  step: string
  variant: string | null
  sent: number
  opened: number
  replies: number
  clicks: number
  replyRate: number | null
}

export interface CampaignDetailData {
  id: string
  name: string
  status: number
  statusLabel: string
  statusTone: Tone
  canActivate: boolean
  canPause: boolean
  sending: { status: string; label: string; tone: Tone } | null
  kpis: { sent: number; contacted: number; opens: number; replies: number; opportunities: number; opportunityValue: number; openRate: number | null; replyRate: number | null }
  steps: StepRow[]
  daily: DailyPoint[]
}

const nn = (v: unknown) => (typeof v === "number" ? v : 0)

/** One campaign, deep: detail + sending diagnostics + funnel + per-step performance
 * + daily trend. Each read degrades independently; returns null if the campaign
 * can't be fetched (bad id / foreign workspace). */
export async function campaignDetail(clientId: string, campaignId: string, cfg?: OpsConfig): Promise<CampaignDetailData | null> {
  if (useFixtures()) return demoCampaignDetail(campaignId)
  const c = await clientFor(clientId, cfg)

  let camp: { name?: string; status?: number }
  try {
    camp = (await getCampaign(c, { path: { id: campaignId } })) as { name?: string; status?: number }
  } catch {
    return null
  }

  const [sendingRaw, analyticsRaw, stepsRaw, dailyRaw] = await Promise.all([
    getCampaignSendingStatus(c, { path: { id: campaignId } }).catch(() => null),
    getCampaignAnalytics(c, { query: { id: campaignId } }).catch(() => [] as unknown[]),
    getCampaignStepsAnalytics(c, { query: { campaign_id: campaignId } }).catch(() => [] as unknown[]),
    getDailyCampaignAnalytics(c, { query: { campaign_id: campaignId } }).catch(() => [] as unknown[]),
  ])

  const status = typeof camp.status === "number" ? camp.status : 0
  const s = STATUS[status] ?? { label: `Status ${status}`, tone: "neutral" as Tone }

  // sending diagnostics
  const diagStatus = (sendingRaw as { diagnostics?: { status?: string | null } } | null)?.diagnostics?.status ?? null
  const sending = diagStatus ? { status: diagStatus, ...(SENDING[diagStatus] ?? { label: diagStatus, tone: "neutral" as Tone }) } : null

  // funnel (single-campaign analytics returns a one-item array)
  const a = ((Array.isArray(analyticsRaw) ? analyticsRaw[0] : analyticsRaw) ?? {}) as Record<string, unknown>
  const sent = nn(a.emails_sent_count)
  const opens = nn(a.open_count)
  const replies = nn(a.reply_count)
  const kpis = {
    sent,
    contacted: nn(a.contacted_count),
    opens,
    replies,
    opportunities: nn(a.total_opportunities),
    opportunityValue: nn(a.total_opportunity_value),
    openRate: sent > 0 ? opens / sent : null,
    replyRate: sent > 0 ? replies / sent : null,
  }

  // per-step + variant performance. The API returns step/variant as numeric-ish
  // strings ("1","2",…) plus aggregate rows with a null/"null" step — drop those
  // (their totals already live in the KPI strip), label the rest "Step N", and only
  // surface a variant pill for real A/B variants (variant "0" = the default).
  const steps: StepRow[] = (Array.isArray(stepsRaw) ? (stepsRaw as Record<string, unknown>[]) : [])
    .map((st) => {
      const rawStep = st.step == null ? "" : String(st.step).trim()
      const rawVariant = st.variant == null ? "" : String(st.variant).trim()
      const stSent = nn(st.sent)
      const stReplies = nn(st.replies)
      return {
        rawStep,
        step: `Step ${rawStep}`,
        variant: rawVariant && rawVariant !== "0" ? rawVariant : null,
        sent: stSent,
        opened: nn(st.opened),
        replies: stReplies,
        clicks: nn(st.clicks),
        replyRate: stSent > 0 ? stReplies / stSent : null,
      }
    })
    .filter((s) => s.rawStep && s.rawStep.toLowerCase() !== "null")
    .sort((a, b) => (parseInt(a.rawStep, 10) || 0) - (parseInt(b.rawStep, 10) || 0))
    .map(({ rawStep, ...s }) => s) // drop the helper field

  const daily: DailyPoint[] = (Array.isArray(dailyRaw) ? (dailyRaw as Record<string, unknown>[]) : [])
    .map((d) => ({ date: (d.date as string) || "", sent: nn(d.sent), opened: nn(d.opened), replies: nn(d.replies), opportunities: nn(d.opportunities) }))
    .filter((d) => d.date)
    .sort((x, y) => x.date.localeCompare(y.date))
    .slice(-30)

  return {
    id: campaignId,
    name: isDemo() ? maskCampaignName(campaignId) : camp.name || "Untitled campaign",
    status,
    statusLabel: s.label,
    statusTone: s.tone,
    canActivate: status === 0 || status === 2,
    canPause: status === 1 || status === 4,
    sending,
    kpis,
    steps,
    daily,
  }
}
