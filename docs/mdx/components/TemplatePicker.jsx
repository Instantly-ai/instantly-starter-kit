import React, { useState } from "react"

// Self-contained, dependency-free picker: choose a template + language, copy the command.
const TEMPLATES = [
  { id: "outreach-service", blurb: "Full outbound flow: list -> verify -> campaign -> launch -> replies." },
  { id: "reply-automation", blurb: "Webhook -> classify reply -> set interest / auto-respond." },
  { id: "analytics-service", blurb: "Scheduled analytics pull -> normalize -> JSON feed." },
  { id: "lead-pipeline", blurb: "SuperSearch -> enrich -> verify -> dedupe -> sync to a DB/CRM." },
  { id: "outbound-ops", blurb: "Daily loop: morning brief + incident triage." },
  { id: "minimal", blurb: "SDK + AGENTS.md + docs — a blank canvas." },
]

export default function TemplatePicker() {
  const [tpl, setTpl] = useState("outreach-service")
  const [lang, setLang] = useState("js")
  const [copied, setCopied] = useState(false)
  const cmd = `npx create-instantly-app@latest my-app --template ${tpl} --${lang}`
  const copy = () => navigator.clipboard.writeText(cmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  const blurb = TEMPLATES.find((t) => t.id === tpl)?.blurb
  const pill = (on) => ({ padding: "6px 12px", borderRadius: 999, cursor: "pointer", fontSize: 14, border: on ? "1px solid #006bff" : "1px solid #d0d0d6", background: on ? "#006bff" : "transparent", color: on ? "#fff" : "inherit" })
  return (
    <div style={{ border: "1px solid #e3e3e8", borderRadius: 12, padding: 16, margin: "1.5rem 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        {TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => setTpl(t.id)} style={pill(tpl === t.id)}>{t.id}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["js", "JavaScript"], ["python", "Python"]].map(([l, label]) => (
          <button key={l} onClick={() => setLang(l)} style={pill(lang === l)}>{label}</button>
        ))}
      </div>
      {blurb ? <p style={{ margin: "0 0 12px", opacity: 0.7, fontSize: 14 }}>{blurb}</p> : null}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0d1117", color: "#e6edf3", borderRadius: 8, padding: "10px 12px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>
        <code style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", background: "none", color: "inherit", padding: 0 }}>{cmd}</code>
        <button onClick={copy} style={{ padding: "4px 10px", borderRadius: 6, cursor: "pointer", border: "1px solid #30363d", background: "#21262d", color: "#e6edf3" }}>{copied ? "Copied" : "Copy"}</button>
      </div>
    </div>
  )
}
