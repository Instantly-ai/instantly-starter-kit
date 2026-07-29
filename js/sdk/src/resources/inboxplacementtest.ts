/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listInboxPlacementTest(client: InstantlyClient, input: Ops.ListInboxPlacementTestInput): Promise<Ops.ListInboxPlacementTestSuccessResponse> {
  return executeOperation<Ops.ListInboxPlacementTestSuccessResponse>(client, operationMetadata.listInboxPlacementTest, input)
}

export function createInboxPlacementTest(client: InstantlyClient, input: Ops.CreateInboxPlacementTestInput): Promise<Ops.CreateInboxPlacementTestSuccessResponse> {
  return executeOperation<Ops.CreateInboxPlacementTestSuccessResponse>(client, operationMetadata.createInboxPlacementTest, input)
}

export function getInboxPlacementTestESPOptions(client: InstantlyClient, input: Ops.GetInboxPlacementTestESPOptionsInput): Promise<Ops.GetInboxPlacementTestESPOptionsSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementTestESPOptionsSuccessResponse>(client, operationMetadata.getInboxPlacementTestESPOptions, input)
}

export function getInboxPlacementTest(client: InstantlyClient, input: Ops.GetInboxPlacementTestInput): Promise<Ops.GetInboxPlacementTestSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementTestSuccessResponse>(client, operationMetadata.getInboxPlacementTest, input)
}

export function patchInboxPlacementTest(client: InstantlyClient, input: Ops.PatchInboxPlacementTestInput): Promise<Ops.PatchInboxPlacementTestSuccessResponse> {
  return executeOperation<Ops.PatchInboxPlacementTestSuccessResponse>(client, operationMetadata.patchInboxPlacementTest, input)
}

export function deleteInboxPlacementTest(client: InstantlyClient, input: Ops.DeleteInboxPlacementTestInput): Promise<Ops.DeleteInboxPlacementTestSuccessResponse> {
  return executeOperation<Ops.DeleteInboxPlacementTestSuccessResponse>(client, operationMetadata.deleteInboxPlacementTest, input)
}
