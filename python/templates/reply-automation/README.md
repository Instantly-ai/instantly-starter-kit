# reply-automation (Python)

Python twin of the [JS `reply-automation`](../../../js/templates/reply-automation). Receive Instantly reply webhooks, **classify** each reply, and **route** it — set the lead's interest status and/or auto-respond.

## Run

```bash
cd python/sdk && pip install -e .        # install the local SDK
cd ../../python/templates/reply-automation
cp .env.example .env                     # WEBHOOK_SECRET, INSTANTLY_API_KEY, ACT_ON_REPLIES
python main.py                           # → reply-automation listening on :3000
```

(Or add `python/sdk` to `PYTHONPATH`.) Boots without a key; classifies + logs always, and only **acts** (sets interest status) when `ACT_ON_REPLIES=1` **and** a key is set.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `POST /webhooks/replies` | verify `x-shared-secret` → classify → (optionally act) | only to act |
| `GET /replies` | recent processed replies | no |

```bash
curl -X POST localhost:3000/webhooks/replies -H 'x-shared-secret: change-me' \
  -H 'content-type: application/json' \
  -d '{"event_type":"reply_received","email_id":"uuid","lead_email":"ada@acme.com","reply_text":"can we book a call?"}'
# → { "classification": { "label": "meeting", "interest_value": 2 }, "acted": false }
```

- `app/classify.py` — keyword classifier → `{label, interest_value}` (mapped to `lt_interest_status`). Swap in your model, or call `test_ai_reply_label_lead_labels`.
- `app/actions.py` — `apply_interest()` → `update_lead_interest_status` (async, HTTP 202). Auto-respond with `email.reply_to_email` using the payload's `email_id` (= `reply_to_uuid`).

See [`docs/api/webhooks.md`](../../../docs/api/webhooks.md) — match on the payload's actual `event_type`; Instantly has no HMAC (the shared-secret header is your delivery-auth).
