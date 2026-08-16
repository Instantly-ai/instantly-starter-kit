import type { ReactNode } from "react"

export type PillTone = "ok" | "warn" | "danger" | "info" | "neutral" | "draft" | "active"

/* Status chips are token-driven so they follow the theme and any rebrand.
 * Product language: rounded-md (not full pills), colour = meaning only. */
const TONES: Record<PillTone, { bg: string; fg: string }> = {
  ok: { bg: "color-mix(in oklab, var(--success) 15%, transparent)", fg: "var(--success)" },
  warn: { bg: "color-mix(in oklab, var(--warning) 18%, transparent)", fg: "var(--warning)" },
  danger: { bg: "color-mix(in oklab, var(--danger) 15%, transparent)", fg: "var(--danger)" },
  info: { bg: "var(--brand-soft)", fg: "var(--brand)" },
  neutral: { bg: "var(--neutral-pill)", fg: "var(--muted)" },
  draft: { bg: "var(--neutral-pill)", fg: "var(--ink)" },
  active: { bg: "var(--brand)", fg: "#ffffff" },
}

export function Pill({ tone = "neutral", dot = false, children }: { tone?: PillTone; dot?: boolean; children: ReactNode }) {
  const t = TONES[tone]
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, height: 22, padding: "0 8px",
        borderRadius: "var(--radius-btn)", fontSize: 12.5, fontWeight: 500, background: t.bg, color: t.fg, whiteSpace: "nowrap",
      }}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  )
}
