/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listCampaignSubsequence(client: InstantlyClient, input: Ops.ListCampaignSubsequenceInput): Promise<Ops.ListCampaignSubsequenceSuccessResponse> {
  return executeOperation<Ops.ListCampaignSubsequenceSuccessResponse>(client, operationMetadata.listCampaignSubsequence, input)
}

export function createCampaignSubsequence(client: InstantlyClient, input: Ops.CreateCampaignSubsequenceInput): Promise<Ops.CreateCampaignSubsequenceSuccessResponse> {
  return executeOperation<Ops.CreateCampaignSubsequenceSuccessResponse>(client, operationMetadata.createCampaignSubsequence, input)
}

export function getCampaignSubsequence(client: InstantlyClient, input: Ops.GetCampaignSubsequenceInput): Promise<Ops.GetCampaignSubsequenceSuccessResponse> {
  return executeOperation<Ops.GetCampaignSubsequenceSuccessResponse>(client, operationMetadata.getCampaignSubsequence, input)
}

export function patchCampaignSubsequence(client: InstantlyClient, input: Ops.PatchCampaignSubsequenceInput): Promise<Ops.PatchCampaignSubsequenceSuccessResponse> {
  return executeOperation<Ops.PatchCampaignSubsequenceSuccessResponse>(client, operationMetadata.patchCampaignSubsequence, input)
}

export function deleteCampaignSubsequence(client: InstantlyClient, input: Ops.DeleteCampaignSubsequenceInput): Promise<Ops.DeleteCampaignSubsequenceSuccessResponse> {
  return executeOperation<Ops.DeleteCampaignSubsequenceSuccessResponse>(client, operationMetadata.deleteCampaignSubsequence, input)
}

export function duplicateSubsequence(client: InstantlyClient, input: Ops.DuplicateSubsequenceInput): Promise<Ops.DuplicateSubsequenceSuccessResponse> {
  return executeOperation<Ops.DuplicateSubsequenceSuccessResponse>(client, operationMetadata.duplicateSubsequence, input)
}

export function pauseSubsequence(client: InstantlyClient, input: Ops.PauseSubsequenceInput): Promise<Ops.PauseSubsequenceSuccessResponse> {
  return executeOperation<Ops.PauseSubsequenceSuccessResponse>(client, operationMetadata.pauseSubsequence, input)
}

export function resumeSubsequence(client: InstantlyClient, input: Ops.ResumeSubsequenceInput): Promise<Ops.ResumeSubsequenceSuccessResponse> {
  return executeOperation<Ops.ResumeSubsequenceSuccessResponse>(client, operationMetadata.resumeSubsequence, input)
}

export function getSubsequenceSendingStatus(client: InstantlyClient, input: Ops.GetSubsequenceSendingStatusInput): Promise<Ops.GetSubsequenceSendingStatusSuccessResponse> {
  return executeOperation<Ops.GetSubsequenceSendingStatusSuccessResponse>(client, operationMetadata.getSubsequenceSendingStatus, input)
}
