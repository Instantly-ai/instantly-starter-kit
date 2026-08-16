# Agency Console — reference

The architecture, the domain-core (`js/ops`) surface, the conventions, and how to
extend it. For a guided version with screenshots, open **Learn** in the app
(`/learn`). For setup, see the [README](README.md).

---

## The three layers

```
@instantly-ai/sdk            typed client — one method per Instantly API operation
        ↓
@instantly-ai/ops  (js/ops)  domain core — reads, rollups, agency fan-out,
                             demo fixtures, job polling. SERVER-ONLY.
        ↓
js/dashboard/core            Next.js App Router — the only layer with JSX.
                             Server components read; server actions write.
```

**Rule:** the UI imports `js/ops`, never the SDK or raw `fetch`. Every Instantly
call runs server-side, so the API key never reaches the browser.

## The client + the agency fan-out primitive

`js/ops/src/client.ts` builds the SDK client from the environment:

```ts
opsClient()                    // the key's own workspace (or AS_WORKSPACE if set)
forWorkspace(subWorkspaceId)   // act AS a client sub-workspace — the fan-out primitive
```

`forWorkspace` sets the `x-as-workspace` header, which is how an **agency admin
key** operates inside a specific client workspace. `clientFor(id)` in
`workspaces.ts` picks the right client for a given surface (agency vs single mode).

- **Agency mode:** `listClients()` discovers client sub-workspaces
  (`listWorkspaceGroupMember`), then each agency-wide read fans out with
  `forWorkspace` per client and merges.
- **Single mode:** one workspace, no fan-out.

Both `listClients()` and the agency/single decision are TTL-memoised so a page
render doesn't re-discover workspaces on every module.

## Domain-core module map (`js/ops/src`)

| Module | Key exports | Surface it powers |
|---|---|---|
| `client.ts` | `opsClient`, `forWorkspace`, `resolveApiKey` | SDK client + fan-out |
| `workspaces.ts` | `listClients`, `clientFor` | Client discovery / roster |
| `rollup.ts` | `overviewRollup`, `getPlanName` | Overview stats + roster |
| `health.ts` | `listSenders` | Sender health |
| `campaigns.ts` | `listCampaigns`, `campaignDetail`, `activateCampaignFor`, `pauseCampaignFor` | Campaigns + drill-down |
| `deliverability.ts` | `listDeliverability` | Inbox-placement tests |
| `analytics.ts` | `analyticsFor` | Analytics trend + pipeline |
| `replies.ts` | `listReplies`, `countReplies`, `getThread` | Inbox + reply thread |
| `leads.ts` | `leadsFor` | Leads |
| `enrichment.ts` | `enrichmentOverview` | Enrichment |
| `verification.ts` | `verifyEmail`, `checkVerification` | Email verification |
| `import.ts` | `importLeads` | CSV lead import |
| `jobs.ts` | `awaitJob`, `sleep` | Async job polling |
| `webhooks.ts` | `parseWebhook`, `registerWebhook`, `listWebhooks`, `sendTestWebhook`, `INSTANTLY_EVENT_TYPES` | Webhook receiver |
| `agency.ts` | `allInbox`, `allCampaigns`, `allDeliverability`, `allAnalytics`, `allLeads`, `allEnrichment` | Agency-wide fan-out reads |
| `demo.ts` | `isDemo`, `hasKey`, `useFixtures`, `mask*` | Demo mode |
| `demo-data.ts` | synthetic fixtures | Demo mode (no key) |

Everything is re-exported from `js/ops/src/index.ts`, so the UI imports from
`@instantly-ai/ops` directly.

## App routes (`js/dashboard/core/app`)

| Route | What |
|---|---|
| `/` | Overview — client roster + headline stats |
| `/campaigns`, `/campaigns/[campaignId]` | Agency campaigns + drill-down (core-4 + step analytics) |
| `/inbox`, `/inbox/[emailId]` | Agency inbox + reply-thread drill-down |
| `/deliverability` | Inbox-placement tests across clients |
| `/analytics` | Combined analytics (trend + pipeline) |
| `/leads`, `/enrichment`, `/verification` | Standalone tool pages |
| `/client/[id]` | One client — the same modules, scoped |
| `/report` | CSV / PDF report (print-styled) |
| `/learn`, `/kit` | In-app docs + component gallery |
| `/api/webhooks/instantly` | Reference webhook receiver |

