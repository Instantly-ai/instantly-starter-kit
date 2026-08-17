import { listEmail, countUnreadEmails, getEmail } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { isDemo, maskEmail, maskSubject, maskOutbound, maskReply, useFixtures } from "./demo.js"
import { demoReplies, demoCountReplies, demoThread } from "./demo-data.js"

export interface ReplyRow {
  id: string
  from: string // the lead / sender address
  subject: string
  preview: string
  account: string // the mailbox that received it (eaccount)
  campaignId: string | null
  date: string | null // ISO
  unread: boolean
}

export interface RepliesData {
  rows: ReplyRow[]
  total: number
  unread: number
}

interface RawEmail {
  id?: string
  subject?: string
  from_address_email?: string | null
  to_address_email_list?: string
  lead?: string | null
  eaccount?: string
  campaign_id?: string | null
  thread_id?: string | null
  timestamp_created?: string
  content_preview?: string | null
  is_unread?: number | null
  body?: { text?: string; html?: string } | null
}

export interface ThreadMessage {
  id: string
  direction: "sent" | "received" // sent = we sent it (from == the mailbox); received = the lead replied
  from: string
  to: string
  date: string | null
  text: string
}

export interface ThreadData {
  subject: string
  lead: string
  account: string
  messages: ThreadMessage[]
}

function num(res: unknown): number {
  if (typeof res === "number") return res
  const r = res as { count?: number } | null
  return typeof r?.count === "number" ? r.count : 0
}

/** Unread reply count for a client — used for the tab badge and the module stat. */
export async function countReplies(id: string, cfg?: OpsConfig): Promise<number> {
  if (useFixtures()) return demoCountReplies(id)
  const c = await clientFor(id, cfg)
  return num(await countUnreadEmails(c, {}))
}

/** The reply inbox for one client: latest received email per thread, newest first,
 * plus the workspace unread count. Self-contained by id. */
export async function listReplies(id: string, cfg?: OpsConfig): Promise<RepliesData> {
  if (useFixtures()) return demoReplies(id)
  const c = await clientFor(id, cfg)

  const [listRaw, unread] = await Promise.all([
    listEmail(c, { query: { email_type: "received", latest_of_thread: true, sort_order: "desc", limit: 50 } }) as Promise<{ items?: RawEmail[] }>,
    countUnreadEmails(c, {}).then(num).catch(() => 0),
  ])

  const items = Array.isArray(listRaw?.items) ? listRaw.items : []
  const demo = isDemo()
  const rows: ReplyRow[] = items.map((e) => {
    const seed = e.id || e.lead || ""
    const from = e.lead || e.from_address_email || "Unknown sender"
    return {
      id: e.id ?? "",
      from: demo ? maskEmail(from) : from,
      subject: demo ? maskSubject(seed) : e.subject || "(no subject)",
      preview: demo ? maskReply(seed) : (e.content_preview || e.body?.text || "").replace(/\s+/g, " ").trim().slice(0, 160),
      account: demo ? maskEmail(e.eaccount) : e.eaccount ?? "—",
      campaignId: e.campaign_id ?? null,
      date: e.timestamp_created ?? null,
      unread: e.is_unread === 1,
    }
  })

  return { rows, total: rows.length, unread }
}

/** Best-effort plain text from an HTML body — for outbound emails that only carry
 * `body.html`. Strips tags/styles and decodes the few common entities; no render. */
function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|br|li|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function toMessage(e: RawEmail): ThreadMessage {
  const from = e.from_address_email || e.lead || "—"
  // `eaccount` is the mailbox that sent the email; `from_address_email` is populated
  // from it on outbound. from == eaccount ⇒ we sent it, otherwise the lead replied.
  const sent = !!e.eaccount && !!e.from_address_email && e.from_address_email.toLowerCase() === e.eaccount.toLowerCase()
  const realText = (e.body?.text || (e.body?.html ? htmlToText(e.body.html) : "") || e.content_preview || "").trim()
  const seed = e.thread_id || e.id || from
  return {
    id: e.id ?? "",
    direction: sent ? "sent" : "received",
    from: isDemo() ? maskEmail(from) : from,
    to: isDemo() ? maskEmail(e.to_address_email_list?.split(",")[0]) : e.to_address_email_list ?? "",
    date: e.timestamp_created ?? null,
    text: isDemo() ? (sent ? maskOutbound(seed) : maskReply(seed + (e.id ?? ""))) : realText,
  }
}

/** Full conversation for one reply: fetch the email, then every message in its
 * thread (oldest → newest). Returns null if the email can't be found. */
export async function getThread(id: string, emailId: string, cfg?: OpsConfig): Promise<ThreadData | null> {
  if (useFixtures()) return demoThread(emailId)
  const c = await clientFor(id, cfg)

  let base: RawEmail
  try {
    base = (await getEmail(c, { path: { id: emailId } })) as RawEmail
  } catch {
    return null
  }

  let items: RawEmail[] = [base]
  if (base.thread_id) {
    try {
      const res = (await listEmail(c, { query: { search: `thread:${base.thread_id}`, sort_order: "asc", limit: 100 } })) as { items?: RawEmail[] }
      if (Array.isArray(res.items) && res.items.length) items = res.items
    } catch {
      /* fall back to just the one email */
    }
  }

  const messages = items
    .map(toMessage)
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))

  const lead = base.lead || base.from_address_email || ""
  const seed = base.thread_id || base.id || lead
  return {
    subject: isDemo() ? maskSubject(seed) : base.subject || "(no subject)",
    lead: isDemo() ? maskEmail(lead) : lead,
    account: isDemo() ? maskEmail(base.eaccount) : base.eaccount || "",
    messages,
  }
}
