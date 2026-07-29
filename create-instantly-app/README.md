# create-instantly-app

Scaffold a wrapper service on top of the [Instantly](https://instantly.ai) API in one command — a template + the SDK + `AGENTS.md` + `docs/`, ready for you (or your AI agent) to build on.

```bash
npx create-instantly-app@latest my-app
# or non-interactive:
npx create-instantly-app@latest my-analytics --template analytics-service --js
npx create-instantly-app@latest my-outreach  --template outreach-service  --python -y
```

## Options

| Flag | Values |
|---|---|
| `[dir]` | target directory |
| `--template <name>` | `outreach-service` · `reply-automation` · `analytics-service` · `lead-pipeline` · `minimal` |
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
