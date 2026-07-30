# @instantly-ai/sdk

Typed TypeScript client for the [Instantly](https://instantly.ai) API v2. Generated from `spec/openapi.yaml` so it stays in sync with the API. This is the **runtime** library a wrapper service imports.

> Part of the [Instantly Starter Kit](../../README.md). The Python equivalent lives in [`python/sdk`](../../python/sdk).

## Use it

Not published yet — the kit is clone-based. Scaffolding a project with `create-instantly-app` vendors this SDK into it (`vendor/instantly-sdk`); to use it elsewhere, copy this folder into your app or add it as a `file:` dependency. Once published: `npm install @instantly-ai/sdk`.

Requires Node.js ≥ 18 (uses the global `fetch`).

## Quickstart

```ts
import { createInstantlyClient, listCampaign } from "@instantly-ai/sdk"

const client = createInstantlyClient({ apiKey: process.env.INSTANTLY_API_KEY! })

const result = await listCampaign(client, { query: { limit: 10 } })
console.log(result)
```

Never hardcode your API key — read it from the environment (`INSTANTLY_API_KEY`).

## Design

- **Free functions, not a class.** Every operation is `fn(client, input)` and returns a typed response. Import them by name (e.g. `createCampaign`, `bulkAddLeads`) or via the `resources` namespace.
- **Client config:** `createInstantlyClient({ apiKey, baseUrl?, fetchImpl?, maxRetries?, defaultHeaders? })`. Default `baseUrl` is `https://api.instantly.ai`; requests target `/api/v2/...` with `Authorization: Bearer <key>`.
- **Retries:** automatic on `429` and `5xx` (linear backoff), controlled by `maxRetries` (default 1).
- **Errors:** non-2xx responses throw `InstantlyApiError` with `status`, `statusText`, and the parsed `payload`.

```ts
import { InstantlyApiError } from "@instantly-ai/sdk"

try {
  await getCampaign(client, { path: { id } })
} catch (err) {
  if (err instanceof InstantlyApiError) {
    console.error(err.status, err.payload) // { statusCode, error, message }
  }
}
```

## Async operations (polling)

Some flows are asynchronous. Use the polling helpers:

```ts
import { polling } from "@instantly-ai/sdk"

// Background jobs (e.g. move leads, enable/disable warmup, verify-on-import)
const job = await polling.waitForBackgroundJob(client, jobId)

// OAuth session (connect a Google/Microsoft sender)
const session = await polling.pollOauthSessionStatus(client, sessionId)
```

See [`docs/conventions.md`](../../docs/conventions.md) for pagination, rate limits, scopes, and the full async model, and [`docs/api/`](../../docs/api) for goal-first guides per API group.

## Development

The `src/` tree is **generated** — do not edit it by hand. Regenerate from the spec:

```bash
python3 docs/context/scripts/internal/build_wrapper_builder_system.py
```

Package scaffolding (`package.json`, `tsconfig*.json`, this README) is hand-owned and is not overwritten by the generator.

```bash
npm run typecheck   # tsc --noEmit
npm run build       # emit dist/ (JS + .d.ts)
```
