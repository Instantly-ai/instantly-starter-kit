# outreach-service (Python hero template)

The Python twin of the [JS `outreach-service`](../../../js/templates/outreach-service) — a runnable wrapper service that takes a BYO audience through the full outbound flow and exposes its status. Seeded from the `campaign-build-and-launch` workflow.

```
BYO audience ─▶ create list ─▶ (enrich) + verify ─▶ create campaign (Draft)
             ─▶ preflight ─▶ launch (activate) ─▶ receive replies (webhook) ─▶ GET /status
```

## Run

```bash
cd python/sdk && pip install -e .        # install the local SDK
cd ../../python/templates/outreach-service
cp .env.example .env                     # set INSTANTLY_API_KEY, WEBHOOK_SECRET, PORT
python main.py                           # → outreach-service listening on :3000
```

(Or add `python/sdk` to `PYTHONPATH` instead of installing the SDK.) The server boots **without** a key; the API routes return `400` until `INSTANTLY_API_KEY` is set.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `POST /runs` | build a run: create list → *(enrich)* → add + verify leads → create campaign **Draft** | yes |
| `POST /runs/<id>/launch` | preflight; **activate** only with `{ "confirm": true }` (sends email) | yes |
| `POST /webhooks/replies?run=<id>` | reply-webhook receiver (verifies `x-shared-secret`; records the reply) | no |
| `GET /status[/<id>]` | run state: list/campaign ids, verification, replies | no |

```bash
curl -X POST localhost:3000/runs -H 'content-type: application/json' -d '{
  "name": "Q3 founders", "senders": ["you@acme.com"],
  "subject": "Quick question, {{firstName}}", "body": "Hi {{firstName}}, …",
  "leads": [{ "email": "ada@example.com", "first_name": "Ada" }]
}'
curl -X POST localhost:3000/runs/RUN_ID/launch -d '{}'                 # preflight only
curl -X POST localhost:3000/runs/RUN_ID/launch -d '{"confirm":true}'   # activates → SENDS
```

Creating a run **never sends** and spends **no credits by default**: lead verification is opt-in (`"verify": true` in the `/runs` body → `verify_leads_on_import`, a credit per lead), and enrichment only runs if you pass `search_filters` (SuperSearch credits).

## Structure

- `app/outreach.py` — the flow, one thin function per step (`create_list`, `enrich_into_list`, `add_and_verify_leads`, `create_campaign_draft`, `preflight`, `launch`, `register_reply_webhook`).
- `app/server.py` — HTTP routing (stdlib `http.server`, no framework).
- `app/store.py` — in-memory run state (swap for a DB in production).
- `app/config.py` — env config. `main.py` — entrypoint.

Conventions honored: create-inactive → activate, verify-before-send, batch leads ≤1000, webhook custom-header auth (no HMAC), `InstantlyApiError` surfaced. See [`docs/conventions.md`](../../../docs/conventions.md) and [`docs/api/`](../../../docs/api).
