import { allAnalytics, allCampaigns } from "@instantly-ai/ops"
import { getBrand } from "@/config/brand"
import { ReportActions } from "@/components/ReportActions"
import { toCsv } from "@/lib/csv"

export const dynamic = "force-dynamic"

const pct = (v: number | null) => (v == null ? "—" : `${(v * 100).toFixed(1)}%`)
const num = (v: number) => v.toLocaleString("en-US")
const usd = (v: number) => `$${v.toLocaleString("en-US")}`

export default async function ReportPage() {
  const brand = getBrand()
  const [analytics, campaigns] = await Promise.all([allAnalytics().catch(() => null), allCampaigns().catch(() => null)])
  const generated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  // Per-client rollup from the campaign fan-out.
  const byClient = new Map<string, { name: string; campaigns: number; sent: number; replies: number }>()
  for (const r of campaigns?.rows ?? []) {
    const cur = byClient.get(r.clientId) ?? { name: r.clientName, campaigns: 0, sent: 0, replies: 0 }
    cur.campaigns++
    cur.sent += r.sent
    cur.replies += r.replies
    byClient.set(r.clientId, cur)
  }
  const clientRows = [...byClient.values()].sort((a, b) => b.sent - a.sent)
  const rr = (sent: number, replies: number) => (sent > 0 ? replies / sent : null)

  const csv = toCsv(
    ["Client", "Campaigns", "Sent", "Replies", "Reply rate"],
    clientRows.map((c) => [c.name, c.campaigns, c.sent, c.replies, pct(rr(c.sent, c.replies))]),
  )

  const th: React.CSSProperties = { textAlign: "left", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 500, padding: "10px 12px", borderBottom: "1px solid var(--border)" }
  const td: React.CSSProperties = { fontSize: 13.5, color: "var(--ink)", padding: "11px 12px", borderBottom: "1px solid var(--border)" }
  const kpi = (label: string, value: string) => (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", background: "var(--surface)" }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 500, color: "var(--ink)", marginTop: 6, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  )

  return (
    <div className="report-doc" style={{ maxWidth: 820, margin: "0 auto" }}>
        <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 20 }}>
          <ReportActions filename={`${brand.name.replace(/\s+/g, "-").toLowerCase()}-report.csv`} csv={csv} />
        </div>

        <header style={{ borderBottom: "2px solid var(--ink)", paddingBottom: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500 }}>{brand.initials}</div>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{brand.name}</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: "var(--ink)", margin: "14px 0 0" }}>Outbound performance report</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--muted)" }}>
            {analytics ? `${analytics.clients} client workspace${analytics.clients === 1 ? "" : "s"}` : ""} · generated {generated}
          </p>
        </header>

        {analytics && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 28 }}>
            {kpi("Emails sent", num(analytics.sent))}
            {kpi("Reply rate", pct(analytics.replyRate))}
            {kpi("Opportunities", num(analytics.opportunities))}
            {kpi("Pipeline value", usd(analytics.opportunityValue))}
            {kpi("Meetings booked", num(analytics.meetingsBooked))}
          </div>
        )}

        <h2 style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", margin: "0 0 10px" }}>By client</h2>
        {clientRows.length === 0 ? (
          <p style={{ fontSize: 13.5, color: "var(--muted)" }}>No campaign activity in the reporting period.</p>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 10 }}>
            <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Client</th>
                  <th style={{ ...th, textAlign: "right" }}>Campaigns</th>
                  <th style={{ ...th, textAlign: "right" }}>Sent</th>
                  <th style={{ ...th, textAlign: "right" }}>Replies</th>
                  <th style={{ ...th, textAlign: "right" }}>Reply rate</th>
                </tr>
              </thead>
              <tbody>
                {clientRows.map((c, i) => (
                  <tr key={i}>
                    <td style={{ ...td, fontWeight: 500 }}>{c.name}</td>
                    <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{num(c.campaigns)}</td>
                    <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{num(c.sent)}</td>
                    <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{num(c.replies)}</td>
                    <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{pct(rr(c.sent, c.replies))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="no-print" style={{ marginTop: 24, fontSize: 12, color: "var(--faint)" }}>
          allCampaignAnalytics · getCampaignAnalyticsOverview · fan-out. Print → Save as PDF for a shareable client report.
        </p>
      </div>
  )
}
