/**
 * 04 · Enrich leads from SuperSearch
 *
 * Estimate + preview are FREE (no credits, nothing created) and run by default.
 * Enrichment spends credits and creates a list, so it's gated behind CONFIRM_ENRICH=1.
 *
 * Run:  INSTANTLY_API_KEY=... npm run 04            (preview only)
 *       INSTANTLY_API_KEY=... CONFIRM_ENRICH=1 npm run 04   (actually enrich)
 */
import {
  createInstantlyClient,
  countLeadsFromSupersearch,
  previewLeadsFromSupersearch,
  enrichLeadsFromSupersearch,
  getEnrichmentForResource,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
if (!apiKey) {
  console.error("Set INSTANTLY_API_KEY in your environment.")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })

try {
  // 1) Estimate (free). The API returns `number_of_leads`.
  const counted = await countLeadsFromSupersearch(client, {
    body: { search_filters: { title: { include: ["Founder", "CEO"] }, department: ["Sales"] } },
  })
  const { number_of_leads } = counted as { number_of_leads?: number }
  console.log(`Estimated matches: ${number_of_leads ?? "?"}`)

  // 2) Preview (free) — a redacted sample, no credits.
  const preview = await previewLeadsFromSupersearch(client, {
    body: { search_filters: { title: { include: ["Founder", "CEO"] }, department: ["Sales"] } },
  })
  console.log("Preview:", JSON.stringify(preview, null, 2))

  // 3) Enrich — spends credits + creates a list. Opt in only.
  if (process.env.CONFIRM_ENRICH !== "1") {
    console.log("\nPreview only (free). Set CONFIRM_ENRICH=1 to enrich (spends credits + creates a list).")
    process.exit(0)
  }

  const run = await enrichLeadsFromSupersearch(client, {
    body: {
      search_filters: { title: { include: ["Founder", "CEO"] }, department: ["Sales"] },
      limit: 25,
      list_name: `SuperSearch — ${new Date().toISOString()}`,
      work_email_enrichment: true,
    },
  })
  const resourceId = (run as { resource_id?: string }).resource_id ?? ""
  console.log("✓ Enrichment started for resource:", resourceId)

  if (resourceId) {
    // Enrichment is async — poll on a real workflow.
    const progress = await getEnrichmentForResource(client, { path: { resource_id: resourceId } })
    console.log("Progress:", JSON.stringify(progress, null, 2))
  }
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
