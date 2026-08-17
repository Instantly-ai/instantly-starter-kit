import { getCampaignAnalyticsOverview, getDailyCampaignAnalytics } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { useFixtures } from "./demo.js"
import { demoAnalytics } from "./demo-data.js"

export interface DailyPoint {
  date: string
  sent: number
  opened: number
  replies: number
  opportunities: number
}

export interface AnalyticsData {
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
  openRate: number | null // opens / sent
  replyRate: number | null // replies / sent
  oppRate: number | null // opportunities / contacted
  daily: DailyPoint[] // ascending by date, last 30 days
}

interface RawOverview {
  emails_sent_count?: number
  contacted_count?: number
  open_count?: number
  reply_count?: number
  total_opportunities?: number
  total_opportunity_value?: number
  total_interested?: number
  total_meeting_booked?: number
  total_closed?: number
}
interface RawDaily {
  date?: string
  sent?: number
  opened?: number
  replies?: number
  opportunities?: number
}

const n = (v: number | undefined) => (typeof v === "number" ? v : 0)

/** Workspace-wide campaign analytics: headline totals (overview) plus a daily
 * time series for the trend chart. Both reads degrade independently. */
export async function analyticsFor(id: string, cfg?: OpsConfig): Promise<AnalyticsData> {
  if (useFixtures()) return demoAnalytics(id)
  const c = await clientFor(id, cfg)
  const [ovRaw, dailyRaw] = await Promise.all([
    getCampaignAnalyticsOverview(c, { query: {} }).catch(() => ({}) as RawOverview),
    getDailyCampaignAnalytics(c, { query: {} }).catch(() => [] as RawDaily[]),
  ])
  const ov = (ovRaw ?? {}) as RawOverview

  const daily: DailyPoint[] = (Array.isArray(dailyRaw) ? (dailyRaw as RawDaily[]) : [])
    .map((d) => ({ date: d.date ?? "", sent: n(d.sent), opened: n(d.opened), replies: n(d.replies), opportunities: n(d.opportunities) }))
    .filter((d) => d.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30)

  const sent = n(ov.emails_sent_count)
  const contacted = n(ov.contacted_count)
  const opens = n(ov.open_count)
  const replies = n(ov.reply_count)
  const opportunities = n(ov.total_opportunities)

  return {
    hasData: sent > 0 || daily.length > 0,
    sent,
    contacted,
    opens,
    replies,
    opportunities,
    opportunityValue: n(ov.total_opportunity_value),
    interested: n(ov.total_interested),
    meetingsBooked: n(ov.total_meeting_booked),
    closed: n(ov.total_closed),
    openRate: sent > 0 ? opens / sent : null,
    replyRate: sent > 0 ? replies / sent : null,
    oppRate: contacted > 0 ? opportunities / contacted : null,
    daily,
  }
}
