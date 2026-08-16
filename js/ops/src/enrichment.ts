import { listLeadList, getEnrichmentHistory } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { isDemo, maskCompany, useFixtures } from "./demo.js"
import { demoEnrichment } from "./demo-data.js"

function itemsOf(res: unknown): unknown[] {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "results"]) if (r && Array.isArray(r[k])) return r[k] as unknown[]
  return []
}

export interface EnrichmentRow {
  id: string
  listName: string
  status: string
  createdAt: string | null
  count: number | null
}

export interface EnrichmentData {
  rows: EnrichmentRow[]
  total: number
  enrichedLists: number
}

interface RawList {
  id?: string
  name?: string
  has_enrichment_task?: boolean | null
}

// getEnrichmentHistory returns a loose Record<string,unknown>[]; pull fields defensively.
function pickStr(o: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = o[k]
    if (typeof v === "string" && v) return v
  }
  return undefined
}
function pickNum(o: Record<string, unknown>, keys: string[]): number | undefined {
  for (const k of keys) {
    const v = o[k]
    if (typeof v === "number") return v
  }
  return undefined
}

/** SuperSearch enrichment activity for one client: the lead lists that have an
 * enrichment task, with each list's enrichment history. Read-only — running an
 * enrichment (preview → count → enrich) consumes credits and is not done here. */
export async function enrichmentOverview(id: string, cfg?: OpsConfig): Promise<EnrichmentData> {
  if (useFixtures()) return demoEnrichment(id)
  const c = await clientFor(id, cfg)
  const demo = isDemo()

  const listsRaw = await listLeadList(c, { query: { limit: 50 } }).catch(() => ({ items: [] as RawList[] }))
  const enriched = itemsOf(listsRaw)
    .map((l) => l as RawList)
    .filter((l) => l.has_enrichment_task && l.id)
    .slice(0, 12)

  const histories = await Promise.all(
    enriched.map(async (l) => {
      const listName = demo ? `${maskCompany(l.id ?? "")} list` : l.name || "Untitled list"
      const h = await getEnrichmentHistory(c, { path: { resource_id: l.id as string }, query: { limit: 20 } }).catch(() => [] as Record<string, unknown>[])
      const entries = Array.isArray(h) ? (h as Record<string, unknown>[]) : []
      return { listName, entries }
    }),
  )

  const rows: EnrichmentRow[] = []
  for (const { listName, entries } of histories) {
    for (let i = 0; i < entries.length; i++) {
      const o = entries[i]
      rows.push({
        id: pickStr(o, ["id", "resource_id", "task_id"]) ?? `${listName}:${i}`,
        listName,
        status: pickStr(o, ["status", "state"]) ?? "—",
        createdAt: pickStr(o, ["timestamp_created", "created_at", "timestamp"]) ?? null,
        count: pickNum(o, ["count", "number_of_leads", "enriched_count", "total"]) ?? null,
      })
    }
  }
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))

  return { rows, total: rows.length, enrichedLists: enriched.length }
}
