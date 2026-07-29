# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def create_lead(client: InstantlyClient, request: "ops.CreateLeadInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createLead"], request)


def bulk_delete_leads(client: InstantlyClient, request: "ops.BulkDeleteLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["bulkDeleteLeads"], request)


def bulk_add_leads(client: InstantlyClient, request: "ops.BulkAddLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["bulkAddLeads"], request)


def bulk_assign_leads(client: InstantlyClient, request: "ops.BulkAssignLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["bulkAssignLeads"], request)


def list_leads(client: InstantlyClient, request: "ops.ListLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listLeads"], request)


def merge_leads(client: InstantlyClient, request: "ops.MergeLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["mergeLeads"], request)


def move_leads(client: InstantlyClient, request: "ops.MoveLeadsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["moveLeads"], request)


def move_lead_to_subsequence(client: InstantlyClient, request: "ops.MoveLeadToSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["moveLeadToSubsequence"], request)


def remove_lead_from_subsequence(client: InstantlyClient, request: "ops.RemoveLeadFromSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["removeLeadFromSubsequence"], request)


def update_lead_interest_status(client: InstantlyClient, request: "ops.UpdateLeadInterestStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["updateLeadInterestStatus"], request)


def get_lead(client: InstantlyClient, request: "ops.GetLeadInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getLead"], request)


def patch_lead(client: InstantlyClient, request: "ops.PatchLeadInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchLead"], request)


def delete_lead(client: InstantlyClient, request: "ops.DeleteLeadInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteLead"], request)


__all__ = ["create_lead", "bulk_delete_leads", "bulk_add_leads", "bulk_assign_leads", "list_leads", "merge_leads", "move_leads", "move_lead_to_subsequence", "remove_lead_from_subsequence", "update_lead_interest_status", "get_lead", "patch_lead", "delete_lead"]
