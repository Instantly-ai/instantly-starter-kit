/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listInboxPlacementAnalytics(client: InstantlyClient, input: Ops.ListInboxPlacementAnalyticsInput): Promise<Ops.ListInboxPlacementAnalyticsSuccessResponse> {
  return executeOperation<Ops.ListInboxPlacementAnalyticsSuccessResponse>(client, operationMetadata.listInboxPlacementAnalytics, input)
}

export function getInboxPlacementAnalyticsDeliverabilityInsights(client: InstantlyClient, input: Ops.GetInboxPlacementAnalyticsDeliverabilityInsightsInput): Promise<Ops.GetInboxPlacementAnalyticsDeliverabilityInsightsSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementAnalyticsDeliverabilityInsightsSuccessResponse>(client, operationMetadata.getInboxPlacementAnalyticsDeliverabilityInsights, input)
}

export function getInboxPlacementAnalyticsStatsByDate(client: InstantlyClient, input: Ops.GetInboxPlacementAnalyticsStatsByDateInput): Promise<Ops.GetInboxPlacementAnalyticsStatsByDateSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementAnalyticsStatsByDateSuccessResponse>(client, operationMetadata.getInboxPlacementAnalyticsStatsByDate, input)
}

export function getInboxPlacementAnalyticsStatsByTestId(client: InstantlyClient, input: Ops.GetInboxPlacementAnalyticsStatsByTestIdInput): Promise<Ops.GetInboxPlacementAnalyticsStatsByTestIdSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementAnalyticsStatsByTestIdSuccessResponse>(client, operationMetadata.getInboxPlacementAnalyticsStatsByTestId, input)
}

export function getInboxPlacementAnalytics(client: InstantlyClient, input: Ops.GetInboxPlacementAnalyticsInput): Promise<Ops.GetInboxPlacementAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetInboxPlacementAnalyticsSuccessResponse>(client, operationMetadata.getInboxPlacementAnalytics, input)
}
