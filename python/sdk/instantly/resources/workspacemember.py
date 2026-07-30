# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_workspace_member(client: InstantlyClient, request: "ops.ListWorkspaceMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listWorkspaceMember"], request)


def create_workspace_member(client: InstantlyClient, request: "ops.CreateWorkspaceMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createWorkspaceMember"], request)


def get_workspace_member(client: InstantlyClient, request: "ops.GetWorkspaceMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspaceMember"], request)


def patch_workspace_member(client: InstantlyClient, request: "ops.PatchWorkspaceMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchWorkspaceMember"], request)


def delete_workspace_member(client: InstantlyClient, request: "ops.DeleteWorkspaceMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteWorkspaceMember"], request)


__all__ = ["list_workspace_member", "create_workspace_member", "get_workspace_member", "patch_workspace_member", "delete_workspace_member"]
