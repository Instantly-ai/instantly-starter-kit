/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listWorkspaceMember(client: InstantlyClient, input: Ops.ListWorkspaceMemberInput): Promise<Ops.ListWorkspaceMemberSuccessResponse> {
  return executeOperation<Ops.ListWorkspaceMemberSuccessResponse>(client, operationMetadata.listWorkspaceMember, input)
}

export function createWorkspaceMember(client: InstantlyClient, input: Ops.CreateWorkspaceMemberInput): Promise<Ops.CreateWorkspaceMemberSuccessResponse> {
  return executeOperation<Ops.CreateWorkspaceMemberSuccessResponse>(client, operationMetadata.createWorkspaceMember, input)
}

export function getWorkspaceMember(client: InstantlyClient, input: Ops.GetWorkspaceMemberInput): Promise<Ops.GetWorkspaceMemberSuccessResponse> {
  return executeOperation<Ops.GetWorkspaceMemberSuccessResponse>(client, operationMetadata.getWorkspaceMember, input)
}

export function patchWorkspaceMember(client: InstantlyClient, input: Ops.PatchWorkspaceMemberInput): Promise<Ops.PatchWorkspaceMemberSuccessResponse> {
  return executeOperation<Ops.PatchWorkspaceMemberSuccessResponse>(client, operationMetadata.patchWorkspaceMember, input)
}

export function deleteWorkspaceMember(client: InstantlyClient, input: Ops.DeleteWorkspaceMemberInput): Promise<Ops.DeleteWorkspaceMemberSuccessResponse> {
  return executeOperation<Ops.DeleteWorkspaceMemberSuccessResponse>(client, operationMetadata.deleteWorkspaceMember, input)
}
