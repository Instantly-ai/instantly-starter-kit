import type { Lead } from "./dedupe.js"

/** Implement this against your DB/CRM (Postgres, HubSpot, Salesforce, …). */
export interface SyncAdapter {
  name: string
  sync(leads: Lead[]): Promise<number>
}

/** Default stub: writes to stdout. Replace with a real adapter. */
export const consoleSync: SyncAdapter = {
  name: "console",
  async sync(leads: Lead[]): Promise<number> {
    for (const lead of leads) console.log("[sync]", lead.email)
    return leads.length
  },
}
