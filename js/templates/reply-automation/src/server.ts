import http from "node:http"
import { InstantlyApiError } from "@instantly-ai/sdk"
import type { Config } from "./config.js"
import { classify } from "./classify.js"
import * as store from "./store.js"
import { getClient, applyInterest } from "./actions.js"

function send(res: http.ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" })
  res.end(JSON.stringify(body))
}

async function readJson(req: http.IncomingMessage): Promise<any> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const raw = Buffer.concat(chunks).toString("utf8")
  return raw ? JSON.parse(raw) : {}
}

export function createServer(config: Config): http.Server {
  return http.createServer(async (req, res) => {
    const path = new URL(req.url ?? "/", "http://localhost").pathname
    const method = req.method ?? "GET"
    try {
      if (method === "GET" && path === "/health") return send(res, 200, { ok: true, service: "reply-automation" })
      if (method === "GET" && path === "/replies") return send(res, 200, { replies: store.recent() })

      if (method === "POST" && path === "/webhooks/replies") {
        if (req.headers["x-shared-secret"] !== config.webhookSecret) return send(res, 401, { error: "bad secret" })
        const event = await readJson(req)
        // Match on the payload's event_type (may differ from the subscription enum).
        const text: string = event.reply_text ?? event.reply_text_snippet ?? ""
        const classification = classify(text)
        const leadEmail: string | undefined = event.lead_email ?? event.lead ?? undefined

        let acted = false
        if (config.actOnReplies && leadEmail && config.apiKey) {
          await applyInterest(getClient(config.apiKey), leadEmail, classification.interestValue)
          acted = true
        }
        store.record({ emailId: event.email_id, eventType: event.event_type, leadEmail, classification, acted, at: new Date().toISOString() })
        console.log(`[reply] ${classification.label} (${classification.interestValue}) lead=${leadEmail ?? "?"} acted=${acted}`)
        return send(res, 200, { classification, acted })
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
