import type { CSSProperties } from "react"
import { getGuide, type GuideImage, type GuideTable } from "@/config/guide"
import { CodeBlock } from "@/components/CodeBlock"

// A screenshot in a subtle browser-window frame.
function Figure({ img, hero = false }: { img: GuideImage; hero?: boolean }) {
  return (
    <figure style={{ margin: hero ? "8px 0 0" : "4px 0 0" }}>
      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-card)", overflow: "hidden", background: "var(--surface)", boxShadow: "var(--card-shadow)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", borderBottom: "1px solid var(--border)", background: "var(--rail)" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e43f52" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffc107" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2eca8b" }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt} style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
      {img.caption && <figcaption style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 8, textAlign: "center" }}>{img.caption}</figcaption>}
    </figure>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it, i) => (
        <li key={i} style={{ fontSize: 14.5, color: "var(--body)", lineHeight: 1.6 }}>{it}</li>
      ))}
    </ul>
  )
}

function Table({ table }: { table: GuideTable }) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
      <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} style={{ textAlign: i === 0 ? "left" : "center", fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 400, padding: "10px 14px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ fontSize: 13.5, color: ci === 0 ? "var(--ink)" : "var(--body)", fontWeight: ci === 0 ? 500 : 400, textAlign: ci === 0 ? "left" : "center", padding: "10px 14px", borderBottom: ri === table.rows.length - 1 ? "none" : "1px solid var(--border)", whiteSpace: ci === 0 ? "nowrap" : "normal", fontFamily: ci === 0 && /^[/a-z[\]]+$/.test(cell) ? "ui-monospace, monospace" : "inherit" }}>
                  {cell || <span style={{ color: "var(--faint)" }}>·</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LearnPage() {
  const guide = getGuide()
  const sectionStyle: CSSProperties = { scrollMarginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 26 }

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--brand)", fontWeight: 500 }}>Docs</div>
          <h1 style={{ fontSize: 30, fontWeight: 500, color: "var(--ink)", margin: "8px 0 0", letterSpacing: "-.02em" }}>{guide.headline}</h1>
          <p style={{ fontSize: 15.5, color: "var(--muted)", marginTop: 10, lineHeight: 1.55, maxWidth: 640 }}>{guide.tagline}</p>
          {guide.hero && <div style={{ marginTop: 20 }}><Figure img={guide.hero} hero /></div>}
        </div>

        {/* TOC + content */}
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, alignItems: "start" }}>
          <nav style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8, paddingLeft: 10 }}>On this page</div>
            {guide.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="toc-link" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", padding: "5px 10px", borderRadius: 7, lineHeight: 1.3 }}>
                {s.title}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", gap: 30, minWidth: 0 }}>
            {guide.sections.map((s, i) => (
              <section key={s.id} id={s.id} style={i === 0 ? { scrollMarginTop: 24 } : sectionStyle}>
                <h2 style={{ fontSize: 19, fontWeight: 500, color: "var(--ink)", margin: 0 }}>{s.title}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                  {s.body?.map((p, j) => (
                    <p key={j} style={{ margin: 0, fontSize: 14.5, color: "var(--body)", lineHeight: 1.65 }}>{p}</p>
                  ))}
                  {s.bullets && <Bullets items={s.bullets} />}
                  {s.table && <Table table={s.table} />}
                  {s.code && <CodeBlock lang={s.code.lang} source={s.code.source} />}
                  {s.image && <Figure img={s.image} />}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
  )
}
