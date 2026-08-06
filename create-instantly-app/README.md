# create-instantly-app

Scaffold a wrapper service on top of the [Instantly](https://instantly.ai) API — a template + the SDK + `AGENTS.md` + `docs/`, ready for you (or your AI agent) to build on.

Not published yet, so run it from a clone of the kit:

```bash
git clone https://github.com/Instantly-ai/instantly-starter-kit
cd instantly-starter-kit

node create-instantly-app/index.js my-app
# non-interactive:
node create-instantly-app/index.js my-analytics --template analytics-service --js
node create-instantly-app/index.js my-outreach  --template outreach-service  --python -y
```

> Once published, this becomes `npx create-instantly-app@latest my-app`.

## Options

| Flag | Values |
|---|---|
| `[dir]` | target directory |
| `--template <name>` | `outreach-service` · `reply-automation` · `analytics-service` · `lead-pipeline` · `outbound-ops` · `minimal` |
| `--js` / `--python` (`--lang`) | target language |
| `--sdk <local\|npm>` | how the SDK dep is wired — `local` (default) vendors it into the project so it runs offline / pre-publish; `npm` uses the published package |
| `--no-install` | skip installing dependencies |
| `-y`, `--yes` | accept defaults, no prompts |

Missing choices are asked interactively (unless `-y` or a non-interactive shell).

## What you get

```
my-app/
├── AGENTS.md          ← your coding agent reads this at the root
├── README.md          ← run steps + a "Build with AI" prompt
├── docs/              ← conventions + api/ guides
├── vendor/instantly-sdk   ← the SDK, vendored (local mode)
├── src/ or app/ / main.py ← the chosen template
└── .env.example
```

Then: add your key to `.env`, run the smoke check, and build. See the generated `README.md` + `AGENTS.md`.

## Local / dev use (before publishing)

Run straight from a checkout of the kit:

```bash
node create-instantly-app/index.js my-app --template analytics-service --js
```

Templates, docs, and the SDK are pulled from the surrounding kit checkout. (A published build would bundle them or `degit` from GitHub.)
