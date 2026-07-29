export interface Config {
  apiKey?: string
  limit: number
  /** Edit these to your ICP — see docs/api/enrichment.md for the SuperSearch filter shape. */
  searchFilters: Record<string, unknown>
}

export function loadConfig(): Config {
  return {
    apiKey: process.env.INSTANTLY_API_KEY,
    limit: Number(process.env.LIMIT ?? 100),
    searchFilters: { title: { include: ["Founder", "CEO"] }, department: ["Sales"] },
  }
}
