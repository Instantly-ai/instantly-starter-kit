// Webhooks — get events OUT of Instantly, into your code. Instantly POSTs an event
// to a URL you register; this normalizes the incoming body into a typed event and
// gives you a one-call way to register the hook. Plug your own logic into the
// reference route at app/api/webhooks/instantly/route.ts.
import { createWebhook, listWebhook, testWebhook } from "@instantly-ai/sdk"
import { opsClient, type OpsConfig } from "./client.js"

/** Every event Instantly can send (from the webhook API's event_type enum). */
export const INSTANTLY_EVENT_TYPES = [
  "all_events",
  "email_sent",
  "email_opened",
  "email_link_clicked",
  "reply_received",
  "email_bounced",
  "lead_unsubscribed",
  "campaign_completed",
  "account_error",
  "lead_neutral",
  "lead_interested",
  "lead_not_interested",
  "lead_meeting_booked",
  "lead_meeting_completed",
  "lead_closed",
  "lead_out_of_office",
  "lead_wrong_person",
  "lead_no_show",
  "supersearch_enrichment_completed",
] as const
export type InstantlyEventType = (typeof INSTANTLY_EVENT_TYPES)[number]

export interface InstantlyEvent {
  type: InstantlyEventType | string
  leadEmail: string | null
  campaignId: string | null
  timestamp: string | null
  /** The full delivered body — exact fields vary by event type. */
  raw: Record<string, unknown>
}

function str(o: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = o[k]
    if (typeof v === "string" && v) return v
  }
  return null
}

/** Normalize an incoming Instantly webhook body into a typed event. Instantly sends
 * an event_type plus lead/campaign context; the raw payload is always attached. */
export function parseWebhook(body: unknown): InstantlyEvent {
  const o = body && typeof body === "object" ? (body as Record<string, unknown>) : {}
  return {
    type: str(o, ["event_type", "type", "event"]) ?? "unknown",
    leadEmail: str(o, ["lead_email", "email", "lead"]),
    campaignId: str(o, ["campaign_id", "campaign"]),
    timestamp: str(o, ["timestamp", "timestamp_created"]),
    raw: o,
  }
}

/** Register a webhook in Instantly pointing at your endpoint. Optionally scope it to
 * one campaign, filter to a single event, and attach a shared-secret header you
 * verify on the way in (Instantly has no request signing — use a secret header). */
export async function registerWebhook(opts: {
  url: string
  event?: InstantlyEventType
  name?: string
  campaign?: string
  secretHeader?: { name: string; value: string }
  cfg?: OpsConfig
}): Promise<unknown> {
  return createWebhook(opsClient(opts.cfg), {
    body: {
      target_hook_url: opts.url,
      event_type: opts.event ?? "all_events",
      name: opts.name ?? null,
      campaign: opts.campaign ?? null,
      headers: opts.secretHeader ? { [opts.secretHeader.name]: opts.secretHeader.value } : null,
    },
  })
}

/** List the webhooks registered in a workspace. */
export async function listWebhooks(cfg?: OpsConfig): Promise<unknown> {
  return listWebhook(opsClient(cfg), { query: {} })
}

/** Fire a test delivery for a registered webhook. */
export async function sendTestWebhook(id: string, cfg?: OpsConfig): Promise<unknown> {
  return testWebhook(opsClient(cfg), { path: { id } })
}
