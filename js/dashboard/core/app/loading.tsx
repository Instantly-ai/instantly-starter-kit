import { Panel } from "@/components/Panel"
import { Skeleton } from "@/components/Skeleton"

// Shown instantly in the content region while a page's server data loads — the
// shell (rail/topbar) stays mounted above this, so navigation feels immediate.
export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ height: 26, width: 180, borderRadius: 8, background: "var(--neutral-pill)", animation: "ia-shimmer 1.2s ease-in-out infinite" }} />
        <div style={{ height: 14, width: 280, borderRadius: 6, background: "var(--neutral-pill)", opacity: 0.6, marginTop: 10, animation: "ia-shimmer 1.2s ease-in-out infinite" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 84, borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--surface)", animation: "ia-shimmer 1.2s ease-in-out infinite" }} />
        ))}
      </div>
      <Panel bodyPadding>
        <Skeleton lines={6} />
      </Panel>
    </div>
  )
}
