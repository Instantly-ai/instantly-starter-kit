"use client"

import { useRouter } from "next/navigation"
import { ConfirmAction } from "@/components/ConfirmAction"
import { activateCampaignAction, pauseCampaignAction } from "@/app/actions/campaigns"
import type { CampaignRow } from "@instantly-ai/ops"

// Binds a campaign's row to the right confirm-gated server action and refreshes
// the server data once the job is queued so the status pill updates.
export function CampaignRowActions({ clientId, row }: { clientId: string; row: CampaignRow }) {
  const router = useRouter()

  if (row.canActivate)
    return (
      <ConfirmAction
        label="Activate"
        tone="primary"
        confirmLabel="Start sending?"
        doneLabel="Activated"
        onConfirm={async () => {
          await activateCampaignAction(clientId, row.id)
          router.refresh()
        }}
      />
    )

  if (row.canPause)
    return (
      <ConfirmAction
        label="Pause"
        tone="ghost"
        confirmLabel="Pause sending?"
        doneLabel="Paused"
        onConfirm={async () => {
          await pauseCampaignAction(clientId, row.id)
          router.refresh()
        }}
      />
    )

  return <span style={{ color: "var(--faint)" }}>—</span>
}
