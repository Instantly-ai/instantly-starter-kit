import { listCampaigns } from "@instantly-ai/ops"
import { Panel } from "@/components/Panel"
import { StatTile } from "@/components/StatTile"
import { EmptyState } from "@/components/EmptyState"
import { ClientCampaignsTable } from "./ClientCampaignsTable"

import { formatPct } from "@/lib/format"
const pct = (v: number | null) => formatPct(v == null ? null : v * 100)
const num = (v: number) => v.toLocaleString("en-US")

export async function Campaigns({ id }: { id: string }) {
  let data
  try {
    data = await listCampaigns(id)
  } catch {
    return (
      <Panel title="Campaigns" caption="getCampaignAnalytics">
        <EmptyState title="Couldn't load campaigns" subtitle="The analytics read failed for this workspace. Check the API key's campaigns scope." />
      </Panel>
    )
  }

  if (data.total === 0) {
    return (
      <Panel title="Campaigns" caption="getCampaignAnalytics">
        <EmptyState title="No campaigns yet" subtitle="Campaigns you create start as drafts — activate them here once leads are verified and senders are connected." />
      </Panel>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <StatTile label="Campaigns" value={data.total} />
        <StatTile label="Active" value={data.active} />
        <StatTile label="Emails sent" value={num(data.sent)} />
        <StatTile label="Replies" value={num(data.replies)} />
        <StatTile label="Avg reply rate" value={pct(data.avgReplyRate)} />
      </div>

      <Panel title="Campaigns" caption="getCampaignAnalytics · activateCampaign / pauseCampaign" bodyPadding={false}>
        <ClientCampaignsTable clientId={id} rows={data.rows} />
      </Panel>
    </div>
  )
}
