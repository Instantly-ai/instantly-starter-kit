/**
 * 01 · Auth smoke-check (read-only)
 *
 * Confirms your API key works by listing campaigns. This is the "~90s, does my
 * key work?" check — a READ, never a write.
 *
 * Run:  INSTANTLY_API_KEY=... npm run 01
 */
import { createInstantlyClient, listCampaign, InstantlyApiError } from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
if (!apiKey) {
  console.error("Set INSTANTLY_API_KEY in your environment.")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })

try {
  const result = await listCampaign(client, { query: { limit: 10 } })
  console.log("✓ Key works. First page of campaigns:")
  console.log(JSON.stringify(result, null, 2))
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
