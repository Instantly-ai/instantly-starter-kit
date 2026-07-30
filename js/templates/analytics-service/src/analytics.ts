/**
 * Pull analytics across campaigns + accounts + webhook events, then normalize
 * into one stable snapshot your dashboard/endpoint can consume. Grounded in
 * docs/api/analytics.md. Respect rate limits — the scheduler spreads pulls.
 */
import {
  createInstantlyClient,
  getCampaignAnalytics,
  getCampaignAnalyticsOverview,
  getDailyCampaignAnalytics,
  getDailyAccountAnalytics,
  getWebhookEventsSummary,
  InstantlyApiError,
  type InstantlyClient,
} from "@instantly-ai/sdk"

export function getClient(apiKey: string | undefined): InstantlyClient {
  if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
  return createInstantlyClient({ apiKey })
}

export interface Snapshot {
  generatedAt: string
  window: { start_date: string; end_date: string }
  campaigns: { all: unknown; overview: unknown; daily: unknown }
  accounts: { daily: unknown }
  events: { summary: unknown }
  /** Per-section errors — a failed pull is recorded here instead of failing the whole snapshot. */
  errors: Record<string, string>
}

function lastNDays(n: number): { start_date: string; end_date: string } {
  const end = new Date()
  const start = new Date(end.getTime() - n * 24 * 60 * 60 * 1000)
  return { start_date: start.toISOString().slice(0, 10), end_date: end.toISOString().slice(0, 10) }
}

export async function pullSnapshot(client: InstantlyClient): Promise<Snapshot> {
  // Bound the daily pulls with a date window — unbounded account analytics 413s on
  // busy workspaces ("add an emails filter or a smaller date range").
  const window = lastNDays(30)

  // Omit `id` to get all campaigns (see docs/api/analytics.md).
  const pulls: Record<string, () => Promise<unknown>> = {
    campaignsAll: () => getCampaignAnalytics(client, { query: { ...window } }),
    campaignsOverview: () => getCampaignAnalyticsOverview(client, {}),
    campaignsDaily: () => getDailyCampaignAnalytics(client, { query: { ...window } }),
    accountsDaily: () => getDailyAccountAnalytics(client, { query: { ...window } }),
    eventsSummary: () => getWebhookEventsSummary(client, {}),
  }

  const keys = Object.keys(pulls)
  const settled = await Promise.allSettled(keys.map((k) => pulls[k]()))
  const value: Record<string, unknown> = {}
  const errors: Record<string, string> = {}
  settled.forEach((result, i) => {
    const key = keys[i]
    if (result.status === "fulfilled") {
      value[key] = result.value
    } else {
      const reason = result.reason
      errors[key] =
        reason instanceof InstantlyApiError
          ? `${reason.status}: ${JSON.stringify(reason.payload)}`
          : String(reason)
    }
  })

  return {
    generatedAt: new Date().toISOString(),
    window,
    campaigns: { all: value.campaignsAll, overview: value.campaignsOverview, daily: value.campaignsDaily },
    accounts: { daily: value.accountsDaily },
    events: { summary: value.eventsSummary },
    errors,
  }
}

// Simple in-memory cache the scheduler refreshes.
let cache: Snapshot | undefined

export function setCache(snapshot: Snapshot): void {
  cache = snapshot
}
export function getCache(): Snapshot | undefined {
  return cache
}
