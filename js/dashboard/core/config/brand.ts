export interface Brand {
  name: string
  accent: string
  initials: string
  /** Path to a logo in /public (whitelabel). Defaults to /logo.png. */
  logo: string
}

/** Whitelabel config — override via env:
 *  - NEXT_PUBLIC_AGENCY_NAME  the portal name (shown in the sidebar)
 *  - NEXT_PUBLIC_ACCENT       applied as `--brand`, recolors the whole UI
 *  - NEXT_PUBLIC_LOGO         a logo path in /public (drop your own logo there)
 */
export function getBrand(): Brand {
  const name = process.env.NEXT_PUBLIC_AGENCY_NAME || "Meridian Outbound"
  const accent = process.env.NEXT_PUBLIC_ACCENT || "#006bff"
  const logo = process.env.NEXT_PUBLIC_LOGO || "/logo.png"
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()
  return { name, accent, initials, logo }
}
