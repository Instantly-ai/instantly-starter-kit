# Python Examples

Nine tiny, single-task snippets against [`instantly-sdk`](../sdk) — mirrors of the [JS examples](../../js/examples). Each does exactly one thing.

## Run

```bash
cd python/sdk && pip install -e .   # install the local SDK
cd ../examples
export INSTANTLY_API_KEY=sk_...     # never hardcode it
python 01_auth_smoke_check.py       # → 09
```

(Or add `python/sdk` to `PYTHONPATH` instead of installing.)

## The examples

| # | File | Does | Writes? |
|---|---|---|---|
| 01 | `01_auth_smoke_check.py` | List campaigns — confirms your key works (~90s) | read-only |
| 02 | `02_create_campaign_draft.py` | Create a campaign as a **Draft** + one-step sequence | creates a draft (does **not** send) |
| 03 | `03_add_leads_verify.py` | Create a list, add a lead, verify on import | creates a list + lead |
| 04 | `04_enrich_supersearch.py` | Count (free) then enrich from SuperSearch | creates a list, spends credits |
| 05 | `05_launch_campaign.py` | Preflight then **activate** a campaign | **sends email** — opt-in via `CONFIRM_LAUNCH=1` |
| 06 | `06_reply_webhook.py` | Minimal reply-webhook receiver (+ how to register) | starts a local server |
| 07 | `07_preflight.py` | Readiness check before launch — senders, sending status, verified leads | read-only |
| 08 | `08_warmup_and_placement.py` | Read warmup + inbox-placement; enable warmup behind a flag | read-only (writes only with `CONFIRM_WARMUP=1`) |
| 09 | `09_multi_workspace.py` | Agency: one admin key → per-client senders + analytics via `x-as-workspace` | read-only |

## Safety notes

- **01 is read-only** — the "does my key work?" check.
- **02–04 create real objects** (a draft campaign, a list, leads); none send email.
- **05 sends email** only with `CAMPAIGN_ID` **and** `CONFIRM_LAUNCH=1`; otherwise it prints the preflight and stops.
- **06** starts an HTTP server (`PORT`, default 3000) and verifies a custom `x-shared-secret` header — Instantly provides no HMAC.
- **07 and 09 are read-only** — a launch-readiness preflight and a per-client (multi-workspace) report.
- **08 is read-only by default**; it enables warmup (a background job) only with `CONFIRM_WARMUP=1`. Needs `EMAILS=...`.

All calls take `(client, request)` where `request` is a dict with `path` / `query` / `body`. See [`docs/conventions.md`](../../docs/conventions.md) and [`docs/api/`](../../docs/api).
