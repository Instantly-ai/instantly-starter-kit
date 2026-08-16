import Link from "next/link"
import { colorFor, initialsOf } from "@/lib/avatar"

/** Client avatar + name, used in agency-wide tables. Optionally links to the client. */
export function ClientCell({ id, name, href }: { id: string; name: string; href?: string }) {
  const inner = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 26, height: 26, borderRadius: 7, background: colorFor(id), color: "#fff", fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 26px" }}>
        {initialsOf(name)}
      </span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{name}</span>
    </span>
  )
  return href ? (
    <Link href={href} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  ) : (
    inner
  )
}
