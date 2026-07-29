# Campaigns

Create, configure, launch, and monitor outbound campaigns. A campaign holds the email **sequence**, the **schedule**, the **sender accounts**, and sending rules. Reach for this group when your product builds and runs outreach on the user's behalf. Related: [leads](leads.md) (who you send to), [accounts](accounts.md) (who you send from), [analytics](analytics.md) (how it did), [webhooks](webhooks.md) (replies).

## The one rule that trips everyone up

**Creating a campaign never sends.** `createCampaign` returns a **Draft** (`status: 0`). You start it with a *separate* call, `activateCampaign`, and only after a preflight. See [conventions → create-inactive → activate](../conventions.md#campaigns-create-inactive--activate).

## Key operations (SDK calls)

```ts
import { createCampaign, activateCampaign, pauseCampaign,
         getCampaignSendingStatus, listCampaign } from "@instantly-ai/sdk"

// 1) Create as a draft (does NOT send)
const draft = await createCampaign(client, {
  body: {
    name: "Q3 – founders",
    campaign_schedule: { schedules: [/* days/hours/timezone */] },
    sequences: [{ steps: [/* subject + body + delay */] }],  // only sequences[0] is used
    email_list: ["sender1@acme.com"],                         // sender accounts
    stop_on_reply: true,
  },
})

// 2) Launch it (separate, explicit — gate behind a preflight)
await activateCampaign(client, { path: { id: draft.id } })

// 3) Why isn't it sending?
const status = await getCampaignSendingStatus(client, { path: { id: draft.id } })
```

Also: `getCampaign`, `patchCampaign`, `deleteCampaign`, `duplicate`, `shareCampaign`, `addVariables`, and the analytics ops (see [analytics](analytics.md)).

## Object shapes that matter

| Field | Set / Read | Notes |
|---|---|---|
| `name` | set (required) | |
| `campaign_schedule` | set (required) | sending windows + timezone |
| `sequences` | set | array, but **only `sequences[0]`** is used for the email copy |
| `email_list` | set | sender accounts; on `patchCampaign` this **replaces** the list |
| `stop_on_reply`, `stop_on_auto_reply`, `stop_for_company` | set | auto-stop rules |
| `open_tracking`, `link_tracking`, `text_only`, `insert_unsubscribe_header` | set | |
| `daily_limit`, `daily_max_leads`, `email_gap`, `random_wait_max` | set | pacing |
| `allow_risky_contacts` | set | default off → risky contacts skipped (keep off; see [verification](verification.md)) |
| `status` | **read** | `0` Draft, `1` Active, `2` Paused, `3` Completed, `4` Running Subsequences, negatives = suspended/unhealthy |

## Gotchas

- **`getCampaignSendingStatus`**: the response splits by state — while **sending**, the reason + `issue_tracking` live under **`diagnostics`**; for a **draft/paused** campaign `diagnostics` is `null` and the reason is under **`summary`**. So read the reason as **`diagnostics?.status ?? summary?.status`** (a *reason* string: `campaign_draft`, `out_of_schedule`, `waiting_for_leads`, `daily_limit_met`, `all_accounts_unhealthy`, `healthy`, …) — distinct from the numeric campaign `status`. Some fields are absent when out of schedule. Optional `with_ai_summary` query param.
- **`shareCampaign`** returns `204` and shares for **7 days**; re-call to keep sharing.
- **`patchCampaign`** takes the same body as create (name optional); sending `email_list` replaces senders.
- Subsequences (follow-up sequences triggered by lead behavior) are a separate group — create/manage them via the subsequence operations, then move leads in with `moveLeadToSubsequence`.

## Preflight before activate

1. Leads attached and **verified** (`getVerificationStats` on the list; [verification](verification.md)).
2. Senders in `email_list` are **connected + healthy** (`listAccount` / `testAccountVitals`; [accounts](accounts.md)).
3. Then `activateCampaign`; poll `getCampaignSendingStatus` to confirm `healthy`.

## See also
Example: [`examples/02-create-campaign-draft`](../../js/examples) · [`examples/05-launch-campaign`](../../js/examples). Template: [`outreach-service`](../../js/templates/outreach-service) (full list → verify → campaign → launch → replies).
