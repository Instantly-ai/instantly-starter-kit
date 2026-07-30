# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_background_job(client: InstantlyClient, request: "ops.ListBackgroundJobInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listBackgroundJob"], request)


def get_background_job(client: InstantlyClient, request: "ops.GetBackgroundJobInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getBackgroundJob"], request)


__all__ = ["list_background_job", "get_background_job"]
