export interface Lead {
  email?: string
  [key: string]: unknown
}

/** Dedupe leads by normalized email; drops rows without an email. Pure + testable. */
export function dedupeByEmail(leads: Lead[]): Lead[] {
  const seen = new Set<string>()
  const out: Lead[] = []
  for (const lead of leads) {
    const key = (lead.email ?? "").trim().toLowerCase()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(lead)
  }
  return out
}
