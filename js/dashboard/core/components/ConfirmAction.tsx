"use client"

import { useState, type CSSProperties, type ReactNode } from "react"

export type ConfirmTone = "primary" | "ghost" | "danger"
type Phase = "idle" | "confirm" | "running" | "done" | "error"

const TONES: Record<ConfirmTone, { bg: string; fg: string; bc: string }> = {
  primary: { bg: "var(--brand)", fg: "#ffffff", bc: "var(--brand)" },
  ghost: { bg: "transparent", fg: "var(--body)", bc: "var(--border-strong)" },
  danger: { bg: "transparent", fg: "var(--danger)", bc: "color-mix(in oklab, var(--danger) 35%, transparent)" },
}
const btn: CSSProperties = {
  fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "6px 12px",
  borderRadius: "var(--radius-btn)", cursor: "pointer", lineHeight: 1.2,
}

/**
 * The confirm-gated write used everywhere in the dashboard:
 *   idle → "Confirm?" (Yes / Cancel) → "Job queued…" (running) → done ✓ (or error → Retry)
 * `onConfirm` is typically a server action; while it's awaited we show the running
 * state, so an async job/poll reads naturally. Nothing fires without the explicit Yes.
 */
export function ConfirmAction({
  label, doneLabel = "Done", tone = "ghost", confirmLabel = "Confirm?", onConfirm,
}: {
  label: string
  doneLabel?: string
  tone?: ConfirmTone
  confirmLabel?: string
  onConfirm: () => Promise<unknown> | unknown
}) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [err, setErr] = useState("")
  const t = TONES[tone]

  async function run() {
    setPhase("running")
    try {
      await onConfirm()
      setPhase("done")
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed")
      setPhase("error")
    }
  }

  let content: ReactNode
  if (phase === "idle") {
    content = (
      <button onClick={() => setPhase("confirm")} style={{ ...btn, background: t.bg, color: t.fg, border: `1px solid ${t.bc}` }}>
        {label}
      </button>
    )
  } else if (phase === "confirm") {
    content = (
      <>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{confirmLabel}</span>
        <button onClick={run} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" }}>Yes</button>
        <button onClick={() => setPhase("idle")} style={{ ...btn, background: "transparent", color: "var(--muted)", border: "1px solid var(--border-strong)" }}>Cancel</button>
      </>
    )
  } else if (phase === "running") {
    content = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--muted)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", border: "1.75px solid var(--border-strong)", borderTopColor: "var(--brand)", animation: "ia-spin .7s linear infinite" }} />
        Job queued…
      </span>
    )
  } else if (phase === "error") {
    content = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--danger)" }}>
        {err || "Failed"}
        <button onClick={() => setPhase("idle")} style={{ ...btn, background: "transparent", color: "var(--muted)", border: "1px solid var(--border-strong)" }}>Retry</button>
      </span>
    )
  } else {
    content = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--success)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        {doneLabel}
      </span>
    )
  }

  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 32 }}>{content}</span>
}
