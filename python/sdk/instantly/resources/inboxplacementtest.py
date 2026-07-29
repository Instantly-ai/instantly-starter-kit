# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_inbox_placement_test(client: InstantlyClient, request: "ops.ListInboxPlacementTestInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listInboxPlacementTest"], request)


def create_inbox_placement_test(client: InstantlyClient, request: "ops.CreateInboxPlacementTestInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createInboxPlacementTest"], request)


def get_inbox_placement_test_esp_options(client: InstantlyClient, request: "ops.GetInboxPlacementTestESPOptionsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementTestESPOptions"], request)


def get_inbox_placement_test(client: InstantlyClient, request: "ops.GetInboxPlacementTestInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementTest"], request)


def patch_inbox_placement_test(client: InstantlyClient, request: "ops.PatchInboxPlacementTestInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchInboxPlacementTest"], request)


def delete_inbox_placement_test(client: InstantlyClient, request: "ops.DeleteInboxPlacementTestInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteInboxPlacementTest"], request)


__all__ = ["list_inbox_placement_test", "create_inbox_placement_test", "get_inbox_placement_test_esp_options", "get_inbox_placement_test", "patch_inbox_placement_test", "delete_inbox_placement_test"]
