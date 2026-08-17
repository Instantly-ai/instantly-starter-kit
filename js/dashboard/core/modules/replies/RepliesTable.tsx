"use client"

import { useRouter } from "next/navigation"
import { startNavProgress } from "@/components/NavProgress"
import type { ReplyRow } from "@instantly-ai/ops"
import { Pill } from "@/components/Pill"
import { DataTable, type Column } from "@/components/DataTable"

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

const columns: Column<ReplyRow>[] = [
  {
    key: "from",
    header: "From",
    render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {r.unread && <Pill tone="info" dot>New</Pill>}
        <span style={{ fontWeight: r.unread ? 500 : 400, color: "var(--ink)" }}>{r.from}</span>
      </span>
    ),
  },
  {
    key: "message",
    header: "Message",
    render: (r) => (
      <div style={{ maxWidth: 460 }}>
        <div style={{ fontWeight: 500, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.subject}</div>
        {r.preview && <div style={{ fontSize: 12.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.preview}</div>}
      </div>
    ),
  },
  { key: "account", header: "Inbox", render: (r) => <span style={{ color: "var(--body)" }}>{r.account}</span> },
  { key: "date", header: "Received", align: "right", render: (r) => <span style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>{fmtDate(r.date)}</span> },
]

/** Client wrapper so a reply row opens its full thread (drill-down). */
export function RepliesTable({ clientId, rows }: { clientId: string; rows: ReplyRow[] }) {
  const router = useRouter()
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getKey={(r) => r.id}
      minWidth={820}
      onRowClick={(r) => { if (r.id) { startNavProgress(); router.push(`/inbox/${r.id}?client=${clientId}`) } }}
    />
  )
}
