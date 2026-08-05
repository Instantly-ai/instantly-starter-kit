/**
 * Alert thresholds — shipped as editable data, not hardcoded logic.
 * Tune these to your risk tolerance; the brief and incident commands read them.
 * Sources: cold-email operator norms (bounce >2% watch / >5% act; complaint ~0.1%).
 */
export const thresholds = {
  bounceWarn: 0.02, // 2% bounce rate → watch
  bounceCrit: 0.05, // 5% bounce rate → act (pause the domain)
  complaintWarn: 0.0008, // 0.08% spam complaints → watch
  complaintCrit: 0.001, // 0.10% → cut volume
  placementMissTests: 2, // inbox missed on N consecutive inbox-placement tests → rotate
  replyDropDays: 3, // reply rate down N days running → likely a deliverability issue
} as const

export type Thresholds = typeof thresholds
