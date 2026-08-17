# @instantly-ai/ops

Higher-level Instantly operations — reads, rollups, agency fan-out, demo
fixtures, and async job polling — built over [`@instantly-ai/sdk`](../sdk). This
is the **shared domain core** the Agency Console (and your own service) imports so
the UI never touches the SDK or raw `fetch` directly.

**Server-side only.** It reads `INSTANTLY_API_KEY` from the environment; never
import it into browser code.

```ts
import { overviewRollup, listCampaigns, awaitJob, forWorkspace } from "@instantly-ai/ops"
```

- `opsClient()` / `forWorkspace(subId)` — the SDK client and the `x-as-workspace`
  agency fan-out primitive (`client.ts`).
- Per-surface reads: `overviewRollup`, `listCampaigns` / `campaignDetail`,
  `listReplies` / `getThread`, `analyticsFor`, `listDeliverability`, `leadsFor`,
  `enrichmentOverview`, `verifyEmail`.
- Agency-wide fan-out: `allInbox`, `allCampaigns`, `allAnalytics`, …
  (`agency.ts`).
- Cross-cutting: `awaitJob` (poll async jobs), `parseWebhook`, `importLeads`,
  and the demo helpers (`useFixtures`, `mask*`).

Full module map, conventions, and the SDK operations behind each surface:
**[../dashboard/REFERENCE.md](../dashboard/REFERENCE.md)**.

## Build

```bash
npm install
npm run build      # tsc → dist/
```
