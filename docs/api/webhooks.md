# Webhooks

Get notified when things happen — replies, opens, bounces, lead-interest changes, enrichment completion. Reach for this group to build event-driven flows (reply automation, CRM sync). Related: [emails](emails.md) (act on a reply), [leads](leads.md) (update interest), [analytics](analytics.md) (event aggregates).

## Key operations (SDK calls)

```ts
import { createWebhook, listWebhookEventTypes, testWebhook, resumeWebhook } from "@instantly-ai/sdk"

// Subscribe to replies (only target_hook_url is required)
const hook = await createWebhook(client, {
  body: {
    target_hook_url: "https://my.app/instantly/webhook",
    event_type: "reply_received",          // or "all_events"
    campaign: campaignId,                   // null / omit = all campaigns
    headers: { "x-shared-secret": secret }, // your only delivery-auth (verify on receipt)
  },
})

await testWebhook(client, { path: { id: hook.id } })   // send a test payload
```

Also: `listWebhook`, `getWebhook`, `patchWebhook`, `deleteWebhook`, `resumeWebhook`, `listWebhookEventTypes`. Query delivery history via the webhook-event ops (`listWebhookEvent`, `getWebhookEventsSummary`, `getWebhookEventsSummaryByDate`).

## Object shapes that matter

| Field | Set / Read | Notes |
|---|---|---|
| `target_hook_url` | set (required) | your receiver URL |
| `event_type` | set | subscription filter (see enum below) or `"all_events"` |
| `campaign` | set | UUID to scope to one campaign; `null` = all |
| `custom_interest_value` | set | for custom-label events (leave `event_type` null) |
| `headers` | set | key/value headers sent on delivery — your shared-secret hook |
| payload `event_type`, `email_id`, `reply_*`, `campaign_id`, `timestamp` | **read** | `email_id` = the `reply_to_uuid` for [emails](emails.md) reply |

Subscription `event_type` enum: `all_events, email_sent, email_opened, email_link_clicked, reply_received, email_bounced, lead_unsubscribed, campaign_completed, account_error, lead_interested, lead_not_interested, lead_meeting_booked, lead_meeting_completed, lead_closed, lead_out_of_office, lead_wrong_person, lead_no_show, supersearch_enrichment_completed`.

## Gotchas

- **No HMAC/signature.** The only delivery-auth is the `headers` object you set and verify yourself.
- **Subscription vs payload naming differs.** You subscribe with e.g. `email_link_clicked`, but the delivered payload's `event_type` may be `link_clicked`; the guide also lists `auto_reply_received` (not in the create enum). **Match on the payload value you actually receive.** Custom workspace labels arrive as their raw label string. Enumerate everything with `listWebhookEventTypes`.
- **Webhooks auto-disable** after repeated delivery failures → re-enable with `resumeWebhook`.
- Handle **duplicate deliveries** idempotently (dedupe on `email_id` / event id) — there's no idempotency key ([conventions](../conventions.md#idempotency)).
- The payload's **`email_id` is the `reply_to_uuid`** — feed it to `replyToEmail` to respond in-thread ([emails](emails.md)).

## See also
Example: [`examples/06-reply-webhook`](../../js/examples). Template: [`reply-automation`](../../js/templates/reply-automation) (receive → classify → route/respond).
