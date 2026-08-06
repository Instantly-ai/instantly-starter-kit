/**
 * Example: the daily ops exposed over HTTP, so another service can call them.
 * This is just one way to embed OutboundOps — import the class into any backend
 * the same way. Read-only endpoints; containment requires ?confirm=1.
 *
 *   GET /brief                     → the morning brief as JSON
 *   GET /incident?domains=acme.com → diagnosis (read-only)
 *   GET /incident?confirm=1        → diagnose, then execute containment
 *
 * Run:  INSTANTLY_API_KEY=... PORT=3000 npm run serve
 */
import http from "node:http"
import { InstantlyApiError } from "@instantly-ai/sdk"
import { OutboundOps } from "./lib/ops.js"

const ops = OutboundOps.fromEnv()
const port = Number(process.env.PORT ?? 3000)

function send(res: http.ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" })
  res.end(JSON.stringify(body))
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost")
  try {
    if (req.method === "GET" && url.pathname === "/brief") {
      return send(res, 200, await ops.brief())
    }
    if (req.method === "GET" && url.pathname === "/incident") {
      const domains = (url.searchParams.get("domains") ?? "").split(",").map((s) => s.trim()).filter(Boolean)
      const diag = await ops.diagnose({ domains })
      if (url.searchParams.get("confirm") === "1" && !diag.ready) {
        return send(res, 200, { diagnosis: diag, contained: await ops.contain(diag) })
      }
      return send(res, 200, diag)
    }
    return send(res, 404, { error: "not found — try GET /brief or GET /incident" })
  } catch (err) {
    if (err instanceof InstantlyApiError) return send(res, err.status, { error: "instantly_api_error", payload: err.payload })
    return send(res, 500, { error: err instanceof Error ? err.message : String(err) })
  }
})

server.listen(port, () => console.log(`outbound-ops on http://localhost:${port} — GET /brief, GET /incident`))
