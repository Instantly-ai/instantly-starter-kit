import { listAccount } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import type { Tone } from "./types.js"
import { useFixtures } from "./demo.js"
import { demoSenders } from "./demo-data.js"

function itemsOf(res: unknown): unknown[] {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) if (r && Array.isArray(r[k])) return r[k] as unknown[]
  return []
}

// Account status/warmup codes → label + pill tone. Grounded in the API's own
// x-enumDescriptions (see patch-account: status 1..3/-1..-3, warmup_status 0/1/-1..-3).
const STATUS: Record<number, { label: string; tone: Tone }> = {
  1: { label: "Active", tone: "ok" },
  2: { label: "Paused", tone: "neutral" },
  3: { label: "Maintenance", tone: "warn" },
  [-1]: { label: "Connection error", tone: "danger" },
  [-2]: { label: "Soft bounce", tone: "danger" },
  [-3]: { label: "Sending error", tone: "danger" },
}
const WARMUP: Record<number, { label: string; tone: Tone }> = {
  0: { label: "Paused", tone: "neutral" },
  1: { label: "Active", tone: "ok" },
  [-1]: { label: "Banned", tone: "danger" },
  [-2]: { label: "Spam folder", tone: "warn" },
  [-3]: { label: "Suspended", tone: "danger" },
}

export interface SenderRow {
  email: string
  status: number
  statusLabel: string
  statusTone: Tone
  warmupStatus: number
  warmupLabel: string
  warmupTone: Tone
  warmupScore: number | null // 0..100
  dailyLimit: number | null
  setupPending: boolean
  message: string | null // human-readable detail from status_message on errors
  flagged: boolean // status or warmup is in an error state
}

export interface SenderHealthData {
  rows: SenderRow[]
  total: number
  active: number // status Active
  warming: number // warmup Active
  flagged: number // any error state
  setupPending: number
  avgWarmupScore: number | null
}

interface RawAccount {
  email?: string
  status?: number
  warmup_status?: number
  stat_warmup_score?: number | null
  daily_limit?: number | null
  setup_pending?: boolean
  status_message?: { response?: string; e_message?: string; code?: string } | null
}

function messageOf(a: RawAccount): string | null {
  const m = a.status_message
  if (!m || typeof m !== "object") return null
  return m.e_message || m.response || m.code || null
}

function mapRow(raw: unknown): SenderRow {
  const a = (raw ?? {}) as RawAccount
  const status = typeof a.status === "number" ? a.status : 0
  const warmupStatus = typeof a.warmup_status === "number" ? a.warmup_status : 0
  const s = STATUS[status] ?? { label: `Status ${status}`, tone: "neutral" as Tone }
  const w = WARMUP[warmupStatus] ?? { label: `Warmup ${warmupStatus}`, tone: "neutral" as Tone }
  return {
    email: a.email ?? "—",
    status,
    statusLabel: s.label,
    statusTone: s.tone,
    warmupStatus,
    warmupLabel: w.label,
    warmupTone: w.tone,
    warmupScore: typeof a.stat_warmup_score === "number" ? a.stat_warmup_score : null,
    dailyLimit: typeof a.daily_limit === "number" ? a.daily_limit : null,
    setupPending: a.setup_pending === true,
    message: messageOf(a),
    flagged: status < 0 || warmupStatus < 0,
  }
}

/** Per-sender health for one client: status + warmup state, warmup score, daily
 * limit, and the error detail when a mailbox is flagged. Self-contained by id —
 * resolves agency-vs-single mode internally, so callers just pass the client id. */
export async function listSenders(id: string, cfg?: OpsConfig): Promise<SenderHealthData> {
  if (useFixtures()) return demoSenders(id)
  const c = await clientFor(id, cfg)
  const accts = itemsOf(await listAccount(c, { query: { limit: 100 } }))
  const rows = accts.map(mapRow).sort((a, b) => {
    // needs-attention first: flagged, then setup-pending, then by warmup score asc
    if (a.flagged !== b.flagged) return a.flagged ? -1 : 1
    if (a.setupPending !== b.setupPending) return a.setupPending ? -1 : 1
    return (a.warmupScore ?? 101) - (b.warmupScore ?? 101)
  })

  const scores = rows.map((r) => r.warmupScore).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    active: rows.filter((r) => r.status === 1).length,
    warming: rows.filter((r) => r.warmupStatus === 1).length,
    flagged: rows.filter((r) => r.flagged).length,
    setupPending: rows.filter((r) => r.setupPending).length,
    avgWarmupScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
  }
}
