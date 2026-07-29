import { getBackgroundJob } from "../resources/backgroundjob.js"
import type { InstantlyClient } from "../client/types.js"

export interface WaitForBackgroundJobOptions {
  intervalMs?: number
  maxAttempts?: number
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function waitForBackgroundJob(
  client: InstantlyClient,
  jobId: string,
  options: WaitForBackgroundJobOptions = {},
) {
  const intervalMs = options.intervalMs ?? 2000
  const maxAttempts = options.maxAttempts ?? 60

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await getBackgroundJob(client, { path: { id: jobId } })
    const maybeStatus = typeof result === "object" && result ? (result as { status?: unknown }).status : undefined
    if (typeof maybeStatus === "string" && ["completed", "success", "failed", "error"].includes(maybeStatus)) {
      return result
    }
    await sleep(intervalMs)
  }

  throw new Error(`Background job polling exceeded ${maxAttempts} attempts`)
}
