"use server"

import { verifyEmail, type VerificationResult } from "@instantly-ai/ops"

export type VerifyActionResult = { ok: true; result: VerificationResult } | { ok: false; error: string }

/** Server action: verify one email (spends a credit). The key stays server-side. */
export async function verifyEmailAction(clientId: string, email: string): Promise<VerifyActionResult> {
  const clean = email.trim()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) return { ok: false, error: "Enter a valid email address" }
  try {
    const result = await verifyEmail(clientId, clean)
    return { ok: true, result }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Verification failed" }
  }
}
