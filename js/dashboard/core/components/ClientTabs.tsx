"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs } from "./Tabs"

const TABS = [
  { id: "senders", label: "Sender health" },
  { id: "campaigns", label: "Campaigns" },
  { id: "deliverability", label: "Deliverability" },
  { id: "analytics", label: "Analytics" },
  { id: "replies", label: "Replies" },
]

export function ClientTabs({ id, repliesBadge }: { id: string; repliesBadge?: number }) {
  const pathname = usePathname()
  const router = useRouter()
  const active = pathname.split("/").pop() || "senders"
  const tabs = TABS.map((t) => (t.id === "replies" ? { ...t, badge: repliesBadge } : t))
  return <Tabs tabs={tabs} active={active} onSelect={(t) => router.push(`/client/${id}/${t}`)} />
}
