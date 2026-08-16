import { createInstantlyClient, type InstantlyClient } from "@instantly-ai/sdk"

export interface OpsConfig {
  /** API key. Defaults to process.env.INSTANTLY_API_KEY. */
  apiKey?: string
  baseUrl?: string
  /** Act as a specific sub-workspace (agency admin key). Defaults to process.env.AS_WORKSPACE. */
  asWorkspace?: string
}

export function resolveApiKey(cfg?: OpsConfig): string {
  const key = cfg?.apiKey ?? process.env.INSTANTLY_API_KEY
  if (!key) throw new Error("INSTANTLY_API_KEY is not set (read server-side, never in the browser).")
  return key
}

/**
 * A client for the key's own workspace — or an admin key optionally acting as a
 * sub-workspace via `cfg.asWorkspace` / `AS_WORKSPACE`.
 */
export function opsClient(cfg?: OpsConfig): InstantlyClient {
  const asWorkspace = cfg?.asWorkspace ?? process.env.AS_WORKSPACE
  return createInstantlyClient({
    apiKey: resolveApiKey(cfg),
    ...(cfg?.baseUrl ? { baseUrl: cfg.baseUrl } : {}),
    ...(asWorkspace ? { defaultHeaders: { "x-as-workspace": asWorkspace } } : {}),
  })
}

/** A client scoped to act AS a specific sub-workspace (the agency fan-out primitive). */
export function forWorkspace(subWorkspaceId: string, cfg?: OpsConfig): InstantlyClient {
  return createInstantlyClient({
    apiKey: resolveApiKey(cfg),
    ...(cfg?.baseUrl ? { baseUrl: cfg.baseUrl } : {}),
    defaultHeaders: { "x-as-workspace": subWorkspaceId },
  })
}
