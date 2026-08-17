/** Percentage formatting, one place.
 * Strips trailing zeros (2.0 → "2%", 100.0 → "100%") and returns an em-dash for
 * null/NaN or values above `max` — a rate over 100% is a data bug, not a fact to
 * print. Pass a value already in percent units (2 means 2%). */
export function formatPct(
  value: number | null | undefined,
  { decimals = 1, max = 100 }: { decimals?: number; max?: number } = {},
): string {
  if (value == null || Number.isNaN(value) || value > max) return "—"
  return `${parseFloat(value.toFixed(decimals))}%`
}
