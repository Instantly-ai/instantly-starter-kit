"use client"

import { useMemo, useRef, useState, type CSSProperties, type DragEvent } from "react"
import { useRouter } from "next/navigation"
import type { ImportLeadRow } from "@instantly-ai/ops"
import { Modal } from "@/components/Modal"
import { Pill } from "@/components/Pill"
import { importLeadsAction, type ImportActionResult } from "./import-action"

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const btn: CSSProperties = { fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: "var(--radius-btn)", cursor: "pointer", lineHeight: 1.2 }

const FIELDS: { key: keyof ImportLeadRow; label: string; required?: boolean; aliases: string[] }[] = [
  { key: "email", label: "Email", required: true, aliases: ["email", "email_address", "e-mail"] },
  { key: "first_name", label: "First name", aliases: ["first_name", "firstname", "first name", "first"] },
  { key: "last_name", label: "Last name", aliases: ["last_name", "lastname", "last name", "last"] },
  { key: "company_name", label: "Company", aliases: ["company_name", "company", "organization", "company name"] },
  { key: "job_title", label: "Job title", aliases: ["job_title", "title", "job title", "role"] },
  { key: "phone", label: "Phone", aliases: ["phone", "phone_number", "mobile"] },
]

// Minimal CSV parser (quoted fields + embedded commas/newlines).
function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const grid: string[][] = []
  let field = "", row: string[] = [], quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++ } else quoted = false } else field += ch
    } else if (ch === '"') quoted = true
    else if (ch === ",") { row.push(field); field = "" }
    else if (ch === "\n") { row.push(field); grid.push(row); row = []; field = "" }
    else if (ch !== "\r") field += ch
  }
  if (field.length || row.length) { row.push(field); grid.push(row) }
  if (grid.length < 2) return { headers: [], rows: [] }
  const headers = grid[0].map((h) => h.trim())
  const rows = grid.slice(1).filter((r) => r.some((c) => c.trim())).map((r) => {
    const o: Record<string, string> = {}
    headers.forEach((h, i) => (o[h] = (r[i] ?? "").trim()))
    return o
  })
  return { headers, rows }
}

type Phase = "idle" | "running" | "done" | "error"
type Mapping = Partial<Record<keyof ImportLeadRow, string>>

