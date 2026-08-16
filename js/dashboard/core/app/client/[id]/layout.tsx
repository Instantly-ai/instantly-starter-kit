import type { ReactNode } from "react"
import { listClients, getPlanName, countReplies, isDemo, maskId } from "@instantly-ai/ops"
import { ClientHeader } from "@/components/ClientHeader"
import { ClientTabs } from "@/components/ClientTabs"

export const dynamic = "force-dynamic"

// Nested under the root shell — adds the per-client header + tabs; the rail/topbar
// come from the root layout, so navigating between clients only swaps this region.
export default async function ClientLayout({ children, params }: { children: ReactNode; params: { id: string } }) {
  const id = decodeURIComponent(params.id)

  let mode: "agency" | "single" = "single"
  let name = "Workspace"
  let resolvedId = id
  try {
    const res = await listClients()
    mode = res.mode
    // In single mode the URL id is irrelevant (one workspace) — always resolve to it.
    const match = res.clients.find((c) => c.id === id) ?? (mode === "single" ? res.clients[0] : undefined)
    if (match) {
      name = match.name
      resolvedId = match.id
    }
  } catch {
    /* render with minimal info */
  }
  const [plan, repliesBadge] = await Promise.all([
    getPlanName(resolvedId, mode === "agency"),
    countReplies(resolvedId).catch(() => 0),
  ])

  return (
    <>
      <ClientHeader id={resolvedId} name={name} plan={plan} wsId={isDemo() ? maskId(resolvedId) : resolvedId} />
      <ClientTabs id={resolvedId} repliesBadge={repliesBadge || undefined} />
      <div style={{ marginTop: 24 }}>{children}</div>
    </>
  )
}
