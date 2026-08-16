import { listLeadList, listLeads } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { isDemo, maskEmail, maskPerson, maskCompany, useFixtures } from "./demo.js"
import { demoLeads } from "./demo-data.js"

function itemsOf(res: unknown): unknown[] {
  if (Array.isArray(res)) return res
  const r = res as Record<string, unknown> | null
  for (const k of ["items", "data", "leads", "results"]) if (r && Array.isArray(r[k])) return r[k] as unknown[]
  return []
}

export interface LeadListRow {
  id: string
  name: string
  createdAt: string | null
  hasEnrichment: boolean
}

export interface LeadRow {
  id: string
  email: string
  name: string
  company: string
  title: string
  opens: number
  replies: number
  clicks: number
}

export interface LeadsData {
  lists: LeadListRow[]
  leads: LeadRow[]
  listCount: number
  leadCount: number
}

interface RawList {
  id?: string
  name?: string
  timestamp_created?: string
  has_enrichment_task?: boolean | null
}
interface RawLead {
  id?: string
  email?: string | null
  first_name?: string | null
  last_name?: string | null
  company_name?: string | null
  job_title?: string | null
  email_open_count?: number
  email_reply_count?: number
  email_click_count?: number
}

const nn = (v: number | undefined) => (typeof v === "number" ? v : 0)

/** Lead lists + a sample of recent leads for one client. Read-only. */
export async function leadsFor(id: string, cfg?: OpsConfig): Promise<LeadsData> {
  if (useFixtures()) return demoLeads(id)
  const c = await clientFor(id, cfg)
  const demo = isDemo()

  const [listsRaw, leadsRaw] = await Promise.all([
    listLeadList(c, { query: { limit: 50 } }).catch(() => ({ items: [] as RawList[] })),
    // POST /leads/list — a POST-based "list" endpoint (complex filters).
    listLeads(c, { body: { limit: 25 } }).catch(() => ({ items: [] as RawLead[] })),
  ])

  const lists: LeadListRow[] = itemsOf(listsRaw).map((l) => {
    const x = l as RawList
    return { id: x.id ?? "", name: demo ? maskCompany(x.id ?? x.name ?? "") + " list" : x.name || "Untitled list", createdAt: x.timestamp_created ?? null, hasEnrichment: x.has_enrichment_task === true }
  })

  const leads: LeadRow[] = itemsOf(leadsRaw).map((l) => {
    const x = l as RawLead
    const rawEmail = x.email || ""
    const rawName = [x.first_name, x.last_name].filter(Boolean).join(" ")
    return {
      id: x.id ?? "",
      email: demo ? maskEmail(rawEmail || x.id || "") : rawEmail || "—",
      name: demo ? maskPerson(rawEmail || x.id || "") : rawName || "—",
      company: demo ? maskCompany(x.company_name || x.id || "") : x.company_name || "—",
      title: x.job_title || "—",
      opens: nn(x.email_open_count),
      replies: nn(x.email_reply_count),
      clicks: nn(x.email_click_count),
    }
  })

  return { lists, leads, listCount: lists.length, leadCount: leads.length }
}
