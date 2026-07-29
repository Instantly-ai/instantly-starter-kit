# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_audit_log(client: InstantlyClient, request: "ops.ListAuditLogInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listAuditLog"], request)


__all__ = ["list_audit_log"]
