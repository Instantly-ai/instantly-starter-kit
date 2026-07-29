/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listEmail(client: InstantlyClient, input: Ops.ListEmailInput): Promise<Ops.ListEmailSuccessResponse> {
  return executeOperation<Ops.ListEmailSuccessResponse>(client, operationMetadata.listEmail, input)
}

export function forwardEmail(client: InstantlyClient, input: Ops.ForwardEmailInput): Promise<Ops.ForwardEmailSuccessResponse> {
  return executeOperation<Ops.ForwardEmailSuccessResponse>(client, operationMetadata.forwardEmail, input)
}

export function replyToEmail(client: InstantlyClient, input: Ops.ReplyToEmailInput): Promise<Ops.ReplyToEmailSuccessResponse> {
  return executeOperation<Ops.ReplyToEmailSuccessResponse>(client, operationMetadata.replyToEmail, input)
}

export function sendTestEmail(client: InstantlyClient, input: Ops.SendTestEmailInput): Promise<Ops.SendTestEmailSuccessResponse> {
  return executeOperation<Ops.SendTestEmailSuccessResponse>(client, operationMetadata.sendTestEmail, input)
}

export function markThreadAsRead(client: InstantlyClient, input: Ops.MarkThreadAsReadInput): Promise<Ops.MarkThreadAsReadSuccessResponse> {
  return executeOperation<Ops.MarkThreadAsReadSuccessResponse>(client, operationMetadata.markThreadAsRead, input)
}

export function countUnreadEmails(client: InstantlyClient, input: Ops.CountUnreadEmailsInput): Promise<Ops.CountUnreadEmailsSuccessResponse> {
  return executeOperation<Ops.CountUnreadEmailsSuccessResponse>(client, operationMetadata.countUnreadEmails, input)
}

export function getEmail(client: InstantlyClient, input: Ops.GetEmailInput): Promise<Ops.GetEmailSuccessResponse> {
  return executeOperation<Ops.GetEmailSuccessResponse>(client, operationMetadata.getEmail, input)
}

export function patchEmail(client: InstantlyClient, input: Ops.PatchEmailInput): Promise<Ops.PatchEmailSuccessResponse> {
  return executeOperation<Ops.PatchEmailSuccessResponse>(client, operationMetadata.patchEmail, input)
}

export function deleteEmail(client: InstantlyClient, input: Ops.DeleteEmailInput): Promise<Ops.DeleteEmailSuccessResponse> {
  return executeOperation<Ops.DeleteEmailSuccessResponse>(client, operationMetadata.deleteEmail, input)
}
