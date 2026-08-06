/**
 * Incident Response (CLI) — a thin wrapper over the OutboundOps class.
 * The logic lives in lib/ops.ts so you can also use it in your own service:
 *
 *   const ops = new OutboundOps(client)
 *   const diag = await ops.diagnose({ domains: ["acme.com"] })  // read-only
 *   if (!diag.ready) await ops.contain(diag)                     // execute on your call
 *
 * DIAGNOSE IS READ-ONLY. Containment runs only with CONFIRM=1.
 *
 * Run:  INSTANTLY_API_KEY=... npm run incident                  # diagnose only
 *       INSTANTLY_API_KEY=... DOMAINS=acme.com npm run incident  # + SPF/DMARC check
 *       INSTANTLY_API_KEY=... CONFIRM=1 npm run incident         # apply containment
 */
import { InstantlyApiError } from "@instantly-ai/sdk"
import { OutboundOps } from "../lib/ops.js"
import { renderDiagnosis } from "../lib/render.js"

async function main(): Promise<void> {
  const confirm = process.env.CONFIRM === "1"
  const domains = (process.env.DOMAINS ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  const ops = OutboundOps.fromEnv()
  const diag = await ops.diagnose({ domains })
  const now = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC"
  console.log(renderDiagnosis(now, diag))

  if (!diag.plan.length) return
  if (!confirm) {
    console.log("\nDry run. Re-run with CONFIRM=1 to apply the containment above.")
    return
  }
  console.log("\nApplying containment…")
  for (const r of await ops.contain(diag)) {
    const why = r.ok ? "" : " — " + (r.error instanceof InstantlyApiError ? `API ${r.error.status}` : String(r.error))
    console.log(`   ${r.ok ? "✓" : "✗"} ${r.action.label}${why}`)
  }
}

main().catch((err) => {
  if (err instanceof InstantlyApiError) {
    console.error(`✗ API error ${err.status}:`, err.payload)
    process.exit(1)
  }
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
