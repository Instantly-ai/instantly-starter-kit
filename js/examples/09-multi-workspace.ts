/**
 * 09 · Agency multi-workspace (one admin key → many client sub-workspaces)
 *
 * With an ADMIN-workspace key you act on each client's sub-workspace by setting
 * the `x-as-workspace: <sub_workspace_id>` header (see
 * docs/conventions.md#admin-acting-as-a-sub-workspace). This example is
 * READ-ONLY: for each sub-workspace it lists connected senders and pulls
 * campaign analytics — the per-client reporting an agency runs across N clients
 * from a single key. It never moves accounts and never sends.
 *
 * Reuse pattern: one client per sub-workspace = same admin key + a different
 * `defaultHeaders["x-as-workspace"]`. Nothing per-client to re-auth.
 *
 * Run:  INSTANTLY_API_KEY=<admin-key> SUB_WORKSPACE_IDS=ws1,ws2,ws3 npm run 09
 */
import {
  createInstantlyClient,
  listAccount,
  getCampaignAnalytics,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
const ids = (process.env.SUB_WORKSPACE_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean)
if (!apiKey || ids.length === 0) {
  console.error("Set INSTANTLY_API_KEY (an admin-workspace key) and SUB_WORKSPACE_IDS=ws1,ws2,...")
  process.exit(1)
}

/** Extract a list from a paginated response without assuming the exact envelope. */
function itemsOf(res: unknown): unknown[] | null {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) {
    if (r && Array.isArray(r[k])) return r[k] as unknown[]
  }
  return null
}

// One client per sub-workspace: same admin key, different x-as-workspace header.
function clientFor(subWorkspaceId: string) {
  return createInstantlyClient({ apiKey: apiKey!, defaultHeaders: { "x-as-workspace": subWorkspaceId } })
}

for (const wsId of ids) {
  console.log(`\n=== sub-workspace ${wsId} ===`)
  try {
    const client = clientFor(wsId)
    const accounts = await listAccount(client, { query: { limit: 100 } })
    const senders = itemsOf(accounts)
    console.log(`connected senders: ${senders ? senders.length : "(review payload below)"}`)
    if (!senders) console.log("accounts:", JSON.stringify(accounts, null, 2))
    const analytics = await getCampaignAnalytics(client, { query: {} }) // omit id → all campaigns
    console.log("campaign analytics:", JSON.stringify(analytics, null, 2))
  } catch (err) {
    // Isolate per-client failures (e.g. a lapsed workspace) so one bad client doesn't abort the rest.
    if (err instanceof InstantlyApiError) console.error(`  ✗ ${wsId}: API error ${err.status}`, err.payload)
    else throw err
  }
}

console.log("\n✓ Per-client report complete (read-only, no changes made).")
console.log("Note: moveAccounts (cross-workspace) is DESTRUCTIVE and admin-only — guard it. Not run here.")
