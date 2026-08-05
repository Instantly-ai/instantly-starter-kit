# outbound-ops (Python)

Daily outbound operations on top of the [Instantly](https://instantly.ai) SDK — mirror of the [JS template](../../../js/templates/outbound-ops). Two commands:

- **`brief`** — the morning digest: sender health, yesterday's numbers, replies waiting, and the **top 2 things to fix today** with the command to fix each. Read-only, deterministic, schedulable.
- **`incident`** — when deliverability tanks: diagnose the likely cause and (on `--confirm`) contain it.

## Run

```bash
cd ../../sdk && pip install -e . && cd -   # install the local SDK
cp .env.example .env                       # add your INSTANTLY_API_KEY
python main.py brief                        # read-only morning brief
python main.py brief --raw                  # + raw payloads, for tuning
python main.py incident                     # read-only diagnosis
DOMAINS=acme.com python main.py incident    # + SPF/DMARC check (needs `pip install dnspython`)
python main.py incident --confirm           # apply containment (pause worst / drop limits)
```

## What each does

- **brief** reads (read-only) connected senders + health (`list_account`), yesterday's overview (`get_campaign_analytics_overview`), replies waiting (`count_unread_emails`), applies the thresholds in [`app/thresholds.py`](app/thresholds.py), and prints the two most urgent actions with a runnable next step. Nothing is written.
- **incident** diagnoses (sender health + worst campaign by bounce + optional SPF/DMARC), gives a rule-based likely-cause, and lists a containment plan. **Diagnosis is read-only**; containment (pause the worst campaign, drop `daily_limit` on unhealthy senders) runs only with `--confirm`, printed first. It never moves accounts automatically and links you out for external reputation (Postmaster/MXToolbox) it can't read.

## Schedule the brief

```bash
# crontab: 9am weekdays
0 9 * * 1-5  cd /path/to/outbound-ops && python main.py brief >> ~/brief.log
```

## Use it in your own service

The commands are thin wrappers over an importable class — you don't have to shell out. Import `OutboundOps` and call it from your backend:

```python
import os
from instantly import create_instantly_client
from app.ops import OutboundOps

ops = OutboundOps(create_instantly_client(os.environ["INSTANTLY_API_KEY"]))

brief = ops.brief()                          # {"health", "replies", "overview", "actions"} — post to Slack, serve as a route…
diag = ops.diagnose(domains=["acme.com"])    # read-only; returns an inspectable "plan"
if not diag["ready"]:
    ops.contain(diag)                        # execute containment when YOU decide
```

`server.py` is a ready example that exposes these over HTTP — `python server.py` → `GET /brief`, `GET /incident`. Formatting (`render_brief` / `render_diagnosis`) is separate, so the class returns raw data by default.

## Notes
- **Thresholds are data** — edit `app/thresholds.py`, don't fork the logic.
- **Agency:** set `AS_WORKSPACE=<sub_workspace_id>` (with an admin key) to run against a client sub-workspace.
- Reply *handling* stays in Instantly's own Unibox / AI inbox — the brief points you there rather than duplicating it.

Part of the [Instantly Starter Kit](../../../README.md). Conventions: [`docs/conventions.md`](../../../docs/conventions.md).
