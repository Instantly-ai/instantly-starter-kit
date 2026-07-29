/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listAuditLog(client: InstantlyClient, input: Ops.ListAuditLogInput): Promise<Ops.ListAuditLogSuccessResponse> {
  return executeOperation<Ops.ListAuditLogSuccessResponse>(client, operationMetadata.listAuditLog, input)
}
