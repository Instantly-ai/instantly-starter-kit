import http from "node:http"
import { randomUUID } from "node:crypto"
import { InstantlyApiError } from "@instantly-ai/sdk"
import type { Config } from "./config.js"
import * as store from "./store.js"
import {
  getClient,
  createList,
  enrichIntoList,
  addAndVerifyLeads,
  createCampaignDraft,
  preflight,
  launch,
  type BuildParams,
} from "./outreach.js"

function send(res: http.ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body)
  res.writeHead(status, { "content-type": "application/json" })
  res.end(payload)
}

async function readJson(req: http.IncomingMessage): Promise<any> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const raw = Buffer.concat(chunks).toString("utf8")
  return raw ? JSON.parse(raw) : {}
}

export function createServer(config: Config): http.Server {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost")
    const path = url.pathname
    const method = req.method ?? "GET"

    try {
      // --- Health (no key needed) ---
      if (method === "GET" && path === "/health") {
        return send(res, 200, { ok: true, service: "outreach-service" })
      }

      // --- Status ---
      if (method === "GET" && path === "/status") {
        return send(res, 200, { runs: store.listRuns() })
      }
      if (method === "GET" && path.startsWith("/status/")) {
        const run = store.getRun(path.slice("/status/".length))
        return run ? send(res, 200, run) : send(res, 404, { error: "run not found" })
      }

      // --- Reply webhook receiver (no key needed; verify shared secret) ---
      if (method === "POST" && path === "/webhooks/replies") {
        if (req.headers["x-shared-secret"] !== config.webhookSecret) {
          return send(res, 401, { error: "bad secret" })
        }
        const event = await readJson(req)
        // Match on the payload's event_type (may differ from the subscription enum).
        // event.email_id === reply_to_uuid → reply in-thread via emails.replyToEmail.
        const runId = typeof url.searchParams.get("run") === "string" ? url.searchParams.get("run")! : undefined
        if (runId && store.getRun(runId)) {
          const run = store.getRun(runId)!
          run.replies.push({ emailId: event.email_id, eventType: event.event_type, at: new Date().toISOString() })
          store.updateRun(runId, { replies: run.replies })
        }
        console.log(`[webhook] event=${event.event_type} email_id=${event.email_id}`)
        return send(res, 200, { received: true })
      }

      // --- Build a run: list → (enrich) → add + verify → campaign draft (needs key) ---
      if (method === "POST" && path === "/runs") {
        const client = getClient(config.apiKey)
        const body = (await readJson(req)) as BuildParams
        const id = randomUUID()
        const run = store.createRun(id)
        const listId = body.searchFilters
          ? await enrichIntoList(client, body.name, body.searchFilters, body.enrichLimit ?? 100)
          : await createList(client, body.name)
        store.updateRun(id, { listId, status: "verifying" })
        let stats: unknown
        if (body.leads?.length) {
          stats = await addAndVerifyLeads(client, listId, body.leads, body.verify === true)
        }
        const campaignId = await createCampaignDraft(client, body)
        store.updateRun(id, { campaignId, leads: body.leads?.length ?? 0, verificationStats: stats, status: "ready" })
        return send(res, 201, { runId: id, listId, campaignId, status: "ready" })
      }

      // --- Launch a run: preflight, then activate when { confirm: true } (needs key) ---
      if (method === "POST" && path.startsWith("/runs/") && path.endsWith("/launch")) {
        const runId = path.slice("/runs/".length, -"/launch".length)
        const run = store.getRun(runId)
        if (!run?.campaignId) return send(res, 404, { error: "run or campaign not found" })
        const client = getClient(config.apiKey)
        const pre = await preflight(client, run.campaignId)
        const { confirm } = await readJson(req)
        if (!confirm) return send(res, 200, { preflight: pre, note: "POST { confirm: true } to activate (sends email)" })
        await launch(client, run.campaignId)
        store.updateRun(runId, { status: "active" })
        return send(res, 200, { runId, status: "active" })
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
