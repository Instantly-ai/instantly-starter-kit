/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listWorkspaceGroupMember(client: InstantlyClient, input: Ops.ListWorkspaceGroupMemberInput): Promise<Ops.ListWorkspaceGroupMemberSuccessResponse> {
  return executeOperation<Ops.ListWorkspaceGroupMemberSuccessResponse>(client, operationMetadata.listWorkspaceGroupMember, input)
}

export function createWorkspaceGroupMember(client: InstantlyClient, input: Ops.CreateWorkspaceGroupMemberInput): Promise<Ops.CreateWorkspaceGroupMemberSuccessResponse> {
  return executeOperation<Ops.CreateWorkspaceGroupMemberSuccessResponse>(client, operationMetadata.createWorkspaceGroupMember, input)
}

export function getAdminWorkspaceGroupMember(client: InstantlyClient, input: Ops.GetAdminWorkspaceGroupMemberInput): Promise<Ops.GetAdminWorkspaceGroupMemberSuccessResponse> {
  return executeOperation<Ops.GetAdminWorkspaceGroupMemberSuccessResponse>(client, operationMetadata.getAdminWorkspaceGroupMember, input)
}

export function getWorkspaceGroupMember(client: InstantlyClient, input: Ops.GetWorkspaceGroupMemberInput): Promise<Ops.GetWorkspaceGroupMemberSuccessResponse> {
  return executeOperation<Ops.GetWorkspaceGroupMemberSuccessResponse>(client, operationMetadata.getWorkspaceGroupMember, input)
}

export function deleteWorkspaceGroupMember(client: InstantlyClient, input: Ops.DeleteWorkspaceGroupMemberInput): Promise<Ops.DeleteWorkspaceGroupMemberSuccessResponse> {
  return executeOperation<Ops.DeleteWorkspaceGroupMemberSuccessResponse>(client, operationMetadata.deleteWorkspaceGroupMember, input)
}
