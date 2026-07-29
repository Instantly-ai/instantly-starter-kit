/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listBackgroundJob(client: InstantlyClient, input: Ops.ListBackgroundJobInput): Promise<Ops.ListBackgroundJobSuccessResponse> {
  return executeOperation<Ops.ListBackgroundJobSuccessResponse>(client, operationMetadata.listBackgroundJob, input)
}

export function getBackgroundJob(client: InstantlyClient, input: Ops.GetBackgroundJobInput): Promise<Ops.GetBackgroundJobSuccessResponse> {
  return executeOperation<Ops.GetBackgroundJobSuccessResponse>(client, operationMetadata.getBackgroundJob, input)
}
