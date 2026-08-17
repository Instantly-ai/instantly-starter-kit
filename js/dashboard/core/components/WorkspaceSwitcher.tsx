"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export interface SwitchClient {
  id: string
  name: string
  initials: string
  color: string
}

export function WorkspaceSwitcher({
  clients, onSelect, onSelectAll,
}: {
  clients: SwitchClient[]
  onSelect?: (id: string) => void
  onSelectAll?: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname() || "/"

  // Current scope, derived from the route: a client page shows that client; every
  // other page shows the agency ("All clients").
  const onClient = pathname.match(/^\/client\/([^/]+)/)
  const label = onClient
    ? clients.find((c) => c.id === decodeURIComponent(onClient[1]))?.name ?? "Workspace"
    : `All clients${clients.length ? ` (${clients.length})` : ""}`

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", h)
    return () => document.removeEventListener("click", h)
  }, [])

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
        style={{ display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 12px", borderRadius: "var(--radius-btn)", border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--body)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /></svg>
        {label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: 42, left: 0, width: 262, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--pop-shadow)", padding: 6, zIndex: 50, animation: "ia-fade .12s ease" }}>
          <div style={{ fontSize: 12, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--muted)", padding: "8px 10px 6px" }}>Workspaces</div>
          <button
            className="ws-item"
            onClick={() => { setOpen(false); onSelectAll ? onSelectAll() : router.push("/") }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, border: "none", background: "var(--brand-active)", color: "var(--brand)", fontSize: 14, fontWeight: 500, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            All clients ({clients.length})
          </button>
          <div style={{ height: 1, background: "var(--border)", margin: "6px 4px" }} />
          {clients.map((c) => (
            <button
              key={c.id}
              className="ws-item"
              onClick={() => { setOpen(false); onSelect ? onSelect(c.id) : router.push(`/client/${c.id}`) }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 8, border: "none", background: "transparent", color: "var(--body)", fontSize: 14, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 6, fontSize: 10, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: c.color }}>{c.initials}</span>
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
