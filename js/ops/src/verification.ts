import { createEmailVerification, checkVerificationStatus } from "@instantly-ai/sdk"
import { type OpsConfig } from "./client.js"
import { clientFor } from "./workspaces.js"
import { awaitJob } from "./jobs.js"
import { useFixtures } from "./demo.js"

export interface VerificationResult {
  email: string
  status: string // e.g. "verified" | "invalid" | "risky" | "catch_all" | "pending"
  catchAll: boolean
  creditsUsed: number | null
  creditsRemaining: number | null
}

interface RawVerification {
  email?: string
  verification_status?: string
  status?: string | null
  catch_all?: boolean | string
  credits?: number | null
  credits_used?: number | null
}

function toResult(r: RawVerification, fallbackEmail: string): VerificationResult {
  return {
    email: r.email || fallbackEmail,
    status: r.verification_status || r.status || "pending",
    catchAll: r.catch_all === true || r.catch_all === "true",
    creditsUsed: typeof r.credits_used === "number" ? r.credits_used : null,
    creditsRemaining: typeof r.credits === "number" ? r.credits : null,
  }
}

const isPending = (s: string) => {
  const v = (s || "").toLowerCase()
  return v === "" || v === "pending" || v === "unknown" || v === "processing"
}

/** Verify a single email address (verify-before-send). Consumes a credit — this is
 * a write, so callers gate it behind an explicit confirm. Verification is an async
 * job: `create` returns `pending`, so we await it via the shared `awaitJob` helper,
 * polling `checkVerificationStatus` (a free read) until it settles. */
export async function verifyEmail(id: string, email: string, cfg?: OpsConfig): Promise<VerificationResult> {
  if (useFixtures()) {
    const bad = /^(bounce|invalid|bad)@/i.test(email)
    return { email, status: bad ? "invalid" : "verified", catchAll: false, creditsUsed: 0.25, creditsRemaining: 100_000 }
  }
  const c = await clientFor(id, cfg)
  const created = toResult((await createEmailVerification(c, { body: { email } })) as RawVerification, email)
  if (!isPending(created.status)) return created

  return awaitJob(
    async () => toResult((await checkVerificationStatus(c, { path: { email } })) as RawVerification, email),
    (r) => !isPending(r.status),
    { intervalMs: 1500, timeoutMs: 20000 },
  )
}

/** Read the current verification status for an email (no credit spent). */
export async function checkVerification(id: string, email: string, cfg?: OpsConfig): Promise<VerificationResult> {
  const c = await clientFor(id, cfg)
  const r = (await checkVerificationStatus(c, { path: { email } })) as RawVerification
  return toResult(r, email)
}
