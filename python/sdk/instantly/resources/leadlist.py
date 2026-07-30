# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_lead_list(client: InstantlyClient, request: "ops.ListLeadListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listLeadList"], request)


def create_lead_list(client: InstantlyClient, request: "ops.CreateLeadListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createLeadList"], request)


def get_lead_list(client: InstantlyClient, request: "ops.GetLeadListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getLeadList"], request)


def patch_lead_list(client: InstantlyClient, request: "ops.PatchLeadListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchLeadList"], request)


def delete_lead_list(client: InstantlyClient, request: "ops.DeleteLeadListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteLeadList"], request)


def get_verification_stats(client: InstantlyClient, request: "ops.GetVerificationStatsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getVerificationStats"], request)


__all__ = ["list_lead_list", "create_lead_list", "get_lead_list", "patch_lead_list", "delete_lead_list", "get_verification_stats"]
