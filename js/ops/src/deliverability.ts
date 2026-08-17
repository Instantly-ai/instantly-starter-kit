import { listInboxPlacementTest, getInboxPlacementAnalyticsStatsByTestId } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import type { Tone } from "./types.js"
import { useFixtures } from "./demo.js"
import { demoDeliverability } from "./demo-data.js"

// Inbox placement test status → label + tone (x-enumDescriptions: 1 Active / 2 Paused / 3 Completed).
const STATUS: Record<number, { label: string; tone: Tone }> = {
  1: { label: "Running", tone: "ok" },
  2: { label: "Paused", tone: "neutral" },
  3: { label: "Completed", tone: "info" },
}

export interface DeliverabilityRow {
  id: string
  name: string
  status: number | null
  statusLabel: string
  statusTone: Tone
  createdAt: string | null // ISO timestamp
  count: number // emails seeded in the test
  inboxPercent: number | null // 0..100
  spamPercent: number | null // 0..100
  categoryPercent: number | null // 0..100 (promotions/social/etc.)
}

export interface DeliverabilityData {
  rows: DeliverabilityRow[]
  total: number
  avgInboxPercent: number | null
  latestInboxPercent: number | null
}

interface RawTest {
  id?: string
  name?: string
  status?: number | null
  timestamp_created?: string | null
}
interface RawStat {
  test_id?: string
  count?: number
  inbox_percent?: number
  spam_percent?: number
  category_percent?: number
}

/** Deliverability = inbox placement tests + their inbox/spam breakdown. Lists the
 * tests, then fans the ids into one stats call and merges. Self-contained by id. */
export async function listDeliverability(id: string, cfg?: OpsConfig): Promise<DeliverabilityData> {
  if (useFixtures()) return demoDeliverability(id)
  const c = await clientFor(id, cfg)
  const testsRes = (await listInboxPlacementTest(c, { query: { limit: 50 } })) as { items?: RawTest[] }
  const tests = Array.isArray(testsRes?.items) ? testsRes.items : []

  if (tests.length === 0) return { rows: [], total: 0, avgInboxPercent: null, latestInboxPercent: null }

  // Aggregated inbox/spam/category counts per test — one POST for all ids.
  const statsByTest: Record<string, RawStat> = {}
  try {
    const ids = tests.map((t) => t.id).filter((v): v is string => !!v)
    const stats = (await getInboxPlacementAnalyticsStatsByTestId(c, { body: { test_ids: ids } })) as RawStat[]
    for (const s of Array.isArray(stats) ? stats : []) if (s.test_id) statsByTest[s.test_id] = s
  } catch {
    /* stats are best-effort; the test list still renders */
  }

  const rows: DeliverabilityRow[] = tests.map((t) => {
    const status = typeof t.status === "number" ? t.status : null
    const s = (status != null && STATUS[status]) || { label: "Unknown", tone: "neutral" as Tone }
    const st = t.id ? statsByTest[t.id] : undefined
    return {
      id: t.id ?? "",
      name: t.name ?? "Untitled test",
      status,
      statusLabel: s.label,
      statusTone: s.tone,
      createdAt: t.timestamp_created ?? null,
      count: st?.count ?? 0,
      inboxPercent: typeof st?.inbox_percent === "number" ? st.inbox_percent : null,
      spamPercent: typeof st?.spam_percent === "number" ? st.spam_percent : null,
      categoryPercent: typeof st?.category_percent === "number" ? st.category_percent : null,
    }
  })

  // Latest first by creation time.
  rows.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))

  const inbox = rows.map((r) => r.inboxPercent).filter((v): v is number => v != null)
  return {
    rows,
    total: rows.length,
    avgInboxPercent: inbox.length ? Math.round(inbox.reduce((a, b) => a + b, 0) / inbox.length) : null,
    latestInboxPercent: rows[0]?.inboxPercent ?? null,
  }
}
