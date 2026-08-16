"use client"

import { useRouter } from "next/navigation"
import { startNavProgress } from "@/components/NavProgress"
import type { AgencyReply } from "@instantly-ai/ops"
import { Pill } from "@/components/Pill"
import { ClientCell } from "@/components/ClientCell"
import { DataTable, type Column } from "@/components/DataTable"

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

const columns: Column<AgencyReply>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} /> },
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
      <div style={{ maxWidth: 420 }}>
        <div style={{ fontWeight: 500, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.subject}</div>
        {r.preview && <div style={{ fontSize: 12.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.preview}</div>}
      </div>
    ),
  },
  { key: "date", header: "Received", align: "right", render: (r) => <span style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>{fmtDate(r.date)}</span> },
]

/** Full-row click → the reply thread (in that reply's client). */
export function InboxTable({ rows }: { rows: AgencyReply[] }) {
  const router = useRouter()
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getKey={(r) => `${r.clientId}:${r.id}`}
      minWidth={880}
      onRowClick={(r) => { startNavProgress(); router.push(`/inbox/${r.id}?client=${r.clientId}`) }}
    />
  )
}
