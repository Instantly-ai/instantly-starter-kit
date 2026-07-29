# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def get_workspace_plan_details(client: InstantlyClient, request: "ops.GetWorkspacePlanDetailsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspacePlanDetails"], request)


def get_workspace_subscription_details(client: InstantlyClient, request: "ops.GetWorkspaceSubscriptionDetailsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWorkspaceSubscriptionDetails"], request)


__all__ = ["get_workspace_plan_details", "get_workspace_subscription_details"]
