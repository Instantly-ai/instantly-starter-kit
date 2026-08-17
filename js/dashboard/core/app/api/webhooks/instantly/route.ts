import { parseWebhook, type InstantlyEvent } from "@instantly-ai/ops"

// Reference Instantly webhook receiver. Register a webhook pointing here
// (registerWebhook({ url: "https://you.com/api/webhooks/instantly", ... })), then
// plug your logic into handle(). Instantly has no request signing — set a
// shared-secret header when you register, and check it here.

function authorized(req: Request): boolean {
  const secret = process.env.INSTANTLY_WEBHOOK_SECRET
  if (!secret) return true // no secret configured (dev) → accept
  return req.headers.get("x-webhook-secret") === secret
}

export async function POST(req: Request) {
  if (!authorized(req)) return new Response("unauthorized", { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response("bad json", { status: 400 })
  }

  const event = parseWebhook(body)
  await handle(event)

  // Ack fast (2xx) so Instantly doesn't retry; do slow work on a queue if needed.
  return Response.json({ ok: true })
}

// ⬇️ This is the part you own — wire events into your own system.
async function handle(event: InstantlyEvent) {
  switch (event.type) {
    case "reply_received":
      // notify your team, open a task, mirror to your DB…
      break
    case "email_bounced":
      // flag the mailbox / clean the list…
      break
    case "lead_meeting_booked":
      // push to your calendar / CRM…
      break
    case "account_error":
      // alert ops — a sender needs attention…
      break
    default:
      break
  }
  console.log("[instantly webhook]", event.type, event.leadEmail ?? "")
}
