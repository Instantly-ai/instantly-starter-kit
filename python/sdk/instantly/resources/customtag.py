# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_custom_tag(client: InstantlyClient, request: "ops.ListCustomTagInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listCustomTag"], request)


def create_custom_tag(client: InstantlyClient, request: "ops.CreateCustomTagInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createCustomTag"], request)


def toggle_tag_resource(client: InstantlyClient, request: "ops.ToggleTagResourceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["toggleTagResource"], request)


def get_custom_tag(client: InstantlyClient, request: "ops.GetCustomTagInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCustomTag"], request)


def patch_custom_tag(client: InstantlyClient, request: "ops.PatchCustomTagInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchCustomTag"], request)


def delete_custom_tag(client: InstantlyClient, request: "ops.DeleteCustomTagInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteCustomTag"], request)


__all__ = ["list_custom_tag", "create_custom_tag", "toggle_tag_resource", "get_custom_tag", "patch_custom_tag", "delete_custom_tag"]
