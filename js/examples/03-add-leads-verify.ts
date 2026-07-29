/**
 * 03 · Add leads to a list + (optionally) verify them on import
 *
 * Creates a REAL lead list and adds a lead, then cleans up after itself.
 * Verification is OFF by default (it spends a credit per lead) — set
 * VERIFY_ON_IMPORT=1 to enable. Set KEEP=1 to keep the list instead of deleting it.
 *
 * Run:  INSTANTLY_API_KEY=... npm run 03
 */
import {
  createInstantlyClient,
  createLeadList,
  bulkAddLeads,
  getVerificationStats,
  bulkDeleteLeads,
  deleteLeadList,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
if (!apiKey) {
  console.error("Set INSTANTLY_API_KEY in your environment.")
  process.exit(1)
}

const verify = process.env.VERIFY_ON_IMPORT === "1" // spends a verification credit per lead
const keep = process.env.KEEP === "1" // by default we delete what we created

const client = createInstantlyClient({ apiKey })

try {
  const list = await createLeadList(client, { body: { name: `Example list — ${new Date().toISOString()}` } })
  const listId = (list as { id: string }).id // the response includes the new list id

  try {
    await bulkAddLeads(client, {
      body: {
        list_id: listId, // provide list_id XOR campaign_id — not both; max 1000 leads/call
        leads: [{ email: "ada@example.com", first_name: "Ada", company_name: "Analytical Engines" }],
        verify_leads_on_import: verify, // off by default (no credit spend)
        skip_if_in_workspace: true, // dedupe
      },
    })

    const stats = await getVerificationStats(client, { path: { id: listId } })
    console.log(`✓ Added lead to list ${listId}${verify ? " (verifying on import)" : ""}. Verification stats:`)
    console.log(JSON.stringify(stats, null, 2))
  } finally {
    if (!keep) {
      // Leave nothing behind: delete the leads in the list, then the list.
      await bulkDeleteLeads(client, { body: { list_id: listId } }).catch(() => {})
      await deleteLeadList(client, { path: { id: listId } }).catch(() => {})
      console.log(`Cleaned up list ${listId}. (Set KEEP=1 to keep it.)`)
    }
  }
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
