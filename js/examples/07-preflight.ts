/**
 * 07 · Send preflight (readiness check before you launch)
 *
 * Answers "is this campaign actually ready to send?" BEFORE you activate — so you
 * never launch a campaign that's set up to fail. READ-ONLY: it never activates.
 * Checks: connected senders, campaign sending status, and (if you pass LIST_ID)
 * verified-lead stats. Prints a readiness report with the fix + doc link for
 * anything that's short.
 *
 * Run:  INSTANTLY_API_KEY=... CAMPAIGN_ID=... [LIST_ID=...] npm run 07
 */
import {
  createInstantlyClient,
  getCampaignSendingStatus,
  listAccount,
  getVerificationStats,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
const campaignId = process.env.CAMPAIGN_ID
if (!apiKey || !campaignId) {
  console.error("Set INSTANTLY_API_KEY and CAMPAIGN_ID (optionally LIST_ID for verified-lead stats).")
  process.exit(1)
}
const listId = process.env.LIST_ID

/** Extract a list from a paginated response without assuming the exact envelope. */
function itemsOf(res: unknown): unknown[] | null {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) {
    if (r && Array.isArray(r[k])) return r[k] as unknown[]
  }
  return null
}

const client = createInstantlyClient({ apiKey })
const checks: { ok: boolean; label: string; fix?: string }[] = []

try {
  // 1) Connected senders — you cannot send without at least one.
  const accounts = await listAccount(client, { query: { limit: 100 } })
  const senders = itemsOf(accounts)
  if (senders === null) {
    console.log("Senders: could not parse the accounts payload — review it manually:")
    console.log(JSON.stringify(accounts, null, 2))
  } else {
    checks.push({
      ok: senders.length > 0,
      label: `Connected senders: ${senders.length}`,
      fix: "Connect at least one sender via OAuth (docs/api/accounts.md), then warm it before sending (docs/api/deliverability.md).",
    })
  }

  // 2) Campaign sending status — why it would / wouldn't send.
  const status = await getCampaignSendingStatus(client, { path: { id: campaignId } })
  console.log("Sending status:", JSON.stringify(status, null, 2))

  // 3) Verified leads (optional — verification is opt-in in this kit).
  if (listId) {
    const stats = await getVerificationStats(client, { path: { id: listId } })
    console.log("Verification stats:", JSON.stringify(stats, null, 2))
    console.log("→ Aim for verified leads > 0 before launch. Verify on import (docs/api/verification.md); verification spends Credits.")
  } else {
    console.log("No LIST_ID given — skipping verified-lead stats. Pass LIST_ID to include them.")
  }

  // Readiness summary
  console.log("\nReadiness:")
  for (const c of checks) {
    console.log(`  ${c.ok ? "✓" : "✗"} ${c.label}`)
    if (!c.ok && c.fix) console.log(`      → ${c.fix}`)
  }
  const ready = checks.every((c) => c.ok)
  console.log(`\n${ready ? "✓ No blockers in the checks above." : "✗ Not ready — resolve the ✗ items before you activate."}`)
  console.log("This is read-only. To launch after fixing, use example 05 with CONFIRM_LAUNCH=1.")
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
