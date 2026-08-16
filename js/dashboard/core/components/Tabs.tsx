"use client"

export interface Tab {
  id: string
  label: string
  badge?: number
}

export function Tabs({ tabs, active, onSelect }: { tabs: Tab[]; active: string; onSelect?: (id: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 26, borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
      {tabs.map((t) => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onSelect?.(t.id)}
            style={{
              background: "none", border: "none", padding: "0 0 12px", cursor: "pointer", fontSize: 14,
              whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 7, fontFamily: "inherit",
              fontWeight: on ? 500 : 400, color: on ? "var(--brand)" : "var(--muted)",
              boxShadow: on ? "inset 0 -2px 0 0 var(--brand)" : "none",
            }}
          >
            {t.label}
            {t.badge != null && t.badge > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 19, padding: "0 6px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: "color-mix(in oklab, var(--danger) 14%, transparent)", color: "var(--danger)" }}>{t.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
