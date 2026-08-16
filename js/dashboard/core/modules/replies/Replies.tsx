import { listReplies } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { EmptyState } from "@/components/EmptyState"
import { RepliesTable } from "./RepliesTable"

export async function Replies({ id }: { id: string }) {
  let data
  try {
    data = await listReplies(id)
  } catch {
    return (
      <Panel title="Replies" caption="listEmail">
        <EmptyState title="Couldn't load replies" subtitle="The inbox read failed for this workspace. Check the API key's emails scope." />
      </Panel>
    )
  }

  if (data.total === 0) {
    return (
      <Panel title="Replies" caption="listEmail · email_type=received">
        <EmptyState title="No replies yet" subtitle="Received replies land here — the newest message from each thread, unread ones flagged." />
      </Panel>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <StatTile label="Threads" value={data.total} sub="latest per thread" />
        <StatTile label="Unread" value={data.unread} valueColor={data.unread > 0 ? "var(--brand)" : undefined} />
      </div>

      <Panel title="Reply inbox" caption="listEmail · countUnreadEmails" bodyPadding={false}>
        <RepliesTable clientId={id} rows={data.rows} />
      </Panel>
    </div>
  )
}
