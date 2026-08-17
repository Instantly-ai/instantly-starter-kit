import { Panel } from "@/components/Panel"
import { Skeleton } from "@/components/Skeleton"

// Shown during navigation while a module's server data loads (D09+).
export default function Loading() {
  return (
    <Panel bodyPadding>
      <Skeleton lines={4} />
    </Panel>
  )
}
