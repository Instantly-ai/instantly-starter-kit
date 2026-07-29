/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listAPIKey(client: InstantlyClient, input: Ops.ListAPIKeyInput): Promise<Ops.ListAPIKeySuccessResponse> {
  return executeOperation<Ops.ListAPIKeySuccessResponse>(client, operationMetadata.listAPIKey, input)
}

export function createAPIKey(client: InstantlyClient, input: Ops.CreateAPIKeyInput): Promise<Ops.CreateAPIKeySuccessResponse> {
  return executeOperation<Ops.CreateAPIKeySuccessResponse>(client, operationMetadata.createAPIKey, input)
}

export function deleteAPIKey(client: InstantlyClient, input: Ops.DeleteAPIKeyInput): Promise<Ops.DeleteAPIKeySuccessResponse> {
  return executeOperation<Ops.DeleteAPIKeySuccessResponse>(client, operationMetadata.deleteAPIKey, input)
}
