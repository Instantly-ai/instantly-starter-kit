"use client"

import { useEffect, type ReactNode } from "react"

/** A centered modal over a dimmed backdrop. Closes on Esc or backdrop click. */
export function Modal({ open, onClose, title, children, width = 560 }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; width?: number }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      onClick={onClose}
      className="no-print"
      style={{ position: "fixed", inset: 0, background: "rgba(6,10,20,.55)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "56px 16px", zIndex: 100, overflowY: "auto", animation: "ia-fade .12s ease-out" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: width, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--pop-shadow, 0 20px 60px rgba(0,0,0,.45))" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 18px", borderBottom: "1px solid var(--border)" }}>
          <strong style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{title}</strong>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 2 }}>✕</button>
        </div>
        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  )
}
