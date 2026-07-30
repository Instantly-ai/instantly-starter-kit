# Leads (+ lists & labels)

Add, list, move, and update the people you email. **Leads** live in **lead lists** and/or campaigns; **lead labels** categorize replies/interest. Reach for this group to build an audience and manage its state. Related: [enrichment](enrichment.md) (source + enrich leads), [verification](verification.md) (clean them), [campaigns](campaigns.md) (send to them).

## Key operations (SDK calls)

```ts
import { createLeadList, bulkAddLeads, listLeads,
         updateLeadInterestStatus, moveLeads, getVerificationStats } from "@instantly-ai/sdk"

// Create a list, then add leads to it (verify on import)
const list = await createLeadList(client, { body: { name: "Q3 founders" } })

const added = await bulkAddLeads(client, {
  body: {
    list_id: list.id,                 // provide list_id XOR campaign_id — not both
    leads: [{ email: "a@acme.com", first_name: "Ada" }],  // ≤ 1000 per call
    verify_leads_on_import: true,     // spawns a background verify job
    skip_if_in_workspace: true,       // dedupe
  },
})

// Read leads back (POST, filters in the BODY)
const page = await listLeads(client, { body: { list_id: list.id, limit: 100 } })
```

Single-lead ops: `createLead`, `getLead`, `patchLead`, `deleteLead`. Bulk: `bulkDeleteLeads`, `bulkAssignLeads`, `mergeLeads`. Lists: `getLeadList`, `patchLeadList`, `deleteLeadList`, `getVerificationStats`. Labels: `createLeadLabel`, `listLeadLabel`, … Interest/subsequence: `updateLeadInterestStatus`, `moveLeadToSubsequence`, `removeLeadFromSubsequence`.

## Object shapes that matter

| Field | Set / Read | Notes |
|---|---|---|
| `email`, `first_name`, `last_name`, `company_name` | set | on `createLead` / `bulkAddLeads` |
| `custom_variables` | set | object of your own merge fields |
| `list_id` / `campaign_id` | set | **mutually exclusive** on bulk add/delete — provide exactly one |
| `verify_leads_on_import`, `blocklist_id`, `skip_if_in_workspace/campaign/list` | set | import hygiene |
| `lt_interest_status` / `interest_value` | set | interest state; `null` resets to "Lead" |
| `to_campaign_id` / `to_list_id`, `copy_leads`, `reset_interest_status` | set | on `moveLeads` |

## Gotchas

- **`listLeads` is a `POST`** (`/api/v2/leads/list`) — filters + `limit`/`starting_after` go in the **body**. Chronological ordering is guaranteed only for leads created on/after 2025-10-15.
- **`bulkAddLeads` caps at 1000** leads/call and requires **`campaign_id` XOR `list_id`**.
- **`moveLeads` is async** — it returns a background job; poll it (`waitForBackgroundJob`). When moving by `ids`, also pass the source `campaign`/`list_id`.
- **`updateLeadInterestStatus` and `bulkAssignLeads` return `202`** (accepted, not done).
- **`bulkDeleteLeads`** requires `campaign_id` XOR `list_id`; optional `status`/`ids`/`limit`. Destructive — guard it.

## Snippet — add + verify, then check the list

```ts
await bulkAddLeads(client, { body: { list_id, leads, verify_leads_on_import: true } })
// verification runs in the background; poll list stats before launching a campaign
const stats = await getVerificationStats(client, { path: { id: list_id } })
```

## See also
Example: [`examples/03-add-leads-verify`](../../js/examples). Templates: [`outreach-service`](../../js/templates/outreach-service), [`lead-pipeline`](../../js/templates/lead-pipeline). See [verification](verification.md) and [conventions → pagination](../conventions.md#pagination).
