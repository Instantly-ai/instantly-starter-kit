# lead-pipeline (Python)

Python twin of the [JS `lead-pipeline`](../../../js/templates/lead-pipeline). A batch job: source leads from SuperSearch, enrich, dedupe, and sync to your DB/CRM. Optional template.

## Run

```bash
cd python/sdk && pip install -e .        # install the local SDK
cd ../../python/templates/lead-pipeline
export INSTANTLY_API_KEY=sk_...          # required — exits with a message without it
export LIMIT=100                         # leads to enrich (spends credits)
python main.py                           # preview only by default (free)
CONFIRM_ENRICH=1 python main.py          # opt in: enrich (spends credits + creates a list) + sync
```

**By default this is preview-only** — counts + previews matches (free, nothing created). Enrichment (credits + a new list) runs only with `CONFIRM_ENRICH=1`.

Edit `app/config.py` to set your `search_filters` (ICP) — see [`docs/api/enrichment.md`](../../../docs/api/enrichment.md).

## Structure

- `app/pipeline.py` — `run()`: `preview_leads_from_supersearch` (free) → `enrich_leads_from_supersearch` (async, auto-creates a list) → `dedupe_by_email` → `sync`.
- `app/dedupe.py` — pure `dedupe_by_email(leads)` (normalized email, drops emailless rows) — unit-testable without a key.
- `app/sync.py` — `SyncAdapter` Protocol + a `ConsoleSync` stub. Implement Postgres/HubSpot/Salesforce with the same interface.

Verification (verify-before-send): pass `verify_leads_on_import=True` when adding leads, or call `create_email_verification` per address — see [`docs/api/verification.md`](../../../docs/api/verification.md). Enrichment is **async** — poll `get_enrichment_for_resource` for completion.
