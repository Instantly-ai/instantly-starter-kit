#!/usr/bin/env node
/**
 * create-instantly-app — scaffold a wrapper service on top of the Instantly API.
 *
 * Copies a template + AGENTS.md + docs into a new project and vendors the SDK, so
 * the result runs WITHOUT publishing anything. Node built-ins only (zero deps).
 *
 *   node create-instantly-app/index.js my-app --template analytics-service --js
 *   npx create-instantly-app my-app --template outreach-service --python -y
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"
import { execSync } from "node:child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const KIT_ROOT = path.resolve(__dirname, "..") // the CLI lives at the kit repo root

const TEMPLATES = ["outreach-service", "reply-automation", "analytics-service", "lead-pipeline", "minimal"]
const LANGS = ["js", "python"]
const TPL_EXCLUDES = new Set(["node_modules", "dist", ".venv", "venv", "__pycache__", ".git", ".DS_Store"])
const SDK_EXCLUDES = new Set(["node_modules", ".venv", "venv", "__pycache__", ".git", ".DS_Store"]) // keep dist

function fail(msg) {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}

function usage() {
  console.log(`create-instantly-app — scaffold an Instantly wrapper project

Usage:
  create-instantly-app [dir] [options]

Options:
  --template <name>   ${TEMPLATES.join(" | ")}
  --js | --python     target language (or --lang js|python)
  --sdk <local|npm>   how to wire the SDK dep (default: local = vendored, works offline)
  --no-install        skip installing dependencies
  -y, --yes           accept defaults, no prompts
  -h, --help          show this help

Examples:
  create-instantly-app my-analytics --template analytics-service --js
  create-instantly-app my-outreach  --template outreach-service  --python -y
`)
}

function parseArgs(argv) {
  const out = { dir: undefined, template: undefined, lang: undefined, sdk: "local", install: true, yes: false }
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i]
    if (a === "-h" || a === "--help") out.help = true
    else if (a === "-y" || a === "--yes") out.yes = true
    else if (a === "--no-install") out.install = false
    else if (a === "--js") out.lang = "js"
    else if (a === "--python") out.lang = "python"
    else if (a === "--lang") out.lang = argv[++i]
    else if (a === "--template") out.template = argv[++i]
    else if (a === "--sdk") out.sdk = argv[++i]
    else if (a.startsWith("-")) fail(`Unknown option: ${a}`)
    else if (out.dir === undefined) out.dir = a
    else fail(`Unexpected argument: ${a}`)
  }
  return out
}

function copyTree(src, dest, excludes) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter(s) {
      const base = path.basename(s)
      if (excludes.has(base)) return false
      if (base.endsWith(".egg-info")) return false
      return true
    },
  })
}

function copyDocs(target) {
  const docsDir = path.join(target, "docs")
  fs.mkdirSync(path.join(docsDir, "api"), { recursive: true })
  fs.copyFileSync(path.join(KIT_ROOT, "docs", "conventions.md"), path.join(docsDir, "conventions.md"))
  fs.copyFileSync(path.join(KIT_ROOT, "docs", "quickstart.md"), path.join(docsDir, "quickstart.md"))
  copyTree(path.join(KIT_ROOT, "docs", "api"), path.join(docsDir, "api"), new Set())
}

function copySpec(target) {
  // The authoritative full API surface — all 28 groups / 168 operations.
  fs.mkdirSync(path.join(target, "spec"), { recursive: true })
  fs.copyFileSync(path.join(KIT_ROOT, "spec", "openapi.yaml"), path.join(target, "spec", "openapi.yaml"))
}

function vendorSdk(target, lang) {
  const src = path.join(KIT_ROOT, lang === "js" ? "js" : "python", "sdk")
  const dest = path.join(target, "vendor", "instantly-sdk")
  copyTree(src, dest, SDK_EXCLUDES)
}

function rewriteJsSdkDep(target, name, sdkMode) {
  const pkgPath = path.join(target, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
  pkg.name = name
  pkg.dependencies = pkg.dependencies || {}
  pkg.dependencies["@instantly-ai/sdk"] = sdkMode === "npm" ? "^0.1.0" : "file:./vendor/instantly-sdk"
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
}

function writeMinimalJs(target, name) {
  fs.mkdirSync(path.join(target, "src"), { recursive: true })
  fs.writeFileSync(path.join(target, "package.json"), JSON.stringify({
    name,
    private: true,
    type: "module",
    scripts: { typecheck: "tsc --noEmit -p tsconfig.json", start: "tsx src/index.ts" },
    dependencies: { "@instantly-ai/sdk": "file:./vendor/instantly-sdk" },
    devDependencies: { "@types/node": "^22.0.0", tsx: "^4.19.0", typescript: "^5.9.2" },
  }, null, 2) + "\n")
  fs.writeFileSync(path.join(target, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      target: "es2022", module: "nodenext", moduleResolution: "nodenext",
      strict: true, skipLibCheck: true, types: ["node"], noEmit: true,
    },
    include: ["src/**/*.ts"],
  }, null, 2) + "\n")
  fs.writeFileSync(path.join(target, "src", "index.ts"), `import { createInstantlyClient, listCampaign, InstantlyApiError } from "@instantly-ai/sdk"

const apiKey = process.env.INSTANTLY_API_KEY
if (!apiKey) {
  console.error("Set INSTANTLY_API_KEY in your environment.")
  process.exit(1)
}

const client = createInstantlyClient({ apiKey })
try {
  const result = await listCampaign(client, { query: { limit: 10 } })
  console.log("✓ Key works. Build from here — see AGENTS.md.")
  console.log(JSON.stringify(result, null, 2))
} catch (err) {
  if (err instanceof InstantlyApiError) { console.error(\`✗ API error \${err.status}:\`, err.payload); process.exit(1) }
  throw err
}
`)
  fs.writeFileSync(path.join(target, ".env.example"), "INSTANTLY_API_KEY=sk_...\n")
}

