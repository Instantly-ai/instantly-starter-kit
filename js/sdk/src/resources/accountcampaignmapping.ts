/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function getAccountCampaignMapping(client: InstantlyClient, input: Ops.GetAccountCampaignMappingInput): Promise<Ops.GetAccountCampaignMappingSuccessResponse> {
  return executeOperation<Ops.GetAccountCampaignMappingSuccessResponse>(client, operationMetadata.getAccountCampaignMapping, input)
}
