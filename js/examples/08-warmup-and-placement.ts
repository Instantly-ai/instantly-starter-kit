/**
 * 08 · Deliverability: warmup + inbox placement
 *
 * The deliverability surface you already pay for on your Outreach plan, wired up.
 * READ by default: warmup analytics for your senders + your existing inbox-
 * placement tests. Enabling warmup is a WRITE (a background job) — opt in with
 * CONFIRM_WARMUP=1.
 *
 * Run:  INSTANTLY_API_KEY=... EMAILS=s1@acme.com,s2@acme.com [CONFIRM_WARMUP=1] npm run 08
 */
import {
  createInstantlyClient,
  getWarmupAnalytics,
  enableWarmupForAccounts,
  listInboxPlacementTest,
  polling,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
const emails = (process.env.EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean)
if (!apiKey || emails.length === 0) {
  console.error("Set INSTANTLY_API_KEY and EMAILS=sender1@acme.com,sender2@acme.com")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })

try {
  // 1) Warmup analytics for your senders (read) — how warmup is progressing.
  const warmup = await getWarmupAnalytics(client, { body: { emails } })
  console.log("Warmup analytics:", JSON.stringify(warmup, null, 2))

  // 2) Existing inbox-placement tests (read) — where your mail lands (inbox/spam) across ESPs.
  const tests = await listInboxPlacementTest(client, { query: { limit: 20 } })
  console.log("Inbox-placement tests:", JSON.stringify(tests, null, 2))
  console.log("→ Run a new test with createInboxPlacementTest, then read the blacklist/SpamAssassin report — see docs/api/deliverability.md.")

  // 3) Enable warmup (WRITE — a background job). Opt in explicitly.
  if (process.env.CONFIRM_WARMUP === "1") {
    const job = await enableWarmupForAccounts(client, { body: { emails } })
    const jobId = (job as { id?: string }).id
    console.log(`Enabling warmup… job ${jobId ?? "(no id returned)"}`)
    if (jobId) {
      const done = await polling.waitForBackgroundJob(client, jobId)
      console.log("Warmup-enable job finished:", JSON.stringify(done, null, 2))
    }
  } else {
    console.log("\nRead-only. Re-run with CONFIRM_WARMUP=1 to enable warmup on these senders (a background job).")
  }
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
