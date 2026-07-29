import type { Classification } from "./classify.js"

export interface ProcessedReply {
  emailId?: string
  eventType?: string
  leadEmail?: string
  classification: Classification
  acted: boolean
  at: string
}

const replies: ProcessedReply[] = []

export function record(reply: ProcessedReply): void {
  replies.push(reply)
}

export function recent(limit = 50): ProcessedReply[] {
  return replies.slice(-limit).reverse()
}
