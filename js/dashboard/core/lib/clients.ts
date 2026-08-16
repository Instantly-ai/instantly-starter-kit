import { listClients } from "@instantly-ai/ops"
import { colorFor, initialsOf } from "./avatar"
import type { SwitchClient } from "@/components/WorkspaceSwitcher"

/** Clients for the top-bar workspace switcher. Best-effort — empty if no key. */
export async function switcherClients(): Promise<SwitchClient[]> {
  try {
    const r = await listClients()
    return r.clients.map((c) => ({ id: c.id, name: c.name, initials: initialsOf(c.name), color: colorFor(c.id) }))
  } catch {
    return []
  }
}
