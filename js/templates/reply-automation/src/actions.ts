import { createInstantlyClient, updateLeadInterestStatus, type InstantlyClient } from "@instantly-ai/sdk"

export function getClient(apiKey: string | undefined): InstantlyClient {
  if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
  return createInstantlyClient({ apiKey })
}

/**
 * Route a classified reply by setting the lead's interest status.
 * `updateLeadInterestStatus` is async (HTTP 202) — accepted, not immediately applied.
 * To auto-respond instead/as well, use emails.replyToEmail with the payload's email_id
 * (= reply_to_uuid).
 */
export async function applyInterest(
  client: InstantlyClient,
  leadEmail: string,
  interestValue: number,
): Promise<unknown> {
  return updateLeadInterestStatus(client, { body: { lead_email: leadEmail, interest_value: interestValue } })
}
