# reply-automation

Receive Instantly reply webhooks, **classify** each reply, and **route** it — set the lead's interest status and/or auto-respond. Seeded from the `webhook-to-crm-sync` workflow. JS-first.

```
webhook (reply_received) ─▶ verify x-shared-secret ─▶ classify ─▶ set interest status / reply
```

## Run

```bash
cd js/sdk && npm install && npm run build && cd -   # build the SDK once (from repo root)
cd js/templates/reply-automation
npm install
cp .env.example .env      # WEBHOOK_SECRET, INSTANTLY_API_KEY, ACT_ON_REPLIES
npm start                 # → reply-automation listening on :3000
```

Boots without a key. It always classifies + logs; it only **acts** (sets interest status) when `ACT_ON_REPLIES=1` **and** a key is set.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `POST /webhooks/replies` | verify secret → classify → (optionally act) | only to act |
| `GET /replies` | recent processed replies | no |

```bash
curl -X POST localhost:3000/webhooks/replies -H 'x-shared-secret: change-me' \
  -H 'content-type: application/json' \
  -d '{"event_type":"reply_received","email_id":"uuid","lead_email":"ada@acme.com","reply_text":"Sounds good, can we book a call?"}'
# → { "classification": { "label": "meeting", "interestValue": 2 }, "acted": false }
```

## How it works

- `src/classify.ts` — a tiny, dependency-free keyword classifier → `{ label, interestValue }` (mapped to `lt_interest_status`). Swap in your own model, or call `testAiReplyLabelLeadLabels` for AI labels (rate-limited 500/30d).
- `src/actions.ts` — `applyInterest()` calls `updateLeadInterestStatus` (async, HTTP 202). To auto-respond, use `emails.replyToEmail` with the payload's `email_id` (= `reply_to_uuid`).
- `src/server.ts` — routing + shared-secret verification (Instantly has no HMAC).

Register the webhook to point at `POST {PUBLIC_URL}/webhooks/replies` with your `WEBHOOK_SECRET`. Match on the payload's actual `event_type` (may differ from the subscription enum — see [`docs/api/webhooks.md`](../../../docs/api/webhooks.md)).
