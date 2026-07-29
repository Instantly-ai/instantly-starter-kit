export class InstantlyApiError extends Error {
  readonly status: number
  readonly statusText: string
  readonly payload: unknown

  constructor(status: number, statusText: string, payload: unknown) {
    super(`Instantly API request failed (${status} ${statusText})`)
    this.name = "InstantlyApiError"
    this.status = status
    this.statusText = statusText
    this.payload = payload
  }
}
