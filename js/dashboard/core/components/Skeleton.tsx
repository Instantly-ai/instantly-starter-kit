export function Skeleton({ lines = 3, title = true }: { lines?: number; title?: boolean }) {
  const widths = ["100%", "78%", "52%", "66%", "40%"]
  return (
    <div style={{ animation: "ia-shimmer 1.1s ease-in-out infinite" }}>
      {title && <div style={{ height: 14, width: 180, borderRadius: 6, background: "var(--track)" }} />}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 11, width: widths[i % widths.length], borderRadius: 6, background: "var(--track)",
            marginTop: i === 0 && title ? 18 : 10,
          }}
        />
      ))}
    </div>
  )
}
