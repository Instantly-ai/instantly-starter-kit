# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def create_email_verification(client: InstantlyClient, request: "ops.CreateEmailVerificationInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createEmailVerification"], request)


def check_verification_status(client: InstantlyClient, request: "ops.CheckVerificationStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["checkVerificationStatus"], request)


__all__ = ["create_email_verification", "check_verification_status"]
