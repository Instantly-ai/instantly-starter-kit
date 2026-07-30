export interface Config {
  apiKey?: string
  webhookSecret: string
  port: number
  actOnReplies: boolean
}

export function loadConfig(): Config {
  return {
    apiKey: process.env.INSTANTLY_API_KEY,
    webhookSecret: process.env.WEBHOOK_SECRET ?? "change-me",
    port: Number(process.env.PORT ?? 3000),
    actOnReplies: process.env.ACT_ON_REPLIES === "1",
  }
}
