import { analyticsFor } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Chart } from "@/components/Chart"
import { Legend } from "@/components/Legend"
import { EmptyState } from "@/components/EmptyState"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const num = (v: number) => v.toLocaleString("en-US")
const usd = (v: number) => `$${v.toLocaleString("en-US")}`

// Series colors — the design's data-viz palette (reused from the Overview chart).
const COLORS = { sent: "#0080ff", opens: "#ffc107", replies: "#2eca8b", opps: "#8b5cf6" }

function tickLabels(dates: string[], count = 6): string[] {
  if (dates.length <= count) return dates.map(fmt)
  const step = (dates.length - 1) / (count - 1)
  return Array.from({ length: count }, (_, i) => fmt(dates[Math.round(i * step)]))
}
function fmt(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
}

export async function Analytics({ id }: { id: string }) {
  let data
  try {
    data = await analyticsFor(id)
  } catch {
    return (
      <Panel title="Analytics" caption="getCampaignAnalyticsOverview">
        <EmptyState title="Couldn't load analytics" subtitle="The analytics read failed for this workspace. Check the API key's campaigns scope." />
      </Panel>
    )
  }

  if (!data.hasData) {
    return (
      <Panel title="Analytics" caption="getCampaignAnalyticsOverview · daily">
        <EmptyState title="No activity yet" subtitle="Once campaigns start sending, sends, opens, replies and opportunities trend here." />
      </Panel>
    )
  }

  const series = [
    { label: "Sent", color: COLORS.sent, data: data.daily.map((d) => d.sent) },
    { label: "Opens", color: COLORS.opens, data: data.daily.map((d) => d.opened) },
    { label: "Replies", color: COLORS.replies, data: data.daily.map((d) => d.replies) },
    { label: "Opps", color: COLORS.opps, data: data.daily.map((d) => d.opportunities) },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <StatTile label="Emails sent" value={num(data.sent)} />
        <StatTile label="Open rate" value={pct(data.openRate)} />
        <StatTile label="Reply rate" value={pct(data.replyRate)} />
        <StatTile label="Opportunities" value={num(data.opportunities)} />
        <StatTile label="Pipeline value" value={usd(data.opportunityValue)} />
      </div>

      <Panel
        title="Activity"
        caption="getDailyCampaignAnalytics"
        actions={<Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />}
      >
        {data.daily.length > 1 ? (
          <Chart series={series} days={tickLabels(data.daily.map((d) => d.date))} areaFor="Sent" gradientId="analyticsFill" />
        ) : (
          <div style={{ padding: "20px 0", color: "var(--faint)", fontSize: 13 }}>Not enough daily data points to plot a trend yet.</div>
        )}
      </Panel>

      <Panel title="Pipeline" caption="getCampaignAnalyticsOverview" bodyPadding>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
          <StatTile label="Contacted" value={num(data.contacted)} />
          <StatTile label="Interested" value={num(data.interested)} />
          <StatTile label="Meetings booked" value={num(data.meetingsBooked)} />
          <StatTile label="Closed" value={num(data.closed)} valueColor={data.closed > 0 ? "var(--success)" : undefined} />
        </div>
      </Panel>
    </div>
  )
}
