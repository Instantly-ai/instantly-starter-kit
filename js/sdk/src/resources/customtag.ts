/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listCustomTag(client: InstantlyClient, input: Ops.ListCustomTagInput): Promise<Ops.ListCustomTagSuccessResponse> {
  return executeOperation<Ops.ListCustomTagSuccessResponse>(client, operationMetadata.listCustomTag, input)
}

export function createCustomTag(client: InstantlyClient, input: Ops.CreateCustomTagInput): Promise<Ops.CreateCustomTagSuccessResponse> {
  return executeOperation<Ops.CreateCustomTagSuccessResponse>(client, operationMetadata.createCustomTag, input)
}

export function toggleTagResource(client: InstantlyClient, input: Ops.ToggleTagResourceInput): Promise<Ops.ToggleTagResourceSuccessResponse> {
  return executeOperation<Ops.ToggleTagResourceSuccessResponse>(client, operationMetadata.toggleTagResource, input)
}

export function getCustomTag(client: InstantlyClient, input: Ops.GetCustomTagInput): Promise<Ops.GetCustomTagSuccessResponse> {
  return executeOperation<Ops.GetCustomTagSuccessResponse>(client, operationMetadata.getCustomTag, input)
}

export function patchCustomTag(client: InstantlyClient, input: Ops.PatchCustomTagInput): Promise<Ops.PatchCustomTagSuccessResponse> {
  return executeOperation<Ops.PatchCustomTagSuccessResponse>(client, operationMetadata.patchCustomTag, input)
}

export function deleteCustomTag(client: InstantlyClient, input: Ops.DeleteCustomTagInput): Promise<Ops.DeleteCustomTagSuccessResponse> {
  return executeOperation<Ops.DeleteCustomTagSuccessResponse>(client, operationMetadata.deleteCustomTag, input)
}
