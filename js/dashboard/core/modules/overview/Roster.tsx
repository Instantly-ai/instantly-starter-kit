"use client"

import { useRouter } from "next/navigation"
import { startNavProgress } from "@/components/NavProgress"
import type { RosterRow } from "@instantly-ai/ops"
import { DataTable } from "@/components/DataTable"
import { HealthBar } from "@/components/HealthBar"
import { Pill } from "@/components/Pill"
import { colorFor, initialsOf } from "@/lib/avatar"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const deliv = (r: RosterRow) =>
  r.severity === "critical" ? { t: "At risk", tone: "danger" as const }
  : r.severity === "watch" ? { t: "Watch", tone: "warn" as const }
  : { t: "Healthy", tone: "ok" as const }
const noteColor = (s: RosterRow["severity"]) => (s === "critical" ? "var(--danger)" : s === "watch" ? "#b98600" : "var(--faint)")

export function Roster({ rows }: { rows: RosterRow[] }) {
  const router = useRouter()
  return (
    <DataTable
      variant="rows"
      minWidth={940}
      getKey={(r) => r.id}
      onRowClick={(r) => { startNavProgress(); router.push(`/client/${r.id}`) }}
      rows={rows}
      columns={[
        {
          key: "name", header: "Client", render: (r) => (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 34, height: 34, flex: "0 0 34px", borderRadius: 10, fontSize: 12.5, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: colorFor(r.id) }}>{initialsOf(r.name)}</span>
              <span>
                <span style={{ display: "block", fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{r.name}</span>
                <span style={{ display: "block", fontSize: 12.5, marginTop: 2, color: noteColor(r.severity) }}>{r.note}</span>
              </span>
            </div>
          ),
        },
        { key: "senders", header: "Senders", render: (r) => (r.sendersTotal == null ? <span style={{ color: "var(--faint)" }}>—</span> : <HealthBar ok={r.sendersOk} total={r.sendersTotal} />) },
        { key: "campaigns", header: "Campaigns", render: (r) => <span style={{ color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{r.campaigns ?? "—"}</span> },
        { key: "reply", header: "Reply rate", render: (r) => <span style={{ fontWeight: 500, color: "var(--ink)" }}>{pct(r.replyRate)}</span> },
        { key: "deliv", header: "Deliverability", render: (r) => { const d = deliv(r); return <Pill tone={d.tone}>{d.t}</Pill> } },
        { key: "replies", header: "Replies waiting", render: (r) => (r.replies ? <Pill tone={r.replies > 15 ? "danger" : "info"}>{String(r.replies)}</Pill> : <span style={{ color: "var(--faint)" }}>0</span>) },
      ]}
    />
  )
}
