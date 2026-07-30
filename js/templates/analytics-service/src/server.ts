import http from "node:http"
import { InstantlyApiError } from "@instantly-ai/sdk"
import type { Config } from "./config.js"
import { getClient, pullSnapshot, getCache, setCache } from "./analytics.js"

function send(res: http.ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" })
  res.end(JSON.stringify(body))
}

export function createServer(config: Config): http.Server {
  return http.createServer(async (req, res) => {
    const path = new URL(req.url ?? "/", "http://localhost").pathname
    try {
      if (path === "/health") return send(res, 200, { ok: true, service: "analytics-service" })

      // Last cached snapshot (populated by the scheduler) — no live call.
      if (path === "/analytics/cached") {
        const snap = getCache()
        return snap ? send(res, 200, snap) : send(res, 503, { error: "no snapshot yet" })
      }

      // Live pull (needs key).
      if (path === "/analytics") {
        const snapshot = await pullSnapshot(getClient(config.apiKey))
        setCache(snapshot)
        return send(res, 200, snapshot)
      }

      return send(res, 404, { error: "not found" })
    } catch (err) {
      if (err instanceof InstantlyApiError) return send(res, err.status, { error: "instantly_api_error", payload: err.payload })
      if (err instanceof Error && err.message.includes("INSTANTLY_API_KEY")) return send(res, 400, { error: err.message })
      console.error(err)
      return send(res, 500, { error: "internal error" })
    }
  })
}
