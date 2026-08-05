/**
 * OutboundOps — the daily-ops logic as an importable class, so you can use it
 * in your own service instead of only from the CLI.
 *
 *   import { OutboundOps } from "./lib/ops.js"
 *   const ops = new OutboundOps(client)      // your own configured client
 *   const brief = await ops.brief()          // structured data — no printing
 *   const diag  = await ops.diagnose({ domains: ["acme.com"] })  // read-only
 *   if (!diag.ready) await ops.contain(diag) // execute containment on YOUR call
 *
 * The CLI commands (commands/brief.ts, commands/incident.ts) are thin wrappers
 * over this class. Formatting lives in lib/render.ts — this file never prints.
 */
import {
  createInstantlyClient,
  getCampaignAnalytics,
  pauseCampaign,
  patchAccount,
  type InstantlyClient,
} from "@instantly-ai/sdk"
import { senderHealth, repliesWaiting, overview, itemsOf, type SenderHealth } from "./reads.js"
import { verifyDns, type DnsResult } from "./dns.js"
import { thresholds as defaultThresholds, type Thresholds } from "./thresholds.js"

export interface Action { priority: number; text: string; command?: string }
export interface BriefResult {
  health: SenderHealth
  replies: number | null
  overview: unknown
  actions: Action[]
}
export interface CampaignScore { id: string; name: string; sent: number; bounceRate: number; replyRate: number }
export type ContainmentAction =
  | { kind: "pause-campaign"; label: string; campaignId: string }
  | { kind: "drop-daily-limit"; label: string; email: string; dailyLimit: number }
export interface Diagnosis {
  health: SenderHealth
  campaigns: CampaignScore[]
  worstCampaign?: CampaignScore
  dns: DnsResult[]
  causes: string[]
  plan: ContainmentAction[] // recommended, NOT executed — inspect it, then call contain()
  ready: boolean // true = nothing to contain
}
export interface ContainmentResult { action: ContainmentAction; ok: boolean; error?: unknown }

function num(obj: unknown, keys: string[]): number | undefined {
  const o = obj as Record<string, unknown> | null
  for (const k of keys) { const v = o?.[k]; if (typeof v === "number") return v }
  return undefined
}
const emptyHealth = (): SenderHealth => ({ total: null, green: 0, flagged: [] })

export class OutboundOps {
  private client: InstantlyClient
  private thresholds: Thresholds

  constructor(client: InstantlyClient, opts: { thresholds?: Thresholds } = {}) {
    this.client = client
    this.thresholds = opts.thresholds ?? defaultThresholds
  }

  /** Convenience for scripts: build from INSTANTLY_API_KEY (+ optional AS_WORKSPACE). */
  static fromEnv(): OutboundOps {
    const apiKey = process.env.INSTANTLY_API_KEY
    if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
    const asWorkspace = process.env.AS_WORKSPACE
    return new OutboundOps(
      createInstantlyClient({ apiKey, ...(asWorkspace ? { defaultHeaders: { "x-as-workspace": asWorkspace } } : {}) }),
    )
  }

  /** The morning picture — structured, no side effects. Reads degrade independently. */
  async brief(): Promise<BriefResult> {
    const health = await senderHealth(this.client).catch(emptyHealth)
    const replies = await repliesWaiting(this.client).catch(() => null)
    const ov = await overview(this.client).catch(() => null)
    const actions: Action[] = []
    if (health.flagged.length > 0) {
      actions.push({ priority: 1, text: `${health.flagged.length} sender(s) unhealthy — deliverability risk`, command: "ops.diagnose() → contain()  ·  npm run incident" })
    }
    if (replies && replies > 0) {
      actions.push({ priority: 2, text: `${replies} replies waiting`, command: "Instantly Unibox → app.instantly.ai" })
    }
    return { health, replies, overview: ov, actions }
  }

  /** Diagnose deliverability trouble. READ-ONLY — returns an inspectable containment plan; does not execute it. */
  async diagnose(opts: { domains?: string[] } = {}): Promise<Diagnosis> {
    const health = await senderHealth(this.client).catch(emptyHealth)
    const raw = await getCampaignAnalytics(this.client, { query: {} }).catch(() => null)
    const campaigns: CampaignScore[] = ((itemsOf(raw) ?? (Array.isArray(raw) ? raw : [])) as unknown[])
      .map((c) => {
        const co = c as Record<string, unknown>
        const id = (co.campaign_id ?? co.id ?? "") as string
        const name = (co.campaign_name ?? co.name ?? id) as string
        const sent = num(co, ["emails_sent_count", "sent", "emails_sent"]) ?? 0
        const bounced = num(co, ["bounced", "bounces", "bounced_count"]) ?? 0
        const replies = num(co, ["total_replies", "replies", "reply_count"]) ?? 0
        return { id, name, sent, bounceRate: sent > 0 ? bounced / sent : 0, replyRate: sent > 0 ? replies / sent : 0 }
      })
      .filter((c) => c.id)
    const eligible = campaigns.filter((c) => c.sent >= 50)
    const worstCampaign = [...eligible].sort((a, b) => b.bounceRate - a.bounceRate)[0]
    const dns = opts.domains?.length ? await verifyDns(opts.domains) : []

    const causes: string[] = []
    const highBounce = eligible.filter((c) => c.bounceRate >= this.thresholds.bounceCrit)
    if (highBounce.length >= 2) causes.push("List quality — high bounce across multiple campaigns; verify/refresh the list before more sends.")
    else if (worstCampaign && worstCampaign.bounceRate >= this.thresholds.bounceCrit) causes.push(`Campaign "${worstCampaign.name}" bounce ${(worstCampaign.bounceRate * 100).toFixed(1)}% — likely a bad list segment or a cold domain.`)
    if (health.flagged.length) causes.push(`${health.flagged.length} sender(s) in a bad state — deliverability/reputation.`)
    for (const d of dns) if (d.spf !== "ok" || d.dmarc !== "ok") causes.push(`Authentication — ${d.domain}: SPF ${d.spf}, DMARC ${d.dmarc} (fix DNS; DKIM needs your selector).`)
    if (!causes.length) causes.push("No clear cause from Instantly-side signals — check external reputation (Postmaster / MXToolbox).")

    const plan: ContainmentAction[] = []
    if (worstCampaign && worstCampaign.bounceRate >= this.thresholds.bounceCrit) {
      plan.push({ kind: "pause-campaign", label: `Pause "${worstCampaign.name}" (bounce ${(worstCampaign.bounceRate * 100).toFixed(1)}%)`, campaignId: worstCampaign.id })
    }
    for (const f of health.flagged) {
      plan.push({ kind: "drop-daily-limit", label: `Drop ${f.email} daily_limit → 25`, email: f.email, dailyLimit: 25 })
    }
    return { health, campaigns, worstCampaign, dns, causes, plan, ready: plan.length === 0 }
  }

  /** Execute a diagnosis's containment plan (pause worst campaign, drop limits). This WRITES. */
  async contain(diagnosis: Diagnosis): Promise<ContainmentResult[]> {
    const results: ContainmentResult[] = []
    for (const a of diagnosis.plan) {
      try {
        if (a.kind === "pause-campaign") await pauseCampaign(this.client, { path: { id: a.campaignId } })
        else await patchAccount(this.client, { path: { email: a.email }, body: { daily_limit: a.dailyLimit } })
        results.push({ action: a, ok: true })
      } catch (error) {
        results.push({ action: a, ok: false, error })
      }
    }
    return results
  }
}
