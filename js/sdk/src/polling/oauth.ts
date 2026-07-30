import { getOAuthSessionStatus } from "../resources/oauth.js"
import type { InstantlyClient } from "../client/types.js"

export interface PollOauthSessionOptions {
  intervalMs?: number
  maxAttempts?: number
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function pollOauthSessionStatus(
  client: InstantlyClient,
  sessionId: string,
  options: PollOauthSessionOptions = {},
) {
  const intervalMs = options.intervalMs ?? 2000
  const maxAttempts = options.maxAttempts ?? 60

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await getOAuthSessionStatus(client, { path: { sessionId } })
    const status = typeof result === "object" && result ? (result as { status?: unknown }).status : undefined
    if (status === "success" || status === "error" || status === "expired") {
      return result
    }
    await sleep(intervalMs)
  }

  throw new Error(`OAuth polling exceeded ${maxAttempts} attempts`)
}
