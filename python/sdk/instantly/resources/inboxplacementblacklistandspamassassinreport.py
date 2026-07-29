# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_inbox_placement_blacklist_and_spam_assassin_report(client: InstantlyClient, request: "ops.ListInboxPlacementBlacklistAndSpamAssassinReportInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listInboxPlacementBlacklistAndSpamAssassinReport"], request)


def get_inbox_placement_blacklist_and_spam_assassin_report(client: InstantlyClient, request: "ops.GetInboxPlacementBlacklistAndSpamAssassinReportInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementBlacklistAndSpamAssassinReport"], request)


__all__ = ["list_inbox_placement_blacklist_and_spam_assassin_report", "get_inbox_placement_blacklist_and_spam_assassin_report"]
