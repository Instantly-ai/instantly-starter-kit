import { allCampaigns } from "@instantly-ai/ops"
import { StatTile } from "@/components/StatTile"
import { Panel } from "@/components/Panel"
import { EmptyState } from "@/components/EmptyState"
import { AgencyCampaignsTable } from "@/modules/campaigns/AgencyCampaignsTable"

export const dynamic = "force-dynamic"

const pct = (v: number | null) => (v == null ? "—" : `${(v * 100).toFixed(1)}%`)
const num = (v: number) => v.toLocaleString("en-US")

export default async function CampaignsPage() {
  const data = await allCampaigns().catch(() => null)

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Campaigns</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>Every campaign across all client workspaces</p>
      </div>

      {!data || data.total === 0 ? (
        <Panel title="Campaigns" caption="getCampaignAnalytics · fan-out">
          <EmptyState title="No campaigns yet" subtitle={data ? "No client has a campaign yet." : "Set INSTANTLY_API_KEY in the server environment, then refresh."} />
        </Panel>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 22 }}>
            <StatTile label="Campaigns" value={num(data.total)} />
            <StatTile label="Active" value={num(data.active)} />
            <StatTile label="Emails sent" value={num(data.sent)} />
            <StatTile label="Avg reply rate" value={pct(data.avgReplyRate)} />
          </div>
          <Panel title="All campaigns" caption="getCampaignAnalytics · fan-out across clients" bodyPadding={false}>
            <AgencyCampaignsTable rows={data.rows} />
          </Panel>
        </>
      )}
    </>
  )
}
