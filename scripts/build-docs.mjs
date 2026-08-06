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
const API = ["campaigns", "leads", "enrichment", "verification", "emails", "analytics", "accounts", "webhooks", "deliverability", "workspaces"]
const anchor = { "conventions.md": "conventions", "quickstart.md": "quickstart", "overview.md": "overview", "templates.md": "templates" }
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
  deliverability: { file: "docs/api/deliverability.md" }, workspaces: { file: "docs/api/workspaces.md" },
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
  deliverability: "Deliverability", workspaces: "Workspaces",
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
- [JS SDK](js/sdk/README.md) · [Python SDK](python/sdk/README.md) · [Examples](js/examples) · Templates: outreach-service, reply-automation, analytics-service, lead-pipeline, outbound-ops.

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

// ---- MDX export (portable — drop into Mintlify / Docusaurus / Nextra) -------
const MDX_DESC = {
  overview: "What the Instantly Starter Kit is, the mental model, and where to start.",
  quickstart: "Clone, set your key, and see a real API response in ~90 seconds.",
  conventions: "The cross-cutting rules the whole API assumes — auth, pagination, rate limits, async jobs, create-inactive to activate, verify-before-send, errors.",
  templates: "Runnable service templates to fork — pick a language and template and scaffold in one command.",
  campaigns: "Create, launch, and manage campaigns as SDK calls.",
  leads: "Add, verify, and organize leads and lists.",
  enrichment: "Find and enrich leads from SuperSearch (credit-based, async).",
  verification: "Check deliverability before you send (credit-based).",
  emails: "Read the inbox and reply to threads.",
  analytics: "Read campaign and account performance data.",
  accounts: "Connect senders, warm them up, and check their health.",
  webhooks: "Subscribe to events like replies and bounces.",
  deliverability: "Warmup and inbox-placement — the deliverability you already pay for.",
  workspaces: "Multi-workspace / agency operations and plan/credit visibility.",
}
const MDX_FILES = {
  overview: "docs/overview.md", quickstart: "docs/quickstart.md",
  conventions: "docs/conventions.md", templates: "docs/templates.md",
  ...Object.fromEntries(API.map((n) => [n, `docs/api/${n}.md`])),
}
const MDX_ORDER = ["overview", "quickstart", "conventions", "templates", ...API]

function rewriteMdxLink(h) {
  if (/^(https?:|mailto:|#)/.test(h)) return h
  const [p, hash] = h.split("#")
  if (p.endsWith(".md")) return "./" + p.split("/").pop().replace(/\.md$/, "") + (hash ? "#" + hash : "")
  return BLOB + p.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "")
}
// Escape MDX-breaking chars in PROSE only — never inside fenced or inline code.
function escapeMdxProse(md) {
  let inFence = false
  return md.split("\n").map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line }
    if (inFence) return line
    return line.split(/(`[^`]*`)/).map((seg) => {
      if (seg.startsWith("`") && seg.endsWith("`")) return seg
      return seg.replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/<(?=[A-Za-z/!])(?!https?:\/\/|mailto:)/g, "&lt;")
    }).join("")
  }).join("\n")
}
function toMdx(id) {
  let md = read(MDX_FILES[id])
  const m = md.match(/^\s*#\s+(.+?)\s*$/m) // first H1 → frontmatter title, dropped from body
  const title = m ? m[1] : (TITLES[id] || id)
  if (m) md = md.replace(m[0], "").replace(/^\s+/, "")
  md = md.replace(/\]\(([^)]+)\)/g, (_, href) => "](" + rewriteMdxLink(href) + ")") // rewrite [text](href)
  if (id === "templates") md = md.replace(/<!--\s*TEMPLATE_PICKER\s*-->/, "PICKERSLOT")
  md = escapeMdxProse(md)
  let imports = ""
  if (id === "templates") { md = md.replace("PICKERSLOT", "<TemplatePicker />"); imports = "import TemplatePicker from './components/TemplatePicker'\n\n" }
  const desc = (MDX_DESC[id] || "").replace(/"/g, "'")
  return `---\ntitle: "${title}"\ndescription: "${desc}"\n---\n\n${imports}${md}\n`
}
const TEMPLATE_PICKER_JSX = `import React, { useState } from "react"

// Self-contained, dependency-free picker: choose a template + language, copy the command.
const TEMPLATES = [
  { id: "outreach-service", blurb: "Full outbound flow: list -> verify -> campaign -> launch -> replies." },
  { id: "reply-automation", blurb: "Webhook -> classify reply -> set interest / auto-respond." },
  { id: "analytics-service", blurb: "Scheduled analytics pull -> normalize -> JSON feed." },
  { id: "lead-pipeline", blurb: "SuperSearch -> enrich -> verify -> dedupe -> sync to a DB/CRM." },
  { id: "outbound-ops", blurb: "Daily loop: morning brief + incident triage." },
  { id: "minimal", blurb: "SDK + AGENTS.md + docs — a blank canvas." },
]

export default function TemplatePicker() {
  const [tpl, setTpl] = useState("outreach-service")
  const [lang, setLang] = useState("js")
  const [copied, setCopied] = useState(false)
  const cmd = \`npx create-instantly-app@latest my-app --template \${tpl} --\${lang}\`
  const copy = () => navigator.clipboard.writeText(cmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  const blurb = TEMPLATES.find((t) => t.id === tpl)?.blurb
  const pill = (on) => ({ padding: "6px 12px", borderRadius: 999, cursor: "pointer", fontSize: 14, border: on ? "1px solid #006bff" : "1px solid #d0d0d6", background: on ? "#006bff" : "transparent", color: on ? "#fff" : "inherit" })
  return (
    <div style={{ border: "1px solid #e3e3e8", borderRadius: 12, padding: 16, margin: "1.5rem 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        {TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => setTpl(t.id)} style={pill(tpl === t.id)}>{t.id}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["js", "JavaScript"], ["python", "Python"]].map(([l, label]) => (
          <button key={l} onClick={() => setLang(l)} style={pill(lang === l)}>{label}</button>
        ))}
      </div>
      {blurb ? <p style={{ margin: "0 0 12px", opacity: 0.7, fontSize: 14 }}>{blurb}</p> : null}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0d1117", color: "#e6edf3", borderRadius: 8, padding: "10px 12px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>
        <code style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", background: "none", color: "inherit", padding: 0 }}>{cmd}</code>
        <button onClick={copy} style={{ padding: "4px 10px", borderRadius: 6, cursor: "pointer", border: "1px solid #30363d", background: "#21262d", color: "#e6edf3" }}>{copied ? "Copied" : "Copy"}</button>
      </div>
    </div>
  )
}
`
for (const id of MDX_ORDER) write(`docs/mdx/${id}.mdx`, toMdx(id))
write("docs/mdx/components/TemplatePicker.jsx", TEMPLATE_PICKER_JSX)

console.log("✓ built docs/index.html (" + (out.length / 1024).toFixed(0) + " KB), llms.txt, llms-full.txt, docs/mdx/*.mdx (" + MDX_ORDER.length + " pages)")
