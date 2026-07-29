/**
 * SuperSearch → enrich → (verify) → dedupe → sync.
 *
 * preview (free) to see matches, then enrich into a list (async; fills work
 * emails). Verification: pass verify_leads_on_import when adding, or call
 * createEmailVerification per address. Then dedupe and sync to your store.
 */
import {
  createInstantlyClient,
  countLeadsFromSupersearch,
  previewLeadsFromSupersearch,
  enrichLeadsFromSupersearch,
  type InstantlyClient,
} from "@instantly-ai/sdk"
import { dedupeByEmail, type Lead } from "./dedupe.js"
import type { SyncAdapter } from "./sync.js"

export function getClient(apiKey: string | undefined): InstantlyClient {
  if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
  return createInstantlyClient({ apiKey })
}

function extractLeads(preview: unknown): Lead[] {
  // previewLeadsFromSupersearch returns rows under `leads`; fall back to `items`.
  const p = preview as { leads?: unknown; items?: unknown }
  const rows = Array.isArray(p.leads) ? p.leads : Array.isArray(p.items) ? p.items : []
  return rows as Lead[]
}

export interface PipelineOptions {
  searchFilters: Record<string, unknown>
  limit: number
  sync: SyncAdapter
  /** When false (default), preview only — no credits spent, no list created. */
  confirmEnrich: boolean
}

export interface PipelineResult {
  count: number
  previewed: number
  enriched: boolean
  deduped: number
  synced: number
}

export async function run(client: InstantlyClient, opts: PipelineOptions): Promise<PipelineResult> {
  // 1) Estimate + preview — both free: no credits, no objects created.
  const counted = await countLeadsFromSupersearch(client, { body: { search_filters: opts.searchFilters as never } })
  const count = (counted as { number_of_leads?: number }).number_of_leads ?? 0
  const preview = await previewLeadsFromSupersearch(client, { body: { search_filters: opts.searchFilters as never } })
  const previewed = extractLeads(preview)

  // 2) Enrich only on explicit opt-in — this spends credits and creates a list.
  if (!opts.confirmEnrich) {
    return { count, previewed: previewed.length, enriched: false, deduped: 0, synced: 0 }
  }
  await enrichLeadsFromSupersearch(client, {
    body: { search_filters: opts.searchFilters as never, limit: opts.limit, work_email_enrichment: true },
  })

  // 3) Dedupe (pure) and 4) sync to your DB/CRM. Enrichment is async — in a real flow,
  //    poll getEnrichmentForResource and list the enriched leads before syncing.
  const deduped = dedupeByEmail(previewed)
  const synced = await opts.sync.sync(deduped)
  return { count, previewed: previewed.length, enriched: true, deduped: deduped.length, synced }
}
