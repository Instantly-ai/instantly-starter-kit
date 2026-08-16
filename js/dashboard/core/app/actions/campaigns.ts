"use server"

import { activateCampaignFor, pauseCampaignFor } from "@instantly-ai/ops"

// Server actions — the API key stays server-side; the browser only ever invokes
// these by id. Each wraps the confirm-gated write in js/ops.
export async function activateCampaignAction(clientId: string, campaignId: string) {
  await activateCampaignFor(clientId, campaignId)
}

export async function pauseCampaignAction(clientId: string, campaignId: string) {
  await pauseCampaignFor(clientId, campaignId)
}
