import Link from "next/link"
import { allAnalytics } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { Chart } from "@/components/Chart"
import { Legend } from "@/components/Legend"
import { EmptyState } from "@/components/EmptyState"

export const dynamic = "force-dynamic"

const pct = (v: number | null) => (v == null ? "—" : `${(v * 100).toFixed(1)}%`)
const num = (v: number) => v.toLocaleString("en-US")
const usd = (v: number) => `$${v.toLocaleString("en-US")}`

const COLORS = { sent: "#006bff", opens: "#ffc107", replies: "#2eca8b", opps: "#8b5cf6" }

function tickLabels(dates: string[], count = 6): string[] {
  if (dates.length <= count) return dates.map(fmt)
  const step = (dates.length - 1) / (count - 1)
  return Array.from({ length: count }, (_, i) => fmt(dates[Math.round(i * step)]))
}
function fmt(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
}

export default async function AnalyticsPage() {
  const data = await allAnalytics().catch(() => null)

  const series = data
    ? [
        { label: "Sent", color: COLORS.sent, data: data.daily.map((d) => d.sent) },
        { label: "Opens", color: COLORS.opens, data: data.daily.map((d) => d.opened) },
        { label: "Replies", color: COLORS.replies, data: data.daily.map((d) => d.replies) },
        { label: "Opps", color: COLORS.opps, data: data.daily.map((d) => d.opportunities) },
      ]
    : []

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Analytics</h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>
            {data ? `Combined across ${data.clients} client${data.clients === 1 ? "" : "s"}` : "Aggregate performance"}
          </p>
        </div>
        <Link href="/report" style={{ fontSize: 13, fontWeight: 500, color: "var(--brand)", textDecoration: "none", whiteSpace: "nowrap", padding: "8px 12px", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-btn)" }}>
          Client report ↗
        </Link>
      </div>

      {!data || !data.hasData ? (
        <Panel title="Analytics" caption="getCampaignAnalyticsOverview · fan-out">
          <EmptyState title="No activity yet" subtitle={data ? "Once campaigns start sending, aggregate performance trends here." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
        </Panel>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
            <StatTile label="Emails sent" value={num(data.sent)} />
            <StatTile label="Open rate" value={pct(data.openRate)} />
            <StatTile label="Reply rate" value={pct(data.replyRate)} />
            <StatTile label="Opportunities" value={num(data.opportunities)} />
            <StatTile label="Pipeline value" value={usd(data.opportunityValue)} />
          </div>

          <Panel
            title="Activity"
            caption="getDailyCampaignAnalytics · fan-out"
            actions={<Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />}
          >
            {data.daily.length > 1 ? (
              <Chart series={series} days={tickLabels(data.daily.map((d) => d.date))} areaFor="Sent" gradientId="agencyAnalyticsFill" />
            ) : (
              <div style={{ padding: "20px 0", color: "var(--faint)", fontSize: 13 }}>Not enough daily data points to plot a trend yet.</div>
            )}
          </Panel>

          <Panel title="Pipeline" caption="getCampaignAnalyticsOverview · fan-out" bodyPadding>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14 }}>
              <StatTile label="Contacted" value={num(data.contacted)} />
              <StatTile label="Interested" value={num(data.interested)} />
              <StatTile label="Meetings booked" value={num(data.meetingsBooked)} />
              <StatTile label="Closed" value={num(data.closed)} valueColor={data.closed > 0 ? "var(--success)" : undefined} />
            </div>
          </Panel>
        </div>
      )}
    </>
  )
}
