export type ClientMode = "agency" | "single"

/** Pill tones shared with the dashboard's `<Pill>` — kept as plain strings so ops
 * can pre-classify status without importing UI. */
export type Tone = "ok" | "warn" | "danger" | "info" | "neutral"

export interface ClientWorkspace {
  /** The workspace id (a sub-workspace id in agency mode, the current workspace in single mode). */
  id: string
  name: string
  status: "accepted" | "pending" | "rejected" | string
}

export interface ClientsResult {
  /** "agency" when the admin key enumerated a workspace group; "single" otherwise. */
  mode: ClientMode
  clients: ClientWorkspace[]
}
