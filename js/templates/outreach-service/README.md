# outreach-service (hero template)

A runnable wrapper service that takes a BYO audience through the full outbound flow and exposes its status — the reference for building on the Instantly SDK. Seeded from the `campaign-build-and-launch` workflow.

```
BYO audience ─▶ create list ─▶ (enrich) + verify ─▶ create campaign (Draft)
             ─▶ preflight ─▶ launch (activate) ─▶ receive replies (webhook) ─▶ GET /status
```

Shipped in **JS** (this) and **Python** ([`python/templates/outreach-service`](../../../python/templates/outreach-service)).

## Run

```bash
cd js/sdk && npm install && npm run build && cd -   # build the SDK once (from repo root)
cd js/templates/outreach-service
npm install                 # links the local SDK (file:../../sdk)
cp .env.example .env        # set INSTANTLY_API_KEY, WEBHOOK_SECRET, PORT
npm start                   # → outreach-service listening on :3000
```

The server boots **without** a key; the API routes return `400` until `INSTANTLY_API_KEY` is set. `npm run typecheck` checks it against the SDK.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `POST /runs` | build a run: create list → *(enrich)* → add + verify leads → create campaign **Draft** | yes |
| `POST /runs/:id/launch` | preflight; **activate** only with `{ "confirm": true }` (sends email) | yes |
| `POST /webhooks/replies?run=:id` | reply-webhook receiver (verifies `x-shared-secret`; records the reply) | no |
| `GET /status[/:id]` | run state: list/campaign ids, verification, replies | no |

### Build a run

```bash
curl -X POST localhost:3000/runs -H 'content-type: application/json' -d '{
  "name": "Q3 founders",
  "senders": ["you@acme.com"],
  "subject": "Quick question, {{firstName}}",
  "body": "Hi {{firstName}}, …",
  "leads": [{ "email": "ada@example.com", "first_name": "Ada" }]
}'
# → { "runId": "…", "listId": "…", "campaignId": "…", "status": "ready" }
```

Creating a run **never sends** — the campaign is a Draft. It also spends **no credits by default**: lead verification is opt-in (`"verify": true` in the `/runs` body → `verify_leads_on_import`, a credit per lead), and enrichment only runs if you pass `searchFilters` (SuperSearch credits). Launch is separate and explicit:

```bash
curl -X POST localhost:3000/runs/RUN_ID/launch -H 'content-type: application/json' -d '{}'          # preflight only
curl -X POST localhost:3000/runs/RUN_ID/launch -H 'content-type: application/json' -d '{"confirm":true}'  # activates → SENDS
```

## How it maps to the SDK

- `src/outreach.ts` — the flow, one thin function per step (`createList`, `enrichIntoList`, `addAndVerifyLeads`, `createCampaignDraft`, `preflight`, `launch`, `registerReplyWebhook`). All grounded in [`docs/api/*`](../../../docs/api).
- `src/server.ts` — HTTP routing (stdlib `node:http`, no framework).
- `src/store.ts` — in-memory run state (swap for a DB in production).
- `src/config.ts` — env config.

Conventions honored: create-inactive → activate, verify-before-send, batch leads ≤1000, webhook custom-header auth (no HMAC), `InstantlyApiError` surfaced. See [`docs/conventions.md`](../../../docs/conventions.md).

## Register the reply webhook

Point Instantly at `POST {PUBLIC_URL}/webhooks/replies?run=RUN_ID` with your `WEBHOOK_SECRET` via `registerReplyWebhook()` (in `src/outreach.ts`). Instantly provides no HMAC — the shared-secret header is your delivery-auth.
