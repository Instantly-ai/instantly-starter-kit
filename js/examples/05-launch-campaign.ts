/**
 * 05 · Launch a campaign (preflight → activate)
 *
 * Activating SENDS real email. This example runs a preflight (sending status +
 * connected accounts) and only activates when you opt in with CONFIRM_LAUNCH=1.
 *
 * Run:  INSTANTLY_API_KEY=... CAMPAIGN_ID=... [CONFIRM_LAUNCH=1] npm run 05
 */
import {
  createInstantlyClient,
  getCampaignSendingStatus,
  listAccount,
  activateCampaign,
  InstantlyApiError,
} from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
const campaignId = process.env.CAMPAIGN_ID
if (!apiKey || !campaignId) {
  console.error("Set INSTANTLY_API_KEY and CAMPAIGN_ID.")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })

try {
  // Preflight — why would it send / not send, and are senders present?
  const status = await getCampaignSendingStatus(client, { path: { id: campaignId } })
  const accounts = await listAccount(client, { query: { limit: 100 } })
  console.log("Sending status:", JSON.stringify(status, null, 2))
  console.log("Connected accounts:", JSON.stringify(accounts, null, 2))

  if (process.env.CONFIRM_LAUNCH !== "1") {
    console.log("\nDry run. Review the preflight above, then re-run with CONFIRM_LAUNCH=1 to activate.")
    process.exit(0)
  }

  await activateCampaign(client, { path: { id: campaignId } })
  console.log(`✓ Activated campaign ${campaignId}. It is now sending.`)
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
