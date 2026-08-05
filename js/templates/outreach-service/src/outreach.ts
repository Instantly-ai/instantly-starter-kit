/**
 * Orchestration: the campaign-build-and-launch flow, composed from SDK calls.
 * Each function is a thin wrapper — the SDK does the API work; we add sequencing,
 * batching, and polling. Grounded in docs/api/* and workflows.json.
 */
import {
  createInstantlyClient,
  createLeadList,
  bulkAddLeads,
  enrichLeadsFromSupersearch,
  getVerificationStats,
  createCampaign,
  getCampaignSendingStatus,
  listAccount,
  activateCampaign,
  createWebhook,
  type InstantlyClient,
} from "@instantly-ai/sdk"

export function getClient(apiKey: string | undefined): InstantlyClient {
  if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
  return createInstantlyClient({ apiKey })
}

/** Read an `id` off a loosely-typed success response. */
function idOf(value: unknown): string {
  return (value as { id?: string }).id ?? ""
}

export interface LeadInput {
  email: string
  first_name?: string
  last_name?: string
  company_name?: string
}

export interface BuildParams {
  name: string
  subject: string
  body: string
  senders: string[]
  leads?: LeadInput[]
  /** Verify leads on import — spends a credit per lead. Default off. */
  verify?: boolean
  /** Optional SuperSearch filters — if given, enrich into the list first. */
  searchFilters?: Record<string, unknown>
  enrichLimit?: number
}

/** Create a lead list; returns its id. */
export async function createList(client: InstantlyClient, name: string): Promise<string> {
  const list = await createLeadList(client, { body: { name } })
  return idOf(list)
}

/** Optionally source leads via SuperSearch into a new list; returns the resource/list id. */
export async function enrichIntoList(
  client: InstantlyClient,
  name: string,
  searchFilters: Record<string, unknown>,
  limit: number,
): Promise<string> {
  const run = await enrichLeadsFromSupersearch(client, {
    body: { search_filters: searchFilters as never, limit, list_name: name, work_email_enrichment: true },
  })
  return (run as { resource_id?: string }).resource_id ?? ""
}

/** Add BYO leads in batches of ≤1000, verifying on import. Returns list verification stats. */
export async function addAndVerifyLeads(
  client: InstantlyClient,
  listId: string,
  leads: LeadInput[],
  verify = false, // verify_leads_on_import spends a credit per lead — opt in explicitly
): Promise<unknown> {
  for (let i = 0; i < leads.length; i += 1000) {
    await bulkAddLeads(client, {
      body: {
        list_id: listId,
        leads: leads.slice(i, i + 1000),
        verify_leads_on_import: verify,
        skip_if_in_workspace: true,
      },
    })
  }
  return getVerificationStats(client, { path: { id: listId } })
}

/** Create the campaign as a Draft (status 0 — does NOT send). Returns campaign id. */
export async function createCampaignDraft(client: InstantlyClient, params: BuildParams): Promise<string> {
  const campaign = await createCampaign(client, {
    body: {
      name: params.name,
      campaign_schedule: {
        schedules: [
          {
            name: "Business hours",
            timing: { from: "09:00", to: "17:00" },
            days: { "1": true, "2": true, "3": true, "4": true, "5": true },
            timezone: "America/Chicago",
          },
        ],
      },
      sequences: [{ steps: [{ type: "email", delay: 0, variants: [{ subject: params.subject, body: params.body }] }] }],
      email_list: params.senders,
      stop_on_reply: true,
    },
  })
  return idOf(campaign)
}

/** Extract a list from a paginated response without assuming the exact envelope. */
function itemsOf(res: unknown): unknown[] | null {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "accounts", "results"]) {
    if (r && Array.isArray(r[k])) return r[k] as unknown[]
  }
  return null
}

/**
 * Preflight: readiness check before activating. Never sends. Returns a summary
 * you can gate `launch()` on — connected-sender count, sending status, and
 * (when `listId` is given) verification stats. `hasSenders` is `false` only when
 * we definitively parsed zero senders, `"unknown"` if the payload shape was
 * unexpected — don't hard-block on `"unknown"`.
 */
export async function preflight(client: InstantlyClient, campaignId: string, listId?: string) {
  const status = await getCampaignSendingStatus(client, { path: { id: campaignId } })
  const accounts = await listAccount(client, { query: { limit: 100 } })
  const senders = itemsOf(accounts)
  const senderCount = senders ? senders.length : null
  const hasSenders: boolean | "unknown" = senderCount === null ? "unknown" : senderCount > 0
  // Verification is opt-in in this kit, so it does NOT gate readiness — surfaced for the caller to judge.
  const verification = listId ? await getVerificationStats(client, { path: { id: listId } }) : undefined
  const ready = hasSenders === true
  return { ready, checks: { hasSenders, senderCount }, status, accounts, verification }
}

/** Launch: activate the campaign (starts sending). Call only after preflight passes. */
export async function launch(client: InstantlyClient, campaignId: string): Promise<unknown> {
  return activateCampaign(client, { path: { id: campaignId } })
}

/** Register the reply webhook pointing at this service (custom-header auth; no HMAC). */
export async function registerReplyWebhook(
  client: InstantlyClient,
  targetUrl: string,
  secret: string,
): Promise<unknown> {
  return createWebhook(client, {
    body: { target_hook_url: targetUrl, event_type: "reply_received", headers: { "x-shared-secret": secret } },
  })
}
