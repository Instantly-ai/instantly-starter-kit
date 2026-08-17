// CSV / bulk lead import — get leads INTO Instantly, safely. Dedupes by email,
// drops malformed addresses, creates a list, and bulk-adds in batches. The UI
// gates it behind a confirm; verification (verify-before-send) is a separate step.
import { createLeadList, bulkAddLeads } from "@instantly-ai/sdk"
import { opsClient, type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { useFixtures } from "./demo.js"

export interface ImportLeadRow {
  email: string
  first_name?: string
  last_name?: string
  company_name?: string
  job_title?: string
  phone?: string
}

export interface ImportResult {
  listId: string | null
  listName: string
  total: number
  added: number
  duplicates: number
  invalidEmails: number
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const clean = (v: string | undefined) => (v ?? "").trim()

/** Import leads into a new list. Rows with a malformed email or a duplicate (within
 * the batch) are counted and skipped, not sent. Adds in batches of 100. */
export async function importLeads(opts: { rows: ImportLeadRow[]; listName: string; clientId?: string; cfg?: OpsConfig }): Promise<ImportResult> {
  const seen = new Set<string>()
  const valid: ImportLeadRow[] = []
  let duplicates = 0
  let invalidEmails = 0
  for (const r of opts.rows) {
    const email = clean(r.email).toLowerCase()
    if (!EMAIL_RE.test(email)) {
      invalidEmails++
      continue
    }
    if (seen.has(email)) {
      duplicates++
      continue
    }
    seen.add(email)
    valid.push({ ...r, email })
  }

  // Demo (no key): report what the import would do, without touching the API.
  if (useFixtures()) {
    return { listId: "demo-list", listName: opts.listName, total: opts.rows.length, added: valid.length, duplicates, invalidEmails }
  }

  const c = opts.clientId ? await clientFor(opts.clientId, opts.cfg) : opsClient(opts.cfg)
  let listId: string | null = null
  try {
    const list = (await createLeadList(c, { body: { name: opts.listName } })) as { id?: string }
    listId = list.id ?? null
  } catch {
    /* list creation failed — still attempt to add (leads land unassigned) */
  }

  let added = 0
  const BATCH = 100
  for (let i = 0; i < valid.length; i += BATCH) {
    const batch = valid.slice(i, i + BATCH)
    try {
      await bulkAddLeads(c, {
        body: {
          ...(listId ? { list_id: listId } : {}),
          leads: batch.map((r) => ({
            email: r.email,
            first_name: clean(r.first_name) || null,
            last_name: clean(r.last_name) || null,
            company_name: clean(r.company_name) || null,
            job_title: clean(r.job_title) || null,
            phone: clean(r.phone) || null,
          })),
        },
      })
      added += batch.length
    } catch {
      /* a failed batch is not counted as added */
    }
  }

  return { listId, listName: opts.listName, total: opts.rows.length, added, duplicates, invalidEmails }
}
