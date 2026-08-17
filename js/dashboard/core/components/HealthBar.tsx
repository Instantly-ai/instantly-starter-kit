export function HealthBar({ ok, total, label }: { ok: number; total: number; label?: string }) {
  const pct = total > 0 ? Math.round((ok / total) * 100) : 0
  const color = pct >= 95 ? "var(--success)" : pct >= 80 ? "var(--warning)" : "var(--danger)"
  return (
    <div>
      <div style={{ fontSize: 15, color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>
        {label ?? `${ok} / ${total}`}
      </div>
      <div style={{ width: 88, height: 5, borderRadius: 999, background: "var(--track)", marginTop: 7, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 999, width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}
