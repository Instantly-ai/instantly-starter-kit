import { loadConfig } from "./config.js"
import { createServer } from "./server.js"

const config = loadConfig()
const server = createServer(config)

server.listen(config.port, () => {
  console.log(`outreach-service listening on :${config.port}`)
  if (!config.apiKey) console.log("⚠  INSTANTLY_API_KEY not set — /runs and /launch will 400 until you set it.")
})
