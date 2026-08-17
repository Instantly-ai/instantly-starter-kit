import Link from "next/link"
import { getThread, type ThreadMessage } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { Pill } from "@/components/Pill"
import { EmptyState } from "@/components/EmptyState"

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

function Message({ m }: { m: ThreadMessage }) {
  const sent = m.direction === "sent"
  return (
    <div style={{ display: "flex", justifyContent: sent ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: 620,
          width: "fit-content",
          border: "1px solid var(--border)",
          background: sent ? "var(--brand-soft)" : "var(--surface)",
          borderRadius: "var(--radius-card)",
          padding: "12px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Pill tone={sent ? "info" : "neutral"}>{sent ? "Sent" : "Reply"}</Pill>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{m.from}</span>
          <span style={{ fontSize: 12, color: "var(--faint)", marginLeft: "auto", whiteSpace: "nowrap" }}>{fmtDate(m.date)}</span>
        </div>
        <div style={{ fontSize: 13.5, color: "var(--body)", whiteSpace: "pre-wrap", lineHeight: 1.5, wordBreak: "break-word" }}>
          {m.text || <span style={{ color: "var(--faint)" }}>(no text content)</span>}
        </div>
      </div>
    </div>
  )
}

export async function ReplyThread({ clientId, emailId, backHref = "/inbox" }: { clientId: string; emailId: string; backHref?: string }) {
  const thread = await getThread(clientId, emailId)

  const back = (
    <Link href={backHref} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
      ‹ Back to replies
    </Link>
  )

  if (!thread) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {back}
        <Panel title="Thread">
          <EmptyState title="Message not found" subtitle="This email may have been deleted or belongs to another workspace." />
        </Panel>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {back}
      <div>
        <h2 style={{ fontSize: 19, fontWeight: 500, color: "var(--ink)", margin: 0 }}>{thread.subject}</h2>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
          {thread.lead && <span>{thread.lead}</span>}
          {thread.account && <span> · via {thread.account}</span>}
          <span> · {thread.messages.length} message{thread.messages.length === 1 ? "" : "s"}</span>
        </div>
      </div>

      <Panel caption="getEmail · listEmail(search=thread:…)" bodyPadding>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {thread.messages.map((m, i) => (
            <Message key={m.id || i} m={m} />
          ))}
        </div>
      </Panel>
    </div>
  )
}
