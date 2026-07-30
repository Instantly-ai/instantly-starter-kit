# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_workspace_group_member(client: InstantlyClient, request: "ops.ListWorkspaceGroupMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listWorkspaceGroupMember"], request)


def create_workspace_group_member(client: InstantlyClient, request: "ops.CreateWorkspaceGroupMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createWorkspaceGroupMember"], request)


def get_admin_workspace_group_member(client: InstantlyClient, request: "ops.GetAdminWorkspaceGroupMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getAdminWorkspaceGroupMember"], request)


def get_workspace_group_member(client: InstantlyClient, request: "ops.GetWorkspaceGroupMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspaceGroupMember"], request)


def delete_workspace_group_member(client: InstantlyClient, request: "ops.DeleteWorkspaceGroupMemberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteWorkspaceGroupMember"], request)


__all__ = ["list_workspace_group_member", "create_workspace_group_member", "get_admin_workspace_group_member", "get_workspace_group_member", "delete_workspace_group_member"]
