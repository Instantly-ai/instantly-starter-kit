/* eslint-disable */
// Generated file. Do not edit manually.

import type { InstantlyClient } from "../client/types.js"
import { executeOperation } from "../client/request.js"
import { operationMetadata } from "../generated/metadata.js"
import type * as Ops from "../generated/operations.js"

export function listPhoneNumbers(client: InstantlyClient, input: Ops.ListPhoneNumbersInput): Promise<Ops.ListPhoneNumbersSuccessResponse> {
  return executeOperation<Ops.ListPhoneNumbersSuccessResponse>(client, operationMetadata.listPhoneNumbers, input)
}

export function deletePhoneNumber(client: InstantlyClient, input: Ops.DeletePhoneNumberInput): Promise<Ops.DeletePhoneNumberSuccessResponse> {
  return executeOperation<Ops.DeletePhoneNumberSuccessResponse>(client, operationMetadata.deletePhoneNumber, input)
}
