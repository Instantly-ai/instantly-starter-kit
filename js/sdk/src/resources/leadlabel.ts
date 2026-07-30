/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listLeadLabel(client: InstantlyClient, input: Ops.ListLeadLabelInput): Promise<Ops.ListLeadLabelSuccessResponse> {
  return executeOperation<Ops.ListLeadLabelSuccessResponse>(client, operationMetadata.listLeadLabel, input)
}

export function createLeadLabel(client: InstantlyClient, input: Ops.CreateLeadLabelInput): Promise<Ops.CreateLeadLabelSuccessResponse> {
  return executeOperation<Ops.CreateLeadLabelSuccessResponse>(client, operationMetadata.createLeadLabel, input)
}

export function testAiReplyLabelLeadLabels(client: InstantlyClient, input: Ops.TestAiReplyLabelLeadLabelsInput): Promise<Ops.TestAiReplyLabelLeadLabelsSuccessResponse> {
  return executeOperation<Ops.TestAiReplyLabelLeadLabelsSuccessResponse>(client, operationMetadata.testAiReplyLabelLeadLabels, input)
}

export function getLeadLabel(client: InstantlyClient, input: Ops.GetLeadLabelInput): Promise<Ops.GetLeadLabelSuccessResponse> {
  return executeOperation<Ops.GetLeadLabelSuccessResponse>(client, operationMetadata.getLeadLabel, input)
}

export function patchLeadLabel(client: InstantlyClient, input: Ops.PatchLeadLabelInput): Promise<Ops.PatchLeadLabelSuccessResponse> {
  return executeOperation<Ops.PatchLeadLabelSuccessResponse>(client, operationMetadata.patchLeadLabel, input)
}

export function deleteLeadLabel(client: InstantlyClient, input: Ops.DeleteLeadLabelInput): Promise<Ops.DeleteLeadLabelSuccessResponse> {
  return executeOperation<Ops.DeleteLeadLabelSuccessResponse>(client, operationMetadata.deleteLeadLabel, input)
}
