import { overviewRollup } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { EmptyState } from "@/components/EmptyState"
import { Roster } from "@/modules/overview/Roster"
import { formatPct } from "@/lib/format"

// Read live per request (never statically prerender — that would call the API at build with no key).
export const dynamic = "force-dynamic"

const fmtPct = (v: number | null) => formatPct(v == null ? null : v * 100)

export default async function Page() {
  let ov
  try {
    ov = await overviewRollup()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load"
    return (
      <Panel title="Couldn't load your workspaces" bodyPadding>
        <EmptyState title={msg} subtitle="Set INSTANTLY_API_KEY in the server environment, then refresh." />
      </Panel>
    )
  }

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)", letterSpacing: "-.01em" }}>Overview</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>
          {ov.mode === "agency" ? "All client workspaces, needs-attention first" : "Your workspace"}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
        <StatTile label="Clients" value={ov.stats.clients} sub={ov.mode === "agency" ? "workspaces" : "workspace"} />
        <StatTile label="Campaigns" value={ov.stats.campaigns ?? "—"} />
        <StatTile label="Avg reply rate" value={fmtPct(ov.stats.avgReplyRate)} sub="all campaigns" />
        <StatTile label="Senders flagged" value={ov.stats.flaggedSenders} sub="need action" valueColor={ov.stats.flaggedSenders > 0 ? "var(--danger)" : "var(--ink)"} />
        <StatTile label="Replies waiting" value={ov.stats.repliesWaiting} sub="unread" valueColor={ov.stats.repliesWaiting > 0 ? "var(--brand)" : "var(--ink)"} />
      </div>

      <Panel title="Client roster" caption="listWorkspaceGroupMember → x-as-workspace fan-out" bodyPadding={false}>
        <Roster rows={ov.rows} />
        {ov.mode === "single" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderTop: "1px solid var(--border)", fontSize: 12.5, color: "var(--faint)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
            Single-workspace key — showing your workspace. An admin/agency key fans out across all client workspaces here.
          </div>
        )}
      </Panel>
    </>
  )
}
