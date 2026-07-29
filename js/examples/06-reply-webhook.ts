/**
 * 06 · Handle a reply webhook
 *
 * A minimal receiver for Instantly webhook deliveries. Instantly provides NO
 * HMAC signature — the only delivery-auth is a custom header you set on the
 * webhook and verify here. The payload's `email_id` IS the `reply_to_uuid`,
 * so you can reply in-thread with replyToEmail.
 *
 * Register a webhook (once, needs a public URL) with registerWebhook() below,
 * then run this receiver:  PORT=3000 npm run 06
 */
import http from "node:http"
import { createInstantlyClient, createWebhook, replyToEmail, InstantlyApiError } from "@instantly-ai/sdk"

// --- One-time: point Instantly at your public receiver URL ---
export async function registerWebhook(apiKey: string, publicUrl: string, sharedSecret: string) {
  const client = createInstantlyClient({ apiKey })
  return createWebhook(client, {
    body: {
      target_hook_url: publicUrl,
      event_type: "reply_received",
      headers: { "x-shared-secret": sharedSecret }, // your only delivery-auth (no HMAC)
    },
  })
}

// --- The receiver ---
const SHARED_SECRET = process.env.WEBHOOK_SECRET ?? "change-me"
const port = Number(process.env.PORT ?? 3000)

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405).end("method not allowed")
    return
  }
  let raw = ""
  req.on("data", (chunk) => (raw += chunk))
  req.on("end", async () => {
    if (req.headers["x-shared-secret"] !== SHARED_SECRET) {
      res.writeHead(401).end("bad secret")
      return
    }
    const event = JSON.parse(raw || "{}") as { event_type?: string; email_id?: string; reply_text?: string }
    // Match on the payload's event_type (may differ from the subscription enum).
    console.log(`event=${event.event_type} email_id=${event.email_id}`)

    // Example: to reply in-thread, event.email_id is the reply_to_uuid.
    // const apiKey = process.env.INSTANTLY_API_KEY!
    // await replyToEmail(createInstantlyClient({ apiKey }), {
    //   body: { reply_to_uuid: event.email_id!, eaccount: "you@acme.com", subject: "Re:", body: { html: "…" } },
    // })
    void replyToEmail // referenced so the import is meaningful in this template
    void InstantlyApiError

    res.writeHead(200).end("ok")
  })
})

server.listen(port, () => console.log(`Webhook receiver listening on :${port}`))
