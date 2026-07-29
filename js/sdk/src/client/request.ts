import { InstantlyApiError } from "../errors/index.js"
import type { InstantlyClient, OperationMetadata } from "./types.js"

interface OperationInput {
  path?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: unknown
  headers?: HeadersInit
  signal?: AbortSignal
}

function buildPath(template: string, pathParams: Record<string, unknown> | undefined): string {
  let path = template
  for (const [key, value] of Object.entries(pathParams || {})) {
    path = path.replace(`{${key}}`, encodeURIComponent(String(value)))
  }
  return path
}

function buildQuery(query: Record<string, unknown> | undefined): string {
  if (!query) {
    return ""
  }

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, String(item))
      }
      continue
    }

    if (typeof value === "object") {
      params.append(key, JSON.stringify(value))
      continue
    }

    params.append(key, String(value))
  }

  const text = params.toString()
  return text ? `?${text}` : ""
}

async function parsePayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function executeOperation<TSuccess>(
  client: InstantlyClient,
  metadata: OperationMetadata,
  input: OperationInput,
): Promise<TSuccess> {
  const path = buildPath(metadata.path, input.path)
  const query = buildQuery(input.query)
  const url = `${client.baseUrl.replace(/\/+$/, "")}${path}${query}`

  const headers = new Headers(client.defaultHeaders)
  headers.set("accept", "application/json")
  headers.set("authorization", `Bearer ${client.apiKey}`)
  // A User-Agent is required — the API's edge (Cloudflare) blocks requests with a
  // default/banned UA. Set before caller headers so `input.headers` can override it.
  headers.set("user-agent", "instantly-ai-sdk/0.1.0")

  if (input.body !== undefined) {
    headers.set("content-type", "application/json")
  }

  if (input.headers) {
    new Headers(input.headers).forEach((value, key) => headers.set(key, value))
  }

  for (let attempt = 0; attempt <= client.maxRetries; attempt += 1) {
    const response = await client.fetchImpl(url, {
      method: metadata.method,
      headers,
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      signal: input.signal,
    })

    if (response.ok) {
      return (await parsePayload(response)) as TSuccess
    }

    const payload = await parsePayload(response)
    if ((response.status === 429 || response.status >= 500) && attempt < client.maxRetries) {
      await sleep(250 * (attempt + 1))
      continue
    }

    throw new InstantlyApiError(response.status, response.statusText, payload)
  }

  throw new Error(`Unexpected retry exhaustion for ${metadata.operationId}`)
}
