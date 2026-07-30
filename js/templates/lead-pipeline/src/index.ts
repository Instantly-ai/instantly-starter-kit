import { loadConfig } from "./config.js"
import { getClient, run } from "./pipeline.js"
import { consoleSync } from "./sync.js"

const config = loadConfig()

if (!config.apiKey) {
  console.error("INSTANTLY_API_KEY is not set — this pipeline needs a key to run.")
  console.error("Set it and re-run:  INSTANTLY_API_KEY=... npm start")
  process.exit(0)
}

const confirmEnrich = process.env.CONFIRM_ENRICH === "1"
const client = getClient(config.apiKey)
const result = await run(client, { searchFilters: config.searchFilters, limit: config.limit, sync: consoleSync, confirmEnrich })

if (!result.enriched) {
  console.log(`Preview only — ${result.count} match(es), ${result.previewed} sampled. No credits spent, no list created.`)
  console.log("Set CONFIRM_ENRICH=1 to enrich (spends credits + creates a list) and sync.")
} else {
  console.log(`✓ enriched + synced — ${result.count} match(es), deduped ${result.deduped}, synced ${result.synced}`)
}
