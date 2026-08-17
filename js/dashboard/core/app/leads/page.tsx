import { allLeads, type AgencyLead, type AgencyLeadList } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { Pill } from "@/components/Pill"
import { EmptyState } from "@/components/EmptyState"
import { DataTable, type Column } from "@/components/DataTable"
import { ClientCell } from "@/components/ClientCell"
import { CsvImport } from "@/modules/leads/CsvImport"
import { switcherClients } from "@/lib/clients"

export const dynamic = "force-dynamic"

const num = (v: number) => v.toLocaleString("en-US")
function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const listCols: Column<AgencyLeadList>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} href={`/client/${r.clientId}/senders`} /> },
  { key: "name", header: "List", render: (r) => <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.name}</span> },
  { key: "enr", header: "Enrichment", render: (r) => (r.hasEnrichment ? <Pill tone="info" dot>Enriched</Pill> : <span style={{ color: "var(--faint)" }}>—</span>) },
  { key: "created", header: "Created", align: "right", render: (r) => <span style={{ color: "var(--muted)" }}>{fmtDate(r.createdAt)}</span> },
]

const leadCols: Column<AgencyLead>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} href={`/client/${r.clientId}/senders`} /> },
  {
    key: "lead",
    header: "Lead",
    render: (r) => (
      <div>
        <div style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.email}</div>
      </div>
    ),
  },
  { key: "company", header: "Company", render: (r) => <span style={{ color: "var(--ink)" }}>{r.company}</span> },
  { key: "opens", header: "Opens", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.opens)}</span> },
  { key: "replies", header: "Replies", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.replies)}</span> },
]

export default async function LeadsPage() {
  const [data, clients] = await Promise.all([allLeads().catch(() => null), switcherClients()])

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Leads</h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>Lead lists and recent leads across every client</p>
        </div>
        <CsvImport clients={clients.map((c) => ({ id: c.id, name: c.name }))} />
      </div>

      {!data || (data.listCount === 0 && data.leadCount === 0) ? (
        <Panel title="Leads" caption="listLeadList · leads/list · fan-out">
          <EmptyState title="No leads yet" subtitle={data ? "No client has leads yet — build a list from SuperSearch or import." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
        </Panel>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
            <StatTile label="Lead lists" value={num(data.listCount)} />
            <StatTile label="Leads shown" value={num(data.leadCount)} sub="most recent" />
            <StatTile label="Clients" value={data.clients} />
          </div>
          {data.listCount > 0 && (
            <Panel title="Lead lists" caption="listLeadList · fan-out" bodyPadding={false}>
              <DataTable columns={listCols} rows={data.lists} getKey={(r) => `${r.clientId}:${r.id}`} minWidth={720} />
            </Panel>
          )}
          {data.leadCount > 0 && (
            <Panel title="Recent leads" caption="leads/list (POST) · fan-out" bodyPadding={false}>
              <DataTable columns={leadCols} rows={data.leads} getKey={(r) => `${r.clientId}:${r.id}`} minWidth={820} />
            </Panel>
          )}
        </div>
      )}
    </>
  )
}
