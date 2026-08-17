"use client"

import { WorkspaceSwitcher, type SwitchClient } from "./WorkspaceSwitcher"
import { EnvBadge } from "./EnvBadge"
import { ThemeToggle } from "./ThemeToggle"

export function TopBar({
  clients, onSelect, onSelectAll,
}: {
  clients: SwitchClient[]
  onSelect?: (id: string) => void
  onSelectAll?: () => void
}) {
  return (
    <header className="no-print" style={{ height: 64, flex: "0 0 64px", background: "var(--surface)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16, padding: "0 24px", position: "sticky", top: 0, zIndex: 30 }}>
      <WorkspaceSwitcher clients={clients} onSelect={onSelect} onSelectAll={onSelectAll} />
      <div style={{ flex: 1 }} />
      <EnvBadge />
      <ThemeToggle />
    </header>
  )
}
