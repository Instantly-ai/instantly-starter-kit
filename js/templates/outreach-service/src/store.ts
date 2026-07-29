/** Minimal in-memory state store. Swap for a real DB in production. */

export type RunStatus = "created" | "verifying" | "ready" | "active" | "error"

export interface Run {
  id: string
  status: RunStatus
  listId?: string
  campaignId?: string
  leads: number
  verificationStats?: unknown
  replies: Array<{ emailId?: string; eventType?: string; at: string }>
  error?: string
  updatedAt: string
}

const runs = new Map<string, Run>()

export function createRun(id: string): Run {
  const run: Run = { id, status: "created", leads: 0, replies: [], updatedAt: new Date().toISOString() }
  runs.set(id, run)
  return run
}

export function updateRun(id: string, patch: Partial<Run>): Run | undefined {
  const run = runs.get(id)
  if (!run) return undefined
  Object.assign(run, patch, { updatedAt: new Date().toISOString() })
  return run
}

export function getRun(id: string): Run | undefined {
  return runs.get(id)
}

export function listRuns(): Run[] {
  return [...runs.values()]
}
