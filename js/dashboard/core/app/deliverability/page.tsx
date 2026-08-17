import { allDeliverability, type AgencyDeliverability } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { Pill } from "@/components/Pill"
import { HealthBar } from "@/components/HealthBar"
import { EmptyState } from "@/components/EmptyState"
import { DataTable, type Column } from "@/components/DataTable"
import { ClientCell } from "@/components/ClientCell"

export const dynamic = "force-dynamic"

const pct = (v: number | null) => (v == null ? "—" : `${Math.round(v)}%`)
function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const columns: Column<AgencyDeliverability>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} href={`/client/${r.clientId}/deliverability`} /> },
  {
    key: "test",
    header: "Test",
    render: (r) => (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--ink)" }}>{r.name}</span>
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
          <span style={{ width: 90 }}><HealthBar ok={Math.round(r.inboxPercent)} total={100} /></span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{pct(r.inboxPercent)}</span>
        </span>
      ),
  },
  { key: "spam", header: "Spam", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums", color: (r.spamPercent ?? 0) > 10 ? "var(--danger)" : "var(--body)" }}>{pct(r.spamPercent)}</span> },
]

export default async function DeliverabilityPage() {
  const data = await allDeliverability().catch(() => null)

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Deliverability</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>Inbox placement tests across every client</p>
      </div>

      {!data || data.total === 0 ? (
        <Panel title="Deliverability" caption="listInboxPlacementTest · fan-out">
          <EmptyState title="No placement tests yet" subtitle={data ? "No client has run an inbox placement test yet." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
        </Panel>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 22 }}>
            <StatTile label="Tests" value={data.total} />
            <StatTile label="Avg inbox" value={pct(data.avgInboxPercent)} sub="placement" />
            <StatTile label="Clients" value={data.clients} />
          </div>
          <Panel title="All placement tests" caption="listInboxPlacementTest · stats-by-test-id · fan-out" bodyPadding={false}>
            <DataTable columns={columns} rows={data.rows} getKey={(r) => `${r.clientId}:${r.id}`} minWidth={840} />
          </Panel>
        </>
      )}
    </>
  )
}
