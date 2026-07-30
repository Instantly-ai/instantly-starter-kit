/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function getWorkspacePlanDetails(client: InstantlyClient, input: Ops.GetWorkspacePlanDetailsInput): Promise<Ops.GetWorkspacePlanDetailsSuccessResponse> {
  return executeOperation<Ops.GetWorkspacePlanDetailsSuccessResponse>(client, operationMetadata.getWorkspacePlanDetails, input)
}

export function getWorkspaceSubscriptionDetails(client: InstantlyClient, input: Ops.GetWorkspaceSubscriptionDetailsInput): Promise<Ops.GetWorkspaceSubscriptionDetailsSuccessResponse> {
  return executeOperation<Ops.GetWorkspaceSubscriptionDetailsSuccessResponse>(client, operationMetadata.getWorkspaceSubscriptionDetails, input)
}
