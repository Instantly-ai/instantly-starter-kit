/**
 * Morning Brief (CLI) — a thin wrapper over the OutboundOps class.
 * The logic lives in lib/ops.ts so you can also use it in your own service:
 *
 *   import { OutboundOps } from "../lib/ops.js"
 *   const brief = await new OutboundOps(client).brief()
 *
 * Run:  INSTANTLY_API_KEY=... npm run brief   [-- --raw]
 */
import { InstantlyApiError } from "@instantly-ai/sdk"
import { OutboundOps } from "../lib/ops.js"
import { renderBrief } from "../lib/render.js"

async function main(): Promise<void> {
  const raw = process.argv.includes("--raw")
  const result = await OutboundOps.fromEnv().brief()
  const now = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC"
  console.log(renderBrief({ now, ...result }))
  if (raw) console.log("\n--- raw ---\n" + JSON.stringify(result, null, 2))
}

main().catch((err) => {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
