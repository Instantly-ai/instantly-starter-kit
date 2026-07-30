# Emails (Unibox & replies)

Read and act on the emails in the Unibox — campaign sends, replies, and manual messages. Reach for this group to build a reply inbox, auto-respond, or forward. Related: [webhooks](webhooks.md) (get notified of replies), [leads](leads.md) (update interest from a reply).

## Key operations (SDK calls)

```ts
import { listEmail, replyToEmail, forwardEmail } from "@instantly-ai/sdk"

// List inbox emails (rate-limited to 20/min)
const inbox = await listEmail(client, { query: { email_type: "received", limit: 50 } })

// Reply in-thread — reply_to_uuid is the id of the email you're replying to
await replyToEmail(client, {
  body: {
    reply_to_uuid: emailId,          // from listEmail, or a webhook payload's email_id
    eaccount: "sender@acme.com",     // which connected account sends it
    subject: "Re: quick question",
    body: { html: "<p>Thanks — how's Tuesday?</p>" },
  },
})
```

Also: `getEmail`, `patchEmail`, `deleteEmail`, `sendTestEmail`, `markThreadAsRead`, `countUnreadEmails`.

## Object shapes that matter

| Field | Set / Read | Notes |
|---|---|---|
| `reply_to_uuid` | set (required for reply/forward) | the `id` of an existing email; = a webhook payload's `email_id` |
| `eaccount` | set (required) | sending account |
| `subject`, `body.{html,text}` | set | message content |
| `to_address_email_list`, `include_original_body` | set | forward: either a `body` **or** `include_original_body: true` |
| `email_type` | query | `received` \| `sent` \| `manual` |
| `search` | query | supports `thread:<id>` prefix |
| body / thread / dates | **read** | most email fields are read-only |

## Gotchas

- **`listEmail` is rate-limited to 20/min** (below the global budget). Rich filters: `campaign_id`, `list_id`, `eaccount` (comma-sep), `mode`, `is_unread`, `latest_of_thread`; `limit` max 100.
- **`replyToEmail` requires `reply_to_uuid`** (plus `eaccount`, `subject`, `body`). The API docs contain a typo `reyply_to_uuid` — the real field is **`reply_to_uuid`**.
- **`forwardEmail`** requires `reply_to_uuid`, `to_address_email_list`, `eaccount`, `subject`, and **either** a `body` **or** `include_original_body: true`.
- **`sendTestEmail`** is 10/min per workspace, doesn't create a Unibox entity, and can return `200` with an **error in the body** (`{ error: "ACC_AUTH_ERROR" | "ACC_NOT_FOUND" | … }`) — check the body, not just the status.

## Snippet — reply to a webhook-delivered reply

```ts
// webhook payload → email_id is the reply_to_uuid
await replyToEmail(client, { body: { reply_to_uuid: payload.email_id, eaccount, subject, body: { html } } })
```

## See also
Example: [`examples/06-reply-webhook`](../../js/examples). Template: [`reply-automation`](../../js/templates/reply-automation). See [webhooks](webhooks.md).
