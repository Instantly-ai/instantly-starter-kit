import type { InstantlyClient, InstantlyClientConfig } from "./types.js"

const DEFAULT_BASE_URL = "https://api.instantly.ai"

export function createInstantlyClient(config: InstantlyClientConfig): InstantlyClient {
  return {
    apiKey: config.apiKey,
    baseUrl: config.baseUrl || DEFAULT_BASE_URL,
    fetchImpl: config.fetchImpl || fetch,
    maxRetries: config.maxRetries ?? 1,
    defaultHeaders: config.defaultHeaders || {},
  }
}
