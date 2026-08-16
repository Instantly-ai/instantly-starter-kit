import type { ReactNode } from "react"

export function EmptyState({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div style={{ padding: "56px 20px", textAlign: "center" }}>
      {icon && <div style={{ display: "flex", justifyContent: "center", color: "var(--faint)" }}>{icon}</div>}
      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginTop: icon ? 12 : 0 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>{subtitle}</div>}
    </div>
  )
}
