/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listDFYEmailAccountOrder(client: InstantlyClient, input: Ops.ListDFYEmailAccountOrderInput): Promise<Ops.ListDFYEmailAccountOrderSuccessResponse> {
  return executeOperation<Ops.ListDFYEmailAccountOrderSuccessResponse>(client, operationMetadata.listDFYEmailAccountOrder, input)
}

export function createDFYEmailAccountOrder(client: InstantlyClient, input: Ops.CreateDFYEmailAccountOrderInput): Promise<Ops.CreateDFYEmailAccountOrderSuccessResponse> {
  return executeOperation<Ops.CreateDFYEmailAccountOrderSuccessResponse>(client, operationMetadata.createDFYEmailAccountOrder, input)
}

export function listDFYEmailAccountOrdersAccounts(client: InstantlyClient, input: Ops.ListDFYEmailAccountOrdersAccountsInput): Promise<Ops.ListDFYEmailAccountOrdersAccountsSuccessResponse> {
  return executeOperation<Ops.ListDFYEmailAccountOrdersAccountsSuccessResponse>(client, operationMetadata.listDFYEmailAccountOrdersAccounts, input)
}

export function cancelDFYEmailAccounts(client: InstantlyClient, input: Ops.CancelDFYEmailAccountsInput): Promise<Ops.CancelDFYEmailAccountsSuccessResponse> {
  return executeOperation<Ops.CancelDFYEmailAccountsSuccessResponse>(client, operationMetadata.cancelDFYEmailAccounts, input)
}

export function checkDomainsAvailability(client: InstantlyClient, input: Ops.CheckDomainsAvailabilityInput): Promise<Ops.CheckDomainsAvailabilitySuccessResponse> {
  return executeOperation<Ops.CheckDomainsAvailabilitySuccessResponse>(client, operationMetadata.checkDomainsAvailability, input)
}

export function preWarmedUpDomainsList(client: InstantlyClient, input: Ops.PreWarmedUpDomainsListInput): Promise<Ops.PreWarmedUpDomainsListSuccessResponse> {
  return executeOperation<Ops.PreWarmedUpDomainsListSuccessResponse>(client, operationMetadata.preWarmedUpDomainsList, input)
}

export function generateSimilarDomains(client: InstantlyClient, input: Ops.GenerateSimilarDomainsInput): Promise<Ops.GenerateSimilarDomainsSuccessResponse> {
  return executeOperation<Ops.GenerateSimilarDomainsSuccessResponse>(client, operationMetadata.generateSimilarDomains, input)
}
