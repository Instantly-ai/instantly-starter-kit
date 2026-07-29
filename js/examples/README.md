# JS Examples

Six tiny, single-task snippets against [`@instantly-ai/sdk`](../sdk). Copy one, read it, run it. Each does exactly one thing.

## Run

```bash
# Build the SDK once — examples link to its built output (js/sdk/dist)
cd ../sdk && npm install && npm run build && cd ../examples

npm install                      # links the local SDK (file:../sdk) + tsx/types
export INSTANTLY_API_KEY=sk_...  # never hardcode it
npm run 01                       # → 06
```

`npm run typecheck` type-checks all examples against the SDK without hitting the network.

## The examples

| # | File | Does | Writes? |
|---|---|---|---|
| 01 | `01-auth-smoke-check.ts` | List campaigns — confirms your key works (~90s) | read-only |
| 02 | `02-create-campaign-draft.ts` | Create a campaign as a **Draft** + one-step sequence | creates a draft (does **not** send) |
| 03 | `03-add-leads-verify.ts` | Create a list, add a lead, verify on import | creates a list + lead |
| 04 | `04-enrich-supersearch.ts` | Count (free) then enrich from SuperSearch | creates a list, spends credits |
| 05 | `05-launch-campaign.ts` | Preflight then **activate** a campaign | **sends email** — opt-in via `CONFIRM_LAUNCH=1` |
| 06 | `06-reply-webhook.ts` | Minimal reply-webhook receiver (+ how to register) | starts a local server |

## Safety notes

- **01 is read-only** — the "does my key work?" check.
- **02–04 create real objects** in your workspace (a draft campaign, a list, leads). None of them send email.
- **05 sends email** only when you pass `CAMPAIGN_ID` **and** `CONFIRM_LAUNCH=1`; otherwise it prints the preflight and stops.
- **06** starts an HTTP server (`PORT`, default 3000) and verifies a custom `x-shared-secret` header — Instantly provides no HMAC.

See [`docs/conventions.md`](../../docs/conventions.md) and [`docs/api/`](../../docs/api) for the rules these examples follow. The [`outreach-service`](../templates/outreach-service) template composes them into a full flow.
