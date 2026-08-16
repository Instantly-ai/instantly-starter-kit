// Demo mode — when NEXT_PUBLIC_DEMO=1, personally-identifying data (lead emails,
// reply text, subjects) is replaced with deterministic fake content. Same input
// always maps to the same fake, so a thread stays coherent. Used for shareable
// screenshots and public demos without leaking real prospect data.

export function isDemo(): boolean {
  return process.env.NEXT_PUBLIC_DEMO === "1" || process.env.INSTANTLY_DEMO === "1"
}

/** Whether a server-side API key is configured. */
export function hasKey(): boolean {
  return !!process.env.INSTANTLY_API_KEY
}

/** Serve synthetic fixtures instead of calling the API — demo mode with no key.
 * (Demo mode WITH a key masks real data; this is the zero-setup public-demo path.) */
export function useFixtures(): boolean {
  return isDemo() && !hasKey()
}

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}
/** Deterministic integer in [min, max] from a seed. */
export function seedInt(seed: string, min: number, max: number): number {
  return min + (hash(seed) % (max - min + 1))
}
const pick = <T,>(arr: T[], seed: number, shift = 0): T => arr[(seed >> shift) % arr.length]
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const FIRST = ["ava", "noah", "mia", "liam", "emma", "kai", "zoe", "leo", "aria", "ezra", "nina", "omar", "cleo", "seth"]
const LAST = ["chen", "patel", "rivera", "kim", "novak", "haddad", "osei", "walsh", "reyes", "frost", "quill", "vance"]
const COMPANY = ["northwind", "brightloop", "cedarworks", "paperlark", "tidalbay", "fernpost", "glasshouse", "runwaylabs", "harborside"]
const TLD = ["io", "com", "co", "app"]

const SUBJECTS = [
  "Re: quick question on your outbound",
  "Re: worth a look?",
  "Re: pipeline for next quarter",
  "Re: intro + a fit check",
  "Re: following up",
  "Re: your note",
  "Re: 15 min this week?",
]
const OUTBOUND = [
  "Hi there — figured this was worth a quick look given what your team is building. We help outbound teams run their whole motion from one place. Happy to share a short walkthrough if useful.",
  "Wanted to reach out — we just shipped something that fits how you sell. Setup is a single step and it handles list-building, sending, and follow-up. Open to a quick look?",
  "Quick one: teams like yours use us to keep every mailbox healthy and every reply in one inbox. Worth a 15-minute walkthrough, no pressure.",
]
const REPLIES = [
  "Thanks for reaching out — the timing is actually good. Can you send over a bit more detail on how onboarding works?",
  "Interesting. We're mid-quarter right now but this could fit the next cycle. What does pricing look like?",
  "Sure, I'm open to trying it. Send me a link and I'll take a look this week.",
  "Appreciate the note. Not the right fit for us at the moment, but keep us on your list.",
  "This looks useful. Who on my team should I loop in for a quick call?",
]

export function maskEmail(email: string | null | undefined): string {
  if (!email || !email.includes("@")) return email || "—"
  const h = hash(email.toLowerCase())
  return `${pick(FIRST, h)}.${pick(LAST, h, 4)}@${pick(COMPANY, h, 8)}.${pick(TLD, h, 12)}`
}

/** A masked display name derived from an email (e.g. "Ava Chen"). */
export function maskPerson(email: string | null | undefined): string {
  if (!email) return "—"
  const h = hash(email.toLowerCase())
  return `${cap(pick(FIRST, h))} ${cap(pick(LAST, h, 4))}`
}

const SUFFIX = ["Co", "Group", "Labs", "Digital", "Partners", "Outbound", "Media"]
/** A masked company/workspace name derived from a seed (e.g. "Northwind Labs"). */
export function maskCompany(seed: string): string {
  const h = hash(seed || "x")
  return `${cap(pick(COMPANY, h))} ${pick(SUFFIX, h, 5)}`
}

/** A stable fake UUID-shaped id from a seed — for display only, never routing. */
export function maskId(seed: string): string {
  const h = hash(seed || "x").toString(16).padStart(8, "0").slice(0, 8)
  const h2 = hash(seed + "b").toString(16).padStart(12, "0").slice(0, 12)
  return `${h}-demo-4a1c-9f00-${h2}`
}

const CAMPAIGN_THEMES = ["Q3 Outbound", "Founder Series", "ICP Tier 1", "Warm Intro", "Enterprise Push", "SMB Motion", "Reactivation", "West Coast Cold", "Give-First", "Case-Study Play"]
/** A masked, plausible campaign name from a seed (e.g. "Founder Series · B2"). */
export function maskCampaignName(seed: string): string {
  const h = hash(seed || "x")
  return `${pick(CAMPAIGN_THEMES, h)} · ${String.fromCharCode(65 + (h % 3))}${(h % 9) + 1}`
}

export function maskSubject(seed: string): string {
  return pick(SUBJECTS, hash(seed))
}
export function maskOutbound(seed: string): string {
  return pick(OUTBOUND, hash(seed))
}
export function maskReply(seed: string): string {
  return pick(REPLIES, hash(seed))
}
