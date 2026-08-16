import type { CSSProperties, ReactNode } from "react"

export interface Column<T> {
  key: string
  header: string
  align?: "left" | "right"
  render?: (row: T) => ReactNode
}

const headCell = (align: "left" | "right"): CSSProperties => ({
  textAlign: align, fontSize: 12, letterSpacing: ".05em", textTransform: "uppercase",
  color: "var(--muted)", fontWeight: 400, whiteSpace: "nowrap",
})

/**
 * Two visual variants from the design:
 * - "plain": a compact table with hairline row separators (campaigns).
 * - "rows": pill-rows — each row bordered + rounded with spacing between (client roster).
 */
export function DataTable<T>({
  columns, rows, variant = "plain", onRowClick, minWidth = 640, getKey,
}: {
  columns: Column<T>[]
  rows: T[]
  variant?: "plain" | "rows"
  onRowClick?: (row: T) => void
  minWidth?: number
  getKey?: (row: T, i: number) => string
}) {
  const isRows = variant === "rows"
  const last = columns.length - 1
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%", minWidth,
          borderCollapse: isRows ? "separate" : "collapse",
          borderSpacing: isRows ? "0 10px" : undefined,
          padding: isRows ? "6px 14px 14px" : undefined,
        }}
      >
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={c.key}
                style={{
                  ...headCell(c.align ?? "left"),
                  padding: isRows ? (i === 0 || i === last ? "8px 20px" : "8px 16px") : "12px 16px",
                  borderBottom: isRows ? "none" : "1px solid var(--border)",
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={getKey ? getKey(row, ri) : ri}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? "dt-row" : undefined}
              style={{ cursor: onRowClick ? "pointer" : undefined }}
            >
              {columns.map((c, ci) => {
                const first = ci === 0
                const isLast = ci === last
                const cell: CSSProperties = isRows
                  ? {
                      padding: first || isLast ? "18px 20px" : "18px 16px",
                      textAlign: c.align ?? "left",
                      borderTop: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      ...(first ? { borderLeft: "1px solid var(--border)", borderTopLeftRadius: 12, borderBottomLeftRadius: 12 } : {}),
                      ...(isLast ? { borderRight: "1px solid var(--border)", borderTopRightRadius: 12, borderBottomRightRadius: 12 } : {}),
                    }
                  : { padding: "14px 16px", textAlign: c.align ?? "left", borderBottom: "1px solid var(--border)" }
                return (
                  <td key={c.key} style={cell}>
                    {c.render ? c.render(row) : ((row as Record<string, unknown>)[c.key] as ReactNode)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
