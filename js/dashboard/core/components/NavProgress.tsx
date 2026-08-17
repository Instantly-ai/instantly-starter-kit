"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

/** Kick the progress bar for a programmatic navigation (router.push in row clicks),
 * since those don't fire an <a> click for the listener to catch. */
export function startNavProgress() {
  if (typeof window !== "undefined") (window as unknown as { __navStart?: () => void }).__navStart?.()
}

// A thin top bar that acknowledges navigation: it starts on an internal link click
// and completes when the route resolves. Pairs with loading.tsx (content skeleton).
export function NavProgress() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    function start() {
      setVisible(true)
      setWidth(8)
      clearInterval(timer.current)
      timer.current = setInterval(() => setWidth((w) => (w < 90 ? w + (90 - w) * 0.12 : w)), 180)
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null
      if (a && a.href && a.origin === location.origin && a.pathname !== location.pathname && !a.target && !e.metaKey && !e.ctrlKey && !e.shiftKey) start()
    }
    // expose a manual trigger for programmatic navigations (row clicks)
    ;(window as unknown as { __navStart?: () => void }).__navStart = start
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  // Route resolved → finish the bar.
  useEffect(() => {
    clearInterval(timer.current)
    if (!visible) return
    setWidth(100)
    const t = setTimeout(() => {
      setVisible(false)
      setWidth(0)
    }, 220)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div aria-hidden className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2.5, zIndex: 200, pointerEvents: "none", opacity: visible ? 1 : 0, transition: "opacity .2s ease" }}>
      <div style={{ height: "100%", width: `${width}%`, background: "var(--brand)", boxShadow: "0 0 8px var(--brand)", transition: "width .18s ease" }} />
    </div>
  )
}
