# analytics-service (Python)

Python twin of the [JS `analytics-service`](../../../js/templates/analytics-service). Pull Instantly analytics on a schedule, **normalize** into one snapshot, and serve it as a JSON feed.

## Run

```bash
cd python/sdk && pip install -e .        # install the local SDK
cd ../../python/templates/analytics-service
cp .env.example .env                     # INSTANTLY_API_KEY, PORT, REFRESH_MS
python main.py                           # → analytics-service listening on :3000
```

Boots without a key; `/analytics` returns `400` and the scheduler stays disabled until `INSTANTLY_API_KEY` is set.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `GET /analytics` | live pull + normalize (updates cache) | yes |
| `GET /analytics/cached` | last scheduler snapshot | no (503 until first refresh) |

Pulls `get_campaign_analytics` (all — `id` omitted), `get_campaign_analytics_overview`, `get_daily_campaign_analytics`, `get_daily_account_analytics`, `get_webhook_events_summary` → normalized into `{ generated_at, campaigns, accounts, events }`. A daemon thread (`REFRESH_MS`, default 5 min) refreshes the cache.

`get_warmup_analytics` is omitted from the auto-pull (it's a `POST` needing a specific `emails[]`). Analytics reads count against the workspace rate limit — widen the interval as your data grows. See [`docs/api/analytics.md`](../../../docs/api/analytics.md).

**Graceful degradation:** the daily pulls are bounded to a 30-day window and wrapped per-pull, so a failing pull is recorded under the snapshot's `errors` map instead of failing the whole snapshot. On busy workspaces `get_daily_account_analytics` can still return `413` — narrow the window or scope it with `emails` for that pull.
