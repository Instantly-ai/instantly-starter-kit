"use server"

import { importLeads, type ImportLeadRow, type ImportResult } from "@instantly-ai/ops"

export type ImportActionResult = { ok: true; result: ImportResult } | { ok: false; error: string }

/** Server action: create a list in the chosen workspace and bulk-add the parsed
 * rows. `clientId` targets a workspace (agency mode); empty = the base key's own.
 * Key stays server-side. */
export async function importLeadsAction(clientId: string, listName: string, rows: ImportLeadRow[]): Promise<ImportActionResult> {
  if (!listName.trim()) return { ok: false, error: "Name the list first" }
  if (!rows.length) return { ok: false, error: "No rows to import" }
  try {
    const result = await importLeads({ rows, listName: listName.trim(), clientId: clientId || undefined })
    return { ok: true, result }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Import failed" }
  }
}
