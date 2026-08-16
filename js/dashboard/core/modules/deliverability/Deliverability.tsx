import { listDeliverability, type DeliverabilityRow } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Pill } from "@/components/Pill"
import { HealthBar } from "@/components/HealthBar"
import { DataTable, type Column } from "@/components/DataTable"
import { EmptyState } from "@/components/EmptyState"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v, { decimals: 0 })

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const columns: Column<DeliverabilityRow>[] = [
  {
    key: "name",
    header: "Test",
    render: (r) => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</span>
          <Pill tone={r.statusTone} dot>{r.statusLabel}</Pill>
        </div>
        <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 2 }}>{fmtDate(r.createdAt)}</div>
      </div>
    ),
  },
  {
    key: "inbox",
    header: "Inbox placement",
    render: (r) =>
      r.inboxPercent == null ? (
        <span style={{ color: "var(--faint)" }}>—</span>
      ) : (
        <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 130 }}>
          <span style={{ width: 90 }}>
            <HealthBar ok={Math.round(r.inboxPercent)} total={100} />
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{pct(r.inboxPercent)}</span>
        </span>
      ),
  },
  {
    key: "spam",
    header: "Spam",
    align: "right",
    render: (r) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: (r.spamPercent ?? 0) > 10 ? "var(--danger)" : "var(--body)" }}>{pct(r.spamPercent)}</span>
    ),
  },
  { key: "cat", header: "Categorized", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{pct(r.categoryPercent)}</span> },
  { key: "count", header: "Seeds", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.count.toLocaleString("en-US")}</span> },
]

export async function Deliverability({ id }: { id: string }) {
  let data
  try {
    data = await listDeliverability(id)
  } catch {
    return (
      <Panel title="Deliverability" caption="inbox-placement">
        <EmptyState title="Couldn't load deliverability" subtitle="The inbox-placement read failed for this workspace. Check the API key's inbox_placement scope." />
      </Panel>
    )
  }

  if (data.total === 0) {
    return (
      <Panel title="Deliverability" caption="listInboxPlacementTest">
        <EmptyState title="No inbox placement tests" subtitle="Run a placement test to see how this client's mail lands across inbox, spam, and category folders." />
      </Panel>
    )
  }

  const latestColor = data.latestInboxPercent != null && data.latestInboxPercent < 80 ? "var(--danger)" : undefined
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <StatTile label="Tests" value={data.total} />
        <StatTile label="Avg inbox" value={pct(data.avgInboxPercent)} sub={data.avgInboxPercent != null ? "placement" : undefined} />
        <StatTile label="Latest inbox" value={pct(data.latestInboxPercent)} valueColor={latestColor} />
      </div>

      <Panel title="Inbox placement tests" caption="listInboxPlacementTest · stats-by-test-id" bodyPadding={false}>
        <DataTable columns={columns} rows={data.rows} getKey={(r) => r.id} minWidth={780} />
      </Panel>
    </div>
  )
}
