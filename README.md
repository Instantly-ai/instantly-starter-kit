# Instantly Starter Kit

Everything you need to build a productized outreach service on top of [Instantly](https://instantly.ai) — a typed SDK for your backend, forkable service templates, copy-paste examples, and a build-time agent layer that already knows the API.

Use Instantly for the email / deliverability / inbox / analytics backend; add your own audience, logic, and UI on top. **Runtime = the SDK your service imports. Build-time = `AGENTS.md` + `docs/`.** No runtime CLI — but a one-command scaffolder gets you a project (below).

## Create a wrapper in one command

Scaffold a project — a template + the SDK + `AGENTS.md` + `docs/`, ready to build:

```bash
npx create-instantly-app@latest my-app
# pick a specific template + language directly:
npx create-instantly-app@latest my-analytics --template analytics-service --js
npx create-instantly-app@latest my-outreach  --template outreach-service  --python -y
```

Templates: `outreach-service` (hero) · `reply-automation` · `analytics-service` · `lead-pipeline` · `minimal`.

Then **build with your AI agent** — open the new folder in Claude Code / Cursor and paste this to kick things off:

> Read `AGENTS.md` in this project, then be my Instantly build guide. **Start by asking me what I'm trying to build** — my product, the client/campaigns I run, and what the service should do. Then recommend which API groups + template fit, load the relevant `docs/api/*`, propose a short plan, and build it with me using this project's SDK. Follow the kit's conventions (create-inactive → activate, verify-before-send, poll async jobs) and never hardcode my API key.

The agent already knows the API — everything it needs (`AGENTS.md`, `docs/`, the full `spec/openapi.yaml`, the typed SDK) ships inside the project.

> **Pre-publish:** until the package is on npm, run the scaffolder from a checkout of this repo — same flags:
> ```bash
> git clone https://github.com/Instantly-ai/instantly-starter-kit && cd instantly-starter-kit
> node create-instantly-app/index.js my-analytics --template analytics-service --js
> ```
> The SDK is **vendored** into the generated project, so it runs offline with nothing published.

## Quickstart (~90s)

Get a key (**Settings → Integrations → API Keys**), then run the auth smoke check:

```bash
export INSTANTLY_API_KEY=sk_...
cd js/sdk && npm install && npm run build && cd ..   # build the SDK once
cd js/examples && npm install && npm run 01          # → lists your campaigns
```

Full walkthrough (JS + Python): [`docs/quickstart.md`](docs/quickstart.md).

## What's inside

| | |
|---|---|
| **[`spec/openapi.yaml`](spec/openapi.yaml)** | Source of truth — both SDKs generate from this (OpenAPI 3.1, 168 operations / 28 groups). |
| **[`js/sdk`](js/sdk)** (`@instantly-ai/sdk`) · **[`python/sdk`](python/sdk)** (`instantly-sdk`) | Typed clients, one function per operation, typed errors, async polling helpers. Zero runtime deps. |
| **[`docs/`](docs)** | [`quickstart.md`](docs/quickstart.md), [`conventions.md`](docs/conventions.md) (auth, pagination, rate limits, async, deliverability), and goal-first [`api/`](docs/api) guides per group. |
| **[`AGENTS.md`](AGENTS.md)** | The build-time agent entry: API-group map, conventions, and a guided flow for building a wrapper. |
| **[`js/examples`](js/examples) · [`python/examples`](python/examples)** | Six single-task snippets each (auth, create campaign, add + verify leads, enrich, launch, reply webhook). |
| **[`js/templates`](js/templates)** | Runnable services: **[outreach-service](js/templates/outreach-service)** (hero, JS + [Python](python/templates/outreach-service)), [reply-automation](js/templates/reply-automation), [analytics-service](js/templates/analytics-service), [lead-pipeline](js/templates/lead-pipeline). |

## Install the SDK in your own service

```bash
npm install @instantly-ai/sdk          # JS (published from js/sdk)
pip install instantly-sdk              # Python (published from python/sdk)
```

```ts
import { createInstantlyClient, listCampaign } from "@instantly-ai/sdk"
const client = createInstantlyClient({ apiKey: process.env.INSTANTLY_API_KEY! })
await listCampaign(client, { query: { limit: 10 } })
```

## Build something new

Open [`AGENTS.md`](AGENTS.md) in your coding agent. It asks what you're building, routes you to the right [`docs/api/`](docs/api) guides, and helps you scaffold from a template. Key conventions to know up front: campaigns **create inactive → activate**, **verify before you send**, and **poll async jobs** — all in [`docs/conventions.md`](docs/conventions.md).

## How the SDKs are built

Both SDKs are **generated from [`spec/openapi.yaml`](spec/openapi.yaml)** (one source → JS + Python stay in sync). The generated code (`js/sdk/src/**`, `python/sdk/instantly/**`) is committed, so you don't need to build anything to use them. The generator + regeneration workflow are maintainer tooling.

## License

MIT — see [`LICENSE`](LICENSE).
