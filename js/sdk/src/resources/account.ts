/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listAccount(client: InstantlyClient, input: Ops.ListAccountInput): Promise<Ops.ListAccountSuccessResponse> {
  return executeOperation<Ops.ListAccountSuccessResponse>(client, operationMetadata.listAccount, input)
}

export function createAccount(client: InstantlyClient, input: Ops.CreateAccountInput): Promise<Ops.CreateAccountSuccessResponse> {
  return executeOperation<Ops.CreateAccountSuccessResponse>(client, operationMetadata.createAccount, input)
}

export function getDailyAccountAnalytics(client: InstantlyClient, input: Ops.GetDailyAccountAnalyticsInput): Promise<Ops.GetDailyAccountAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetDailyAccountAnalyticsSuccessResponse>(client, operationMetadata.getDailyAccountAnalytics, input)
}

export function getCtdStatus(client: InstantlyClient, input: Ops.GetCtdStatusInput): Promise<Ops.GetCtdStatusSuccessResponse> {
  return executeOperation<Ops.GetCtdStatusSuccessResponse>(client, operationMetadata.getCtdStatus, input)
}

export function moveAccounts(client: InstantlyClient, input: Ops.MoveAccountsInput): Promise<Ops.MoveAccountsSuccessResponse> {
  return executeOperation<Ops.MoveAccountsSuccessResponse>(client, operationMetadata.moveAccounts, input)
}

export function testAccountVitals(client: InstantlyClient, input: Ops.TestAccountVitalsInput): Promise<Ops.TestAccountVitalsSuccessResponse> {
  return executeOperation<Ops.TestAccountVitalsSuccessResponse>(client, operationMetadata.testAccountVitals, input)
}

export function getWarmupAnalytics(client: InstantlyClient, input: Ops.GetWarmupAnalyticsInput): Promise<Ops.GetWarmupAnalyticsSuccessResponse> {
  return executeOperation<Ops.GetWarmupAnalyticsSuccessResponse>(client, operationMetadata.getWarmupAnalytics, input)
}

export function disableWarmupForAccounts(client: InstantlyClient, input: Ops.DisableWarmupForAccountsInput): Promise<Ops.DisableWarmupForAccountsSuccessResponse> {
  return executeOperation<Ops.DisableWarmupForAccountsSuccessResponse>(client, operationMetadata.disableWarmupForAccounts, input)
}

export function enableWarmupForAccounts(client: InstantlyClient, input: Ops.EnableWarmupForAccountsInput): Promise<Ops.EnableWarmupForAccountsSuccessResponse> {
  return executeOperation<Ops.EnableWarmupForAccountsSuccessResponse>(client, operationMetadata.enableWarmupForAccounts, input)
}

export function getAccount(client: InstantlyClient, input: Ops.GetAccountInput): Promise<Ops.GetAccountSuccessResponse> {
  return executeOperation<Ops.GetAccountSuccessResponse>(client, operationMetadata.getAccount, input)
}

export function patchAccount(client: InstantlyClient, input: Ops.PatchAccountInput): Promise<Ops.PatchAccountSuccessResponse> {
  return executeOperation<Ops.PatchAccountSuccessResponse>(client, operationMetadata.patchAccount, input)
}

export function deleteAccount(client: InstantlyClient, input: Ops.DeleteAccountInput): Promise<Ops.DeleteAccountSuccessResponse> {
  return executeOperation<Ops.DeleteAccountSuccessResponse>(client, operationMetadata.deleteAccount, input)
}

export function markAccountFixed(client: InstantlyClient, input: Ops.MarkAccountFixedInput): Promise<Ops.MarkAccountFixedSuccessResponse> {
  return executeOperation<Ops.MarkAccountFixedSuccessResponse>(client, operationMetadata.markAccountFixed, input)
}

export function pauseAccount(client: InstantlyClient, input: Ops.PauseAccountInput): Promise<Ops.PauseAccountSuccessResponse> {
  return executeOperation<Ops.PauseAccountSuccessResponse>(client, operationMetadata.pauseAccount, input)
}

export function resumeAccount(client: InstantlyClient, input: Ops.ResumeAccountInput): Promise<Ops.ResumeAccountSuccessResponse> {
  return executeOperation<Ops.ResumeAccountSuccessResponse>(client, operationMetadata.resumeAccount, input)
}
