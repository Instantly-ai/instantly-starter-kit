import { Panel } from "@/components/Panel"
import { Skeleton } from "@/components/Skeleton"

export default function Loading() {
  return (
    <Panel bodyPadding>
      <Skeleton lines={5} />
    </Panel>
  )
}
