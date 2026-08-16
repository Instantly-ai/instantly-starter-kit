"use client"

import { useRouter } from "next/navigation"
import { startNavProgress } from "@/components/NavProgress"
import type { CampaignRow } from "@instantly-ai/ops"
import { Pill } from "@/components/Pill"
import { DataTable, type Column } from "@/components/DataTable"
import { CampaignRowActions } from "./CampaignRowActions"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const num = (v: number) => v.toLocaleString("en-US")

/** Per-client campaigns table: full-row → the campaign drill-down; the activate/pause
 * cell stops propagation so acting on a campaign doesn't also navigate. */
export function ClientCampaignsTable({ clientId, rows }: { clientId: string; rows: CampaignRow[] }) {
  const router = useRouter()
  const columns: Column<CampaignRow>[] = [
    {
      key: "name",
      header: "Campaign",
      render: (r) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 500, color: "var(--ink)" }}>{r.name}</span>
          <Pill tone={r.statusTone} dot>{r.statusLabel}</Pill>
        </div>
      ),
    },
    { key: "leads", header: "Leads", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.leads)}</span> },
    { key: "sent", header: "Sent", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.sent)}</span> },
    { key: "opens", header: "Opens", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.opens)} <span style={{ color: "var(--faint)" }}>({pct(r.openRate)})</span></span> },
    { key: "replies", header: "Replies", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.replies)} <span style={{ color: "var(--faint)" }}>({pct(r.replyRate)})</span></span> },
    { key: "opps", header: "Opps", align: "right", render: (r) => <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(r.opportunities)}</span> },
    {
      key: "action",
      header: "",
      align: "right",
      render: (r) => (
        <span onClick={(e) => e.stopPropagation()}>
          <CampaignRowActions clientId={clientId} row={r} />
        </span>
      ),
    },
  ]
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getKey={(r) => r.id}
      minWidth={820}
      onRowClick={(r) => { startNavProgress(); router.push(`/campaigns/${r.id}?client=${clientId}`) }}
    />
  )
}
