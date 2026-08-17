/** "self-hosted · your key" — a reminder that the key is server-side and this
 * isn't a public multi-user app. */
export function EnvBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 28, padding: "0 11px", borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand)", fontSize: 12, fontWeight: 500 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2.5" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
      self-hosted · your key
    </span>
  )
}
