const PALETTE = ["#e43f52", "#ffc107", "#8b5cf6", "#006bff", "#2eca8b", "#3c4858", "#8492a6", "#0f9d8a", "#f17425"]

/** Deterministic avatar color from an id (stable across renders). */
export function colorFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

export function initialsOf(name: string): string {
  return name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()
}
