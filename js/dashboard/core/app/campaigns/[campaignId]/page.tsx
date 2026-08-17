import { CampaignDetail } from "@/modules/campaigns/CampaignDetail"
import { switcherClients } from "@/lib/clients"

export const dynamic = "force-dynamic"

// Campaign drill-down as a top-level page (under /campaigns, not the client shell).
// `?client=<id>` names the workspace it belongs to (agency mode); single-key ignores it.
export default async function CampaignDetailPage({ params, searchParams }: { params: { campaignId: string }; searchParams: { client?: string } }) {
  const clients = await switcherClients()
  const clientId = searchParams.client || clients[0]?.id || ""

  return <CampaignDetail clientId={clientId} campaignId={decodeURIComponent(params.campaignId)} backHref="/campaigns" />
}
