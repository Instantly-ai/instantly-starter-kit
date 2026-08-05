# outbound-ops

Daily outbound operations on top of the [Instantly](https://instantly.ai) SDK — the recurring loop a starter kit usually skips. Two commands:

- **`brief`** — the morning digest: sender health, yesterday's numbers, replies waiting, and the **top 2 things to fix today** with the command to fix each. Read-only, deterministic, schedulable.
- **`incident`** — when deliverability tanks: diagnose the likely cause and (on confirm) shift sending to your backups. *(added next milestone)*

## Run

```bash
cp .env.example .env         # add your INSTANTLY_API_KEY
npm install                  # links the local SDK
npm run brief                # read-only — prints your morning brief
npm run brief -- --raw       # + the raw payloads, for tuning
```

## The morning brief

`brief` reads (read-only): connected senders + health (`listAccount` status / warmup_status), yesterday's campaign overview (`getCampaignAnalyticsOverview`), and replies waiting (`countUnreadEmails`). It applies the thresholds in [`lib/thresholds.ts`](lib/thresholds.ts) (editable), ranks the two most urgent actions, and prints each with a runnable next step. Nothing is written or sent.

```
☀️  Outbound brief — 2026-03-04 09:02 UTC
Yesterday: 1240 sent · 39 replies · 22 bounced
Senders: 14/16 healthy · ⚠️ 2 flagged
   • s3@acme.com (warmup -2)
   • s7@acme.com (status -1)
Replies waiting: 41
Fix today:
  1) 2 sender(s) unhealthy — deliverability risk  →  npm run incident
  2) 41 replies waiting  →  reply in Instantly Unibox → app.instantly.ai
```

## Run it every morning

`brief` is a plain command with no side effects, so schedule it however you already run jobs (cron, your task runner, a CI schedule) and pipe the output to Slack/email:

```bash
# crontab: 9am weekdays
0 9 * * 1-5  cd /path/to/outbound-ops && npm run --silent brief >> ~/brief.log
```

## Use it in your own service

The commands are thin wrappers over an importable class — you don't have to shell out. Import `OutboundOps` and call it from your backend:

```ts
import { createInstantlyClient } from "@instantly-ai/sdk"
import { OutboundOps } from "./lib/ops.js"

const ops = new OutboundOps(createInstantlyClient({ apiKey: process.env.INSTANTLY_API_KEY! }))

const brief = await ops.brief()           // { health, replies, overview, actions } — post to Slack, expose as a route…
const diag  = await ops.diagnose({ domains: ["acme.com"] })  // read-only; returns an inspectable `plan`
if (!diag.ready) await ops.contain(diag)  // execute containment when YOU decide
```

`server.ts` is a ready example that exposes these over HTTP — `npm run serve` → `GET /brief`, `GET /incident`. Formatting (`renderBrief` / `renderDiagnosis`) is separate, so the class returns raw data by default.

## Notes

- **Read-only.** `brief` never writes; `incident` gates every destructive action behind an explicit confirm.
- **Thresholds are data** — edit `lib/thresholds.ts`, don't fork the logic.
- **Agency:** set `AS_WORKSPACE=<sub_workspace_id>` (with an admin key) to run the brief for a specific client sub-workspace.
- Reply *handling* stays in Instantly's own Unibox / AI inbox — this brief points you there rather than duplicating it.

Part of the [Instantly Starter Kit](../../../README.md). Conventions: [`docs/conventions.md`](../../../docs/conventions.md).
