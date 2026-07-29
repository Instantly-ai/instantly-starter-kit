/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function createLead(client: InstantlyClient, input: Ops.CreateLeadInput): Promise<Ops.CreateLeadSuccessResponse> {
  return executeOperation<Ops.CreateLeadSuccessResponse>(client, operationMetadata.createLead, input)
}

export function bulkDeleteLeads(client: InstantlyClient, input: Ops.BulkDeleteLeadsInput): Promise<Ops.BulkDeleteLeadsSuccessResponse> {
  return executeOperation<Ops.BulkDeleteLeadsSuccessResponse>(client, operationMetadata.bulkDeleteLeads, input)
}

export function bulkAddLeads(client: InstantlyClient, input: Ops.BulkAddLeadsInput): Promise<Ops.BulkAddLeadsSuccessResponse> {
  return executeOperation<Ops.BulkAddLeadsSuccessResponse>(client, operationMetadata.bulkAddLeads, input)
}

export function bulkAssignLeads(client: InstantlyClient, input: Ops.BulkAssignLeadsInput): Promise<Ops.BulkAssignLeadsSuccessResponse> {
  return executeOperation<Ops.BulkAssignLeadsSuccessResponse>(client, operationMetadata.bulkAssignLeads, input)
}

export function listLeads(client: InstantlyClient, input: Ops.ListLeadsInput): Promise<Ops.ListLeadsSuccessResponse> {
  return executeOperation<Ops.ListLeadsSuccessResponse>(client, operationMetadata.listLeads, input)
}

export function mergeLeads(client: InstantlyClient, input: Ops.MergeLeadsInput): Promise<Ops.MergeLeadsSuccessResponse> {
  return executeOperation<Ops.MergeLeadsSuccessResponse>(client, operationMetadata.mergeLeads, input)
}

export function moveLeads(client: InstantlyClient, input: Ops.MoveLeadsInput): Promise<Ops.MoveLeadsSuccessResponse> {
  return executeOperation<Ops.MoveLeadsSuccessResponse>(client, operationMetadata.moveLeads, input)
}

export function moveLeadToSubsequence(client: InstantlyClient, input: Ops.MoveLeadToSubsequenceInput): Promise<Ops.MoveLeadToSubsequenceSuccessResponse> {
  return executeOperation<Ops.MoveLeadToSubsequenceSuccessResponse>(client, operationMetadata.moveLeadToSubsequence, input)
}

export function removeLeadFromSubsequence(client: InstantlyClient, input: Ops.RemoveLeadFromSubsequenceInput): Promise<Ops.RemoveLeadFromSubsequenceSuccessResponse> {
  return executeOperation<Ops.RemoveLeadFromSubsequenceSuccessResponse>(client, operationMetadata.removeLeadFromSubsequence, input)
}

export function updateLeadInterestStatus(client: InstantlyClient, input: Ops.UpdateLeadInterestStatusInput): Promise<Ops.UpdateLeadInterestStatusSuccessResponse> {
  return executeOperation<Ops.UpdateLeadInterestStatusSuccessResponse>(client, operationMetadata.updateLeadInterestStatus, input)
}

export function getLead(client: InstantlyClient, input: Ops.GetLeadInput): Promise<Ops.GetLeadSuccessResponse> {
  return executeOperation<Ops.GetLeadSuccessResponse>(client, operationMetadata.getLead, input)
}

export function patchLead(client: InstantlyClient, input: Ops.PatchLeadInput): Promise<Ops.PatchLeadSuccessResponse> {
  return executeOperation<Ops.PatchLeadSuccessResponse>(client, operationMetadata.patchLead, input)
}

export function deleteLead(client: InstantlyClient, input: Ops.DeleteLeadInput): Promise<Ops.DeleteLeadSuccessResponse> {
  return executeOperation<Ops.DeleteLeadSuccessResponse>(client, operationMetadata.deleteLead, input)
}
