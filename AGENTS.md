# AGENTS.md — Instantly Starter Kit

You are a coding agent helping a developer build a **wrapper service** on top of Instantly. This file is your always-on map: what the kit is, which API group does what, the rules that matter, and the flow to follow. Route into [`docs/api/`](docs/api) for per-group detail and [`docs/conventions.md`](docs/conventions.md) for the cross-cutting rules — don't restate them here.

## What this kit is

- **SDK (runtime):** typed clients in [`js/sdk`](js/sdk) and [`python/sdk`](python/sdk), both generated from [`spec/openapi.yaml`](spec/openapi.yaml). The wrapper service imports the SDK. Covers all 28 API groups.
- **Docs + this file (build-time):** the agent layer that helps you build. Not shipped into the user's runtime.
- **Templates** ([`js/templates`](js/templates)) and **examples** ([`js/examples`](js/examples) / [`python/examples`](python/examples)) to fork and copy.
- **No CLI.** Wrapper services import the SDK; they don't run a CLI.

The user uses Instantly for the email/deliverability/inbox/analytics backend and adds their own audience, logic, and UI on top.

## Guided build flow

1. **Ask what they're building** — a thin wrapper, a sync system, an admin tool, or an opinionated workflow service? What's the core job?
2. **Classify** into one or more families (see the map below): campaign orchestration · lead/list management · reply/webhook sync · OAuth account connection · analytics/diagnostics · deliverability/enrichment · workspace/admin.
3. **Load the relevant [`docs/api/*`](docs/api)** for those families — that's where the real operations, shapes, and gotchas live.
4. **Plan the wrapper** — name the operations and flow before writing code; propose the architecture.
5. **Scaffold from the closest [template](js/templates)** rather than greenfield.
6. **Build against the SDK** — compose your business logic around SDK calls; keep the wrapper thin.
7. **Verify** — run the flow; check sending status / job completion; handle errors.

## API-group map (28 groups)

The 8 **bold** files are the goal-first guides in [`docs/api/`](docs/api); the rest are covered via conventions/reference.

**Outreach Execution** — [**campaigns**](docs/api/campaigns.md) (`campaign`, `campaignsubsequence`) · [**leads**](docs/api/leads.md) (`lead`, `leadlist`, `leadlabel`) · [**emails**](docs/api/emails.md) (`email`) · `account` → [**accounts**](docs/api/accounts.md) · `accountcampaignmapping`.
**Deliverability & Enrichment** — [**enrichment**](docs/api/enrichment.md) (`supersearchenrichment`) · [**verification**](docs/api/verification.md) (`emailverification`) · `inboxplacementtest` / `inboxplacementanalytics` / `inboxplacementblacklistandspamassassinreport` → [**analytics**](docs/api/analytics.md) · `blocklistentry`.
**Integrations & Events** — [**webhooks**](docs/api/webhooks.md) (`webhook`, `webhookevent`) · `oauth` → [**accounts**](docs/api/accounts.md).
**Analytics** — campaign + account analytics ops → [**analytics**](docs/api/analytics.md).
**Workspace & Admin** — `workspace`, `workspacemember`, `workspacegroupmember`, `workspacebilling`, `apikey`, `crmactions`.
**Operations & Diagnostics** — `backgroundjob` (poll async jobs), `auditlog`.
**Support** — `customtag`, `customtagmapping`, `dfyemailaccountorder`.

Every group + operation (all 28 / 168) is in [`spec/openapi.yaml`](spec/openapi.yaml) — consult it for any group not covered by a `docs/api/*` guide.

## Routing table (intent → docs → example → template)

| The user wants to… | Read | Example | Template |
|---|---|---|---|
| Build + launch outbound | [campaigns](docs/api/campaigns.md), [leads](docs/api/leads.md), [accounts](docs/api/accounts.md) | `02`, `05` | [outreach-service](js/templates/outreach-service) |
| Source/enrich an audience | [enrichment](docs/api/enrichment.md), [leads](docs/api/leads.md) | `04` | [lead-pipeline](js/templates/lead-pipeline) |
| Verify before sending | [verification](docs/api/verification.md), [leads](docs/api/leads.md) | `03` | [outreach-service](js/templates/outreach-service) |
| Handle replies / events | [webhooks](docs/api/webhooks.md), [emails](docs/api/emails.md) | `06` | [reply-automation](js/templates/reply-automation) |
| Connect sending accounts | [accounts](docs/api/accounts.md) (OAuth) | — | [outreach-service](js/templates/outreach-service) |
| Report on performance | [analytics](docs/api/analytics.md) | — | [analytics-service](js/templates/analytics-service) |
| Just check the key works | [campaigns](docs/api/campaigns.md) (`listCampaign`) | `01` | — |

## Conventions you must honor

Full detail in [`docs/conventions.md`](docs/conventions.md). The essentials:

- **API key from env, never hardcoded** (`Authorization: Bearer` handled by the SDK).
- **Campaigns create inactive → activate.** `createCampaign` returns a Draft; `activateCampaign` sends. Gate activation behind a preflight (verified leads + healthy senders).
- **Verify before send.** Verify recipients (`verify_leads_on_import` / `createEmailVerification`); keep `allow_risky_contacts` off.
- **Poll async ops.** Background jobs (`waitForBackgroundJob`), `202` responses, and poll-by-status (verification, OAuth). Ignore the manifest's blanket `async_behavior`.
- **Pagination** is cursor-based (`limit` + `starting_after` → `next_starting_after`); `listLeads` is a POST.
- **Rate limits** are workspace-wide (100/s, 6000/min) with lower per-endpoint caps (e.g. `listEmail` 20/min).
- **Webhooks** have no HMAC (use custom `headers`); subscription vs payload `event_type` names differ; `email_id` = `reply_to_uuid`.
- **Errors** raise `InstantlyApiError { status, statusText, payload }`.

## Rules for building

- **Prefer the SDK** over ad-hoc HTTP. One function per operation: `fn(client, { path?, query?, body? })` (JS camelCase, Python snake_case).
- **Never invent** fields, scopes, endpoints, or response shapes. Ground every call in a real operation — the authoritative source is [`spec/openapi.yaml`](spec/openapi.yaml); the goal-first summaries are in `docs/api/*`.
- **Keep wrappers thin** — business logic composed around SDK calls, typed request/response preserved.
- **Add polling** where an operation is async (see conventions).
- **Guard destructive operations** (deletes, cross-workspace `moveAccounts`, bulk deletes) — never run them unguarded against a live/shared workspace.
- Don't dump raw API/scrape content at the user; explain and act.

## Where things are

`spec/openapi.yaml` (source of truth) · `js/`, `python/` (SDK + examples + templates) · `docs/conventions.md` + `docs/api/*` (guides) · `create-instantly-app/` (scaffolder) · `AGENTS.md` (this file).
