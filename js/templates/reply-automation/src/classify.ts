/**
 * A tiny, dependency-free reply classifier. Swap in your own model or call
 * Instantly's `testAiReplyLabelLeadLabels` for AI labels (rate-limited: 500/30d).
 *
 * `interestValue` maps to a lead's `lt_interest_status` / `interest_value`:
 *   1 interested · 2 meeting booked · 0 neutral · -1 not interested · -2 wrong person
 */
export interface Classification {
  label: "interested" | "meeting" | "not_interested" | "wrong_person" | "out_of_office" | "neutral"
  interestValue: number
}

const RULES: Array<{ label: Classification["label"]; interestValue: number; patterns: RegExp[] }> = [
  { label: "not_interested", interestValue: -1, patterns: [/\bunsubscribe\b/i, /not interested/i, /\bstop\b/i, /remove me/i, /no thanks/i] },
  { label: "wrong_person", interestValue: -2, patterns: [/wrong person/i, /not the right/i, /no longer with/i, /reach out to/i] },
  { label: "out_of_office", interestValue: 0, patterns: [/out of office/i, /\bOOO\b/, /on leave/i, /on vacation/i, /annual leave/i] },
  { label: "meeting", interestValue: 2, patterns: [/book (a )?(call|meeting|time)/i, /calendar/i, /calendly/i, /what times?/i, /let'?s meet/i] },
  {
    label: "interested",
    interestValue: 1,
    patterns: [
      /interested/i, /tell me more/i, /sounds (good|great|interesting)/i, /learn more/i,
      /pricing/i, /how much/i, /send me (the )?(info|details|more|deck)/i, /yes[, ]*please/i,
      /sign me up/i, /count me in/i, /\bkeen\b/i, /let'?s (do it|chat|talk)/i,
    ],
  },
]

export function classify(text: string): Classification {
  const body = text ?? ""
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(body))) {
      return { label: rule.label, interestValue: rule.interestValue }
    }
  }
  return { label: "neutral", interestValue: 0 }
}
