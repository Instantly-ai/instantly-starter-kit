#!/usr/bin/env node
/**
 * build-docs.mjs — maintainer tooling.
 *
 * Renders the kit's markdown into a single self-contained docs/index.html
 * (design comes from scripts/docs-template.html — the approved shell), and
 * emits llms.txt + llms-full.txt. Re-run whenever the docs change:
 *
 *   cd scripts && npm install && npm run build
 *
 * DevDeps: marked (md→html) + highlight.js (code). Output has no runtime deps.
 */
import { marked } from "marked"
import hljs from "highlight.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..")
const REPO = "https://github.com/Instantly-ai/instantly-starter-kit"
const BLOB = REPO + "/blob/main/"

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8")
const write = (rel, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, rel)), { recursive: true }); fs.writeFileSync(path.join(ROOT, rel), s) }

// ---- section model ------------------------------------------------------
const API = ["campaigns", "leads", "enrichment", "verification", "emails", "analytics", "accounts", "webhooks"]
const anchor = { "conventions.md": "conventions", "quickstart.md": "quickstart" }
API.forEach((n) => (anchor[n + ".md"] = n))

// Order of sections in the page + which come from markdown vs the template.
const KEEP = new Set(["overview", "build-with-ai", "scaffolder", "templates", "examples", "spec"]) // reused from template
const ORDER = ["overview", "quickstart", "build-with-ai", "scaffolder", "conventions", ...API, "templates", "examples", "spec"]
const MD = {
  quickstart: { file: "docs/quickstart.md" },
  conventions: { file: "docs/conventions.md", eyebrow: "Concepts" },
  campaigns: { file: "docs/api/campaigns.md", eyebrow: "API reference" },
  leads: { file: "docs/api/leads.md" }, enrichment: { file: "docs/api/enrichment.md" },
  verification: { file: "docs/api/verification.md" }, emails: { file: "docs/api/emails.md" },
  analytics: { file: "docs/api/analytics.md" }, accounts: { file: "docs/api/accounts.md" },
  webhooks: { file: "docs/api/webhooks.md" },
}
const GROUPS = [
  { label: "Start here", ids: ["overview", "quickstart", "build-with-ai", "scaffolder"] },
  { label: "Concepts", ids: ["conventions"] },
  { label: "API reference", ids: [...API] },
  { label: "More", ids: ["templates", "examples", "spec"] },
]
const TITLES = {
  overview: "Overview", quickstart: "Quickstart", "build-with-ai": "Build with AI", scaffolder: "Scaffold a project",
  conventions: "Conventions", campaigns: "Campaigns", leads: "Leads", enrichment: "Enrichment",
  verification: "Verification", emails: "Emails", analytics: "Analytics", accounts: "Accounts", webhooks: "Webhooks",
  templates: "Templates", examples: "Examples", spec: "Full API spec",
}

// ---- markdown rendering -------------------------------------------------
function unesc(s) { return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'") }
function highlight(code, lang) {
  const map = { ts: "typescript", tsx: "typescript", js: "javascript", py: "python", sh: "bash", shell: "bash", yml: "yaml" }
  const language = map[lang] || lang
  try { if (language && hljs.getLanguage(language)) return hljs.highlight(code, { language, ignoreIllegals: true }).value } catch { /* fall through */ }
  return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function rewriteHref(h) {
  if (/^(https?:|mailto:|#)/.test(h)) return h
  const pathPart = h.split("#")[0]
  const base = pathPart.split("/").pop()
  if (anchor[base]) return "#" + anchor[base]
  return BLOB + pathPart.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "")
}
function processHtml(html) {
  // code blocks → our panel + highlighted
  html = html.replace(/<pre><code(?: class="language-([\w-]+)")?>([\s\S]*?)<\/code><\/pre>/g, (m, lang, body) => {
    const code = unesc(body)
    const label = lang || "text"
    return `<div class="code"><div class="ch"><span class="lang">${label}</span><button class="copy">Copy</button></div><pre><code class="hljs">${highlight(code, lang || "")}</code></pre></div>`
  })
  // links → in-page anchors / GitHub
  html = html.replace(/href="([^"]+)"/g, (m, href) => `href="${rewriteHref(href)}"`)
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a target="_blank" rel="noopener" href="$1"')
  // demote headings one level (page keeps a single h1 in the hero)
  html = html.replace(/<(\/?)h5([ >])/g, "<$1h6$2").replace(/<(\/?)h4([ >])/g, "<$1h5$2")
    .replace(/<(\/?)h3([ >])/g, "<$1h4$2").replace(/<(\/?)h2([ >])/g, "<$1h3$2").replace(/<(\/?)h1([ >])/g, "<$1h2$2")
  return html
}
function mdSection(id) {
  const { file, eyebrow } = MD[id]
  const body = processHtml(marked.parse(read(file)))
  const eb = eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ""
  return `<section id="${id}">${eb}${body}</section>`
}

// ---- assemble the page --------------------------------------------------
const tpl = read("scripts/docs-template.html")
const grab = (id) => {
  const m = tpl.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))
  if (!m) throw new Error(`template section not found: ${id}`)
  return m[0]
}
const content = ORDER.map((id) => (KEEP.has(id) ? grab(id) : mdSection(id))).join("\n\n")

