/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listInboxPlacementBlacklistAndSpamAssassinReport(client: InstantlyClient, input: Ops.ListInboxPlacementBlacklistAndSpamAssassinReportInput): Promise<Ops.ListInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse> {
  return executeOperation<Ops.ListInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse>(client, operationMetadata.listInboxPlacementBlacklistAndSpamAssassinReport, input)
}

export function getInboxPlacementBlacklistAndSpamAssassinReport(client: InstantlyClient, input: Ops.GetInboxPlacementBlacklistAndSpamAssassinReportInput): Promise<Ops.GetInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse>(client, operationMetadata.getInboxPlacementBlacklistAndSpamAssassinReport, input)
}
