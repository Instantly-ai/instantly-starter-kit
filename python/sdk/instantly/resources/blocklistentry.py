# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_block_list_entry(client: InstantlyClient, request: "ops.ListBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listBlockListEntry"], request)


def create_block_list_entry(client: InstantlyClient, request: "ops.CreateBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createBlockListEntry"], request)


def deleteall_block_list_entry(client: InstantlyClient, request: "ops.DeleteallBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteallBlockListEntry"], request)


def createbluk_block_list_entry(client: InstantlyClient, request: "ops.CreateblukBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createblukBlockListEntry"], request)


def deletebulk_block_list_entry(client: InstantlyClient, request: "ops.DeletebulkBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deletebulkBlockListEntry"], request)


def download_block_list_entry(client: InstantlyClient, request: "ops.DownloadBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["downloadBlockListEntry"], request)


def get_block_list_entry(client: InstantlyClient, request: "ops.GetBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getBlockListEntry"], request)


def patch_block_list_entry(client: InstantlyClient, request: "ops.PatchBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchBlockListEntry"], request)


def delete_block_list_entry(client: InstantlyClient, request: "ops.DeleteBlockListEntryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteBlockListEntry"], request)


__all__ = ["list_block_list_entry", "create_block_list_entry", "deleteall_block_list_entry", "createbluk_block_list_entry", "deletebulk_block_list_entry", "download_block_list_entry", "get_block_list_entry", "patch_block_list_entry", "delete_block_list_entry"]
