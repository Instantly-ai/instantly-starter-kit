"use client"

import type { CSSProperties } from "react"

const btn: CSSProperties = {
  fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: "var(--radius-btn)",
  cursor: "pointer", lineHeight: 1.2, border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--body)",
}

/** Report toolbar (not printed): download the raw numbers as CSV, or print to PDF. */
export function ReportActions({ filename, csv }: { filename: string; csv: string }) {
  function download() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="no-print" style={{ display: "flex", gap: 10 }}>
      <button onClick={download} style={btn}>↓ CSV</button>
      <button onClick={() => window.print()} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" }}>Print / Save PDF</button>
    </div>
  )
}
