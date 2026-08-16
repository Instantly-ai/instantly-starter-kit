import type { CSSProperties, ReactNode } from "react"
import { IconRail } from "./IconRail"
import { TopBar } from "./TopBar"
import { ContentFade } from "./ContentFade"
import type { SwitchClient } from "./WorkspaceSwitcher"
import type { Brand } from "@/config/brand"

/** The app frame: icon rail + top bar (whitelabel brand, workspace switcher, env
 * badge, theme toggle) + a content area. `brand.accent` recolors the subtree via
 * the `--brand` custom property. */
export function AppShell({
  brand, clients, children,
}: {
  brand: Brand
  clients: SwitchClient[]
  children: ReactNode
}) {
  return (
    <div
      style={{
        display: "flex", minHeight: "100vh", background: "var(--page)", color: "var(--body)",
        "--brand": brand.accent,
      } as CSSProperties}
    >
      <IconRail brand={brand} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopBar clients={clients} />
        <main style={{ flex: 1, padding: "28px 32px 56px", maxWidth: 1440, width: "100%" }}>
          <ContentFade>{children}</ContentFade>
        </main>
      </div>
    </div>
  )
}
