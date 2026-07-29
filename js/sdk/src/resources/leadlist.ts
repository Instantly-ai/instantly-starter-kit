/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listLeadList(client: InstantlyClient, input: Ops.ListLeadListInput): Promise<Ops.ListLeadListSuccessResponse> {
  return executeOperation<Ops.ListLeadListSuccessResponse>(client, operationMetadata.listLeadList, input)
}

export function createLeadList(client: InstantlyClient, input: Ops.CreateLeadListInput): Promise<Ops.CreateLeadListSuccessResponse> {
  return executeOperation<Ops.CreateLeadListSuccessResponse>(client, operationMetadata.createLeadList, input)
}

export function getLeadList(client: InstantlyClient, input: Ops.GetLeadListInput): Promise<Ops.GetLeadListSuccessResponse> {
  return executeOperation<Ops.GetLeadListSuccessResponse>(client, operationMetadata.getLeadList, input)
}

export function patchLeadList(client: InstantlyClient, input: Ops.PatchLeadListInput): Promise<Ops.PatchLeadListSuccessResponse> {
  return executeOperation<Ops.PatchLeadListSuccessResponse>(client, operationMetadata.patchLeadList, input)
}

export function deleteLeadList(client: InstantlyClient, input: Ops.DeleteLeadListInput): Promise<Ops.DeleteLeadListSuccessResponse> {
  return executeOperation<Ops.DeleteLeadListSuccessResponse>(client, operationMetadata.deleteLeadList, input)
}

export function getVerificationStats(client: InstantlyClient, input: Ops.GetVerificationStatsInput): Promise<Ops.GetVerificationStatsSuccessResponse> {
  return executeOperation<Ops.GetVerificationStatsSuccessResponse>(client, operationMetadata.getVerificationStats, input)
}