function writeMinimalPython(target) {
  fs.writeFileSync(path.join(target, "pyproject.toml"), `[project]
name = "instantly-app"
version = "0.1.0"
requires-python = ">=3.9"
# Install the vendored SDK:  pip install -e vendor/instantly-sdk
dependencies = []
`)
  fs.writeFileSync(path.join(target, "main.py"), `"""Minimal Instantly wrapper starter. Build from here — see AGENTS.md."""
import json
import os
import sys

from instantly import create_instantly_client, InstantlyApiError
from instantly.resources.campaign import list_campaign


def main() -> None:
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        sys.exit("Set INSTANTLY_API_KEY in your environment.")
    client = create_instantly_client(api_key)
    try:
        print("✓ Key works. Build from here — see AGENTS.md.")
        print(json.dumps(list_campaign(client, {"query": {"limit": 10}}), indent=2))
    except InstantlyApiError as err:
        sys.exit(f"✗ API error {err.status}: {err.payload}")


if __name__ == "__main__":
    main()
`)
  fs.writeFileSync(path.join(target, ".env.example"), "INSTANTLY_API_KEY=sk_...\n")
}

function agentsMd(lang, template) {
  const sdkImport = lang === "js"
    ? 'import { createInstantlyClient, listCampaign } from "@instantly-ai/sdk"'
    : "from instantly import create_instantly_client\nfrom instantly.resources.campaign import list_campaign"
  return `# AGENTS.md — Instantly wrapper (${template}, ${lang})

You are helping build a service on top of **Instantly** (cold-email / outreach infra), scaffolded from the [Instantly Starter Kit](https://github.com/Instantly-ai/instantly-starter-kit).

## What's here
- **SDK** — \`@instantly-ai/sdk\` (vendored at \`./vendor/instantly-sdk\`; ${lang === "js" ? "JS" : "Python"}). One function per API operation across **all 28 resource groups**, typed error \`InstantlyApiError\`, async polling helpers.
- **docs/** — [\`conventions.md\`](docs/conventions.md) (auth, pagination, rate limits, async, create-inactive→activate, verify-before-send, webhooks, errors), goal-first [\`docs/api/*\`](docs/api) for the common groups, and [\`quickstart.md\`](docs/quickstart.md).
- **[\`spec/openapi.yaml\`](spec/openapi.yaml)** — the authoritative full API reference (every operation + field for all 28 groups). Consult it for anything not covered by \`docs/api/*\`.
- **${template === "minimal" ? "src/ (a smoke-check starter)" : "the " + template + " template code"}** — your starting point.

## How to help
1. Ask what the user is building.
2. Load the relevant [\`docs/api/*\`](docs/api) for that job; for groups not documented there, use the SDK's types + [\`spec/openapi.yaml\`](spec/openapi.yaml).
3. Propose a short plan, then build on the ${template === "minimal" ? "starter" : "template"} using the SDK.
4. Honor the conventions: **campaigns create inactive → activate**, **verify before sending**, **poll async jobs**, never hardcode the key.

\`\`\`${lang === "js" ? "ts" : "python"}
${sdkImport}
\`\`\`

Full examples, other templates, and the OpenAPI spec live in the kit: https://github.com/Instantly-ai/instantly-starter-kit
`
}

