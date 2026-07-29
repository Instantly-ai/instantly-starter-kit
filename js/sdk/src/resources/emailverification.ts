/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function createEmailVerification(client: InstantlyClient, input: Ops.CreateEmailVerificationInput): Promise<Ops.CreateEmailVerificationSuccessResponse> {
  return executeOperation<Ops.CreateEmailVerificationSuccessResponse>(client, operationMetadata.createEmailVerification, input)
}

export function checkVerificationStatus(client: InstantlyClient, input: Ops.CheckVerificationStatusInput): Promise<Ops.CheckVerificationStatusSuccessResponse> {
  return executeOperation<Ops.CheckVerificationStatusSuccessResponse>(client, operationMetadata.checkVerificationStatus, input)
}
