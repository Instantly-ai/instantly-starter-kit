import { SenderHealth } from "@/modules/health/SenderHealth"
import { Campaigns } from "@/modules/campaigns/Campaigns"
import { Deliverability } from "@/modules/deliverability/Deliverability"
import { Analytics } from "@/modules/analytics/Analytics"
import { Replies } from "@/modules/replies/Replies"

export default function TabPage({ params }: { params: { id: string; tab: string } }) {
  const id = decodeURIComponent(params.id)

  if (params.tab === "campaigns") return <Campaigns id={id} />
  if (params.tab === "deliverability") return <Deliverability id={id} />
  if (params.tab === "analytics") return <Analytics id={id} />
  if (params.tab === "replies") return <Replies id={id} />
  return <SenderHealth id={id} />
}
