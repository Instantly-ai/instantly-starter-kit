import { loadConfig } from "./config.js"
import { createServer } from "./server.js"

const config = loadConfig()
createServer(config).listen(config.port, () => {
  console.log(`reply-automation listening on :${config.port}`)
  console.log(config.actOnReplies ? "acting on replies (set interest status)" : "classify + log only (ACT_ON_REPLIES=0)")
})
