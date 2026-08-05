import {
  listAccount,
  getCampaignAnalyticsOverview,
  countUnreadEmails,
  type InstantlyClient,
} from "@instantly-ai/sdk"

/** Extract a list from a paginated response without assuming the exact envelope. */
export function itemsOf(res: unknown): unknown[] | null {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) {
    if (r && Array.isArray(r[k])) return r[k] as unknown[]
  }
  return null
}

export interface SenderHealth {
  total: number | null // null = couldn't parse the accounts payload
  green: number
  flagged: { email: string; status?: number; warmupStatus?: number; reason: string }[]
  raw?: unknown
}

/**
 * Read sender health from listAccount. Uses the documented codes (docs/api/accounts.md):
 * a negative `status` (connection/bounce/sending error) or negative `warmup_status`
 * (banned/spam/suspension) means the sender is in trouble. Conservative: only flags
 * what it can read; if the envelope is unfamiliar it returns total=null (never a false "0 healthy").
 */
export async function senderHealth(client: InstantlyClient): Promise<SenderHealth> {
  const res = await listAccount(client, { query: { limit: 100 } })
  const list = itemsOf(res)
  if (!list) return { total: null, green: 0, flagged: [], raw: res }
  const flagged: SenderHealth["flagged"] = []
  for (const a of list) {
    const acc = a as { email?: string; status?: number; warmup_status?: number }
    const problems: string[] = []
    if (typeof acc.status === "number" && acc.status < 0) problems.push(`status ${acc.status}`)
    if (typeof acc.warmup_status === "number" && acc.warmup_status < 0) problems.push(`warmup ${acc.warmup_status}`)
    if (problems.length) {
      flagged.push({ email: acc.email ?? "(unknown)", status: acc.status, warmupStatus: acc.warmup_status, reason: problems.join(", ") })
    }
  }
  return { total: list.length, green: list.length - flagged.length, flagged }
}

/** Count replies waiting in the inbox (defensive about the response shape). */
export async function repliesWaiting(client: InstantlyClient): Promise<number | null> {
  const res = await countUnreadEmails(client, {})
  if (typeof res === "number") return res
  const r = res as { count?: number; unread?: number } | null
  if (r && typeof r.count === "number") return r.count
  if (r && typeof r.unread === "number") return r.unread
  return null
}

/** Yesterday's campaign analytics overview (all campaigns). Shape varies — the renderer reads it defensively. */
export async function overview(client: InstantlyClient): Promise<unknown> {
  return getCampaignAnalyticsOverview(client, { query: {} })
}
