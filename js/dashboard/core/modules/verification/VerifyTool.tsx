"use client"

import { useState, type CSSProperties } from "react"
import { Pill, type PillTone } from "@/components/Pill"
import type { VerificationResult } from "@instantly-ai/ops"
import { verifyEmailAction } from "./actions"

type Phase = "idle" | "confirm" | "running" | "done" | "error"

function statusTone(s: string): PillTone {
  const v = s.toLowerCase()
  if (v.includes("valid") && !v.includes("invalid")) return "ok"
  if (v === "verified") return "ok"
  if (v.includes("invalid")) return "danger"
  if (v.includes("risky") || v.includes("catch") || v.includes("accept_all")) return "warn"
  return "neutral"
}

const btn: CSSProperties = { fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: "var(--radius-btn)", cursor: "pointer", lineHeight: 1.2 }

export function VerifyTool({ clientId }: { clientId: string }) {
  const [email, setEmail] = useState("")
  const [phase, setPhase] = useState<Phase>("idle")
  const [err, setErr] = useState("")
  const [result, setResult] = useState<VerificationResult | null>(null)

  async function run() {
    setPhase("running")
    const res = await verifyEmailAction(clientId, email)
    if (res.ok) {
      setResult(res.result)
      setPhase("done")
    } else {
      setErr(res.error)
      setPhase("error")
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (phase !== "idle") setPhase("idle")
          }}
          placeholder="name@company.com"
          style={{ flex: "1 1 260px", minWidth: 220, fontFamily: "inherit", fontSize: 14, padding: "9px 12px", borderRadius: "var(--radius-btn)", border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--ink)" }}
        />
        {phase === "idle" || phase === "done" || phase === "error" ? (
          <button onClick={() => email.trim() && setPhase("confirm")} disabled={!email.trim()} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)", opacity: email.trim() ? 1 : 0.5 }}>
            Verify
          </button>
        ) : phase === "confirm" ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>Uses 1 credit —</span>
            <button onClick={run} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" }}>Confirm</button>
            <button onClick={() => setPhase("idle")} style={{ ...btn, background: "transparent", color: "var(--muted)", border: "1px solid var(--border-strong)" }}>Cancel</button>
          </span>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", border: "1.75px solid var(--border-strong)", borderTopColor: "var(--brand)", animation: "ia-spin .7s linear infinite" }} />
            Verifying…
          </span>
        )}
      </div>

      {phase === "error" && <div style={{ fontSize: 13, color: "var(--danger)" }}>{err}</div>}

      {phase === "done" && result && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", background: "var(--surface)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Result</span>
            <Pill tone={statusTone(result.status)} dot>{result.status}</Pill>
          </span>
          {result.catchAll && <Pill tone="warn">Catch-all domain</Pill>}
          <span style={{ fontSize: 13, color: "var(--body)" }}>{result.email}</span>
          {result.creditsRemaining != null && <span style={{ fontSize: 12.5, color: "var(--faint)", marginLeft: "auto" }}>{result.creditsRemaining.toLocaleString("en-US")} credits left</span>}
        </div>
      )}
    </div>
  )
}
