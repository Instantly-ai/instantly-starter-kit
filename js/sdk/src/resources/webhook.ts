/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listWebhook(client: InstantlyClient, input: Ops.ListWebhookInput): Promise<Ops.ListWebhookSuccessResponse> {
  return executeOperation<Ops.ListWebhookSuccessResponse>(client, operationMetadata.listWebhook, input)
}

export function createWebhook(client: InstantlyClient, input: Ops.CreateWebhookInput): Promise<Ops.CreateWebhookSuccessResponse> {
  return executeOperation<Ops.CreateWebhookSuccessResponse>(client, operationMetadata.createWebhook, input)
}

export function listWebhookEventTypes(client: InstantlyClient, input: Ops.ListWebhookEventTypesInput): Promise<Ops.ListWebhookEventTypesSuccessResponse> {
  return executeOperation<Ops.ListWebhookEventTypesSuccessResponse>(client, operationMetadata.listWebhookEventTypes, input)
}

export function getWebhook(client: InstantlyClient, input: Ops.GetWebhookInput): Promise<Ops.GetWebhookSuccessResponse> {
  return executeOperation<Ops.GetWebhookSuccessResponse>(client, operationMetadata.getWebhook, input)
}

export function patchWebhook(client: InstantlyClient, input: Ops.PatchWebhookInput): Promise<Ops.PatchWebhookSuccessResponse> {
  return executeOperation<Ops.PatchWebhookSuccessResponse>(client, operationMetadata.patchWebhook, input)
}

export function deleteWebhook(client: InstantlyClient, input: Ops.DeleteWebhookInput): Promise<Ops.DeleteWebhookSuccessResponse> {
  return executeOperation<Ops.DeleteWebhookSuccessResponse>(client, operationMetadata.deleteWebhook, input)
}

export function resumeWebhook(client: InstantlyClient, input: Ops.ResumeWebhookInput): Promise<Ops.ResumeWebhookSuccessResponse> {
  return executeOperation<Ops.ResumeWebhookSuccessResponse>(client, operationMetadata.resumeWebhook, input)
}

export function testWebhook(client: InstantlyClient, input: Ops.TestWebhookInput): Promise<Ops.TestWebhookSuccessResponse> {
  return executeOperation<Ops.TestWebhookSuccessResponse>(client, operationMetadata.testWebhook, input)
}
