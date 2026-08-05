# Verification

Check that an email address is deliverable **before** you send to it. Verifying protects your sender reputation and keeps bounce rates low — do it before adding leads to a campaign. Related: [leads](leads.md) (verify on import), [campaigns](campaigns.md) (`allow_risky_contacts`), [conventions → verify before you send](../conventions.md#verify-before-you-send).

> **Runs on Instantly Credits.** Verifying on import bulk-checks a whole list in one pass, so you spend credits deliberately instead of one address at a time. See [costs](../conventions.md) for what consumes credits.

## Key operations (SDK calls)

```ts
import { createEmailVerification, checkVerificationStatus } from "@instantly-ai/sdk"

const res = await createEmailVerification(client, { body: { email: "ada@acme.com" } })

// If it took > 10s, res.verification_status === "pending" → poll by email
if (res.verification_status === "pending") {
  const final = await checkVerificationStatus(client, { path: { email: "ada@acme.com" } })
}
```

For bulk, prefer verifying **on import** (`bulkAddLeads` with `verify_leads_on_import: true`) and reading list-level stats with `getVerificationStats` — see [leads](leads.md).

## Object shapes that matter

| Field | Set / Read | Notes |
|---|---|---|
| `email` | set (required) | address to verify |
| `webhook_url` | set (optional) | receive the result if it exceeds 10 s |
| `verification_status` | **read** | `pending` \| `verified` \| `invalid` |
| `catch_all` | **read** | `true` \| `false` \| `"pending"` (tri-state) |
| `credits`, `credits_used` | **read** | |
| `status` | **read** | top-level `success` \| `error` \| `null` |

## Gotchas

- **Synchronous-then-async:** if verification takes **> 10 seconds**, `createEmailVerification` returns `verification_status: "pending"`. Then poll `checkVerificationStatus` (by email) or supply `webhook_url` up front.
- `catch_all` is **tri-state** — `"pending"` is a valid value, not just booleans.
- Scopes: `email_verifications:{read,create,all}` (no update/delete).
- To gate a campaign launch, verify the whole list on import and check `getVerificationStats`, rather than verifying one address at a time.

## See also
Example: [`examples/03-add-leads-verify`](../../js/examples). Template: [`outreach-service`](../../js/templates/outreach-service) (verify-before-launch preflight), [`lead-pipeline`](../../js/templates/lead-pipeline).
