export interface Series {
  label: string
  color: string
  data: number[]
}

/** 14-day (or N-point) area+line chart matching the design. `areaFor` names the
 * series that gets the gradient area fill (default: the first series). Pass a
 * distinct `gradientId` if rendering more than one Chart on a page. */
export function Chart({
  series, days, height = 230, areaFor, gradientId = "iaFill",
}: {
  series: Series[]
  days?: string[]
  height?: number
  areaFor?: string
  gradientId?: string
}) {
  const W = 860
  const H = 230
  const PAD = 14
  const all = series.flatMap((s) => s.data)
  const maxY = Math.max(1, ...all) * 1.08
  const n = Math.max(1, (series[0]?.data.length ?? 1) - 1)
  const xs = (i: number) => PAD + (i * (W - PAD * 2)) / n
  const ys = (v: number) => H - (v / maxY) * (H - 24)
  const pts = (arr: number[]) => arr.map((v, i) => `${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ")

  const area = series.find((s) => s.label === areaFor) ?? series[0]
  const areaPath = area
    ? `M${pts(area.data).split(" ").join(" L")} L${xs(area.data.length - 1).toFixed(1)},${H} L${xs(0).toFixed(1)},${H} Z`
    : ""

  return (
    <div>
      <svg viewBox={`0 0 ${W} 260`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
        {[20, 80, 140, 200].map((y) => (
          <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="var(--border)" strokeWidth={1} />
        ))}
        <line x1={0} y1={230} x2={W} y2={230} stroke="var(--border-strong)" strokeWidth={1} />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={area?.color ?? "#0080ff"} stopOpacity={0.5} />
            <stop offset="100%" stopColor={area?.color ?? "#0080ff"} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} />}
        {series.map((s) => (
          <polyline key={s.label} points={pts(s.data)} fill="none" stroke={s.color} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
      {days && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "var(--faint)" }}>
          {days.map((d, i) => <span key={i}>{d}</span>)}
        </div>
      )}
    </div>
  )
}
