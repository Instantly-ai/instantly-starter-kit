/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listBlockListEntry(client: InstantlyClient, input: Ops.ListBlockListEntryInput): Promise<Ops.ListBlockListEntrySuccessResponse> {
  return executeOperation<Ops.ListBlockListEntrySuccessResponse>(client, operationMetadata.listBlockListEntry, input)
}

export function createBlockListEntry(client: InstantlyClient, input: Ops.CreateBlockListEntryInput): Promise<Ops.CreateBlockListEntrySuccessResponse> {
  return executeOperation<Ops.CreateBlockListEntrySuccessResponse>(client, operationMetadata.createBlockListEntry, input)
}

export function deleteallBlockListEntry(client: InstantlyClient, input: Ops.DeleteallBlockListEntryInput): Promise<Ops.DeleteallBlockListEntrySuccessResponse> {
  return executeOperation<Ops.DeleteallBlockListEntrySuccessResponse>(client, operationMetadata.deleteallBlockListEntry, input)
}

export function createblukBlockListEntry(client: InstantlyClient, input: Ops.CreateblukBlockListEntryInput): Promise<Ops.CreateblukBlockListEntrySuccessResponse> {
  return executeOperation<Ops.CreateblukBlockListEntrySuccessResponse>(client, operationMetadata.createblukBlockListEntry, input)
}

export function deletebulkBlockListEntry(client: InstantlyClient, input: Ops.DeletebulkBlockListEntryInput): Promise<Ops.DeletebulkBlockListEntrySuccessResponse> {
  return executeOperation<Ops.DeletebulkBlockListEntrySuccessResponse>(client, operationMetadata.deletebulkBlockListEntry, input)
}

export function downloadBlockListEntry(client: InstantlyClient, input: Ops.DownloadBlockListEntryInput): Promise<Ops.DownloadBlockListEntrySuccessResponse> {
  return executeOperation<Ops.DownloadBlockListEntrySuccessResponse>(client, operationMetadata.downloadBlockListEntry, input)
}

export function getBlockListEntry(client: InstantlyClient, input: Ops.GetBlockListEntryInput): Promise<Ops.GetBlockListEntrySuccessResponse> {
  return executeOperation<Ops.GetBlockListEntrySuccessResponse>(client, operationMetadata.getBlockListEntry, input)
}

export function patchBlockListEntry(client: InstantlyClient, input: Ops.PatchBlockListEntryInput): Promise<Ops.PatchBlockListEntrySuccessResponse> {
  return executeOperation<Ops.PatchBlockListEntrySuccessResponse>(client, operationMetadata.patchBlockListEntry, input)
}

export function deleteBlockListEntry(client: InstantlyClient, input: Ops.DeleteBlockListEntryInput): Promise<Ops.DeleteBlockListEntrySuccessResponse> {
  return executeOperation<Ops.DeleteBlockListEntrySuccessResponse>(client, operationMetadata.deleteBlockListEntry, input)
}
