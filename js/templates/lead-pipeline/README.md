# lead-pipeline (optional template)

A batch job: source leads from SuperSearch, enrich them, dedupe, and sync to your DB/CRM. JS-first. Optional — the leanest of the four to drop.

```
SuperSearch preview ─▶ enrich (work emails) ─▶ (verify) ─▶ dedupe ─▶ sync (DB/CRM)
```

## Run

```bash
cd js/sdk && npm install && npm run build && cd -   # build the SDK once (from repo root)
cd js/templates/lead-pipeline
npm install
export INSTANTLY_API_KEY=sk_...     # required — the pipeline exits with a message without it
export LIMIT=100                    # leads to enrich (spends credits)
npm start                           # preview only by default (free)
CONFIRM_ENRICH=1 npm start          # opt in: enrich (spends credits + creates a list) + sync
```

**By default `npm start` is preview-only** — it counts + previews matches (free, nothing created) and prints how to opt in. Enrichment (credits + a new list) runs only with `CONFIRM_ENRICH=1`, mirroring example 05's `CONFIRM_LAUNCH` gate.

Edit `src/config.ts` to set your `searchFilters` (ICP) — see [`docs/api/enrichment.md`](../../../docs/api/enrichment.md) for the filter shape.

## Structure

- `src/pipeline.ts` — `run()`: `count`/`previewLeadsFromSupersearch` (free) → *(opt-in)* `enrichLeadsFromSupersearch` (async, auto-creates a list) → `dedupeByEmail` → `sync`.
- `src/dedupe.ts` — pure `dedupeByEmail(leads)` (normalized email, drops emailless rows) — unit-testable without a key.
- `src/sync.ts` — `SyncAdapter` interface + a `consoleSync` stub. Implement Postgres/HubSpot/Salesforce with the same interface.
- `src/config.ts` — env + ICP filters.

## Verification note

Verification (verify-before-send) is available two ways: pass `verify_leads_on_import: true` when adding leads (`bulkAddLeads`, spawns a background verify job), or call `createEmailVerification` per address. This template enriches work emails and leaves the verify toggle to you — see [`docs/api/verification.md`](../../../docs/api/verification.md).

`enrichLeadsFromSupersearch` and enrichment are **async** — poll `getEnrichmentForResource` for completion before treating the list as final (see [`docs/api/enrichment.md`](../../../docs/api/enrichment.md)).
