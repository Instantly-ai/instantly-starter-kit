export interface Config {
  apiKey?: string
  port: number
  refreshMs: number
}

export function loadConfig(): Config {
  return {
    apiKey: process.env.INSTANTLY_API_KEY,
    port: Number(process.env.PORT ?? 3000),
    refreshMs: Number(process.env.REFRESH_MS ?? 300000),
  }
}
