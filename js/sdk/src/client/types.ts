export interface InstantlyClientConfig {
  apiKey: string
  baseUrl?: string
  fetchImpl?: typeof fetch
  maxRetries?: number
  defaultHeaders?: HeadersInit
}

export interface InstantlyClient {
  apiKey: string
  baseUrl: string
  fetchImpl: typeof fetch
  maxRetries: number
  defaultHeaders: HeadersInit
}

export interface OperationMetadata {
  operationId: string
  resourceGroup: string
  method: string
  path: string
  successStatusCodes: readonly string[]
  scopes: readonly string[]
}
