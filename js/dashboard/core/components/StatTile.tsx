import type { ReactNode } from "react"

export function StatTile({
  label, value, sub, valueColor = "var(--ink)",
}: { label: string; value: ReactNode; sub?: string; valueColor?: string }) {
  return (
    <div
      style={{
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
        boxShadow: "var(--card-shadow)", padding: "16px 18px",
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
        <span style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.1, color: valueColor, fontVariantNumeric: "tabular-nums" }}>{value}</span>
        {sub && <span style={{ fontSize: 13, color: "var(--faint)" }}>{sub}</span>}
      </div>
    </div>
  )
}
