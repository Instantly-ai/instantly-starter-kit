# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def get_workspace(client: InstantlyClient, request: "ops.GetWorkspaceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspace"], request)


def patch_workspace(client: InstantlyClient, request: "ops.PatchWorkspaceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchWorkspace"], request)


def change_workspace_owner(client: InstantlyClient, request: "ops.ChangeWorkspaceOwnerInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["changeWorkspaceOwner"], request)


def get_workspace_domain_info(client: InstantlyClient, request: "ops.GetWorkspaceDomainInfoInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspaceDomainInfo"], request)


def add_workspace_agency_domain(client: InstantlyClient, request: "ops.AddWorkspaceAgencyDomainInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["addWorkspaceAgencyDomain"], request)


def delete_workspace_domain(client: InstantlyClient, request: "ops.DeleteWorkspaceDomainInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteWorkspaceDomain"], request)


__all__ = ["get_workspace", "patch_workspace", "change_workspace_owner", "get_workspace_domain_info", "add_workspace_agency_domain", "delete_workspace_domain"]
