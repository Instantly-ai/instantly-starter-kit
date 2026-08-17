"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Brand } from "@/config/brand"
import { startNavProgress } from "@/components/NavProgress"

const NAV: { id: string; title: string; href: string; icon: ReactNode }[] = [
  { id: "overview", title: "Overview", href: "/", icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></> },
  { id: "campaigns", title: "Campaigns", href: "/campaigns", icon: <><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></> },
  { id: "inbox", title: "Inbox", href: "/inbox", icon: <><rect x="2" y="4" width="20" height="16" rx="2.5" /><path d="M2 8l10 6 10-6" /></> },
  { id: "deliverability", title: "Deliverability", href: "/deliverability", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { id: "analytics", title: "Analytics", href: "/analytics", icon: <path d="M3 16l5-6 4 4 5-7 4 4" /> },
  { id: "leads", title: "Leads", href: "/leads", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></> },
  { id: "enrichment", title: "Enrichment", href: "/enrichment", icon: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10z" /> },
  { id: "verification", title: "Verification", href: "/verification", icon: <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></> },
]
const BOTTOM: { id: string; title: string; href: string; icon: ReactNode }[] = [
  { id: "learn", title: "How to use this", href: "/learn", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { id: "kit", title: "Component kit", href: "/kit", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></> },
]

function activeFromPath(p: string): string {
  if (p.startsWith("/campaigns")) return "campaigns"
  if (p.startsWith("/inbox")) return "inbox"
  if (p.startsWith("/deliverability")) return "deliverability"
  if (p.startsWith("/analytics")) return "analytics"
  if (p.startsWith("/leads")) return "leads"
  if (p.startsWith("/enrichment")) return "enrichment"
  if (p.startsWith("/verification")) return "verification"
  if (p.startsWith("/learn")) return "learn"
  if (p.startsWith("/kit")) return "kit"
  return "overview"
}

export function IconRail({ brand }: { brand: Brand }) {
  const pathname = usePathname() || "/"
  // Optimistic active: highlight the clicked item on click, not when the route
  // resolves (committed usePathname arrives after navigation, so the rail would
  // otherwise lag). Clear the override once the real route catches up.
  const [pending, setPending] = useState<string | null>(null)
  useEffect(() => { setPending(null) }, [pathname])
  const active = activeFromPath(pending ?? pathname)

  function onNavClick(e: React.MouseEvent, href: string) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (href !== pathname) { setPending(href); startNavProgress() }
  }

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setCollapsed(localStorage.getItem("ia-sidebar") === "collapsed")
  }, [])
  const toggle = () => {
    setCollapsed((c) => {
      const next = !c
      try { localStorage.setItem("ia-sidebar", next ? "collapsed" : "expanded") } catch {}
      return next
    })
  }

  const width = collapsed ? 68 : 224
  const item = (on: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 12, height: 40, borderRadius: 10, textDecoration: "none",
    padding: collapsed ? 0 : "0 12px", justifyContent: collapsed ? "center" : "flex-start", width: collapsed ? 40 : "100%",
    background: on ? "var(--brand-active)" : "transparent", color: on ? "var(--brand)" : "var(--muted)",
    fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden",
  })
  const link = (n: { id: string; title: string; href: string; icon: ReactNode }) => {
    const on = n.id === active
    return (
      <Link key={n.id} href={n.href} onClick={(e) => onNavClick(e, n.href)} title={collapsed ? n.title : undefined} aria-label={n.title} className={on ? undefined : "rail-btn"} style={item(on)}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 19px" }}>{n.icon}</svg>
        {!collapsed && <span>{n.title}</span>}
      </Link>
    )
  }

  return (
    <aside className="no-print" style={{ width, flex: `0 0 ${width}px`, background: "var(--rail)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: collapsed ? "14px 14px" : "16px 16px", gap: 4, position: "sticky", top: 0, height: "100vh", transition: "width .18s ease" }}>
      {/* Brand */}
      <Link href="/" title={brand.name} style={{ display: "flex", alignItems: "center", gap: 10, height: 40, marginBottom: 12, textDecoration: "none", justifyContent: collapsed ? "center" : "flex-start" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logo} alt={brand.name} style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover", flex: "0 0 30px" }} />
        {!collapsed && <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{brand.name}</span>}
      </Link>

      {NAV.map(link)}
      <div style={{ flex: 1 }} />
      {BOTTOM.map(link)}

      {/* Collapse toggle */}
      <button onClick={toggle} title={collapsed ? "Expand" : "Collapse"} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="rail-btn" style={{ ...item(false), cursor: "pointer", border: "none", fontFamily: "inherit", marginTop: 4 }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 19px", transform: collapsed ? "rotate(180deg)" : "none" }}><path d="M15 18l-6-6 6-6" /></svg>
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  )
}
