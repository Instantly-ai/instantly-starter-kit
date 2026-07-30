<p align="center">
  <img src="scripts/logo.png" width="72" alt="Instantly">
</p>

<h1 align="center">Instantly Starter Kit</h1>

<p align="center">
  Build wrapper services on top of the <a href="https://instantly.ai">Instantly</a> API —
  typed SDKs (JavaScript + Python), AI-first docs, runnable templates, and a one-command scaffolder.
</p>

<p align="center">
  📖 <b><a href="docs/index.html">Documentation</a></b> (open locally)
  &nbsp;·&nbsp; <a href="docs">browse the guides</a>
  &nbsp;·&nbsp; 🤖 <a href="llms.txt">llms.txt</a> (for agents)
  &nbsp;·&nbsp; ⚡ <a href="#clone--scaffold">Get started</a>
</p>

> The docs live in this repo. Browse the markdown guides in [`docs/`](docs) on GitHub, or open the self-contained [`docs/index.html`](docs/index.html) locally for the full styled site (sidebar, search, dark mode). It can be published later via GitHub Pages (`main` / `docs`), but there's no hosted URL yet.

---

## What this is

Companies build productized outreach services on top of Instantly — using it for the email / deliverability / inbox / analytics backend, and adding their own audience, logic, and UI. This kit gets a developer (and their AI coding agent) from "I have an API key" to a working wrapper fast.

- **Runtime** = the SDK your service imports.
- **Build-time** = `AGENTS.md` + `docs/` — everything a coding agent needs to build correctly.
- **No CLI in production.** There's a build-time *scaffolder*, but wrapper services just import the SDK.

> **Status: repo-based (pre-publish).** Nothing is on npm/PyPI yet — you clone the kit and everything runs offline (the scaffolder vendors the SDK into each project). Registry installs (`npm install @instantly-ai/sdk` / `pip install instantly-sdk`) and `npx create-instantly-app` arrive when the packages are published.

## Contents

