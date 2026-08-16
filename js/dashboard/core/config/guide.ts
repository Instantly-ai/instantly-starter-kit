// The in-app "How to use this" content. Template-aware: each generated preset
// supplies its own intro + module list; the "build a service" patterns are shared
// (they teach the SDK + js/ops, which every template rides on). The scaffolder
// (D14) selects the guide for the template it emits.

export interface GuideImage {
  src: string
  alt: string
  caption?: string
}

export interface GuideTable {
  headers: string[]
  rows: string[][]
}

export interface GuideSection {
  id: string
  title: string
  body?: string[]
  bullets?: string[]
  code?: { lang: string; source: string }
  image?: GuideImage
  table?: GuideTable
}

export interface Guide {
  template: string
  headline: string
  tagline: string
  hero?: GuideImage
  sections: GuideSection[]
}

const SHARED_SECTIONS: GuideSection[] = [
  {
    id: "what",
    title: "What this is",
    body: [
      "A self-hosted console that wraps the Instantly SDK server-side. Every read and write runs on the server — your API key lives in an env var and never reaches the browser.",
      "There is no database and no auth layer: the dashboard is a thin, forkable UI over your own Instantly workspace(s). Clone it, point it at your key, and extend it.",
    ],
  },
  {
    id: "wiring",
    title: "How it's wired — three layers",
    body: ["The whole app is three layers. The rule: put logic in ops, not in a component — that keeps the UI and any backend service you build in lockstep."],
    bullets: [
      "@instantly-ai/sdk — the typed client, one function per API operation, generated from the OpenAPI spec.",
      "@instantly-ai/ops — your domain core: reads, rollups, and workflows, written once. Self-contained functions keyed by client id; clientFor(id) resolves single-key vs agency-admin (x-as-workspace) mode.",
      "The dashboard (core) — server components call ops functions; writes go through server actions; a small reusable kit renders everything.",
    ],
  },
  {
    id: "key",
    title: "Set your key",
    body: [
      "Add your Instantly API key to js/dashboard/core/.env (read server-side only — Next never ships it to the client). Next loads .env from this app directory, not the repo root; a shell-exported INSTANTLY_API_KEY overrides the file.",
    ],
    code: { lang: "bash", source: "# js/dashboard/core/.env\nINSTANTLY_API_KEY=your_key_here\n# Optional agency admin key — acts across client workspaces:\n# AS_WORKSPACE=<sub_workspace_id>\n# Whitelabel + demo:\n# NEXT_PUBLIC_AGENCY_NAME=Meridian Outbound\n# NEXT_PUBLIC_ACCENT=#006bff\n# NEXT_PUBLIC_DEMO=1" },
  },
  {
    id: "pages",
    title: "Pages & navigation",
    body: ["The icon rail is the global nav; each client opens a five-tab shell. The rail's active item follows the route."],
    table: {
      headers: ["Route", "What it shows"],
      rows: [
        ["/", "Overview — client roster, needs-attention first, headline stats"],
        ["/campaigns", "Every campaign across all clients"],
        ["/inbox", "Every reply across all clients (row → thread)"],
        ["/deliverability", "All inbox-placement tests"],
        ["/analytics", "One full-agency aggregate: totals + trend + pipeline"],
        ["/leads", "Lead lists + recent leads across clients"],
        ["/enrichment", "SuperSearch enrichment runs across clients"],
        ["/verification", "Verify-an-email tool (confirm-gated, async)"],
        ["/learn", "These docs"],
        ["/client/[id]/[tab]", "Per-client: senders · campaigns · deliverability · analytics · replies"],
        ["/client/[id]/replies/[emailId]", "Reply-thread drill-down (full conversation)"],
      ],
    },
  },
  {
    id: "modules",
    title: "The five per-client modules",
    body: ["Open a client from the roster to get five tabs. Each is a server component over one ops function; all read-first, writes confirm-gated, nothing destructive."],
    bullets: [
      "Sender health (listSenders) — status + warmup per mailbox, warmup-score bars, daily limit, flagged detail. Labels/tones come from the API's own enum descriptions.",
      "Campaigns (listCampaigns) — sent/opens/replies/opportunities + status pills, and the create-inactive → activate flow (confirm-gated).",
      "Deliverability (listDeliverability) — inbox-placement tests → inbox/spam/category %.",
      "Analytics (analyticsFor) — overview totals + a daily trend chart + a pipeline strip.",
      "Replies (listReplies) — the reply inbox with an unread badge; click a reply for the full thread.",
    ],
    image: { src: "/docs/thread.png", alt: "Reply thread drill-down", caption: "The reply drill-down — getEmail → listEmail(search=thread:…), sent vs received bubbles." },
  },
  {
    id: "agency-pages",
    title: "Agency-wide pages",
    body: [
      "The rail pages (/campaigns, /inbox, /deliverability, /analytics, /leads, /enrichment) fan out a per-client read across every client and merge, tagging each row with its client. Single-workspace keys just aggregate the one workspace.",
      "/analytics is one full-agency roll-up: each client's daily series summed into a single trend, plus combined totals and pipeline.",
    ],
  },
  {
    id: "tools",
    title: "Leads · Enrichment · Verification",
    body: [
      "These are workspace-level tools, so they live in the rail rather than as client tabs. Leads shows lead lists + recent leads; Enrichment shows SuperSearch run history (read-only — enriching spends credits).",
      "Verification is interactive: enter an email → confirm-gate (\"uses 1 credit\") → a server action verifies → it polls until the async job settles → a result pill (verified / invalid / risky / catch-all).",
    ],
  },
  {
    id: "presets",
    title: "Module library × presets",
    body: ["The dashboard is one codebase + a module library. A preset is just a list of modules; the scaffolder composes core + the preset's modules and trims the nav. ● = in the preset."],
    table: {
      headers: ["Module", "agency", "outreach", "analytics", "replies", "leads"],
      rows: [
        ["overview", "●", "", "", "", ""],
        ["health", "●", "●", "", "", ""],
        ["campaigns", "●", "●", "", "", ""],
        ["deliverability", "●", "", "", "", ""],
        ["analytics", "●", "", "●", "", ""],
        ["replies", "●", "", "", "●", ""],
        ["leads", "", "●", "", "", "●"],
        ["enrichment", "", "●", "", "", "●"],
        ["verification", "", "●", "", "", "●"],
      ],
    },
  },
  {
    id: "read",
    title: "Read data with the SDK",
    body: ["Every operation is a typed function. Pass an ops client (which reads your key from the env) and the operation's input:"],
    code: {
      lang: "ts",
      source: 'import { listCampaign } from "@instantly-ai/sdk"\nimport { opsClient } from "@instantly-ai/ops"\n\nconst res = await listCampaign(opsClient(), { query: { limit: 20 } })\nconsole.log(res.items.length)',
    },
  },
  {
    id: "service",
    title: "Build a service function",
    body: [
      "Wrap the raw SDK calls in a self-contained function keyed by client id. clientFor() resolves the right workspace so callers just pass an id. The same function powers a dashboard module and any HTTP/CLI service you build.",
    ],
    code: {
      lang: "ts",
      source: '// js/ops/src/my-feature.ts\nimport { listAccount } from "@instantly-ai/sdk"\nimport { clientFor } from "./workspaces.js"\n\nexport async function mailboxCount(id: string) {\n  const c = await clientFor(id)\n  const res = await listAccount(c, { query: { limit: 100 } })\n  return res.items.length\n}',
    },
  },
  {
    id: "writes",
    title: "Writes are confirm-gated",
    body: [
      "Campaigns are created inactive — creating one never sends; activation is a separate explicit step (preflight: verified leads + healthy senders). In the UI, wrap any write in <ConfirmAction>; its onConfirm is a server action, so the key stays server-side.",
    ],
    code: {
      lang: "tsx",
      source: '"use server"\nimport { activateCampaign } from "@instantly-ai/sdk"\nimport { opsClient } from "@instantly-ai/ops"\n\nexport async function activate(campaignId: string) {\n  await activateCampaign(opsClient(), { path: { id: campaignId } })\n}\n\n// <ConfirmAction label="Activate" tone="primary"\n//   onConfirm={() => activate(c.id)} doneLabel="Queued" />',
    },
  },
  {
    id: "async",
    title: "Async jobs poll",
    body: [
      "Some endpoints return a job, not a result. Verification is the clearest case: createEmailVerification comes back pending, so verifyEmail polls checkVerificationStatus (a free read) until it settles. Don't render a job as if it were synchronous — the same applies to enrichment and bulk lead moves.",
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks — events out",
    body: [
      "To make Instantly part of your system, react to what happens in it. Instantly POSTs an event to a URL you register — reply_received, email_bounced, lead_meeting_booked, campaign_completed, account_error, supersearch_enrichment_completed, and more.",
      "This kit ships a typed parser (parseWebhook) + a one-call registrar (registerWebhook) + a reference receiver at app/api/webhooks/instantly/route.ts. Register the hook, then plug your logic into handle() — forward to Slack, mirror to your DB, open a task. Instantly has no request signing, so set a shared-secret header when you register and check it on the way in.",
    ],
    code: {
      lang: "ts",
      source: '// 1. register once (points Instantly at your endpoint)\nimport { registerWebhook } from "@instantly-ai/ops"\nawait registerWebhook({\n  url: "https://you.com/api/webhooks/instantly",\n  event: "reply_received",\n  secretHeader: { name: "x-webhook-secret", value: process.env.INSTANTLY_WEBHOOK_SECRET! },\n})\n\n// 2. receive (app/api/webhooks/instantly/route.ts)\nimport { parseWebhook } from "@instantly-ai/ops"\nexport async function POST(req: Request) {\n  const event = parseWebhook(await req.json())\n  // event.type · event.leadEmail · event.campaignId · event.raw\n  return Response.json({ ok: true })\n}',
    },
  },
  {
    id: "kit",
    title: "The component kit",
    body: [
      "Every screen is composed from a small set of reusable components in components/ — so a new module is mostly wiring, not styling. Browse them all live at /kit (the layout icon at the bottom of the rail).",
    ],
    bullets: [
      "Layout: AppShell · IconRail · TopBar · WorkspaceSwitcher · Panel · Tabs.",
      "Data: DataTable (typed columns + optional onRowClick) · StatTile · Chart + Legend · HealthBar · Pill (status tones) · ClientCell.",
      "Actions & state: ConfirmAction (confirm-gated writes) · CodeBlock · Skeleton · EmptyState · EnvBadge · ThemeToggle · ApiCaption.",
    ],
    code: {
      lang: "tsx",
      source: 'import { Panel } from "@/components/Panel"\nimport { DataTable } from "@/components/DataTable"\nimport { Pill } from "@/components/Pill"\n\n<Panel title="Senders" caption="listAccount" bodyPadding={false}>\n  <DataTable\n    rows={rows}\n    getKey={(r) => r.email}\n    columns={[\n      { key: "email", header: "Sender", render: (r) => r.email },\n      { key: "status", header: "Status", render: () => <Pill tone="ok">Active</Pill> },\n    ]}\n  />\n</Panel>',
    },
  },
  {
    id: "extend",
    title: "Extending the console",
    bullets: [
      "Add a module (tab): write the read in js/ops → build a server component with the kit → add a case in app/client/[id]/[tab]/page.tsx. Copy modules/health/SenderHealth.tsx as the smallest example.",
      "Add a drill-down: add a detail route under app/client/[id]/[tab]/[itemId] and make rows clickable. Reference: the reply thread (ReplyThread + getThread).",
      "Add an agency page: write an all* fan-out in js/ops/src/agency.ts → add app/<name>/page.tsx + a rail entry in IconRail.",
    ],
  },
  {
    id: "design",
    title: "Design & whitelabel",
    bullets: [
      "Dark-first with a no-FOUC theme script; light via [data-theme=light]; the toggle persists to localStorage.",
      "Whitelabel it fully — NEXT_PUBLIC_AGENCY_NAME (sidebar name) + NEXT_PUBLIC_ACCENT (recolors the whole UI via --brand) + NEXT_PUBLIC_LOGO (drop a logo in /public). The collapsible sidebar carries the brand.",
      "Instantly language: borders over shadows, pill statuses, underline tabs, the 64px rail, the soft colored-shadow primary button. See every primitive live at /kit.",
    ],
  },
  {
    id: "demo",
    title: "Demo mode",
    body: [
      "Set NEXT_PUBLIC_DEMO=1 to deterministically mask prospect data — lead emails, subjects, reply text, sending inboxes, workspace name/id — with stable fakes (same input → same fake, so threads stay coherent). Used for shareable demos and screenshots so nothing real leaks.",
    ],
  },
  {
    id: "conventions",
    title: "Conventions",
    bullets: [
      "API key from env, server-side only — never hardcoded, never shipped to the browser.",
      "Writes confirm-gated (ConfirmAction) over server actions; create-inactive → activate for campaigns.",
      "Verify-before-send; async ops poll their jobs.",
      "Reads degrade independently — one failed read renders an empty state, not a blank page.",
      "Cursor pagination on list reads; agency pages fan out per client (a caching pass is the later optimization for large agencies).",
    ],
  },
  {
    id: "next",
    title: "Where to go next",
    bullets: [
      "/kit — the live component gallery (also the layout icon at the bottom of the rail).",
      "docs/api/* — goal-first notes per API group, shown as SDK calls.",
      "AGENTS.md — the map an AI agent reads to build on this kit.",
      "js/templates/* — runnable backend templates that import the same js/ops core.",
    ],
  },
]

const AGENCY_GUIDE: Guide = {
  template: "agency-console",
  headline: "How to use this console",
  tagline: "A whitelabel, multi-client outbound console — and a starting point for building your own service on the Instantly SDK.",
  hero: { src: "/docs/overview.png", alt: "Agency console overview with client roster and headline stats" },
  sections: [
    {
      id: "overview",
      title: "What the agency console gives you",
      body: [
        "One pane over every client workspace. With an agency admin key it auto-discovers your client sub-workspaces (listWorkspaceGroupMember) and fans out per client; with a single-workspace key it shows just yours.",
        "Per client you get five modules: sender health, campaigns (with a confirm-gated activate), deliverability (inbox placement), analytics (trend + pipeline), and replies (with a full thread drill-down).",
      ],
      image: { src: "/docs/replies.png", alt: "Agency inbox — replies across every client", caption: "The agency inbox — every client's replies in one pane, newest first. A full thread drill-down is one click in." },
    },
    ...SHARED_SECTIONS,
  ],
}

const GUIDES: Record<string, Guide> = {
  "agency-console": AGENCY_GUIDE,
}

/** The guide for the active template. Defaults to the agency console; the
 * scaffolder passes NEXT_PUBLIC_TEMPLATE for other presets (D14/D16). */
export function getGuide(): Guide {
  const key = process.env.NEXT_PUBLIC_TEMPLATE || "agency-console"
  return GUIDES[key] ?? AGENCY_GUIDE
}
