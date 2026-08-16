"use client"

import { useRouter } from "next/navigation"
import { startNavProgress } from "@/components/NavProgress"
import type { AgencyCampaign } from "@instantly-ai/ops"
import { Pill } from "@/components/Pill"
import { ClientCell } from "@/components/ClientCell"
import { DataTable, type Column } from "@/components/DataTable"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const num = (v: number) => v.toLocaleString("en-US")

const columns: Column<AgencyCampaign>[] = [
  { key: "client", header: "Client", render: (r) => <ClientCell id={r.clientId} name={r.clientName} /> },
  {
    key: "name",
    header: "Campaign",
    render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "var(--ink)" }}>{r.name}</span>
        <Pill tone={r.statusTone} dot>{r.statusLabel}</Pill>
      </span>
    ),
  },
  { key: "sent", header: "Sent", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.sent)}</span> },
  { key: "replies", header: "Replies", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.replies)}</span> },
  { key: "rr", header: "Reply rate", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{pct(r.replyRate)}</span> },
]

/** Full-row click → the campaign drill-down (top-level, scoped to its client). */
export function AgencyCampaignsTable({ rows }: { rows: AgencyCampaign[] }) {
  const router = useRouter()
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getKey={(r) => `${r.clientId}:${r.id}`}
      minWidth={820}
      onRowClick={(r) => { startNavProgress(); router.push(`/campaigns/${r.id}?client=${r.clientId}`) }}
    />
  )
}