function projectReadme(lang, template, name) {
  const run = lang === "js"
    ? "npm install\nnpm run " + (template === "minimal" ? "start" : "start")
    : "pip install -e vendor/instantly-sdk\npython " + (template === "minimal" ? "main.py" : "main.py")
  return `# ${name}

An Instantly wrapper service (${template}, ${lang}) scaffolded with \`create-instantly-app\`. Includes the SDK (vendored), \`AGENTS.md\`, and \`docs/\` — everything needed to build.

## Run

\`\`\`bash
cp .env.example .env        # add your INSTANTLY_API_KEY (Settings → Integrations → API Keys)
${run}
\`\`\`

## Build with your AI agent

Open this folder in your coding agent (Claude Code, Cursor, …) and paste:

> I'm building a service on top of Instantly. This project includes \`AGENTS.md\` + \`docs/\`. Read \`AGENTS.md\`, then help me build **<what you want>** — ask what I'm building, load the relevant \`docs/api/*\`, propose a plan, and build on this template using the SDK.

The SDK is vendored at \`./vendor/instantly-sdk\`. Full kit: https://github.com/Instantly-ai/instantly-starter-kit
`
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) { usage(); return }
  if (!["local", "npm"].includes(args.sdk)) fail(`--sdk must be local or npm`)

  const interactive = !args.yes && stdin.isTTY
  let { dir, lang, template } = args

  if (!dir) {
    if (interactive) {
      const rl = createInterface({ input: stdin, output: stdout })
      dir = (await rl.question("Project directory: ")).trim()
      rl.close()
    }
    if (!dir) dir = "instantly-app"
  }
  if (!lang) {
    if (interactive) {
      const rl = createInterface({ input: stdin, output: stdout })
      const a = (await rl.question("Language [js/python] (js): ")).trim().toLowerCase()
      rl.close()
      lang = a || "js"
    } else lang = "js"
  }
  if (!LANGS.includes(lang)) fail(`--lang must be one of: ${LANGS.join(", ")}`)
  if (!template) {
    if (interactive) {
      const rl = createInterface({ input: stdin, output: stdout })
      const a = (await rl.question(`Template [${TEMPLATES.join("/")}] (outreach-service): `)).trim()
      rl.close()
      template = a || "outreach-service"
    } else template = "outreach-service"
  }
  if (!TEMPLATES.includes(template)) fail(`--template must be one of: ${TEMPLATES.join(", ")}`)

  const target = path.resolve(process.cwd(), dir)
  const name = path.basename(target)
  if (fs.existsSync(target) && fs.readdirSync(target).length > 0) fail(`Directory not empty: ${target}`)
  fs.mkdirSync(target, { recursive: true })

  console.log(`\nScaffolding ${name} — ${template} (${lang})…`)

  // 1) Template
  if (template === "minimal") {
    if (lang === "js") writeMinimalJs(target, name)
    else writeMinimalPython(target)
  } else {
    const tplSrc = path.join(KIT_ROOT, lang === "js" ? "js" : "python", "templates", template)
    if (!fs.existsSync(tplSrc)) fail(`Template not found in kit: ${tplSrc}`)
    copyTree(tplSrc, target, TPL_EXCLUDES)
  }

  // 2) docs + spec + 3) vendored SDK
  copyDocs(target)
  copySpec(target)
  vendorSdk(target, lang)

  // 4) wire the SDK dep + name (JS)
  if (lang === "js") rewriteJsSdkDep(target, name, args.sdk)

  // 5) agent + readme
  fs.writeFileSync(path.join(target, "AGENTS.md"), agentsMd(lang, template))
  fs.writeFileSync(path.join(target, "README.md"), projectReadme(lang, template, name))
  if (!fs.existsSync(path.join(target, ".env.example"))) {
    fs.writeFileSync(path.join(target, ".env.example"), "INSTANTLY_API_KEY=sk_...\n")
  }

  // 6) install (JS only; Python prints pip steps)
  if (args.install && lang === "js") {
    console.log("Installing dependencies (builds the vendored SDK)…")
    try {
      execSync("npm install", { cwd: target, stdio: "inherit" })
    } catch {
      console.log("(npm install failed — run it yourself in the project.)")
    }
  }

  // 7) next steps
  console.log(`\n✓ Created ${name}/\n`)
  console.log("Next steps:")
  console.log(`  cd ${dir}`)
  console.log(`  cp .env.example .env   # add your INSTANTLY_API_KEY`)
  if (lang === "js") {
    if (!args.install) console.log(`  npm install`)
    console.log(`  npm start`)
  } else {
    console.log(`  pip install -e vendor/instantly-sdk`)
    console.log(`  python main.py`)
  }
  console.log(`\nBuild with AI: open the folder in your agent and paste the prompt in README.md.\n`)
}

main().catch((err) => fail(err && err.stack ? err.stack : String(err)))
