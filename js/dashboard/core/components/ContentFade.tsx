"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

// Re-keys on the route so page content eases in on each navigation instead of
// popping. Honors prefers-reduced-motion (the keyframe is disabled there in CSS).
export function ContentFade({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="content-fade">
      {children}
    </div>
  )
}
