"use client"

import { useState } from "react"

export function CodeBlock({ lang, source }: { lang: string; source: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: "var(--radius-btn)", background: "var(--code-bg, var(--rail))", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px 6px 12px", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--faint)" }}>{lang}</span>
        <button
          onClick={copy}
          className="rail-btn"
          style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: copied ? "var(--success)" : "var(--muted)", background: "transparent", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 9px", cursor: "pointer" }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "14px 16px", overflowX: "auto", fontSize: 12.5, lineHeight: 1.6 }}>
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", color: "var(--body)", whiteSpace: "pre" }}>{source}</code>
      </pre>
    </div>
  )
}
