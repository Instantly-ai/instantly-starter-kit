# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def init_google_o_auth(client: InstantlyClient, request: "ops.InitGoogleOAuthInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["initGoogleOAuth"], request)


def init_microsoft_o_auth(client: InstantlyClient, request: "ops.InitMicrosoftOAuthInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["initMicrosoftOAuth"], request)


def get_o_auth_session_status(client: InstantlyClient, request: "ops.GetOAuthSessionStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getOAuthSessionStatus"], request)


__all__ = ["init_google_o_auth", "init_microsoft_o_auth", "get_o_auth_session_status"]
