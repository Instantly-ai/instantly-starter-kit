import "./globals.css"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/lib/theme"
import { AppShell } from "@/components/AppShell"
import { NavProgress } from "@/components/NavProgress"
import { getBrand } from "@/config/brand"
import { switcherClients } from "@/lib/clients"

export const metadata = {
  title: "Agency Console",
  description: "Self-hosted agency console over the Instantly SDK.",
}

// Read live per request — the shell fetches the client list once here (not per page),
// so it stays mounted across navigations (only the content region swaps).
export const dynamic = "force-dynamic"

// Set the theme before first paint (no flash): localStorage → prefers-color-scheme → dark.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default async function RootLayout({ children }: { children: ReactNode }) {
  const brand = getBrand()
  const clients = await switcherClients()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <NavProgress />
          <AppShell brand={brand} clients={clients}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