[Clone & scaffold](#clone--scaffold) · [Build with AI](#build-with-ai) · [What's inside](#whats-inside) · [Using the SDK](#using-the-sdk) · [Conventions](#conventions) · [API reference](#api-reference) · [Templates](#templates) · [Examples](#examples) · [The scaffolder](#the-scaffolder) · [Docs & llms.txt](#docs--llmstxt) · [How the SDKs are built](#how-the-sdks-are-built) · [Repository layout](#repository-layout)

## Clone & scaffold

Clone the kit, then scaffold a project — a template + the SDK + `AGENTS.md` + `docs/` + the full spec, ready to build:

```bash
git clone https://github.com/Instantly-ai/instantly-starter-kit
cd instantly-starter-kit

# scaffold a project (the SDK is vendored in, so it runs offline):
node create-instantly-app/index.js my-analytics --template analytics-service --js
node create-instantly-app/index.js my-outreach  --template outreach-service  --python -y
```

Or just try the SDK directly — the ~90s auth smoke check:

```bash
export INSTANTLY_API_KEY=sk_...                       # get one: Settings → Integrations → API Keys
cd js/sdk && npm install && npm run build && cd ..    # build the SDK once
cd js/examples && npm install && npm run 01           # → lists your campaigns
```

Full walkthrough (JS + Python): [`docs/quickstart.md`](docs/quickstart.md).

## Build with AI

The kit is written for coding agents. Scaffold a project, open it in Claude Code / Cursor, and paste this to kick off:

> Read `AGENTS.md` in this project, then be my Instantly build guide. **Start by asking me what I'm trying to build** — my product, the client/campaigns I run, and what the service should do. Then recommend which API groups + template fit, load the relevant `docs/api/*`, propose a short plan, and build it with me using this project's SDK. Follow the kit's conventions (create-inactive → activate, verify-before-send, poll async jobs) and never hardcode my API key.

The agent already knows the API — every scaffolded project ships [`AGENTS.md`](AGENTS.md) (the always-on map + rules), the goal-first [`docs/`](docs), the full [`spec/openapi.yaml`](spec/openapi.yaml), [`llms.txt`](llms.txt) / `llms-full.txt` (one-shot context), and the typed SDK.

## What's inside

| Path | What it is |
|---|---|
| [`AGENTS.md`](AGENTS.md) | The agent entry point: what the kit is, the 28-group API map, conventions, and a guided build flow. Coding agents read this first. |
| [`spec/openapi.yaml`](spec/openapi.yaml) | Source of truth — OpenAPI 3.1, **168 operations / 28 resource groups**. Both SDKs generate from it. |
| [`js/sdk`](js/sdk) · [`python/sdk`](python/sdk) | Typed clients (`@instantly-ai/sdk` · `instantly-sdk`). One function per operation, a typed error, async polling helpers. **Zero runtime deps.** |
| [`docs/`](docs) | [`quickstart.md`](docs/quickstart.md), [`conventions.md`](docs/conventions.md), goal-first [`api/`](docs/api) guides (8 groups), and the generated [`index.html`](docs/index.html) docs site. |
| [`js/examples`](js/examples) · [`python/examples`](python/examples) | Six single-task snippets each — auth, create-draft, add + verify leads, enrich, launch, reply webhook. |
| [`js/templates`](js/templates) · [`python/templates`](python/templates) | Four runnable service skeletons (below). |
| [`create-instantly-app`](create-instantly-app) | The scaffolder that turns any of the above into a ready-to-build project. |
| [`llms.txt`](llms.txt) · `llms-full.txt` | AI-ingestion: a curated index + the whole knowledge base concatenated. |

## Using the SDK

Free functions grouped by resource — one per operation. Same shape in both languages (JS `camelCase`, Python `snake_case`); the request is `{ path?, query?, body? }`.

```ts
import { createInstantlyClient, listCampaign, InstantlyApiError } from "@instantly-ai/sdk"

const client = createInstantlyClient({ apiKey: process.env.INSTANTLY_API_KEY! })
try {
  const campaigns = await listCampaign(client, { query: { limit: 10 } })
} catch (err) {
  if (err instanceof InstantlyApiError) console.error(err.status, err.payload)
}
```

```python
from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import list_campaign

client = create_instantly_client(os.environ["INSTANTLY_API_KEY"])
campaigns = list_campaign(client, {"query": {"limit": 10}})
```

Async operations expose polling helpers (`waitForBackgroundJob`, `pollOauthSessionStatus`). To use the SDK in an existing app before publish: scaffold (it vendors the SDK), or copy [`js/sdk`](js/sdk) / [`python/sdk`](python/sdk) in. Details: [`js/sdk/README.md`](js/sdk/README.md) · [`python/sdk/README.md`](python/sdk/README.md).

## Conventions

The cross-cutting rules the whole API assumes — full detail in [`docs/conventions.md`](docs/conventions.md):

- **Auth** — `Authorization: Bearer <key>` from the environment, never hardcoded. Base URL `https://api.instantly.ai`, all paths under `/api/v2`.
- **Create → activate** — creating a campaign never sends; it's a Draft (`status 0`). `activateCampaign` is a separate, explicit step behind a preflight.
- **Verify before send** — verify recipients first; verification and enrichment spend credits, so they're always opt-in.
- **Poll async jobs** — some ops return a job or `202`; poll `/background-jobs/:id`. Verification & OAuth poll by status.
- **Pagination** — cursor-based (`limit` + `starting_after` → `next_starting_after`); `listLeads` is a `POST`.
- **Rate limits** — 100 req/s & 6000 req/min workspace-wide; the SDK retries `429`/`5xx` with backoff.
- **Errors** — non-2xx throws `InstantlyApiError` with `status` + parsed `payload` (`{ statusCode, error, message }`).

## API reference

Goal-first guides — what each group is, when to use it, key operations as SDK calls, the shapes that matter, and gotchas:

[Campaigns](docs/api/campaigns.md) · [Leads](docs/api/leads.md) · [Enrichment](docs/api/enrichment.md) · [Verification](docs/api/verification.md) · [Emails](docs/api/emails.md) · [Analytics](docs/api/analytics.md) · [Accounts](docs/api/accounts.md) · [Webhooks](docs/api/webhooks.md)

For any group not covered above (workspace, api-keys, blocklist, custom tags, inbox-placement, DFY, …), the typed SDK + [`spec/openapi.yaml`](spec/openapi.yaml) have every operation.

## Templates

Runnable service skeletons to fork (`create-instantly-app --template <name>`):

| Template | Does | Languages |
|---|---|---|
| **outreach-service** *(hero)* | BYO audience → list → enrich + verify → campaign → launch → reply webhook → status | JS + Python |
| **reply-automation** | webhook receiver → classify reply → set interest / auto-respond | JS + Python |
| **analytics-service** | scheduled analytics pull → normalize → JSON feed for a dashboard | JS + Python |
| **lead-pipeline** | SuperSearch → enrich → verify → dedupe → sync to a DB/CRM | JS + Python |
| **minimal** | just the SDK + `AGENTS.md` + docs — a blank canvas | JS + Python |

## Examples

Six copy-paste snippets, one task each, in [`js/examples`](js/examples) and [`python/examples`](python/examples):

`01` auth smoke check · `02` create a draft campaign · `03` add + verify leads · `04` enrich from SuperSearch · `05` launch (preflight) · `06` handle a reply webhook.

## The scaffolder

[`create-instantly-app`](create-instantly-app) copies a template + `docs/` + `spec/openapi.yaml` + `llms.txt` + a project-tailored `AGENTS.md`, and **vendors the SDK** into the project so it runs offline.

```
node create-instantly-app/index.js [dir] [options]
  --template <outreach-service|reply-automation|analytics-service|lead-pipeline|minimal>
  --js | --python        target language
  --no-install           skip installing dependencies
  -y, --yes              accept defaults, no prompts
```

Missing choices are asked interactively. Details: [`create-instantly-app/README.md`](create-instantly-app/README.md).

## Docs & llms.txt

- **Humans:** open [`docs/index.html`](docs/index.html) for the styled offline site (sidebar nav, search, light/dark, on-brand), or browse the markdown guides in [`docs/`](docs).
- **Agents:** [`llms.txt`](llms.txt) (a curated, linked index) and `llms-full.txt` (AGENTS.md + conventions + all API guides + quickstart, concatenated for one-shot context). Both are copied into every scaffolded project.

Regenerate the docs site + llms files from the markdown:

```bash
cd scripts && npm install && npm run build   # writes docs/index.html + llms.txt + llms-full.txt
```

## How the SDKs are built

Both SDKs are **generated from [`spec/openapi.yaml`](spec/openapi.yaml)** so JavaScript and Python stay in sync. The generated code (`js/sdk/src/**`, `python/sdk/instantly/**`) is committed, so you don't need to build anything to use the kit. Regeneration is maintainer tooling.

## Repository layout

```
instantly-starter-kit/
├── AGENTS.md                 # agent entry point
├── spec/openapi.yaml         # source of truth (28 groups / 168 ops)
├── docs/                     # quickstart · conventions · api/* · index.html (docs site)
├── js/    { sdk, examples, templates/* }
├── python/{ sdk, examples, templates/* }
├── create-instantly-app/     # the scaffolder
├── scripts/                  # docs-site generator (build-docs.mjs)
├── llms.txt · llms-full.txt  # AI-ingestion
└── README.md · LICENSE
```

## License

MIT — see [`LICENSE`](LICENSE).
