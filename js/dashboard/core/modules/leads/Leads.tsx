import { leadsFor, type LeadRow, type LeadListRow } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Pill } from "@/components/Pill"
import { EmptyState } from "@/components/EmptyState"
import { DataTable, type Column } from "@/components/DataTable"

const num = (v: number) => v.toLocaleString("en-US")
function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const listCols: Column<LeadListRow>[] = [
  { key: "name", header: "List", render: (r) => <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.name}</span> },
  { key: "enr", header: "Enrichment", render: (r) => (r.hasEnrichment ? <Pill tone="info" dot>Enriched</Pill> : <span style={{ color: "var(--faint)" }}>—</span>) },
  { key: "created", header: "Created", align: "right", render: (r) => <span style={{ color: "var(--muted)" }}>{fmtDate(r.createdAt)}</span> },
]

const leadCols: Column<LeadRow>[] = [
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
  {
    key: "company",
    header: "Company",
    render: (r) => (
      <div>
        <div style={{ color: "var(--ink)" }}>{r.company}</div>
        {r.title !== "—" && <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.title}</div>}
      </div>
    ),
  },
  { key: "opens", header: "Opens", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.opens)}</span> },
  { key: "replies", header: "Replies", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.replies)}</span> },
]

export async function Leads({ id }: { id: string }) {
  let data
  try {
    data = await leadsFor(id)
  } catch {
    return (
      <Panel title="Leads" caption="listLeadList · leads/list">
        <EmptyState title="Couldn't load leads" subtitle="The leads read failed for this workspace. Check the API key's leads scope." />
      </Panel>
    )
  }

  if (data.listCount === 0 && data.leadCount === 0) {
    return (
      <Panel title="Leads" caption="listLeadList · leads/list">
        <EmptyState title="No leads yet" subtitle="Build a list from SuperSearch, or import leads, to see them here." />
      </Panel>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
        <StatTile label="Lead lists" value={num(data.listCount)} />
        <StatTile label="Leads shown" value={num(data.leadCount)} sub="most recent" />
      </div>

      {data.listCount > 0 && (
        <Panel title="Lead lists" caption="listLeadList" bodyPadding={false}>
          <DataTable columns={listCols} rows={data.lists} getKey={(r) => r.id} minWidth={620} />
        </Panel>
      )}

      {data.leadCount > 0 && (
        <Panel title="Recent leads" caption="leads/list (POST) · engagement counters" bodyPadding={false}>
          <DataTable columns={leadCols} rows={data.leads} getKey={(r) => r.id} minWidth={720} />
        </Panel>
      )}
    </div>
  )
}
