import { loadConfig } from "./config.js"
import { createServer } from "./server.js"
import { getClient, pullSnapshot, setCache } from "./analytics.js"

const config = loadConfig()

createServer(config).listen(config.port, () => {
  console.log(`analytics-service listening on :${config.port}`)
  if (!config.apiKey) {
    console.log("⚠  INSTANTLY_API_KEY not set — /analytics will 400 and the scheduler is disabled.")
    return
  }
  // Scheduler: refresh the cached snapshot on an interval (spreads load / respects rate limits).
  const client = getClient(config.apiKey)
  const refresh = async () => {
    try {
      setCache(await pullSnapshot(client))
      console.log(`[scheduler] snapshot refreshed at ${new Date().toISOString()}`)
    } catch (err) {
      console.error("[scheduler] refresh failed:", err)
    }
  }
  void refresh()
  setInterval(refresh, config.refreshMs)
})
