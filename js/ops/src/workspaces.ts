import { listWorkspaceGroupMember, getWorkspace, InstantlyApiError } from "@instantly-ai/sdk"
import { opsClient, forWorkspace, type OpsConfig } from "./client.js"
import type { ClientsResult, ClientWorkspace } from "./types.js"
import { isDemo, maskCompany, useFixtures } from "./demo.js"
import { demoClients } from "./demo-data.js"

/** In demo mode, replace client/workspace names with deterministic fakes. */
function maskClients(res: ClientsResult): ClientsResult {
  if (!isDemo()) return res
  return { ...res, clients: res.clients.map((c) => ({ ...c, name: maskCompany(c.id) })) }
}

// Short in-process TTL memo (no-cfg calls only). A single page render fans out N
// per-client reads that each re-probe agency-mode; caching collapses that to one
// probe, and lets the layout + page share one listClients. Safe for self-hosted
// single-key use; a passed cfg bypasses the cache.
const TTL_MS = 15_000
function ttlMemo<T>(fn: () => Promise<T>): () => Promise<T> {
  let hit: { t: number; p: Promise<T> } | null = null
  return () => {
    const now = Date.now()
    if (hit && now - hit.t < TTL_MS) return hit.p
    const p = fn().catch((e) => {
      hit = null // don't cache failures
      throw e
    })
    hit = { t: now, p }
    return p
  }
}

async function isAgencyRaw(cfg?: OpsConfig): Promise<boolean> {
  try {
    const page = await listWorkspaceGroupMember(opsClient(cfg), { query: { limit: 1 } })
    return page.items.some((m) => m.status === "accepted" && m.sub_workspace_id)
  } catch (err) {
    if (err instanceof InstantlyApiError) return false
    throw err
  }
}
const isAgencyMemo = ttlMemo(() => isAgencyRaw())

/** Light probe: is this an agency (admin) key with a client group? Memoized (TTL)
 * for the common no-cfg path so a fan-out probes once, not per client. */
async function isAgency(cfg?: OpsConfig): Promise<boolean> {
  return cfg ? isAgencyRaw(cfg) : isAgencyMemo()
}

/** Resolve the SDK client for a given client id: `x-as-workspace` in agency mode,
 * the plain key in single mode. Self-contained so per-module reads take just an id. */
export async function clientFor(id: string, cfg?: OpsConfig) {
  return (await isAgency(cfg)) ? forWorkspace(id, cfg) : opsClient(cfg)
}

/** The single (own) workspace — used when the key has no agency group. */
async function currentWorkspace(cfg?: OpsConfig): Promise<ClientsResult> {
  try {
    const ws = (await getWorkspace(opsClient(cfg), {})) as { id?: string; name?: string }
    return { mode: "single", clients: [{ id: ws.id ?? "current", name: ws.name ?? "My workspace", status: "accepted" }] }
  } catch {
    return { mode: "single", clients: [{ id: "current", name: "My workspace", status: "accepted" }] }
  }
}

/**
 * Enumerate the agency's client sub-workspaces with an admin key
 * (`listWorkspaceGroupMember`, cursor-paginated, status `accepted`), resolving
 * each name via `getWorkspace` acting as that sub-workspace. Falls back to
 * single-workspace mode when the key isn't an admin/agency key or has no group.
 */
export async function listClients(cfg?: OpsConfig): Promise<ClientsResult> {
  if (useFixtures()) return demoClients()
  return cfg ? listClientsRaw(cfg) : listClientsMemo()
}

async function listClientsRaw(cfg?: OpsConfig): Promise<ClientsResult> {
  const admin = opsClient(cfg)
  const members: { subId: string; status: string }[] = []

  try {
    let startingAfter: string | undefined
    do {
      const page = await listWorkspaceGroupMember(admin, {
        query: { limit: 100, ...(startingAfter ? { starting_after: startingAfter } : {}) },
      })
      for (const m of page.items) members.push({ subId: m.sub_workspace_id, status: m.status })
      startingAfter = page.next_starting_after
    } while (startingAfter)
  } catch (err) {
    // No group / not an admin key → single-workspace mode.
    if (err instanceof InstantlyApiError) return maskClients(await currentWorkspace(cfg))
    throw err
  }

  const accepted = members.filter((m) => m.status === "accepted" && m.subId)
  if (accepted.length === 0) return maskClients(await currentWorkspace(cfg))

  const clients = await Promise.all(
    accepted.map(async (m): Promise<ClientWorkspace> => {
      let name = m.subId
      try {
        const ws = (await getWorkspace(forWorkspace(m.subId, cfg), {})) as { name?: string }
        name = ws.name ?? m.subId
      } catch {
        /* keep the id as the name if the per-workspace read fails */
      }
      return { id: m.subId, name, status: "accepted" }
    }),
  )
  return maskClients({ mode: "agency", clients })
}
const listClientsMemo = ttlMemo(() => listClientsRaw())
