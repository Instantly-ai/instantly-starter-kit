# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_api_key(client: InstantlyClient, request: "ops.ListAPIKeyInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listAPIKey"], request)


def create_api_key(client: InstantlyClient, request: "ops.CreateAPIKeyInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createAPIKey"], request)


def delete_api_key(client: InstantlyClient, request: "ops.DeleteAPIKeyInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteAPIKey"], request)


__all__ = ["list_api_key", "create_api_key", "delete_api_key"]
