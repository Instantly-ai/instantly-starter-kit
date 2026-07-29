/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listCustomTagMapping(client: InstantlyClient, input: Ops.ListCustomTagMappingInput): Promise<Ops.ListCustomTagMappingSuccessResponse> {
  return executeOperation<Ops.ListCustomTagMappingSuccessResponse>(client, operationMetadata.listCustomTagMapping, input)
}
