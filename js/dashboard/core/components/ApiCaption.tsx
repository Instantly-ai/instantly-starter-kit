import type { ReactNode } from "react"

/** The little chip that labels a panel with the API call behind it — a starter-kit
 * teaching touch (e.g. "listAccount · status + warmup_status"). */
export function ApiCaption({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", height: 22, padding: "0 9px", borderRadius: 999,
        background: "var(--page)", border: "1px solid var(--border)", fontSize: 11,
        letterSpacing: ".03em", color: "var(--muted)", whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  )
}
