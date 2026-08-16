// Async-job primitive. Several Instantly operations return a job, not a result —
// verification, SuperSearch enrichment, bulk lead moves. They come back "pending"
// and settle later, so you poll a status read until it's done. awaitJob() is that
// loop, written once: pass a read and a done-predicate, get the settled result.

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export interface AwaitJobOptions {
  /** Delay between polls (ms). Default 1500. */
  intervalMs?: number
  /** Give up after this long (ms) and return the last result. Default 20000. */
  timeoutMs?: number
}

/**
 * Poll `read` until `done(result)` is true or the timeout elapses; returns the
 * last result either way (callers decide what a still-pending result means).
 * A throwing `read` stops the loop and the last good result is returned.
 *
 *   const r = await awaitJob(
 *     () => checkVerificationStatus(c, { path: { email } }),
 *     (v) => v.verification_status !== "pending",
 *   )
 */
export async function awaitJob<T>(read: () => Promise<T>, done: (r: T) => boolean, opts?: AwaitJobOptions): Promise<T> {
  const interval = opts?.intervalMs ?? 1500
  const timeout = opts?.timeoutMs ?? 20000

  let result = await read()
  let elapsed = 0
  while (!done(result) && elapsed < timeout) {
    await sleep(interval)
    elapsed += interval
    try {
      result = await read()
    } catch {
      break // network/API hiccup — return the last good result
    }
  }
  return result
}
