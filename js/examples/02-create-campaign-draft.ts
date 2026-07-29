/**
 * 02 · Create a campaign as a DRAFT (+ a one-step sequence)
 *
 * Creates a REAL campaign in your workspace, but it does NOT send: new campaigns
 * are Draft (status 0). Launching is a separate, explicit step — see example 05.
 *
 * Run:  INSTANTLY_API_KEY=... npm run 02
 */
import { createInstantlyClient, createCampaign, InstantlyApiError } from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
if (!apiKey) {
  console.error("Set INSTANTLY_API_KEY in your environment.")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })

try {
  const draft = await createCampaign(client, {
    body: {
      name: `Example draft — ${new Date().toISOString()}`,
      campaign_schedule: {
        schedules: [
          {
            name: "Business hours",
            timing: { from: "09:00", to: "17:00" },
            days: { "1": true, "2": true, "3": true, "4": true, "5": true }, // Mon–Fri
            timezone: "America/Chicago",
          },
        ],
      },
      sequences: [
        {
          steps: [
            {
              type: "email",
              delay: 0,
              variants: [
                { subject: "Quick question, {{firstName}}", body: "Hi {{firstName}},\n\n…\n\nBest," },
              ],
            },
          ],
        },
      ],
      stop_on_reply: true,
    },
  })
  console.log("✓ Created DRAFT campaign (status 0 — not sending):")
  console.log(JSON.stringify(draft, null, 2))
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  throw err
}
