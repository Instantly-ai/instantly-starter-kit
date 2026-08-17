import { Panel } from "@/components/Panel"
import { EmptyState } from "@/components/EmptyState"

// Drill-downs live at the top level now — reply threads at /inbox/[emailId],
// campaigns at /campaigns/[campaignId] — not under the client shell. This route
// stays only as a graceful fallback for any stray deep link.
export default function DetailPage() {
  return (
    <Panel title="Detail">
      <EmptyState title="Nothing here" subtitle="This item's detail lives on its own page (see /inbox or /campaigns)." />
    </Panel>
  )
}
