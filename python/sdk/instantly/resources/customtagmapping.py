# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_custom_tag_mapping(client: InstantlyClient, request: "ops.ListCustomTagMappingInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listCustomTagMapping"], request)


__all__ = ["list_custom_tag_mapping"]
