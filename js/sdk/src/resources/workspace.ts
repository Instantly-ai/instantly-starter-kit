/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function getWorkspace(client: InstantlyClient, input: Ops.GetWorkspaceInput): Promise<Ops.GetWorkspaceSuccessResponse> {
  return executeOperation<Ops.GetWorkspaceSuccessResponse>(client, operationMetadata.getWorkspace, input)
}

export function patchWorkspace(client: InstantlyClient, input: Ops.PatchWorkspaceInput): Promise<Ops.PatchWorkspaceSuccessResponse> {
  return executeOperation<Ops.PatchWorkspaceSuccessResponse>(client, operationMetadata.patchWorkspace, input)
}

export function changeWorkspaceOwner(client: InstantlyClient, input: Ops.ChangeWorkspaceOwnerInput): Promise<Ops.ChangeWorkspaceOwnerSuccessResponse> {
  return executeOperation<Ops.ChangeWorkspaceOwnerSuccessResponse>(client, operationMetadata.changeWorkspaceOwner, input)
}

export function getWorkspaceDomainInfo(client: InstantlyClient, input: Ops.GetWorkspaceDomainInfoInput): Promise<Ops.GetWorkspaceDomainInfoSuccessResponse> {
  return executeOperation<Ops.GetWorkspaceDomainInfoSuccessResponse>(client, operationMetadata.getWorkspaceDomainInfo, input)
}

export function addWorkspaceAgencyDomain(client: InstantlyClient, input: Ops.AddWorkspaceAgencyDomainInput): Promise<Ops.AddWorkspaceAgencyDomainSuccessResponse> {
  return executeOperation<Ops.AddWorkspaceAgencyDomainSuccessResponse>(client, operationMetadata.addWorkspaceAgencyDomain, input)
}

export function deleteWorkspaceDomain(client: InstantlyClient, input: Ops.DeleteWorkspaceDomainInput): Promise<Ops.DeleteWorkspaceDomainSuccessResponse> {
  return executeOperation<Ops.DeleteWorkspaceDomainSuccessResponse>(client, operationMetadata.deleteWorkspaceDomain, input)
}
