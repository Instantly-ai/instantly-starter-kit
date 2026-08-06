import { createInstantlyClient, type InstantlyClient } from "@instantly-ai/sdk"

/**
 * Build a client from the environment. Never hardcode the key.
 * Set AS_WORKSPACE (with an admin-workspace key) to run against a client sub-workspace.
 */
export function getClient(): InstantlyClient {
  const apiKey = process.env.INSTANTLY_API_KEY
  if (!apiKey) throw new Error("INSTANTLY_API_KEY is not set")
  const asWorkspace = process.env.AS_WORKSPACE
  return createInstantlyClient({
    apiKey,
    ...(asWorkspace ? { defaultHeaders: { "x-as-workspace": asWorkspace } } : {}),
  })
}