## Conventions the console enforces

These are the Instantly conventions the kit exists to teach — encoded here, not
just documented:

- **Reads in server components, writes in server actions.** No client-side API
  calls, no key in the browser.
- **Confirm-gated writes.** Every mutation goes through `<ConfirmAction>` — a
  two-step idle → "Confirm?" → running → done flow. Nothing fires without an
  explicit Yes.
- **Create-inactive → activate.** Creating a campaign never sends; activation is a
  separate, explicit step (`activateCampaignFor`) with a preflight (verified
  leads + connected senders).
- **Verify-before-send.** `verifyEmail` runs before an address is trusted for a
  campaign.
- **Async jobs are polled, never faked.** Operations that return a job
  (verification, enrichment, bulk moves, warmup) go through `awaitJob`, which
  polls to completion. See `jobs.ts`.
- **A single typed error shape** surfaces from the SDK (`InstantlyApiError` —
  status + payload); surfaces render an `<EmptyState>` on failure rather than
  crashing.

## Demo mode internals (`demo.ts`)

```ts
isDemo()      // NEXT_PUBLIC_DEMO === "1"
hasKey()      // INSTANTLY_API_KEY present
useFixtures() // isDemo() && !hasKey()  → serve synthetic data, never call Instantly
```

- `useFixtures()` true → every agency/read function returns `demo-data.ts`
  fixtures. This is what lets you host a **public demo with no key and no real
  data**.
- `isDemo()` true **with** a key → real data, but `mask*` helpers
  (`maskEmail`, `maskPerson`, `maskCampaignName`, `maskSubject`, …) redact PII for
  safe screen-shares. Masking is seeded (`seedInt`) so it's stable across renders.

## Webhooks (`webhooks.ts` + `app/api/webhooks/instantly/route.ts`)

A reference receiver for Instantly events: `parseWebhook` validates and types the
payload against `INSTANTLY_EVENT_TYPES`; `registerWebhook` / `listWebhooks` /
`sendTestWebhook` manage subscriptions. Use it as the seam where replies, opens,
and other events flow into *your* system.

## Design system + whitelabel

- All colour/spacing/radius live as CSS variables in
  [`core/config/tokens.css`](core/config/tokens.css) — dark-first with a light
  override. A rebrand is one file.
- The language follows the Instantly **product app**: 3-step dark elevation,
  foreground softened off pure white, hairline borders over shadows, `rounded-md`
  status chips, `#0080ff` brand, metric-led layout.
- `--brand` is the whitelabel accent; `NEXT_PUBLIC_ACCENT` overrides it at runtime
  (it also recolours charts). `NEXT_PUBLIC_AGENCY_NAME` and `NEXT_PUBLIC_LOGO` set
  the sidebar brand.
- Primitives live in `core/components` and are catalogued at `/kit`. Navigation is
  optimistic (the rail highlights on click, not on route-resolve).

## Extending it

1. **Add a read** to `js/ops` — a function that calls the SDK (via `opsClient`
   or `forWorkspace`) and returns a typed shape. Ground it in a real API
   operation; don't invent fields.
2. **Render it** in an async server component under `core/app` (a route) or
   `core/modules` (a reusable module).
3. **For writes**, add a server action in `core/app/actions` and gate it with
   `<ConfirmAction>`.
4. **Reuse primitives** from `core/components` (`StatTile`, `DataTable`, `Panel`,
   `Pill`, `Chart`, `EmptyState`, `Modal`, `ConfirmAction`) — see `/kit`.
5. **If it's async**, wrap the job in `awaitJob`.
6. **Add a demo branch** so it works in the public demo: guard with
   `useFixtures()` and return a `demo-data.ts` fixture.

---

Part of the [Instantly Starter Kit](../../README.md).