export function CsvImport({ clients = [] }: { clients?: { id: string; name: string }[] }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState("")
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, string>[]>([])
  const [mapping, setMapping] = useState<Mapping>({})
  const [listName, setListName] = useState("")
  const [target, setTarget] = useState(clients[0]?.id ?? "")
  const [phase, setPhase] = useState<Phase>("idle")
  const [res, setRes] = useState<ImportActionResult | null>(null)

  async function loadFile(f: File) {
    setFileName(f.name)
    const { headers: h, rows: r } = parseCsv(await f.text())
    setHeaders(h)
    setRows(r)
    // auto-map by header aliases
    const lower = h.map((x) => x.toLowerCase())
    const m: Mapping = {}
    for (const field of FIELDS) {
      const idx = lower.findIndex((hh) => field.aliases.includes(hh))
      if (idx >= 0) m[field.key] = h[idx]
    }
    setMapping(m)
    setListName(f.name.replace(/\.csv$/i, ""))
    setPhase("idle")
    setRes(null)
  }
  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) loadFile(f)
  }

  const mapped: ImportLeadRow[] = useMemo(
    () =>
      rows.map((r) => {
        const o: ImportLeadRow = { email: "" }
        for (const field of FIELDS) {
          const col = mapping[field.key]
          if (col) o[field.key] = r[col] ?? ""
        }
        return o
      }),
    [rows, mapping],
  )
  const validCount = mapped.filter((r) => EMAIL_RE.test((r.email || "").trim())).length
  const dupes = useMemo(() => {
    const seen = new Set<string>()
    let d = 0
    for (const r of mapped) {
      const e = (r.email || "").trim().toLowerCase()
      if (!EMAIL_RE.test(e)) continue
      if (seen.has(e)) d++
      else seen.add(e)
    }
    return d
  }, [mapped])

  function reset() {
    setFileName(""); setHeaders([]); setRows([]); setMapping({}); setListName(""); setPhase("idle"); setRes(null)
  }
  async function run() {
    setPhase("running")
    const r = await importLeadsAction(target, listName, mapped)
    setRes(r)
    setPhase(r.ok ? "done" : "error")
    if (r.ok) router.refresh()
  }
  const targetName = clients.find((c) => c.id === target)?.name ?? clients[0]?.name ?? "your workspace"

  const input: CSSProperties = { fontFamily: "inherit", fontSize: 13.5, padding: "8px 10px", borderRadius: "var(--radius-btn)", border: "1px solid var(--border-strong)", background: "var(--page)", color: "var(--ink)" }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" }}>
        ↑ Import CSV
      </button>

      <Modal open={open} onClose={() => { setOpen(false); reset() }} title="Import leads from CSV" width={620}>
        {phase === "done" && res?.ok ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <Pill tone="ok" dot>Added {res.result.added}</Pill>
              {res.result.duplicates > 0 && <Pill tone="neutral">{res.result.duplicates} duplicates</Pill>}
              {res.result.invalidEmails > 0 && <Pill tone="warn">{res.result.invalidEmails} invalid</Pill>}
              <span style={{ fontSize: 13.5, color: "var(--muted)" }}>into “{res.result.listName}”{clients.length > 1 ? ` · ${targetName}` : ""}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>Verify the list before you add it to a campaign.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={reset} style={{ ...btn, background: "transparent", color: "var(--body)", border: "1px solid var(--border-strong)" }}>Import another</button>
              <button onClick={() => { setOpen(false); reset() }} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)" }}>Done</button>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              style={{ border: `1.5px dashed ${dragOver ? "var(--brand)" : "var(--border-strong)"}`, background: dragOver ? "var(--brand-soft)" : "var(--page)", borderRadius: "var(--radius-card)", padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "border-color .12s, background .12s" }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>↑</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>Drop a CSV here, or click to browse</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>Headers like email, first_name, last_name, company_name</div>
            </div>
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} style={{ display: "none" }} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", fontSize: 12.5, color: "var(--muted)" }}>
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>{fileName}</span>
              <Pill tone="info">{rows.length} rows</Pill>
              <Pill tone={validCount ? "ok" : "danger"}>{validCount} valid emails</Pill>
              {dupes > 0 && <Pill tone="neutral">{dupes} duplicates</Pill>}
              <button onClick={reset} style={{ ...btn, marginLeft: "auto", padding: "4px 8px", background: "transparent", color: "var(--muted)", border: "1px solid var(--border-strong)" }}>Change file</button>
            </div>

            {/* Column mapping */}
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>Map columns</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
                {FIELDS.map((f) => (
                  <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 12.5, color: "var(--body)" }}>{f.label}{f.required && <span style={{ color: "var(--danger)" }}> *</span>}</span>
                    <select value={mapping[f.key] ?? ""} onChange={(e) => setMapping((m) => ({ ...m, [f.key]: e.target.value }))} style={input}>
                      <option value="">— none —</option>
                      {headers.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>Preview (first 5)</div>
              <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius-btn)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr>{FIELDS.filter((f) => mapping[f.key]).map((f) => <th key={f.key} style={{ textAlign: "left", padding: "7px 10px", color: "var(--muted)", fontWeight: 500, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{f.label}</th>)}</tr>
                  </thead>
                  <tbody>
                    {mapped.slice(0, 5).map((r, i) => (
                      <tr key={i}>
                        {FIELDS.filter((f) => mapping[f.key]).map((f) => (
                          <td key={f.key} style={{ padding: "7px 10px", color: f.key === "email" && !EMAIL_RE.test((r.email || "").trim()) ? "var(--danger)" : "var(--body)", borderBottom: i === 4 ? "none" : "1px solid var(--border)", whiteSpace: "nowrap" }}>
                            {r[f.key] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {phase === "error" && res && !res.ok && <div style={{ fontSize: 13, color: "var(--danger)" }}>{res.error}</div>}

            {/* Confirm */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              {clients.length > 1 ? (
                <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 12.5, color: "var(--body)" }}>Import into workspace</span>
                  <select value={target} onChange={(e) => setTarget(e.target.value)} style={{ ...input, padding: "9px 12px", fontSize: 14 }}>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <span style={{ fontSize: 12.5, color: "var(--muted)" }}>Importing into <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{targetName}</strong></span>
              )}
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input value={listName} onChange={(e) => setListName(e.target.value)} placeholder="New list name" style={{ ...input, flex: "1 1 200px", minWidth: 180, padding: "9px 12px", fontSize: 14 }} />
              {phase === "running" ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--muted)" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", border: "1.75px solid var(--border-strong)", borderTopColor: "var(--brand)", animation: "ia-spin .7s linear infinite" }} />
                  Importing…
                </span>
              ) : (
                <button onClick={run} disabled={!listName.trim() || validCount - dupes < 1} style={{ ...btn, background: "var(--brand)", color: "#fff", border: "1px solid var(--brand)", opacity: listName.trim() && validCount - dupes >= 1 ? 1 : 0.5 }}>
                  Import {validCount - dupes} lead{validCount - dupes === 1 ? "" : "s"}
                </button>
              )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
