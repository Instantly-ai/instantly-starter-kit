import { allEnrichment, type AgencyEnrichmentRow } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { Pill, type PillTone } from "@/components/Pill"
import { EmptyState } from "@/components/EmptyState"
import { DataTable, type Column } from "@/components/DataTable"
import { ClientCell } from "@/components/ClientCell"

export const dynamic = "force-dynamic"

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

const columns: Column<AgencyEnrichmentRow>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} href={`/client/${r.clientId}/senders`} /> },
  { key: "list", header: "List", render: (r) => <span style={{ color: "var(--ink)", fontWeight: 500 }}>{r.listName}</span> },
  { key: "status", header: "Status", render: (r) => <Pill tone={statusTone(r.status)} dot>{r.status}</Pill> },
  { key: "count", header: "Leads", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.count == null ? "—" : r.count.toLocaleString("en-US")}</span> },
  { key: "run", header: "Run", align: "right", render: (r) => <span style={{ color: "var(--muted)" }}>{fmtDate(r.createdAt)}</span> },
]

export default async function EnrichmentPage() {
  const data = await allEnrichment().catch(() => null)

  const help = (
    <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
      SuperSearch enrichment runs <strong style={{ color: "var(--ink)", fontWeight: 500 }}>preview → count → enrich</strong>: filter an ICP, preview and count matches for free, then enrich (which spends credits). This view is read-only — it shows past runs, not a new enrichment.
    </p>
  )

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Enrichment</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>SuperSearch enrichment runs across every client</p>
      </div>

      {!data || data.total === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Panel title="How enrichment works" bodyPadding>{help}</Panel>
          <Panel title="Enrichment history" caption="supersearch-enrichment/history · fan-out">
            <EmptyState title="No enrichment runs yet" subtitle={data ? "Lists enriched via SuperSearch will show their run history here." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
          </Panel>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
            <StatTile label="Enriched lists" value={data.enrichedLists} />
            <StatTile label="Runs" value={data.total} />
            <StatTile label="Clients" value={data.clients} />
          </div>
          <Panel title="How enrichment works" bodyPadding>{help}</Panel>
          <Panel title="Enrichment history" caption="supersearch-enrichment/history · fan-out" bodyPadding={false}>
            <DataTable columns={columns} rows={data.rows} getKey={(r) => `${r.clientId}:${r.id}`} minWidth={760} />
          </Panel>
        </div>
      )}
    </>
  )
}
