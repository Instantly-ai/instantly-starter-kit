/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function createSuperSearchEnrichment(client: InstantlyClient, input: Ops.CreateSuperSearchEnrichmentInput): Promise<Ops.CreateSuperSearchEnrichmentSuccessResponse> {
  return executeOperation<Ops.CreateSuperSearchEnrichmentSuccessResponse>(client, operationMetadata.createSuperSearchEnrichment, input)
}

export function createAIEnrichment(client: InstantlyClient, input: Ops.CreateAIEnrichmentInput): Promise<Ops.CreateAIEnrichmentSuccessResponse> {
  return executeOperation<Ops.CreateAIEnrichmentSuccessResponse>(client, operationMetadata.createAIEnrichment, input)
}

export function getAiEnrichmentForResource(client: InstantlyClient, input: Ops.GetAiEnrichmentForResourceInput): Promise<Ops.GetAiEnrichmentForResourceSuccessResponse> {
  return executeOperation<Ops.GetAiEnrichmentForResourceSuccessResponse>(client, operationMetadata.getAiEnrichmentForResource, input)
}

export function countLeadsFromSupersearch(client: InstantlyClient, input: Ops.CountLeadsFromSupersearchInput): Promise<Ops.CountLeadsFromSupersearchSuccessResponse> {
  return executeOperation<Ops.CountLeadsFromSupersearchSuccessResponse>(client, operationMetadata.countLeadsFromSupersearch, input)
}

export function enrichLeadsFromSupersearch(client: InstantlyClient, input: Ops.EnrichLeadsFromSupersearchInput): Promise<Ops.EnrichLeadsFromSupersearchSuccessResponse> {
  return executeOperation<Ops.EnrichLeadsFromSupersearchSuccessResponse>(client, operationMetadata.enrichLeadsFromSupersearch, input)
}

export function getEnrichmentHistory(client: InstantlyClient, input: Ops.GetEnrichmentHistoryInput): Promise<Ops.GetEnrichmentHistorySuccessResponse> {
  return executeOperation<Ops.GetEnrichmentHistorySuccessResponse>(client, operationMetadata.getEnrichmentHistory, input)
}

export function previewLeadsFromSupersearch(client: InstantlyClient, input: Ops.PreviewLeadsFromSupersearchInput): Promise<Ops.PreviewLeadsFromSupersearchSuccessResponse> {
  return executeOperation<Ops.PreviewLeadsFromSupersearchSuccessResponse>(client, operationMetadata.previewLeadsFromSupersearch, input)
}

export function runEnrichment(client: InstantlyClient, input: Ops.RunEnrichmentInput): Promise<Ops.RunEnrichmentSuccessResponse> {
  return executeOperation<Ops.RunEnrichmentSuccessResponse>(client, operationMetadata.runEnrichment, input)
}

export function signalKeywordsFacet(client: InstantlyClient, input: Ops.SignalKeywordsFacetInput): Promise<Ops.SignalKeywordsFacetSuccessResponse> {
  return executeOperation<Ops.SignalKeywordsFacetSuccessResponse>(client, operationMetadata.signalKeywordsFacet, input)
}

export function getEnrichmentForResource(client: InstantlyClient, input: Ops.GetEnrichmentForResourceInput): Promise<Ops.GetEnrichmentForResourceSuccessResponse> {
  return executeOperation<Ops.GetEnrichmentForResourceSuccessResponse>(client, operationMetadata.getEnrichmentForResource, input)
}

export function updateEnrichmentSettingsForResource(client: InstantlyClient, input: Ops.UpdateEnrichmentSettingsForResourceInput): Promise<Ops.UpdateEnrichmentSettingsForResourceSuccessResponse> {
  return executeOperation<Ops.UpdateEnrichmentSettingsForResourceSuccessResponse>(client, operationMetadata.updateEnrichmentSettingsForResource, input)
}
