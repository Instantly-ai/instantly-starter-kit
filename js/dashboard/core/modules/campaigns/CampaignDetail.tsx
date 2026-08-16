import Link from "next/link"
import { campaignDetail, type StepRow, type CampaignRow } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Pill } from "@/components/Pill"
import { Chart } from "@/components/Chart"
import { Legend } from "@/components/Legend"
import { DataTable, type Column } from "@/components/DataTable"
import { EmptyState } from "@/components/EmptyState"
import { CampaignRowActions } from "./CampaignRowActions"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const num = (v: number) => v.toLocaleString("en-US")
const usd = (v: number) => `$${v.toLocaleString("en-US")}`
const COLORS = { sent: "#0080ff", opens: "#ffc107", replies: "#2eca8b" }

function tickLabels(dates: string[], count = 6): string[] {
  if (dates.length <= count) return dates.map(fmt)
  const step = (dates.length - 1) / (count - 1)
  return Array.from({ length: count }, (_, i) => fmt(dates[Math.round(i * step)]))
}
function fmt(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
}

const stepCols: Column<StepRow>[] = [
  {
    key: "step",
    header: "Step",
    render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.step}</span>
        {r.variant && <Pill tone="neutral">Variant {r.variant}</Pill>}
      </span>
    ),
  },
  { key: "sent", header: "Sent", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.sent)}</span> },
  { key: "opened", header: "Opened", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.opened)}</span> },
  { key: "replies", header: "Replies", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.replies)}</span> },
  { key: "rr", header: "Reply rate", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink)", fontWeight: 500 }}>{pct(r.replyRate)}</span> },
  { key: "clicks", header: "Clicks", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.clicks)}</span> },
]

export async function CampaignDetail({ clientId, campaignId, backHref = "/campaigns" }: { clientId: string; campaignId: string; backHref?: string }) {
  const data = await campaignDetail(clientId, campaignId)

  const back = (
    <Link href={backHref} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
      ‹ Back to campaigns
    </Link>
  )

  if (!data) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {back}
        <Panel title="Campaign">
          <EmptyState title="Campaign not found" subtitle="It may have been deleted or belongs to another workspace." />
        </Panel>
      </div>
    )
  }

  // Reuse the confirm-gated activate/pause control (it reads id + can* flags).
  const row: CampaignRow = {
    id: data.id, name: data.name, status: data.status, statusLabel: data.statusLabel, statusTone: data.statusTone,
    leads: 0, sent: data.kpis.sent, opens: data.kpis.opens, replies: data.kpis.replies, opportunities: data.kpis.opportunities,
    replyRate: data.kpis.replyRate, openRate: data.kpis.openRate, canActivate: data.canActivate, canPause: data.canPause,
  }

  const series = [
    { label: "Sent", color: COLORS.sent, data: data.daily.map((d) => d.sent) },
    { label: "Opens", color: COLORS.opens, data: data.daily.map((d) => d.opened) },
    { label: "Replies", color: COLORS.replies, data: data.daily.map((d) => d.replies) },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {back}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 500, color: "var(--ink)", margin: 0 }}>{data.name}</h1>
          <div style={{ marginTop: 6 }}>
            <Pill tone={data.statusTone} dot>{data.statusLabel}</Pill>
          </div>
        </div>
        <CampaignRowActions clientId={clientId} row={row} />
      </div>

      {/* Sending diagnostics — the why-it's-(not)-sending signal */}
      {data.sending && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", background: "var(--surface)" }}>
          <Pill tone={data.sending.tone} dot>{data.sending.label}</Pill>
          <span style={{ fontSize: 12.5, color: "var(--faint)" }}>getCampaignSendingStatus · diagnostics</span>
        </div>
      )}

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
        <StatTile label="Emails sent" value={num(data.kpis.sent)} />
        <StatTile label="Open rate" value={pct(data.kpis.openRate)} />
        <StatTile label="Reply rate" value={pct(data.kpis.replyRate)} />
        <StatTile label="Opportunities" value={num(data.kpis.opportunities)} />
        <StatTile label="Pipeline" value={usd(data.kpis.opportunityValue)} />
      </div>

      {/* Sequence step performance */}
      <Panel title="Sequence step performance" caption="getCampaignStepsAnalytics" bodyPadding={false}>
        {data.steps.length === 0 ? (
          <EmptyState title="No step data yet" subtitle="Step performance appears once the sequence has sent." />
        ) : (
          <DataTable columns={stepCols} rows={data.steps} getKey={(r, i) => `${r.step}:${r.variant ?? ""}:${i}`} minWidth={680} />
        )}
      </Panel>

      {/* Daily trend */}
      <Panel title="Activity" caption="getDailyCampaignAnalytics" actions={<Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />}>
        {data.daily.length > 1 ? (
          <Chart series={series} days={tickLabels(data.daily.map((d) => d.date))} areaFor="Sent" gradientId="campaignFill" />
        ) : (
          <div style={{ padding: "20px 0", color: "var(--faint)", fontSize: 13 }}>Not enough daily data to plot a trend yet.</div>
        )}
      </Panel>

      {/* Starter-kit teaching: the SDK calls this page is built from. */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>Built with the SDK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["getCampaign", "getCampaignSendingStatus", "getCampaignAnalytics", "getCampaignStepsAnalytics", "getDailyCampaignAnalytics", "activateCampaign", "pauseCampaign"].map((op) => (
            <code key={op} style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--body)", background: "var(--neutral-pill)", borderRadius: 6, padding: "3px 8px" }}>
              {op}
            </code>
          ))}
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "var(--muted)" }}>
          One ops function (<code style={{ fontFamily: "ui-monospace, monospace" }}>campaignDetail()</code>) fans these out; the panels above each show the call that powers them. Copy the pattern to build your own drill-down.
        </p>
      </div>
    </div>
  )
}
