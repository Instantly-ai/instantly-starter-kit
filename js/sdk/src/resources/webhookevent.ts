/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listWebhookEvent(client: InstantlyClient, input: Ops.ListWebhookEventInput): Promise<Ops.ListWebhookEventSuccessResponse> {
  return executeOperation<Ops.ListWebhookEventSuccessResponse>(client, operationMetadata.listWebhookEvent, input)
}

export function getWebhookEventsSummary(client: InstantlyClient, input: Ops.GetWebhookEventsSummaryInput): Promise<Ops.GetWebhookEventsSummarySuccessResponse> {
  return executeOperation<Ops.GetWebhookEventsSummarySuccessResponse>(client, operationMetadata.getWebhookEventsSummary, input)
}

export function getWebhookEventsSummaryByDate(client: InstantlyClient, input: Ops.GetWebhookEventsSummaryByDateInput): Promise<Ops.GetWebhookEventsSummaryByDateSuccessResponse> {
  return executeOperation<Ops.GetWebhookEventsSummaryByDateSuccessResponse>(client, operationMetadata.getWebhookEventsSummaryByDate, input)
}

export function getWebhookEvent(client: InstantlyClient, input: Ops.GetWebhookEventInput): Promise<Ops.GetWebhookEventSuccessResponse> {
  return executeOperation<Ops.GetWebhookEventSuccessResponse>(client, operationMetadata.getWebhookEvent, input)
}
