"use client"

import { Pill } from "@/components/Pill"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { ApiCaption } from "@/components/ApiCaption"
import { HealthBar } from "@/components/HealthBar"
import { Skeleton } from "@/components/Skeleton"
import { EmptyState } from "@/components/EmptyState"
import { ConfirmAction } from "@/components/ConfirmAction"
import { DataTable } from "@/components/DataTable"
import { Chart } from "@/components/Chart"
import { Legend } from "@/components/Legend"

export function KitGallery() {
  const mock = () => new Promise((r) => setTimeout(r, 900))
  const roster = [
    { name: "Northwind Labs", ok: 9, total: 12, reply: "2.1%", deliv: "At risk" },
    { name: "Cedar & Co", ok: 8, total: 8, reply: "5.4%", deliv: "Healthy" },
    { name: "Marlowe Group", ok: 14, total: 14, reply: "3.9%", deliv: "Healthy" },
  ]
  const campaigns = [
    { name: "Tech+AI · T1 · ANZ", status: "Active", sent: "12,480", reply: "2.4%" },
    { name: "Series-B SaaS · Ops", status: "Active", sent: "8,120", reply: "3.1%" },
    { name: "Fintech founders · T2", status: "Draft", sent: "—", reply: "—" },
  ]
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--brand)", fontWeight: 500 }}>Component kit</div>
        <h1 style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500, color: "var(--ink)", letterSpacing: "-.01em" }}>The building blocks</h1>
        <p style={{ margin: "8px 0 0", color: "var(--muted)", maxWidth: 620, lineHeight: 1.55 }}>
          Every screen is composed from these. They&apos;re shown with mock data here — import from <code style={{ fontFamily: "ui-monospace, monospace", color: "var(--ink)" }}>@/components</code> and pass real data. New modules are mostly wiring, not styling.
        </p>
      </div>
      <div style={{ marginBottom: 26, padding: "11px 14px", border: "1px solid var(--border)", background: "var(--brand-soft)", borderRadius: "var(--radius-card)", fontSize: 13.5, color: "var(--body)" }}>
        Each block below is labelled with its component name — import it from <code style={{ fontFamily: "ui-monospace, monospace" }}>@/components/&lt;Name&gt;</code>. See the <a href="/learn#kit" style={{ color: "var(--brand)", fontWeight: 500, textDecoration: "none" }}>Component kit</a> docs for a usage example, or copy <code style={{ fontFamily: "ui-monospace, monospace" }}>modules/health/SenderHealth.tsx</code> to see them composed.
      </div>

      <Section label="Pill">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill tone="active">Active</Pill>
          <Pill tone="ok" dot>Healthy</Pill>
          <Pill tone="warn">Watch</Pill>
          <Pill tone="danger" dot>At risk</Pill>
          <Pill tone="info">Question</Pill>
          <Pill tone="draft">Draft</Pill>
          <Pill tone="neutral">Paused</Pill>
        </div>
      </Section>

      <Section label="StatTile">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
          <StatTile label="Clients" value="7" sub="workspaces" />
          <StatTile label="Avg reply rate" value="4.4%" sub="14-day" />
          <StatTile label="Senders flagged" value="5" sub="need action" valueColor="var(--danger)" />
          <StatTile label="Replies waiting" value="94" sub="unread" valueColor="var(--brand)" />
        </div>
      </Section>

      <Section label="Panel + ApiCaption">
        <Panel title="Sender health" caption="listAccount · status + warmup_status" actions={<Pill tone="warn">2 flagged of 16</Pill>}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <HealthBar ok={14} total={16} />
            <HealthBar ok={6} total={8} />
            <HealthBar ok={9} total={12} />
            <ApiCaption>x-as-workspace fan-out</ApiCaption>
          </div>
        </Panel>
      </Section>

      <Section label="Skeleton (loading)">
        <Panel bodyPadding>
          <Skeleton lines={3} />
        </Panel>
      </Section>

      <Section label="EmptyState">
        <Panel bodyPadding={false}>
          <EmptyState
            title="Inbox clear"
            subtitle="No unread replies in this workspace."
            icon={<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5" /><path d="M2 8l10 6 10-6" /></svg>}
          />
        </Panel>
      </Section>

      <Section label="ConfirmAction (confirm-gated writes)">
        <Panel>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            <ConfirmAction label="Activate" doneLabel="Activated" tone="primary" onConfirm={mock} />
            <ConfirmAction label="Contain" doneLabel="Contained · 25/day" tone="ghost" onConfirm={mock} />
            <ConfirmAction label="Delete" doneLabel="Deleted" tone="danger" onConfirm={mock} />
            <span style={{ fontSize: 13, color: "var(--muted)" }}>click one: idle → Confirm? → Job queued… → done</span>
          </div>
        </Panel>
      </Section>

      <Section label="DataTable — rows (client roster)">
        <Panel bodyPadding={false}>
          <DataTable
            variant="rows"
            minWidth={720}
            onRowClick={() => {}}
            getKey={(r) => r.name}
            rows={roster}
            columns={[
              { key: "name", header: "Client", render: (r) => <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</span> },
              { key: "senders", header: "Senders", render: (r) => <HealthBar ok={r.ok} total={r.total} /> },
              { key: "reply", header: "Reply rate", render: (r) => <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.reply}</span> },
              { key: "deliv", header: "Deliverability", render: (r) => <Pill tone={r.deliv === "Healthy" ? "ok" : "danger"}>{r.deliv}</Pill> },
            ]}
          />
        </Panel>
      </Section>

      <Section label="DataTable — plain (campaigns)">
        <Panel bodyPadding={false}>
          <DataTable
            variant="plain"
            minWidth={640}
            getKey={(r) => r.name}
            rows={campaigns}
            columns={[
              { key: "name", header: "Campaign", render: (r) => <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</span> },
              { key: "status", header: "Status", render: (r) => <Pill tone={r.status === "Active" ? "active" : "draft"}>{r.status}</Pill> },
              { key: "sent", header: "Sent", align: "right" },
              { key: "reply", header: "Reply %", align: "right" },
            ]}
          />
        </Panel>
      </Section>

      <Section label="Chart + Legend (14-day)">
        <Panel
          title="Last 14 days"
          caption="getCampaignAnalyticsOverview · read-only"
          actions={<Legend items={[{ label: "Leads", color: "#0080ff" }, { label: "Sent", color: "#ffc107" }, { label: "Replies", color: "#8b5cf6" }, { label: "Opportunities", color: "#2eca8b" }]} />}
        >
          <Chart
            areaFor="Leads"
            days={["Jul 24", "Jul 26", "Jul 28", "Jul 30", "Aug 1", "Aug 3", "Aug 6"]}
            series={[
              { label: "Leads", color: "#0080ff", data: [120, 134, 128, 150, 162, 158, 171, 180, 176, 192, 205, 198, 214, 226] },
              { label: "Sent", color: "#ffc107", data: [96, 104, 99, 118, 126, 121, 133, 141, 138, 150, 159, 152, 166, 175] },
              { label: "Replies", color: "#8b5cf6", data: [22, 26, 24, 31, 29, 34, 36, 33, 38, 41, 44, 40, 47, 49] },
              { label: "Opportunities", color: "#2eca8b", data: [6, 8, 7, 9, 11, 10, 12, 13, 12, 15, 16, 14, 18, 19] },
            ]}
          />
        </Panel>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 30 }}>
      <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--faint)", fontWeight: 500, marginBottom: 12 }}>{label}</div>
      {children}
    </section>
  )
}