const nav = GROUPS.map((g) =>
  `      <div class="navgroup"><div class="label">${g.label}</div>\n` +
  g.ids.map((id) => `        <a href="#${id}">${TITLES[id]}</a>`).join("\n") + `\n      </div>`
).join("\n")

const crumbs = `<div class="crumbs" id="crumbs"><b>Start here</b> › Overview</div>`
const footer = `<footer>
        <span>Instantly Starter Kit · MIT · <a href="${REPO}">GitHub</a></span>
        <span>Generated from the kit's markdown · llms.txt for agents</span>
      </footer>`

let out = tpl
out = out.replace(/<nav id="nav">[\s\S]*?<\/nav>/, `<nav id="nav">\n${nav}\n    </nav>`)
out = out.replace(/<div class="reading">[\s\S]*?<\/main>/, `<div class="reading">\n      ${crumbs}\n\n${content}\n\n      ${footer}\n    </div>\n  </main>`)
// inline a compact highlight.js theme (token colors mapped to our vars)
out = out.replace("</style>", `
  .hljs-comment,.hljs-quote{color:var(--muted);font-style:italic}
  .hljs-keyword,.hljs-selector-tag,.hljs-built_in,.hljs-name,.hljs-tag{color:var(--brand)}
  .hljs-string,.hljs-attr,.hljs-template-tag,.hljs-addition{color:var(--success)}
  .hljs-number,.hljs-literal,.hljs-variable,.hljs-type,.hljs-title,.hljs-title.class_,.hljs-title.function_{color:var(--ink)}
  .hljs-meta,.hljs-symbol{color:var(--muted)}
</style>`)

write("docs/index.html", out)

// ---- llms.txt + llms-full.txt -------------------------------------------
const llms = `# Instantly Starter Kit

> Build wrapper services on top of the Instantly API (cold email / outreach infrastructure). Typed SDKs for JavaScript + Python (generated from one OpenAPI spec, all 28 API groups / 168 operations), AI-first docs, runnable templates, and a one-command scaffolder. Repo-based: clone it, point your coding agent at it, and build.

## Start here
- [Quickstart](docs/quickstart.md): clone → auth smoke check in ~90s.
- [AGENTS.md](AGENTS.md): the always-on map + rules + guided build flow your agent reads first.
- [Conventions](docs/conventions.md): auth, pagination, rate limits, async jobs, create-inactive→activate, verify-before-send, webhooks, errors.
- [Full context for agents](llms-full.txt): AGENTS.md + conventions + every API guide, concatenated.

## API guides (goal-first)
${API.map((n) => `- [${TITLES[n]}](docs/api/${n}.md)`).join("\n")}

## Build
- [Scaffolder](create-instantly-app/README.md): \`node create-instantly-app/index.js my-app --template <name> --js|--python\` — scaffolds a project with the SDK + docs + AGENTS.md vendored in.
- [JS SDK](js/sdk/README.md) · [Python SDK](python/sdk/README.md) · [Examples](js/examples) · Templates: outreach-service, reply-automation, analytics-service, lead-pipeline.

## Reference
- [spec/openapi.yaml](spec/openapi.yaml): the authoritative full API surface (OpenAPI 3.1).
`
write("llms.txt", llms)

const sep = (t) => `\n\n\n${"=".repeat(78)}\n# ${t}\n${"=".repeat(78)}\n\n`
const full = [
  `# Instantly Starter Kit — full agent context\n\n> Concatenation of AGENTS.md + conventions + all API guides + quickstart. Source of truth: spec/openapi.yaml. Repo: ${REPO}`,
  sep("AGENTS.md") + read("AGENTS.md"),
  sep("docs/conventions.md") + read("docs/conventions.md"),
  ...API.map((n) => sep(`docs/api/${n}.md`) + read(`docs/api/${n}.md`)),
  sep("docs/quickstart.md") + read("docs/quickstart.md"),
].join("")
write("llms-full.txt", full)

console.log("✓ built docs/index.html (" + (out.length / 1024).toFixed(0) + " KB), llms.txt, llms-full.txt")
