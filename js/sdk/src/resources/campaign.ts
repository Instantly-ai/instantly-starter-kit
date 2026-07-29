/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listCampaign(client: InstantlyClient, input: Ops.ListCampaignInput): Promise<Ops.ListCampaignSuccessResponse> {
  return executeOperation<Ops.ListCampaignSuccessResponse>(client, operationMetadata.listCampaign, input)
}

export function createCampaign(client: InstantlyClient, input: Ops.CreateCampaignInput): Promise<Ops.CreateCampaignSuccessResponse> {
  return executeOperation<Ops.CreateCampaignSuccessResponse>(client, operationMetadata.createCampaign, input)
}

export function getCampaignAnalytics(client: InstantlyClient, input: Ops.GetCampaignAnalyticsInput): Promise<Ops.GetCampaignAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetCampaignAnalyticsSuccessResponse>(client, operationMetadata.getCampaignAnalytics, input)
}

export function getDailyCampaignAnalytics(client: InstantlyClient, input: Ops.GetDailyCampaignAnalyticsInput): Promise<Ops.GetDailyCampaignAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetDailyCampaignAnalyticsSuccessResponse>(client, operationMetadata.getDailyCampaignAnalytics, input)
}

export function getCampaignAnalyticsOverview(client: InstantlyClient, input: Ops.GetCampaignAnalyticsOverviewInput): Promise<Ops.GetCampaignAnalyticsOverviewSuccessResponse> {
  return executeOperation<Ops.GetCampaignAnalyticsOverviewSuccessResponse>(client, operationMetadata.getCampaignAnalyticsOverview, input)
}

export function getCampaignStepsAnalytics(client: InstantlyClient, input: Ops.GetCampaignStepsAnalyticsInput): Promise<Ops.GetCampaignStepsAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetCampaignStepsAnalyticsSuccessResponse>(client, operationMetadata.getCampaignStepsAnalytics, input)
}

export function countLaunched(client: InstantlyClient, input: Ops.CountLaunchedInput): Promise<Ops.CountLaunchedSuccessResponse> {
  return executeOperation<Ops.CountLaunchedSuccessResponse>(client, operationMetadata.countLaunched, input)
}

export function searchByContact(client: InstantlyClient, input: Ops.SearchByContactInput): Promise<Ops.SearchByContactSuccessResponse> {
  return executeOperation<Ops.SearchByContactSuccessResponse>(client, operationMetadata.searchByContact, input)
}

export function getCampaign(client: InstantlyClient, input: Ops.GetCampaignInput): Promise<Ops.GetCampaignSuccessResponse> {
  return executeOperation<Ops.GetCampaignSuccessResponse>(client, operationMetadata.getCampaign, input)
}

export function patchCampaign(client: InstantlyClient, input: Ops.PatchCampaignInput): Promise<Ops.PatchCampaignSuccessResponse> {
  return executeOperation<Ops.PatchCampaignSuccessResponse>(client, operationMetadata.patchCampaign, input)
}

export function deleteCampaign(client: InstantlyClient, input: Ops.DeleteCampaignInput): Promise<Ops.DeleteCampaignSuccessResponse> {
  return executeOperation<Ops.DeleteCampaignSuccessResponse>(client, operationMetadata.deleteCampaign, input)
}

export function activateCampaign(client: InstantlyClient, input: Ops.ActivateCampaignInput): Promise<Ops.ActivateCampaignSuccessResponse> {
  return executeOperation<Ops.ActivateCampaignSuccessResponse>(client, operationMetadata.activateCampaign, input)
}

export function duplicate(client: InstantlyClient, input: Ops.DuplicateInput): Promise<Ops.DuplicateSuccessResponse> {
  return executeOperation<Ops.DuplicateSuccessResponse>(client, operationMetadata.duplicate, input)
}

export function exportCampaign(client: InstantlyClient, input: Ops.ExportCampaignInput): Promise<Ops.ExportCampaignSuccessResponse> {
  return executeOperation<Ops.ExportCampaignSuccessResponse>(client, operationMetadata.exportCampaign, input)
}

export function createFromExport(client: InstantlyClient, input: Ops.CreateFromExportInput): Promise<Ops.CreateFromExportSuccessResponse> {
  return executeOperation<Ops.CreateFromExportSuccessResponse>(client, operationMetadata.createFromExport, input)
}

export function pauseCampaign(client: InstantlyClient, input: Ops.PauseCampaignInput): Promise<Ops.PauseCampaignSuccessResponse> {
  return executeOperation<Ops.PauseCampaignSuccessResponse>(client, operationMetadata.pauseCampaign, input)
}

export function getCampaignSendingStatus(client: InstantlyClient, input: Ops.GetCampaignSendingStatusInput): Promise<Ops.GetCampaignSendingStatusSuccessResponse> {
  return executeOperation<Ops.GetCampaignSendingStatusSuccessResponse>(client, operationMetadata.getCampaignSendingStatus, input)
}

export function shareCampaign(client: InstantlyClient, input: Ops.ShareCampaignInput): Promise<Ops.ShareCampaignSuccessResponse> {
  return executeOperation<Ops.ShareCampaignSuccessResponse>(client, operationMetadata.shareCampaign, input)
}

export function addVariables(client: InstantlyClient, input: Ops.AddVariablesInput): Promise<Ops.AddVariablesSuccessResponse> {
  return executeOperation<Ops.AddVariablesSuccessResponse>(client, operationMetadata.addVariables, input)
}
