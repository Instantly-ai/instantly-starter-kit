"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "dark" | "light"

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)

/** Dark-first theme provider. The initial theme is set pre-paint by an inline
 * script in the root layout (reads localStorage → prefers-color-scheme), so
 * there's no flash; here we sync React state to it and handle the toggle. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "dark"
    setTheme(current)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark"
      document.documentElement.setAttribute("data-theme", next)
      try { localStorage.setItem("theme", next) } catch { /* ignore */ }
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
