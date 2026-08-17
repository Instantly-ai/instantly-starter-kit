import { enrichmentOverview, type EnrichmentRow } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { Pill } from "@/components/Pill"
import { EmptyState } from "@/components/EmptyState"
import { DataTable, type Column } from "@/components/DataTable"
import type { PillTone } from "@/components/Pill"

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
function statusTone(s: string): PillTone {
  const v = s.toLowerCase()
  if (v.includes("complete") || v.includes("success") || v.includes("done")) return "ok"
  if (v.includes("fail") || v.includes("error")) return "danger"
  if (v.includes("progress") || v.includes("running") || v.includes("pending")) return "warn"
  return "neutral"
}

const columns: Column<EnrichmentRow>[] = [
  { key: "list", header: "List", render: (r) => <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.listName}</span> },
  { key: "status", header: "Status", render: (r) => <Pill tone={statusTone(r.status)} dot>{r.status}</Pill> },
  { key: "count", header: "Leads", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.count == null ? "—" : r.count.toLocaleString("en-US")}</span> },
  { key: "created", header: "Run", align: "right", render: (r) => <span style={{ color: "var(--muted)" }}>{fmtDate(r.createdAt)}</span> },
]

export async function Enrichment({ id }: { id: string }) {
  let data
  try {
    data = await enrichmentOverview(id)
  } catch {
    return (
      <Panel title="Enrichment" caption="supersearch-enrichment/history">
        <EmptyState title="Couldn't load enrichment" subtitle="The enrichment read failed for this workspace." />
      </Panel>
    )
  }

  const help = (
    <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
      SuperSearch enrichment runs <strong style={{ color: "var(--ink)", fontWeight: 500 }}>preview → count → enrich</strong>: filter an ICP, preview and count matches for free, then enrich (which spends credits). This view is read-only — it shows past runs, not a new enrichment.
    </p>
  )

  if (data.total === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Panel title="How enrichment works" bodyPadding>{help}</Panel>
        <Panel title="Enrichment history" caption="listLeadList · supersearch-enrichment/history">
          <EmptyState title="No enrichment runs yet" subtitle="Lists built or enriched via SuperSearch will show their run history here." />
        </Panel>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
        <StatTile label="Enriched lists" value={data.enrichedLists} />
        <StatTile label="Runs" value={data.total} />
      </div>
      <Panel title="How enrichment works" bodyPadding>{help}</Panel>
      <Panel title="Enrichment history" caption="supersearch-enrichment/history · per enriched list" bodyPadding={false}>
        <DataTable columns={columns} rows={data.rows} getKey={(r) => r.id} minWidth={640} />
      </Panel>
    </div>
  )
}
