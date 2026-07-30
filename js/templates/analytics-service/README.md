# analytics-service

Pull Instantly analytics on a schedule, **normalize** them into one stable snapshot, and serve it as a JSON feed for a dashboard. JS-first.

```
scheduler (every REFRESH_MS) ─▶ pull campaigns + accounts + events ─▶ normalize ─▶ cache
GET /analytics (live)  ·  GET /analytics/cached (last snapshot)
```

## Run

```bash
cd js/sdk && npm install && npm run build && cd -   # build the SDK once (from repo root)
cd js/templates/analytics-service
npm install
cp .env.example .env      # INSTANTLY_API_KEY, PORT, REFRESH_MS
npm start                 # → analytics-service listening on :3000
```

Boots without a key; `/analytics` returns `400` and the scheduler stays disabled until `INSTANTLY_API_KEY` is set.

## Endpoints

| Method + path | Does | Needs key |
|---|---|---|
| `GET /health` | liveness | no |
| `GET /analytics` | live pull + normalize (also updates the cache) | yes |
| `GET /analytics/cached` | last scheduler snapshot (no live call) | no (503 until first refresh) |

## What it pulls (see [`docs/api/analytics.md`](../../../docs/api/analytics.md))

`getCampaignAnalytics` (all campaigns — `id` omitted), `getCampaignAnalyticsOverview`, `getDailyCampaignAnalytics`, `getDailyAccountAnalytics`, `getWebhookEventsSummary` — normalized into:

```json
{ "generatedAt": "…", "campaigns": { "all": …, "overview": …, "daily": … },
  "accounts": { "daily": … }, "events": { "summary": … } }
```

`getWarmupAnalytics` is intentionally omitted from the auto-pull — it's a `POST` requiring a specific `emails[]` list; add it per-account if you need warmup detail.

## Notes

- The scheduler (`REFRESH_MS`, default 5 min) spreads load — analytics reads count against the workspace rate limit (100/s, 6000/min). Widen the interval or scope by campaign as your data grows.
- **Graceful degradation:** the daily pulls are bounded to a 30-day window and run via `Promise.allSettled`, so a single failing pull is recorded under the snapshot's `errors` map instead of failing the whole endpoint. On busy workspaces `getDailyAccountAnalytics` can still return `413` ("add an emails filter or a smaller date range") — narrow the window or scope it with `emails` for that pull.
- Swap the in-memory cache for your datastore, and `GET /analytics/cached` for your dashboard's data source.
