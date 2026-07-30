export interface Config {
  /** Optional at boot — API routes 400 if it's missing, but the server still starts. */
  apiKey?: string
  webhookSecret: string
  port: number
  publicUrl?: string
}

export function loadConfig(): Config {
  return {
    apiKey: process.env.INSTANTLY_API_KEY,
    webhookSecret: process.env.WEBHOOK_SECRET ?? "change-me",
    port: Number(process.env.PORT ?? 3000),
    publicUrl: process.env.PUBLIC_URL,
  }
}
