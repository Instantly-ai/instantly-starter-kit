/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function initGoogleOAuth(client: InstantlyClient, input: Ops.InitGoogleOAuthInput): Promise<Ops.InitGoogleOAuthSuccessResponse> {
  return executeOperation<Ops.InitGoogleOAuthSuccessResponse>(client, operationMetadata.initGoogleOAuth, input)
}

export function initMicrosoftOAuth(client: InstantlyClient, input: Ops.InitMicrosoftOAuthInput): Promise<Ops.InitMicrosoftOAuthSuccessResponse> {
  return executeOperation<Ops.InitMicrosoftOAuthSuccessResponse>(client, operationMetadata.initMicrosoftOAuth, input)
}

export function getOAuthSessionStatus(client: InstantlyClient, input: Ops.GetOAuthSessionStatusInput): Promise<Ops.GetOAuthSessionStatusSuccessResponse> {
  return executeOperation<Ops.GetOAuthSessionStatusSuccessResponse>(client, operationMetadata.getOAuthSessionStatus, input)
}
