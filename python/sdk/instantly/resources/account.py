# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_account(client: InstantlyClient, request: "ops.ListAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listAccount"], request)


def create_account(client: InstantlyClient, request: "ops.CreateAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createAccount"], request)


def get_daily_account_analytics(client: InstantlyClient, request: "ops.GetDailyAccountAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getDailyAccountAnalytics"], request)


def get_ctd_status(client: InstantlyClient, request: "ops.GetCtdStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCtdStatus"], request)


def move_accounts(client: InstantlyClient, request: "ops.MoveAccountsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["moveAccounts"], request)


def test_account_vitals(client: InstantlyClient, request: "ops.TestAccountVitalsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["testAccountVitals"], request)


def get_warmup_analytics(client: InstantlyClient, request: "ops.GetWarmupAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWarmupAnalytics"], request)


def disable_warmup_for_accounts(client: InstantlyClient, request: "ops.DisableWarmupForAccountsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["disableWarmupForAccounts"], request)


def enable_warmup_for_accounts(client: InstantlyClient, request: "ops.EnableWarmupForAccountsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["enableWarmupForAccounts"], request)


def get_account(client: InstantlyClient, request: "ops.GetAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getAccount"], request)


def patch_account(client: InstantlyClient, request: "ops.PatchAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchAccount"], request)


def delete_account(client: InstantlyClient, request: "ops.DeleteAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteAccount"], request)


def mark_account_fixed(client: InstantlyClient, request: "ops.MarkAccountFixedInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["markAccountFixed"], request)


def pause_account(client: InstantlyClient, request: "ops.PauseAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["pauseAccount"], request)


def resume_account(client: InstantlyClient, request: "ops.ResumeAccountInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["resumeAccount"], request)


__all__ = ["list_account", "create_account", "get_daily_account_analytics", "get_ctd_status", "move_accounts", "test_account_vitals", "get_warmup_analytics", "disable_warmup_for_accounts", "enable_warmup_for_accounts", "get_account", "patch_account", "delete_account", "mark_account_fixed", "pause_account", "resume_account"]
