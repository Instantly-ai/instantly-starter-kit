# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_phone_numbers(client: InstantlyClient, request: "ops.ListPhoneNumbersInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listPhoneNumbers"], request)


def delete_phone_number(client: InstantlyClient, request: "ops.DeletePhoneNumberInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deletePhoneNumber"], request)


__all__ = ["list_phone_numbers", "delete_phone_number"]
