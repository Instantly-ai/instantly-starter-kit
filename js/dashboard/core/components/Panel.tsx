import type { ReactNode } from "react"
import { ApiCaption } from "./ApiCaption"

export function Panel({
  title, caption, actions, children, bodyPadding = true,
}: {
  title?: ReactNode
  caption?: string
  actions?: ReactNode
  children: ReactNode
  bodyPadding?: boolean
}) {
  const hasHeader = title || caption || actions
  return (
    <div
      style={{
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
        boxShadow: "var(--card-shadow)", overflow: "hidden",
      }}
    >
      {hasHeader && (
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            padding: "16px 20px", borderBottom: "1px solid var(--border)", flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {title && <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "var(--ink)" }}>{title}</h2>}
            {caption && <ApiCaption>{caption}</ApiCaption>}
          </div>
          {actions && <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{actions}</div>}
        </div>
      )}
      <div style={bodyPadding ? { padding: "18px 20px" } : undefined}>{children}</div>
    </div>
  )
}
