# instantly-sdk (Python)

Typed Python client for the [Instantly](https://instantly.ai) API v2. Generated from `spec/openapi.yaml` — the same source as the [JS SDK](../../js/sdk) — so the two stay in sync. This is the **runtime** library a wrapper service imports.

> Part of the [Instantly Starter Kit](../../README.md). Zero runtime dependencies (stdlib `urllib`).

## Install

```bash
pip install instantly-sdk
```

Requires Python ≥ 3.9.

## Quickstart

```python
import os
from instantly import create_instantly_client
from instantly.resources.campaign import list_campaign

client = create_instantly_client(os.environ["INSTANTLY_API_KEY"])

result = list_campaign(client, {"query": {"limit": 10}})
print(result)
```

Never hardcode your API key — read it from the environment (`INSTANTLY_API_KEY`).

## Design

- **Free functions grouped by resource.** Each operation is `fn(client, request)` and returns the parsed response. Import from the resource module, e.g. `from instantly.resources.lead import bulk_add_leads`.
- **`request` shape:** a dict with optional `path`, `query`, `body`, and `headers` keys (typed as `instantly.generated.operations.<Op>Input`).
- **Client:** `create_instantly_client(api_key, *, base_url=?, transport=?, max_retries=1, default_headers=?)`. Default `base_url` is `https://api.instantly.ai`; requests target `/api/v2/...` with `Authorization: Bearer <key>`.
- **Retries:** automatic on `429` and `5xx` (linear backoff), controlled by `max_retries` (default 1).
- **Errors:** non-2xx responses raise `InstantlyApiError` with `status`, `status_text`, and the parsed `payload`.

```python
from instantly import InstantlyApiError
from instantly.resources.campaign import get_campaign

try:
    get_campaign(client, {"path": {"id": campaign_id}})
except InstantlyApiError as err:
    print(err.status, err.payload)  # {"statusCode", "error", "message"}
```

## Async operations (polling)

```python
from instantly import polling

# Background jobs (e.g. move leads, enable/disable warmup, verify-on-import)
job = polling.wait_for_background_job(client, job_id)

# OAuth session (connect a Google/Microsoft sender)
session = polling.poll_oauth_session_status(client, session_id)
```

See [`docs/conventions.md`](../../docs/conventions.md) for pagination, rate limits, scopes, and the full async model, and [`docs/api/`](../../docs/api) for goal-first guides per API group.

## Typing note

The `generated/` package types top-level scalars, enums, arrays, and unions precisely; nested objects and cross-model references collapse to `Dict[str, Any]` (Python can't inline anonymous structural types the way TypeScript does). Full structural detail lives in `spec/openapi.yaml` and the [JS SDK](../../js/sdk).

## Development

The `instantly/` tree is **generated** — do not edit it by hand. Regenerate from the spec:

```bash
python3 docs/context/scripts/internal/build_wrapper_builder_system.py
```

Package scaffolding (`pyproject.toml`, this README) is hand-owned and is not overwritten by the generator.
