import Link from "next/link"
import { Pill } from "./Pill"
import { colorFor, initialsOf } from "@/lib/avatar"

export function ClientHeader({ id, name, plan, wsId }: { id: string; name: string; plan?: string | null; wsId?: string }) {
  return (
    <>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13.5, fontWeight: 500, marginBottom: 14 }}>‹ All clients</Link>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <span style={{ width: 40, height: 40, borderRadius: 11, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: colorFor(id) }}>{initialsOf(name)}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)", letterSpacing: "-.01em" }}>{name}</h1>
              {plan && <Pill tone="warn">{plan}</Pill>}
            </div>
            {wsId && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>workspace {wsId}</div>}
          </div>
        </div>
        <a href="https://app.instantly.ai" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 14px", borderRadius: "var(--radius-btn)", border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--body)", fontSize: 13.5, fontWeight: 500 }}>Open in Instantly ↗</a>
      </div>
    </>
  )
}
