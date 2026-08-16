import { listSenders, type SenderRow } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Pill } from "@/components/Pill"
import { HealthBar } from "@/components/HealthBar"
import { DataTable, type Column } from "@/components/DataTable"
import { EmptyState } from "@/components/EmptyState"

const columns: Column<SenderRow>[] = [
  {
    key: "email",
    header: "Sender",
    render: (r) => (
      <div>
        <div style={{ fontWeight: 500, color: "var(--ink)" }}>{r.email}</div>
        {r.message && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 2 }}>{r.message}</div>}
      </div>
    ),
  },
  {
    key: "status",
    header: "Connection",
    render: (r) => (
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <Pill tone={r.statusTone} dot>{r.statusLabel}</Pill>
        {r.setupPending && <Pill tone="warn">Setup pending</Pill>}
      </span>
    ),
  },
  { key: "warmup", header: "Warmup", render: (r) => <Pill tone={r.warmupTone} dot>{r.warmupLabel}</Pill> },
  {
    key: "score",
    header: "Warmup score",
    render: (r) =>
      r.warmupScore == null ? (
        <span style={{ color: "var(--faint)" }}>—</span>
      ) : (
        <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 120 }}>
          <span style={{ width: 80 }}>
            <HealthBar ok={r.warmupScore} total={100} />
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{r.warmupScore}</span>
        </span>
      ),
  },
  {
    key: "limit",
    header: "Daily limit",
    align: "right",
    render: (r) =>
      r.dailyLimit == null ? <span style={{ color: "var(--faint)" }}>—</span> : <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.dailyLimit}</span>,
  },
]

export async function SenderHealth({ id }: { id: string }) {
  let data
  try {
    data = await listSenders(id)
  } catch {
    return (
      <Panel title="Sender health" caption="listAccount">
        <EmptyState title="Couldn't load senders" subtitle="The accounts read failed for this workspace. Check the API key's accounts scope." />
      </Panel>
    )
  }

  if (data.total === 0) {
    return (
      <Panel title="Sender health" caption="listAccount">
        <EmptyState title="No sending accounts" subtitle="This workspace has no mailboxes connected yet." />
      </Panel>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <StatTile label="Senders" value={data.total} />
        <StatTile label="Active" value={data.active} sub={`of ${data.total}`} />
        <StatTile label="Warming up" value={data.warming} />
        <StatTile label="Flagged" value={data.flagged} valueColor={data.flagged > 0 ? "var(--danger)" : undefined} />
        <StatTile label="Avg warmup" value={data.avgWarmupScore ?? "—"} sub={data.avgWarmupScore != null ? "/ 100" : undefined} />
      </div>

      <Panel
        title="Sender health"
        caption="listAccount · status + warmup_status"
        actions={data.setupPending > 0 ? <Pill tone="warn">{data.setupPending} setting up</Pill> : undefined}
        bodyPadding={false}
      >
        <DataTable columns={columns} rows={data.rows} getKey={(r) => r.email} minWidth={760} />
      </Panel>
    </div>
  )
}
