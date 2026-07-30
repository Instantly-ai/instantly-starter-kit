# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_dfy_email_account_order(client: InstantlyClient, request: "ops.ListDFYEmailAccountOrderInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listDFYEmailAccountOrder"], request)


def create_dfy_email_account_order(client: InstantlyClient, request: "ops.CreateDFYEmailAccountOrderInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createDFYEmailAccountOrder"], request)


def list_dfy_email_account_orders_accounts(client: InstantlyClient, request: "ops.ListDFYEmailAccountOrdersAccountsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listDFYEmailAccountOrdersAccounts"], request)


def cancel_dfy_email_accounts(client: InstantlyClient, request: "ops.CancelDFYEmailAccountsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["cancelDFYEmailAccounts"], request)


def check_domains_availability(client: InstantlyClient, request: "ops.CheckDomainsAvailabilityInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["checkDomainsAvailability"], request)


def pre_warmed_up_domains_list(client: InstantlyClient, request: "ops.PreWarmedUpDomainsListInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["preWarmedUpDomainsList"], request)


def generate_similar_domains(client: InstantlyClient, request: "ops.GenerateSimilarDomainsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["generateSimilarDomains"], request)


__all__ = ["list_dfy_email_account_order", "create_dfy_email_account_order", "list_dfy_email_account_orders_accounts", "cancel_dfy_email_accounts", "check_domains_availability", "pre_warmed_up_domains_list", "generate_similar_domains"]
