export interface LegendItem { label: string; color: string }

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      {items.map((l) => (
        <span key={l.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--body)" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: l.color }} />
          {l.label}
        </span>
      ))}
    </div>
  )
}
