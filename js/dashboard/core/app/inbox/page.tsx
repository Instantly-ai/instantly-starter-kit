import { allInbox } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { EmptyState } from "@/components/EmptyState"
import { InboxTable } from "@/modules/replies/InboxTable"

export const dynamic = "force-dynamic"

export default async function InboxPage() {
  const data = await allInbox().catch(() => null)

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Inbox</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>Replies across every client, newest first</p>
      </div>

      {!data || data.rows.length === 0 ? (
        <Panel title="Inbox" caption="listEmail · fan-out">
          <EmptyState title="No replies yet" subtitle={data ? "No client has a received reply yet." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
        </Panel>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 22 }}>
            <StatTile label="Shown" value={data.rows.length} sub="newest threads" />
            <StatTile label="Unread" value={data.unread} valueColor={data.unread > 0 ? "var(--brand)" : undefined} />
            <StatTile label="Clients" value={data.clients} />
          </div>
          <Panel title="All replies" caption="listEmail · countUnreadEmails · fan-out" bodyPadding={false}>
            <InboxTable rows={data.rows} />
          </Panel>
        </>
      )}
    </>
  )
}
