/* eslint-disable */
// Generated file. Do not edit manually.

import type * as Models from "./models.js"

export type EmptyObject = Record<string, never>

export type GetAccountCampaignMappingPathParams = {
  "email": string;
}
export type GetAccountCampaignMappingQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
}
export type GetAccountCampaignMappingRequestBody = undefined
export interface GetAccountCampaignMappingResponses {
  "200": {
  "items": Models.AccountCampaignMapping[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetAccountCampaignMappingSuccessResponse = GetAccountCampaignMappingResponses["200"]
export interface GetAccountCampaignMappingInput {
  path: GetAccountCampaignMappingPathParams
  query?: GetAccountCampaignMappingQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListAccountPathParams = EmptyObject
export type ListAccountQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "status"?: 1 | 2 | 3 | -1 | -2 | -3;
  "provider_code"?: 1 | 2 | 3 | 4 | 8;
  "tag_ids"?: string;
  "tag_ids_all"?: string;
  "include_tags"?: boolean;
  "filter"?: "ACC_FILTER_PAUSED" | "ACC_FILTER_ERROR" | "ACC_FILTER_NO_CTD" | "ACC_FILTER_PW_ACCOUNTS" | "ACC_FILTER_DFY" | "ACC_FILTER_DFY_SETUP_PENDING" | "ACC_FILTER_W_ACTIVE" | "ACC_FILTER_W_PAUSED" | "ACC_FILTER_W_ERROR";
  "sort_by"?: "timestamp_created" | "email" | "stat_warmup_score" | "status";
  "sort_order"?: "asc" | "desc";
}
export type ListAccountRequestBody = undefined
export interface ListAccountResponses {
  "200": {
  "items": (Models.Account & {
    "tags"?: {
      "id"?: string;
      "label"?: string;
      "description"?: string | null;
    }[] | null;
  })[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListAccountSuccessResponse = ListAccountResponses["200"]
export interface ListAccountInput {
  path?: ListAccountPathParams
  query?: ListAccountQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateAccountPathParams = EmptyObject
export type CreateAccountQueryParams = EmptyObject
export type CreateAccountRequestBody = {
  "email": string;
  "first_name": string;
  "last_name": string;
  "warmup"?: {
    "limit"?: number;
    "advanced"?: {
      "warm_ctd"?: boolean;
      "open_rate"?: number;
      "important_rate"?: number;
      "read_emulation"?: boolean;
      "spam_save_rate"?: number;
      "weekday_only"?: boolean;
    };
    "warmup_custom_ftag"?: string;
    "increment"?: "disabled" | "0" | "1" | "2" | "3" | "4";
    "reply_rate"?: number;
  };
  "daily_limit"?: number | null;
  "tracking_domain_name"?: string | null;
  "tracking_domain_status"?: string | null;
  "enable_slow_ramp"?: boolean | null;
  "inbox_placement_test_limit"?: number | null;
  "provider_code": 1 | 2 | 3 | 4 | 8;
  "sending_gap"?: number;
  "signature"?: string | null;
  "reply_to"?: string;
  "imap_username": string;
  "imap_password": string;
  "imap_host": string;
  "imap_port": number;
  "smtp_username": string;
  "smtp_password": string;
  "smtp_host": string;
  "smtp_port": number;
  "warmup_custom_ftag"?: string;
  "skip_cname_check"?: boolean;
}
export interface CreateAccountResponses {
  "200": Models.Account
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateAccountSuccessResponse = CreateAccountResponses["200"]
export interface CreateAccountInput {
  path?: CreateAccountPathParams
  query?: CreateAccountQueryParams
  body: CreateAccountRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetDailyAccountAnalyticsPathParams = EmptyObject
export type GetDailyAccountAnalyticsQueryParams = {
  "start_date"?: string;
  "end_date"?: string;
  "emails"?: string[];
}
export type GetDailyAccountAnalyticsRequestBody = undefined
export interface GetDailyAccountAnalyticsResponses {
  "200": {
  "date": string;
  "email_account": string;
  "sent": number;
  "bounced": number;
  "contacted": number;
  "new_leads_contacted": number;
  "opened": number;
  "unique_opened": number;
  "replies": number;
  "unique_replies": number;
  "replies_automatic": number;
  "unique_replies_automatic": number;
  "clicks": number;
  "unique_clicks": number;
}[]
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "413": {
  "statusCode": 413;
  "error": "Payload Too Large";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetDailyAccountAnalyticsSuccessResponse = GetDailyAccountAnalyticsResponses["200"]
export interface GetDailyAccountAnalyticsInput {
  path?: GetDailyAccountAnalyticsPathParams
  query?: GetDailyAccountAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCtdStatusPathParams = EmptyObject
export type GetCtdStatusQueryParams = {
  "host": string;
}
export type GetCtdStatusRequestBody = undefined
export interface GetCtdStatusResponses {
  "200": {
  "success"?: boolean;
  "ssl"?: boolean;
  "cname"?: boolean;
  "host"?: string;
}
  "400": {
  "status"?: string;
  "message"?: string;
  "host"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCtdStatusSuccessResponse = GetCtdStatusResponses["200"]
export interface GetCtdStatusInput {
  path?: GetCtdStatusPathParams
  query: GetCtdStatusQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MoveAccountsPathParams = EmptyObject
export type MoveAccountsQueryParams = EmptyObject
export type MoveAccountsRequestBody = {
  "emails": string[];
  "source_workspace_id": string;
  "destination_workspace_id": string;
}
export interface MoveAccountsResponses {
  "200": {
  "status"?: "success";
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MoveAccountsSuccessResponse = MoveAccountsResponses["200"]
export interface MoveAccountsInput {
  path?: MoveAccountsPathParams
  query?: MoveAccountsQueryParams
  body: MoveAccountsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type TestAccountVitalsPathParams = EmptyObject
export type TestAccountVitalsQueryParams = EmptyObject
export type TestAccountVitalsRequestBody = {
  "accounts"?: string[];
}
export interface TestAccountVitalsResponses {
  "200": {
  "status"?: string;
  "success_list"?: {
    "domain"?: string;
    "allPass"?: boolean;
    "mx"?: boolean;
    "spf"?: boolean;
    "dkim"?: boolean;
    "dmarc"?: boolean;
  }[];
  "failure_list"?: {
    "domain"?: string;
    "allPass"?: boolean;
    "mx"?: boolean;
    "spf"?: boolean;
    "dkim"?: boolean;
    "dmarc"?: boolean;
  }[];
}
  "400": {
  "error"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type TestAccountVitalsSuccessResponse = TestAccountVitalsResponses["200"]
export interface TestAccountVitalsInput {
  path?: TestAccountVitalsPathParams
  query?: TestAccountVitalsQueryParams
  body?: TestAccountVitalsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWarmupAnalyticsPathParams = EmptyObject
export type GetWarmupAnalyticsQueryParams = EmptyObject
export type GetWarmupAnalyticsRequestBody = {
  "emails": string[];
}
export interface GetWarmupAnalyticsResponses {
  "200": {
  "email_date_data"?: Record<string, Record<string, {
    "sent"?: number;
    "landed_inbox"?: number;
    "landed_spam"?: number;
    "received"?: number;
  }>>;
  "aggregate_data"?: Record<string, {
    "sent"?: number;
    "received"?: number;
    "landed_inbox"?: number;
    "landed_spam"?: number;
    "health_score_label"?: string;
    "health_score"?: number;
  }>;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWarmupAnalyticsSuccessResponse = GetWarmupAnalyticsResponses["200"]
export interface GetWarmupAnalyticsInput {
  path?: GetWarmupAnalyticsPathParams
  query?: GetWarmupAnalyticsQueryParams
  body: GetWarmupAnalyticsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DisableWarmupForAccountsPathParams = EmptyObject
export type DisableWarmupForAccountsQueryParams = EmptyObject
export type DisableWarmupForAccountsRequestBody = {
  "emails"?: string[];
  "include_all_emails"?: boolean;
  "excluded_emails"?: string[];
  "filter"?: {
    "tag_id"?: string;
    "filter"?: "ACC_FILTER_PAUSED" | "ACC_FILTER_ERROR" | "ACC_FILTER_NO_CTD" | "ACC_FILTER_PW_ACCOUNTS" | "ACC_FILTER_DFY" | "ACC_FILTER_DFY_SETUP_PENDING" | "ACC_FILTER_W_ACTIVE" | "ACC_FILTER_W_PAUSED" | "ACC_FILTER_W_ERROR" | null | null;
    [key: string]: unknown;
  } | null;
  "search"?: string;
}
export interface DisableWarmupForAccountsResponses {
  "200": Models.BackgroundJob
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DisableWarmupForAccountsSuccessResponse = DisableWarmupForAccountsResponses["200"]
export interface DisableWarmupForAccountsInput {
  path?: DisableWarmupForAccountsPathParams
  query?: DisableWarmupForAccountsQueryParams
  body?: DisableWarmupForAccountsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type EnableWarmupForAccountsPathParams = EmptyObject
export type EnableWarmupForAccountsQueryParams = EmptyObject
export type EnableWarmupForAccountsRequestBody = {
  "emails"?: string[];
  "include_all_emails"?: boolean;
  "excluded_emails"?: string[];
  "filter"?: {
    "tag_id"?: string;
    "filter"?: "ACC_FILTER_PAUSED" | "ACC_FILTER_ERROR" | "ACC_FILTER_NO_CTD" | "ACC_FILTER_PW_ACCOUNTS" | "ACC_FILTER_DFY" | "ACC_FILTER_DFY_SETUP_PENDING" | "ACC_FILTER_W_ACTIVE" | "ACC_FILTER_W_PAUSED" | "ACC_FILTER_W_ERROR" | null | null;
  } | null;
  "search"?: string;
}
export interface EnableWarmupForAccountsResponses {
  "200": Models.BackgroundJob
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type EnableWarmupForAccountsSuccessResponse = EnableWarmupForAccountsResponses["200"]
export interface EnableWarmupForAccountsInput {
  path?: EnableWarmupForAccountsPathParams
  query?: EnableWarmupForAccountsQueryParams
  body?: EnableWarmupForAccountsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetAccountPathParams = {
  "email": string;
}
export type GetAccountQueryParams = EmptyObject
export type GetAccountRequestBody = undefined
export interface GetAccountResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetAccountSuccessResponse = GetAccountResponses["200"]
export interface GetAccountInput {
  path: GetAccountPathParams
  query?: GetAccountQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchAccountPathParams = {
  "email": string;
}
export type PatchAccountQueryParams = EmptyObject
export type PatchAccountRequestBody = {
  "first_name"?: string;
  "last_name"?: string;
  "warmup"?: {
    "limit"?: number;
    "advanced"?: {
      "warm_ctd"?: boolean;
      "open_rate"?: number;
      "important_rate"?: number;
      "read_emulation"?: boolean;
      "spam_save_rate"?: number;
      "weekday_only"?: boolean;
    };
    "warmup_custom_ftag"?: string;
    "increment"?: "disabled" | "0" | "1" | "2" | "3" | "4";
    "reply_rate"?: number;
  };
  "daily_limit"?: number | null;
  "tracking_domain_name"?: string | null;
  "tracking_domain_status"?: string | null;
  "enable_slow_ramp"?: boolean | null;
  "inbox_placement_test_limit"?: number | null;
  "sending_gap"?: number;
  "signature"?: string | null;
  "reply_to"?: string | null;
  "skip_cname_check"?: boolean;
  "remove_tracking_domain"?: boolean;
}
export interface PatchAccountResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchAccountSuccessResponse = PatchAccountResponses["200"]
export interface PatchAccountInput {
  path: PatchAccountPathParams
  query?: PatchAccountQueryParams
  body?: PatchAccountRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteAccountPathParams = {
  "email": string;
}
export type DeleteAccountQueryParams = EmptyObject
export type DeleteAccountRequestBody = null
export interface DeleteAccountResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteAccountSuccessResponse = DeleteAccountResponses["200"]
export interface DeleteAccountInput {
  path: DeleteAccountPathParams
  query?: DeleteAccountQueryParams
  body?: DeleteAccountRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MarkAccountFixedPathParams = {
  "email": string;
}
export type MarkAccountFixedQueryParams = EmptyObject
export type MarkAccountFixedRequestBody = undefined
export interface MarkAccountFixedResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MarkAccountFixedSuccessResponse = MarkAccountFixedResponses["200"]
export interface MarkAccountFixedInput {
  path: MarkAccountFixedPathParams
  query?: MarkAccountFixedQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PauseAccountPathParams = {
  "email": string;
}
export type PauseAccountQueryParams = EmptyObject
export type PauseAccountRequestBody = undefined
export interface PauseAccountResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PauseAccountSuccessResponse = PauseAccountResponses["200"]
export interface PauseAccountInput {
  path: PauseAccountPathParams
  query?: PauseAccountQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ResumeAccountPathParams = {
  "email": string;
}
export type ResumeAccountQueryParams = EmptyObject
export type ResumeAccountRequestBody = undefined
export interface ResumeAccountResponses {
  "200": Models.Account
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ResumeAccountSuccessResponse = ResumeAccountResponses["200"]
export interface ResumeAccountInput {
  path: ResumeAccountPathParams
  query?: ResumeAccountQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListAPIKeyPathParams = EmptyObject
export type ListAPIKeyQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
}
export type ListAPIKeyRequestBody = undefined
export interface ListAPIKeyResponses {
  "200": {
  "items": Models.APIKey[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListAPIKeySuccessResponse = ListAPIKeyResponses["200"]
export interface ListAPIKeyInput {
  path?: ListAPIKeyPathParams
  query?: ListAPIKeyQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateAPIKeyPathParams = EmptyObject
export type CreateAPIKeyQueryParams = EmptyObject
export type CreateAPIKeyRequestBody = {
  "name": string;
  "scopes": ("all:all" | "all:create" | "all:read" | "all:update" | "all:delete" | "ai_agents:all" | "ai_agents:create" | "ai_agents:read" | "ai_agents:update" | "ai_agents:delete" | "api_keys:all" | "api_keys:create" | "api_keys:read" | "api_keys:update" | "api_keys:delete" | "audit_logs:all" | "audit_logs:create" | "audit_logs:read" | "audit_logs:update" | "audit_logs:delete" | "custom_prompt_templates:all" | "custom_prompt_templates:create" | "custom_prompt_templates:read" | "custom_prompt_templates:update" | "custom_prompt_templates:delete" | "account_campaign_mappings:all" | "account_campaign_mappings:create" | "account_campaign_mappings:read" | "account_campaign_mappings:update" | "account_campaign_mappings:delete" | "campaigns:all" | "campaigns:create" | "campaigns:read" | "campaigns:update" | "campaigns:delete" | "inbox_placement_tests:all" | "inbox_placement_tests:create" | "inbox_placement_tests:read" | "inbox_placement_tests:update" | "inbox_placement_tests:delete" | "inbox_placement_analytics:all" | "inbox_placement_analytics:create" | "inbox_placement_analytics:read" | "inbox_placement_analytics:update" | "inbox_placement_analytics:delete" | "inbox_placement_reports:all" | "inbox_placement_reports:create" | "inbox_placement_reports:read" | "inbox_placement_reports:update" | "inbox_placement_reports:delete" | "lead_lists:all" | "lead_lists:create" | "lead_lists:read" | "lead_lists:update" | "lead_lists:delete" | "leads:all" | "leads:create" | "leads:read" | "leads:update" | "leads:delete" | "background-jobs:all" | "background-jobs:create" | "background-jobs:read" | "background-jobs:update" | "background-jobs:delete" | "custom_tags:all" | "custom_tags:create" | "custom_tags:read" | "custom_tags:update" | "custom_tags:delete" | "custom_tag_mappings:all" | "custom_tag_mappings:create" | "custom_tag_mappings:read" | "custom_tag_mappings:update" | "custom_tag_mappings:delete" | "crm_actions:all" | "crm_actions:create" | "crm_actions:read" | "crm_actions:update" | "crm_actions:delete" | "accounts:all" | "accounts:create" | "accounts:read" | "accounts:update" | "accounts:delete" | "block_list_entries:all" | "block_list_entries:create" | "block_list_entries:read" | "block_list_entries:update" | "block_list_entries:delete" | "lead-labels:all" | "lead-labels:create" | "lead-labels:read" | "lead-labels:update" | "lead-labels:delete" | "email_verifications:all" | "email_verifications:create" | "email_verifications:read" | "emails:all" | "emails:create" | "emails:read" | "emails:update" | "emails:delete" | "email_templates:all" | "email_templates:create" | "email_templates:read" | "email_templates:update" | "email_templates:delete" | "workspaces:all" | "workspaces:create" | "workspaces:read" | "workspaces:update" | "workspaces:delete" | "workspace_billing:all" | "workspace_billing:create" | "workspace_billing:read" | "workspace_billing:update" | "workspace_billing:delete" | "workspace_group_members:all" | "workspace_group_members:create" | "workspace_group_members:read" | "workspace_group_members:update" | "workspace_group_members:delete" | "workspace_members:all" | "workspace_members:create" | "workspace_members:read" | "workspace_members:update" | "workspace_members:delete" | "subsequences:all" | "subsequences:create" | "subsequences:read" | "subsequences:update" | "subsequences:delete" | "ai_sdr:all" | "ai_sdr:create" | "ai_sdr:read" | "ai_sdr:update" | "ai_sdr:delete" | "ai_sdr_replies:all" | "ai_sdr_replies:create" | "ai_sdr_replies:read" | "ai_sdr_replies:update" | "ai_sdr_replies:delete" | "ai_inbox_manager_analytics:all" | "ai_inbox_manager_analytics:create" | "ai_inbox_manager_analytics:read" | "ai_inbox_manager_analytics:update" | "ai_inbox_manager_analytics:delete" | "sales_flows:all" | "sales_flows:create" | "sales_flows:read" | "sales_flows:update" | "sales_flows:delete" | "webhooks:all" | "webhooks:create" | "webhooks:read" | "webhooks:update" | "webhooks:delete" | "webhook_events:all" | "webhook_events:create" | "webhook_events:read" | "webhook_events:update" | "webhook_events:delete" | "security_tokens:all" | "security_tokens:create" | "security_tokens:read" | "security_tokens:update" | "security_tokens:delete" | "dfy_email_account_orders:all" | "dfy_email_account_orders:create" | "dfy_email_account_orders:read" | "dfy_email_account_orders:update" | "dfy_email_account_orders:delete" | "auth:all" | "auth:create" | "auth:read" | "auth:update" | "auth:delete")[];
}
export interface CreateAPIKeyResponses {
  "200": Models.APIKey
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateAPIKeySuccessResponse = CreateAPIKeyResponses["200"]
export interface CreateAPIKeyInput {
  path?: CreateAPIKeyPathParams
  query?: CreateAPIKeyQueryParams
  body: CreateAPIKeyRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteAPIKeyPathParams = {
  "id": string;
}
export type DeleteAPIKeyQueryParams = EmptyObject
export type DeleteAPIKeyRequestBody = null
export interface DeleteAPIKeyResponses {
  "200": Models.APIKey
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteAPIKeySuccessResponse = DeleteAPIKeyResponses["200"]
export interface DeleteAPIKeyInput {
  path: DeleteAPIKeyPathParams
  query?: DeleteAPIKeyQueryParams
  body?: DeleteAPIKeyRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListAuditLogPathParams = EmptyObject
export type ListAuditLogQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "activity_type"?: number;
  "search"?: string;
  "start_date"?: string;
  "end_date"?: string;
}
export type ListAuditLogRequestBody = undefined
export interface ListAuditLogResponses {
  "200": {
  "items": Models.AuditLog[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListAuditLogSuccessResponse = ListAuditLogResponses["200"]
export interface ListAuditLogInput {
  path?: ListAuditLogPathParams
  query?: ListAuditLogQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListBackgroundJobPathParams = EmptyObject
export type ListBackgroundJobQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "ids"?: string;
  "included_ids"?: string;
  "excluded_ids"?: string;
  "type"?: "move-leads" | "import-leads" | "export-leads" | "update-warmup-accounts" | "rename-variable" | "broadcast-ai-generate" | "broadcast-website-scrape" | "import-subscribers-from-crm" | "resync-subscriber-crm-tags";
  "entity_type"?: "list" | "campaign" | "workspace" | "broadcast" | "subscriber-group-sync" | "subscriber-group";
  "entity_id"?: string;
  "status"?: string;
  "sort_column"?: "created_at" | "updated_at";
  "sort_order"?: "asc" | "desc";
}
export type ListBackgroundJobRequestBody = undefined
export interface ListBackgroundJobResponses {
  "200": {
  "items": Models.BackgroundJob[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListBackgroundJobSuccessResponse = ListBackgroundJobResponses["200"]
export interface ListBackgroundJobInput {
  path?: ListBackgroundJobPathParams
  query?: ListBackgroundJobQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetBackgroundJobPathParams = {
  "id": string;
}
export type GetBackgroundJobQueryParams = {
  "data_fields"?: string;
}
export type GetBackgroundJobRequestBody = undefined
export interface GetBackgroundJobResponses {
  "200": Models.BackgroundJob
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetBackgroundJobSuccessResponse = GetBackgroundJobResponses["200"]
export interface GetBackgroundJobInput {
  path: GetBackgroundJobPathParams
  query?: GetBackgroundJobQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListBlockListEntryPathParams = EmptyObject
export type ListBlockListEntryQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "domains_only"?: boolean;
  "search"?: string;
}
export type ListBlockListEntryRequestBody = undefined
export interface ListBlockListEntryResponses {
  "200": {
  "items": Models.BlockListEntry[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListBlockListEntrySuccessResponse = ListBlockListEntryResponses["200"]
export interface ListBlockListEntryInput {
  path?: ListBlockListEntryPathParams
  query?: ListBlockListEntryQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateBlockListEntryPathParams = EmptyObject
export type CreateBlockListEntryQueryParams = EmptyObject
export type CreateBlockListEntryRequestBody = {
  "bl_value": string;
}
export interface CreateBlockListEntryResponses {
  "200": Models.BlockListEntry
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateBlockListEntrySuccessResponse = CreateBlockListEntryResponses["200"]
export interface CreateBlockListEntryInput {
  path?: CreateBlockListEntryPathParams
  query?: CreateBlockListEntryQueryParams
  body: CreateBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteallBlockListEntryPathParams = EmptyObject
export type DeleteallBlockListEntryQueryParams = {
  "domains_only"?: boolean;
  "search"?: string;
}
export type DeleteallBlockListEntryRequestBody = null
export interface DeleteallBlockListEntryResponses {
  "200": Models.BlockListEntry[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteallBlockListEntrySuccessResponse = DeleteallBlockListEntryResponses["200"]
export interface DeleteallBlockListEntryInput {
  path?: DeleteallBlockListEntryPathParams
  query?: DeleteallBlockListEntryQueryParams
  body?: DeleteallBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateblukBlockListEntryPathParams = EmptyObject
export type CreateblukBlockListEntryQueryParams = EmptyObject
export type CreateblukBlockListEntryRequestBody = {
  "bl_values": string[];
}
export interface CreateblukBlockListEntryResponses {
  "200": {
  "items": Models.BlockListEntry[];
  "valid_count": number;
  "invalid_count": number;
}
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateblukBlockListEntrySuccessResponse = CreateblukBlockListEntryResponses["200"]
export interface CreateblukBlockListEntryInput {
  path?: CreateblukBlockListEntryPathParams
  query?: CreateblukBlockListEntryQueryParams
  body: CreateblukBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeletebulkBlockListEntryPathParams = EmptyObject
export type DeletebulkBlockListEntryQueryParams = EmptyObject
export type DeletebulkBlockListEntryRequestBody = {
  "ids": string[];
}
export interface DeletebulkBlockListEntryResponses {
  "200": Models.BlockListEntry[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeletebulkBlockListEntrySuccessResponse = DeletebulkBlockListEntryResponses["200"]
export interface DeletebulkBlockListEntryInput {
  path?: DeletebulkBlockListEntryPathParams
  query?: DeletebulkBlockListEntryQueryParams
  body: DeletebulkBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DownloadBlockListEntryPathParams = EmptyObject
export type DownloadBlockListEntryQueryParams = {
  "domains_only"?: boolean;
  "search"?: string;
}
export type DownloadBlockListEntryRequestBody = undefined
export interface DownloadBlockListEntryResponses {
  "200": string
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DownloadBlockListEntrySuccessResponse = DownloadBlockListEntryResponses["200"]
export interface DownloadBlockListEntryInput {
  path?: DownloadBlockListEntryPathParams
  query?: DownloadBlockListEntryQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetBlockListEntryPathParams = {
  "id": string;
}
export type GetBlockListEntryQueryParams = EmptyObject
export type GetBlockListEntryRequestBody = undefined
export interface GetBlockListEntryResponses {
  "200": Models.BlockListEntry
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetBlockListEntrySuccessResponse = GetBlockListEntryResponses["200"]
export interface GetBlockListEntryInput {
  path: GetBlockListEntryPathParams
  query?: GetBlockListEntryQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchBlockListEntryPathParams = {
  "id": string;
}
export type PatchBlockListEntryQueryParams = EmptyObject
export type PatchBlockListEntryRequestBody = {
  "bl_value"?: string;
}
export interface PatchBlockListEntryResponses {
  "200": Models.BlockListEntry
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchBlockListEntrySuccessResponse = PatchBlockListEntryResponses["200"]
export interface PatchBlockListEntryInput {
  path: PatchBlockListEntryPathParams
  query?: PatchBlockListEntryQueryParams
  body?: PatchBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteBlockListEntryPathParams = {
  "id": string;
}
export type DeleteBlockListEntryQueryParams = EmptyObject
export type DeleteBlockListEntryRequestBody = null
export interface DeleteBlockListEntryResponses {
  "200": Models.BlockListEntry
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteBlockListEntrySuccessResponse = DeleteBlockListEntryResponses["200"]
export interface DeleteBlockListEntryInput {
  path: DeleteBlockListEntryPathParams
  query?: DeleteBlockListEntryQueryParams
  body?: DeleteBlockListEntryRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListCampaignPathParams = EmptyObject
export type ListCampaignQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "tag_ids"?: string;
  "ai_sales_agent_id"?: string;
  "status"?: -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
}
export type ListCampaignRequestBody = undefined
export interface ListCampaignResponses {
  "200": {
  "items": Models.Campaign[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListCampaignSuccessResponse = ListCampaignResponses["200"]
export interface ListCampaignInput {
  path?: ListCampaignPathParams
  query?: ListCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateCampaignPathParams = EmptyObject
export type CreateCampaignQueryParams = EmptyObject
export type CreateCampaignRequestBody = {
  "name": string;
  "pl_value"?: number | null;
  "is_evergreen"?: boolean | null;
  "campaign_schedule": {
    "start_date"?: string | null;
    "end_date"?: string | null;
    "schedules": {
      "name": string;
      "timing": {
        "from": string;
        "to": string;
      };
      "days": {
        "0"?: boolean;
        "1"?: boolean;
        "2"?: boolean;
        "3"?: boolean;
        "4"?: boolean;
        "5"?: boolean;
        "6"?: boolean;
      };
      "timezone": "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
    }[];
  };
  "sequences"?: {
    "steps": {
      "type": "email";
      "delay": number;
      "delay_unit"?: "minutes" | "hours" | "days";
      "pre_delay"?: number;
      "pre_delay_unit"?: "minutes" | "hours" | "days";
      "variants": {
        "subject": string;
        "body": string;
        "v_disabled"?: boolean;
      }[];
    }[];
  }[];
  "email_gap"?: number | null;
  "random_wait_max"?: number | null;
  "text_only"?: boolean | null;
  "first_email_text_only"?: boolean | null;
  "email_list"?: string[];
  "daily_limit"?: number | null;
  "stop_on_reply"?: boolean | null;
  "email_tag_list"?: string[];
  "link_tracking"?: boolean | null;
  "open_tracking"?: boolean;
  "stop_on_auto_reply"?: boolean | null;
  "daily_max_leads"?: number | null;
  "prioritize_new_leads"?: boolean | null;
  "auto_variant_select"?: {
    "trigger": "reply_rate" | "click_rate" | "open_rate";
  } | null;
  "match_lead_esp"?: boolean | null;
  "stop_for_company"?: boolean | null;
  "insert_unsubscribe_header"?: boolean | null;
  "allow_risky_contacts"?: boolean | null;
  "disable_bounce_protect"?: boolean | null;
  "limit_emails_per_company_override"?: {
    "mode": "custom" | "disabled";
    "daily_limit"?: number;
    "scope"?: "per_campaign" | "across_workspace";
  } | null;
  "cc_list"?: string[];
  "bcc_list"?: string[];
  "owned_by"?: string | null;
  "ai_sdr_id"?: string | null;
  "provider_routing_rules"?: {
    "action"?: "send" | "do_not_send";
    "recipient_esp"?: ("all" | "google" | "outlook" | "other")[];
    "sender_esp"?: ("all" | "google" | "outlook" | "other")[];
  }[];
}
export interface CreateCampaignResponses {
  "200": Models.Campaign
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateCampaignSuccessResponse = CreateCampaignResponses["200"]
export interface CreateCampaignInput {
  path?: CreateCampaignPathParams
  query?: CreateCampaignQueryParams
  body: CreateCampaignRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignAnalyticsPathParams = EmptyObject
export type GetCampaignAnalyticsQueryParams = {
  "id"?: string;
  "ids"?: string[];
  "start_date"?: string;
  "end_date"?: string;
  "exclude_total_leads_count"?: boolean;
}
export type GetCampaignAnalyticsRequestBody = undefined
export interface GetCampaignAnalyticsResponses {
  "200": {
  "campaign_name": string;
  "campaign_id": string;
  "campaign_status": number;
  "campaign_is_evergreen": boolean;
  "leads_count": number;
  "contacted_count": number;
  "emails_sent_count": number;
  "new_leads_contacted_count": number;
  "open_count": number;
  "open_count_unique"?: number;
  "open_count_unique_by_step"?: number;
  "reply_count": number;
  "reply_count_unique"?: number;
  "reply_count_unique_by_step"?: number;
  "reply_count_automatic"?: number;
  "reply_count_automatic_unique"?: number;
  "reply_count_automatic_unique_by_step"?: number;
  "link_click_count": number;
  "link_click_count_unique"?: number;
  "link_click_count_unique_by_step"?: number;
  "bounced_count": number;
  "unsubscribed_count": number;
  "completed_count": number;
  "total_opportunities": number;
  "total_opportunity_value": number;
}[]
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignAnalyticsSuccessResponse = GetCampaignAnalyticsResponses["200"]
export interface GetCampaignAnalyticsInput {
  path?: GetCampaignAnalyticsPathParams
  query?: GetCampaignAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetDailyCampaignAnalyticsPathParams = EmptyObject
export type GetDailyCampaignAnalyticsQueryParams = {
  "campaign_id"?: string;
  "start_date"?: string;
  "end_date"?: string;
  "campaign_status"?: -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
}
export type GetDailyCampaignAnalyticsRequestBody = undefined
export interface GetDailyCampaignAnalyticsResponses {
  "200": {
  "date"?: string;
  "sent"?: number;
  "contacted"?: number;
  "new_leads_contacted"?: number;
  "opened"?: number;
  "unique_opened"?: number;
  "replies"?: number;
  "unique_replies"?: number;
  "replies_automatic"?: number;
  "unique_replies_automatic"?: number;
  "clicks"?: number;
  "unique_clicks"?: number;
  "opportunities"?: number;
  "unique_opportunities"?: number;
}[]
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetDailyCampaignAnalyticsSuccessResponse = GetDailyCampaignAnalyticsResponses["200"]
export interface GetDailyCampaignAnalyticsInput {
  path?: GetDailyCampaignAnalyticsPathParams
  query?: GetDailyCampaignAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignAnalyticsOverviewPathParams = EmptyObject
export type GetCampaignAnalyticsOverviewQueryParams = {
  "id"?: string;
  "ids"?: string[];
  "start_date"?: string;
  "end_date"?: string;
  "campaign_status"?: -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
  "expand_crm_events"?: boolean;
}
export type GetCampaignAnalyticsOverviewRequestBody = undefined
export interface GetCampaignAnalyticsOverviewResponses {
  "200": {
  "open_count"?: number;
  "open_count_unique"?: number;
  "open_count_unique_by_step"?: number;
  "link_click_count"?: number;
  "link_click_count_unique"?: number;
  "link_click_count_unique_by_step"?: number;
  "reply_count"?: number;
  "reply_count_unique"?: number;
  "reply_count_unique_by_step"?: number;
  "reply_count_automatic"?: number;
  "reply_count_automatic_unique"?: number;
  "reply_count_automatic_unique_by_step"?: number;
  "bounced_count"?: number;
  "unsubscribed_count"?: number;
  "completed_count"?: number;
  "emails_sent_count"?: number;
  "contacted_count"?: number;
  "new_leads_contacted_count"?: number;
  "total_opportunities"?: number;
  "total_opportunity_value"?: number;
  "total_interested"?: number;
  "total_meeting_booked"?: number;
  "total_meeting_completed"?: number;
  "total_closed"?: number;
}
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignAnalyticsOverviewSuccessResponse = GetCampaignAnalyticsOverviewResponses["200"]
export interface GetCampaignAnalyticsOverviewInput {
  path?: GetCampaignAnalyticsOverviewPathParams
  query?: GetCampaignAnalyticsOverviewQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignStepsAnalyticsPathParams = EmptyObject
export type GetCampaignStepsAnalyticsQueryParams = {
  "campaign_id"?: string;
  "start_date"?: string;
  "end_date"?: string;
  "include_opportunities_count"?: boolean;
}
export type GetCampaignStepsAnalyticsRequestBody = undefined
export interface GetCampaignStepsAnalyticsResponses {
  "200": {
  "step": null | string;
  "variant": null | string;
  "sent": number;
  "opened": number;
  "unique_opened": number;
  "replies": number;
  "unique_replies": number;
  "replies_automatic": number;
  "unique_replies_automatic": number;
  "clicks": number;
  "unique_clicks": number;
  "opportunities"?: number;
  "unique_opportunities"?: number;
}[]
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignStepsAnalyticsSuccessResponse = GetCampaignStepsAnalyticsResponses["200"]
export interface GetCampaignStepsAnalyticsInput {
  path?: GetCampaignStepsAnalyticsPathParams
  query?: GetCampaignStepsAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CountLaunchedPathParams = EmptyObject
export type CountLaunchedQueryParams = EmptyObject
export type CountLaunchedRequestBody = undefined
export interface CountLaunchedResponses {
  "200": {
  "count": number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CountLaunchedSuccessResponse = CountLaunchedResponses["200"]
export interface CountLaunchedInput {
  path?: CountLaunchedPathParams
  query?: CountLaunchedQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type SearchByContactPathParams = EmptyObject
export type SearchByContactQueryParams = {
  "search"?: string;
  "sort_column"?: string;
  "sort_order"?: string;
}
export type SearchByContactRequestBody = undefined
export interface SearchByContactResponses {
  "200": {
  "items"?: Models.Campaign[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type SearchByContactSuccessResponse = SearchByContactResponses["200"]
export interface SearchByContactInput {
  path?: SearchByContactPathParams
  query?: SearchByContactQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignPathParams = {
  "id": string;
}
export type GetCampaignQueryParams = EmptyObject
export type GetCampaignRequestBody = undefined
export interface GetCampaignResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignSuccessResponse = GetCampaignResponses["200"]
export interface GetCampaignInput {
  path: GetCampaignPathParams
  query?: GetCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchCampaignPathParams = {
  "id": string;
}
export type PatchCampaignQueryParams = EmptyObject
export type PatchCampaignRequestBody = {
  "name"?: string;
  "pl_value"?: number | null;
  "is_evergreen"?: boolean | null;
  "campaign_schedule"?: {
    "start_date"?: string | null;
    "end_date"?: string | null;
    "schedules": {
      "name": string;
      "timing": {
        "from": string;
        "to": string;
      };
      "days": {
        "0"?: boolean;
        "1"?: boolean;
        "2"?: boolean;
        "3"?: boolean;
        "4"?: boolean;
        "5"?: boolean;
        "6"?: boolean;
      };
      "timezone": "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
    }[];
  };
  "sequences"?: {
    "steps": {
      "type": "email";
      "delay": number;
      "delay_unit"?: "minutes" | "hours" | "days";
      "pre_delay"?: number;
      "pre_delay_unit"?: "minutes" | "hours" | "days";
      "variants": {
        "subject": string;
        "body": string;
        "v_disabled"?: boolean;
      }[];
    }[];
  }[];
  "email_gap"?: number | null;
  "random_wait_max"?: number | null;
  "text_only"?: boolean | null;
  "first_email_text_only"?: boolean | null;
  "email_list"?: string[];
  "daily_limit"?: number | null;
  "stop_on_reply"?: boolean | null;
  "email_tag_list"?: string[];
  "link_tracking"?: boolean | null;
  "open_tracking"?: boolean;
  "stop_on_auto_reply"?: boolean | null;
  "daily_max_leads"?: number | null;
  "prioritize_new_leads"?: boolean | null;
  "auto_variant_select"?: {
    "trigger": "reply_rate" | "click_rate" | "open_rate";
  } | null;
  "match_lead_esp"?: boolean | null;
  "stop_for_company"?: boolean | null;
  "insert_unsubscribe_header"?: boolean | null;
  "allow_risky_contacts"?: boolean | null;
  "disable_bounce_protect"?: boolean | null;
  "limit_emails_per_company_override"?: {
    "mode": "custom" | "disabled";
    "daily_limit"?: number;
    "scope"?: "per_campaign" | "across_workspace";
  } | null;
  "cc_list"?: string[];
  "bcc_list"?: string[];
  "owned_by"?: string | null;
  "provider_routing_rules"?: {
    "action"?: "send" | "do_not_send";
    "recipient_esp"?: ("all" | "google" | "outlook" | "other")[];
    "sender_esp"?: ("all" | "google" | "outlook" | "other")[];
  }[];
}
export interface PatchCampaignResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchCampaignSuccessResponse = PatchCampaignResponses["200"]
export interface PatchCampaignInput {
  path: PatchCampaignPathParams
  query?: PatchCampaignQueryParams
  body?: PatchCampaignRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteCampaignPathParams = {
  "id": string;
}
export type DeleteCampaignQueryParams = EmptyObject
export type DeleteCampaignRequestBody = null
export interface DeleteCampaignResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteCampaignSuccessResponse = DeleteCampaignResponses["200"]
export interface DeleteCampaignInput {
  path: DeleteCampaignPathParams
  query?: DeleteCampaignQueryParams
  body?: DeleteCampaignRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ActivateCampaignPathParams = {
  "id": string;
}
export type ActivateCampaignQueryParams = EmptyObject
export type ActivateCampaignRequestBody = undefined
export interface ActivateCampaignResponses {
  "200": Models.Campaign
  "400": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ActivateCampaignSuccessResponse = ActivateCampaignResponses["200"]
export interface ActivateCampaignInput {
  path: ActivateCampaignPathParams
  query?: ActivateCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DuplicatePathParams = {
  "id": string;
}
export type DuplicateQueryParams = EmptyObject
export type DuplicateRequestBody = {
  "name"?: string;
}
export interface DuplicateResponses {
  "200": Models.Campaign
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DuplicateSuccessResponse = DuplicateResponses["200"]
export interface DuplicateInput {
  path: DuplicatePathParams
  query?: DuplicateQueryParams
  body?: DuplicateRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ExportCampaignPathParams = {
  "id": string;
}
export type ExportCampaignQueryParams = EmptyObject
export type ExportCampaignRequestBody = undefined
export interface ExportCampaignResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ExportCampaignSuccessResponse = ExportCampaignResponses["200"]
export interface ExportCampaignInput {
  path: ExportCampaignPathParams
  query?: ExportCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateFromExportPathParams = {
  "id": string;
}
export type CreateFromExportQueryParams = EmptyObject
export type CreateFromExportRequestBody = undefined
export interface CreateFromExportResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "403": {
  "message"?: string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateFromExportSuccessResponse = CreateFromExportResponses["200"]
export interface CreateFromExportInput {
  path: CreateFromExportPathParams
  query?: CreateFromExportQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PauseCampaignPathParams = {
  "id": string;
}
export type PauseCampaignQueryParams = EmptyObject
export type PauseCampaignRequestBody = undefined
export interface PauseCampaignResponses {
  "200": Models.Campaign
  "400": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PauseCampaignSuccessResponse = PauseCampaignResponses["200"]
export interface PauseCampaignInput {
  path: PauseCampaignPathParams
  query?: PauseCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignSendingStatusPathParams = {
  "id": string;
}
export type GetCampaignSendingStatusQueryParams = {
  "with_ai_summary"?: boolean;
}
export type GetCampaignSendingStatusRequestBody = undefined
export interface GetCampaignSendingStatusResponses {
  "200": {
  "diagnostics"?: null | {
    "campaign_id"?: string;
    "subsequence_id"?: string;
    "last_updated"?: string;
    "status"?: "campaign_paused" | "campaign_draft" | "campaign_completed" | "campaign_running_subsequences" | "campaign_bounce_protect" | "campaign_accounts_unhealthy" | "campaign_account_suspended" | "out_of_schedule" | "waiting_for_leads" | "daily_limit_met" | "account_daily_limit_met" | "new_lead_limit_met" | "all_accounts_unhealthy" | "waiting_for_esp_match" | "domain_limit_reached" | "follow_up_delay_not_met" | "no_accounts_available" | "healthy" | null;
    "issue_tracking"?: {
      "current_status_code"?: null | string;
      "issue_first_seen_at"?: null | string;
      "consecutive_loops_with_issue"?: number;
      "last_healthy_send_at"?: null | string;
    };
    "accounts_summary"?: {
      "total_connected"?: number;
      "available"?: number;
      "unavailable"?: {
        "daily_limit_hit"?: number;
        "slow_ramp_limit_hit"?: number;
        "disconnected"?: number;
        "global_gap_not_met"?: number;
      };
    };
    "campaign_daily_limit"?: {
      "limit"?: number;
      "sent"?: number;
      "limit_hit"?: boolean;
    };
    "new_lead_limit"?: {
      "enabled"?: boolean;
      "limit"?: null | number;
      "contacted"?: number;
      "limit_hit"?: boolean;
    };
    "schedule_status"?: {
      "in_schedule"?: boolean;
    };
    "send_one_by_one"?: {
      "enabled"?: boolean;
      "single_account_per_wait_gap"?: boolean;
    };
    "follow_ups_waiting"?: {
      "count"?: number;
      "earliest_wait_time_seconds"?: null | number;
    };
    "esp_routing_status"?: {
      "enabled"?: boolean;
      "waiting_for_match"?: boolean;
      "connected_esps"?: number[];
    };
    "domain_limiter"?: {
      "active"?: boolean;
      "domains_at_limit"?: number;
    };
    "leads_status"?: {
      "no_leads_ready"?: boolean;
      "account_unavailable_skips"?: number;
      "delay_not_met_skips"?: number;
    };
    [key: string]: unknown;
  };
  "summary"?: null | {
    "status"?: null | string;
    "status_message"?: null | string;
    "issue_started_at"?: null | string;
    "last_healthy_send_at"?: null | string;
    "ai_summary"?: null | string;
    [key: string]: unknown;
  };
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignSendingStatusSuccessResponse = GetCampaignSendingStatusResponses["200"]
export interface GetCampaignSendingStatusInput {
  path: GetCampaignSendingStatusPathParams
  query?: GetCampaignSendingStatusQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ShareCampaignPathParams = {
  "id": string;
}
export type ShareCampaignQueryParams = EmptyObject
export type ShareCampaignRequestBody = undefined
export interface ShareCampaignResponses {
  "204": unknown
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ShareCampaignSuccessResponse = ShareCampaignResponses["204"]
export interface ShareCampaignInput {
  path: ShareCampaignPathParams
  query?: ShareCampaignQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type AddVariablesPathParams = {
  "id": string;
}
export type AddVariablesQueryParams = EmptyObject
export type AddVariablesRequestBody = {
  "variables"?: string[];
}
export interface AddVariablesResponses {
  "200": Models.Campaign
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type AddVariablesSuccessResponse = AddVariablesResponses["200"]
export interface AddVariablesInput {
  path: AddVariablesPathParams
  query?: AddVariablesQueryParams
  body?: AddVariablesRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListPhoneNumbersPathParams = EmptyObject
export type ListPhoneNumbersQueryParams = EmptyObject
export type ListPhoneNumbersRequestBody = undefined
export interface ListPhoneNumbersResponses {
  "200": {
  "id"?: string;
  "timestamp_created"?: string;
  "organization_id"?: string;
  "phone_number"?: string;
  "country"?: string;
  "locality"?: string;
  "subscription_id"?: string;
  "twilio_sid"?: string;
  "renewal_date"?: string;
  "price"?: number;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListPhoneNumbersSuccessResponse = ListPhoneNumbersResponses["200"]
export interface ListPhoneNumbersInput {
  path?: ListPhoneNumbersPathParams
  query?: ListPhoneNumbersQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeletePhoneNumberPathParams = {
  "id": string;
}
export type DeletePhoneNumberQueryParams = EmptyObject
export type DeletePhoneNumberRequestBody = undefined
export interface DeletePhoneNumberResponses {
  "200": {
  "id"?: string;
  "timestamp_created"?: string;
  "organization_id"?: string;
  "phone_number"?: string;
  "country"?: string;
  "locality"?: string;
  "subscription_id"?: string;
  "twilio_sid"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeletePhoneNumberSuccessResponse = DeletePhoneNumberResponses["200"]
export interface DeletePhoneNumberInput {
  path: DeletePhoneNumberPathParams
  query?: DeletePhoneNumberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListCustomTagMappingPathParams = EmptyObject
export type ListCustomTagMappingQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "resource_ids"?: string;
}
export type ListCustomTagMappingRequestBody = undefined
export interface ListCustomTagMappingResponses {
  "200": {
  "items": Models.CustomTagMapping[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListCustomTagMappingSuccessResponse = ListCustomTagMappingResponses["200"]
export interface ListCustomTagMappingInput {
  path?: ListCustomTagMappingPathParams
  query?: ListCustomTagMappingQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListCustomTagPathParams = EmptyObject
export type ListCustomTagQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "resource_ids"?: string;
  "tag_ids"?: string;
}
export type ListCustomTagRequestBody = undefined
export interface ListCustomTagResponses {
  "200": {
  "items": Models.CustomTag[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListCustomTagSuccessResponse = ListCustomTagResponses["200"]
export interface ListCustomTagInput {
  path?: ListCustomTagPathParams
  query?: ListCustomTagQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateCustomTagPathParams = EmptyObject
export type CreateCustomTagQueryParams = EmptyObject
export type CreateCustomTagRequestBody = {
  "label": string;
  "description"?: string | null;
}
export interface CreateCustomTagResponses {
  "200": Models.CustomTag
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateCustomTagSuccessResponse = CreateCustomTagResponses["200"]
export interface CreateCustomTagInput {
  path?: CreateCustomTagPathParams
  query?: CreateCustomTagQueryParams
  body: CreateCustomTagRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ToggleTagResourcePathParams = EmptyObject
export type ToggleTagResourceQueryParams = EmptyObject
export type ToggleTagResourceRequestBody = {
  "tag_ids": string[];
  "resource_type": 1 | 2;
  "resource_ids"?: string[];
  "excluded_resource_ids"?: string[];
  "assign": boolean;
  "selected_all"?: boolean;
  "filter"?: "ACC_FILTER_PAUSED" | "ACC_FILTER_ERROR" | "ACC_FILTER_NO_CTD" | "ACC_FILTER_PW_ACCOUNTS" | "ACC_FILTER_DFY" | "ACC_FILTER_DFY_SETUP_PENDING" | "ACC_FILTER_W_ACTIVE" | "ACC_FILTER_W_PAUSED" | "ACC_FILTER_W_ERROR" | null | null | {
    "tag_id"?: string | "no-tag";
    "tag_ids"?: string[];
    "tag_ids_all"?: string[];
    "filter"?: "ACC_FILTER_PAUSED" | "ACC_FILTER_ERROR" | "ACC_FILTER_NO_CTD" | "ACC_FILTER_PW_ACCOUNTS" | "ACC_FILTER_DFY" | "ACC_FILTER_DFY_SETUP_PENDING" | "ACC_FILTER_W_ACTIVE" | "ACC_FILTER_W_PAUSED" | "ACC_FILTER_W_ERROR" | null | null;
    "search"?: string;
  };
  "search"?: string;
}
export interface ToggleTagResourceResponses {
  "200": {
  "success"?: boolean;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ToggleTagResourceSuccessResponse = ToggleTagResourceResponses["200"]
export interface ToggleTagResourceInput {
  path?: ToggleTagResourcePathParams
  query?: ToggleTagResourceQueryParams
  body: ToggleTagResourceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCustomTagPathParams = {
  "id": string;
}
export type GetCustomTagQueryParams = EmptyObject
export type GetCustomTagRequestBody = undefined
export interface GetCustomTagResponses {
  "200": Models.CustomTag
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCustomTagSuccessResponse = GetCustomTagResponses["200"]
export interface GetCustomTagInput {
  path: GetCustomTagPathParams
  query?: GetCustomTagQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchCustomTagPathParams = {
  "id": string;
}
export type PatchCustomTagQueryParams = EmptyObject
export type PatchCustomTagRequestBody = {
  "label"?: string;
  "description"?: string | null;
}
export interface PatchCustomTagResponses {
  "200": Models.CustomTag
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchCustomTagSuccessResponse = PatchCustomTagResponses["200"]
export interface PatchCustomTagInput {
  path: PatchCustomTagPathParams
  query?: PatchCustomTagQueryParams
  body?: PatchCustomTagRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteCustomTagPathParams = {
  "id": string;
}
export type DeleteCustomTagQueryParams = EmptyObject
export type DeleteCustomTagRequestBody = null
export interface DeleteCustomTagResponses {
  "200": Models.CustomTag
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteCustomTagSuccessResponse = DeleteCustomTagResponses["200"]
export interface DeleteCustomTagInput {
  path: DeleteCustomTagPathParams
  query?: DeleteCustomTagQueryParams
  body?: DeleteCustomTagRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListDFYEmailAccountOrderPathParams = EmptyObject
export type ListDFYEmailAccountOrderQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
}
export type ListDFYEmailAccountOrderRequestBody = undefined
export interface ListDFYEmailAccountOrderResponses {
  "200": {
  "items": Models.DFYEmailAccountOrder[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListDFYEmailAccountOrderSuccessResponse = ListDFYEmailAccountOrderResponses["200"]
export interface ListDFYEmailAccountOrderInput {
  path?: ListDFYEmailAccountOrderPathParams
  query?: ListDFYEmailAccountOrderQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateDFYEmailAccountOrderPathParams = EmptyObject
export type CreateDFYEmailAccountOrderQueryParams = EmptyObject
export type CreateDFYEmailAccountOrderRequestBody = {
  "items": {
    "domain": string;
    "email_provider"?: 1 | 2 | 3;
    "forwarding_domain"?: string;
    "accounts"?: {
      "email_address_prefix": string;
      "first_name": string;
      "last_name": string;
    }[];
  }[];
  "order_type": "dfy" | "pre_warmed_up" | "extra_accounts";
  "simulation"?: boolean;
}
export interface CreateDFYEmailAccountOrderResponses {
  "200": {
  "order_placed": boolean;
  "order_is_valid": boolean;
  "order_error"?: "unavailable_domains" | "blacklist_domains" | "invalid_domains" | "invalid_forwarding_domains" | "invalid_accounts" | "payment_failed" | "missing_domain_orders" | "domains_without_accounts" | "provider_mismatch" | "unsupported_provider" | "provider_unavailable";
  "unavailable_domains": string[];
  "blacklist_domains": string[];
  "invalid_domains": string[];
  "invalid_forwarding_domains": string[];
  "missing_domain_orders": string[];
  "provider_mismatch_domains": string[];
  "unsupported_provider_domains": string[];
  "unavailable_email_providers": (1 | 2 | 3)[];
  "domains_without_accounts": string[];
  "invalid_accounts": {
    "domain": string;
    "first_name": string;
    "last_name": string;
    "email": string;
    "reason": string;
  }[];
  "free_domains": string[];
  "number_of_domains_ordered": number;
  "number_of_accounts_ordered": number;
  "price_per_account_per_month": null | number;
  "price_per_account_per_month_by_account_type"?: Record<string, number>;
  "price_per_domain_per_month"?: null | number;
  "price_per_domain_per_year": number;
  "total_domains_price_per_year": number;
  "total_accounts_price_per_month": number;
  "total_price_per_month": number;
  "total_price_per_year": number;
  "total_price": number;
  "total_discount": number;
  "payment_method_last_4_digits": string;
  "payment_method_brand": string;
  "payment_method_name_on_card": string;
  "simulation": boolean;
  "order_items": {
    "domain": string;
    "accounts": {
      "email_address_prefix": string;
      "first_name": string;
      "last_name": string;
    }[];
    "email_provider": 1 | 2 | 3;
    "forwarding_domain"?: string;
    "domain_price": number;
    "accounts_price": number;
    "domain_monthly_price"?: null | number;
    "total_price": number;
    "total_discount": number;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateDFYEmailAccountOrderSuccessResponse = CreateDFYEmailAccountOrderResponses["200"]
export interface CreateDFYEmailAccountOrderInput {
  path?: CreateDFYEmailAccountOrderPathParams
  query?: CreateDFYEmailAccountOrderQueryParams
  body: CreateDFYEmailAccountOrderRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListDFYEmailAccountOrdersAccountsPathParams = EmptyObject
export type ListDFYEmailAccountOrdersAccountsQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "with_passwords"?: boolean;
}
export type ListDFYEmailAccountOrdersAccountsRequestBody = undefined
export interface ListDFYEmailAccountOrdersAccountsResponses {
  "200": {
  "items": {
    "id": string;
    "domain": string;
    "email": string;
    "email_provider": 1 | 2 | 3;
    "first_name": string;
    "last_name": string;
    "is_pre_warmed_up": boolean;
    "timestamp_cancelled": string;
    "timestamp_created": string;
    "password"?: string;
  }[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListDFYEmailAccountOrdersAccountsSuccessResponse = ListDFYEmailAccountOrdersAccountsResponses["200"]
export interface ListDFYEmailAccountOrdersAccountsInput {
  path?: ListDFYEmailAccountOrdersAccountsPathParams
  query?: ListDFYEmailAccountOrdersAccountsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CancelDFYEmailAccountsPathParams = EmptyObject
export type CancelDFYEmailAccountsQueryParams = EmptyObject
export type CancelDFYEmailAccountsRequestBody = {
  "accounts": string[];
}
export interface CancelDFYEmailAccountsResponses {
  "200": {
  "items": {
    "id": string;
    "domain": string;
    "email": string;
    "email_provider": 1 | 2 | 3;
    "first_name": string;
    "last_name": string;
    "is_pre_warmed_up": boolean;
    "timestamp_cancelled": string;
    "timestamp_created": string;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CancelDFYEmailAccountsSuccessResponse = CancelDFYEmailAccountsResponses["200"]
export interface CancelDFYEmailAccountsInput {
  path?: CancelDFYEmailAccountsPathParams
  query?: CancelDFYEmailAccountsQueryParams
  body: CancelDFYEmailAccountsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CheckDomainsAvailabilityPathParams = EmptyObject
export type CheckDomainsAvailabilityQueryParams = EmptyObject
export type CheckDomainsAvailabilityRequestBody = {
  "domains": string[];
}
export interface CheckDomainsAvailabilityResponses {
  "200": {
  "results"?: {
    "domain"?: string;
    "available"?: boolean;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CheckDomainsAvailabilitySuccessResponse = CheckDomainsAvailabilityResponses["200"]
export interface CheckDomainsAvailabilityInput {
  path?: CheckDomainsAvailabilityPathParams
  query?: CheckDomainsAvailabilityQueryParams
  body: CheckDomainsAvailabilityRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PreWarmedUpDomainsListPathParams = EmptyObject
export type PreWarmedUpDomainsListQueryParams = EmptyObject
export type PreWarmedUpDomainsListRequestBody = {
  "extensions"?: ("com" | "org" | "co")[];
  "search"?: string;
}
export interface PreWarmedUpDomainsListResponses {
  "200": {
  "domains"?: string[];
  "domains_with_type"?: {
    "domain": string;
    "account_type": 1 | 2 | 3;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PreWarmedUpDomainsListSuccessResponse = PreWarmedUpDomainsListResponses["200"]
export interface PreWarmedUpDomainsListInput {
  path?: PreWarmedUpDomainsListPathParams
  query?: PreWarmedUpDomainsListQueryParams
  body?: PreWarmedUpDomainsListRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GenerateSimilarDomainsPathParams = EmptyObject
export type GenerateSimilarDomainsQueryParams = EmptyObject
export type GenerateSimilarDomainsRequestBody = {
  "domain": string;
  "tlds"?: ("com" | "org")[];
}
export interface GenerateSimilarDomainsResponses {
  "200": {
  "domains"?: string[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GenerateSimilarDomainsSuccessResponse = GenerateSimilarDomainsResponses["200"]
export interface GenerateSimilarDomainsInput {
  path?: GenerateSimilarDomainsPathParams
  query?: GenerateSimilarDomainsQueryParams
  body: GenerateSimilarDomainsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateEmailVerificationPathParams = EmptyObject
export type CreateEmailVerificationQueryParams = EmptyObject
export type CreateEmailVerificationRequestBody = {
  "email": string;
  "webhook_url"?: string;
}
export interface CreateEmailVerificationResponses {
  "200": Models.EmailVerification
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateEmailVerificationSuccessResponse = CreateEmailVerificationResponses["200"]
export interface CreateEmailVerificationInput {
  path?: CreateEmailVerificationPathParams
  query?: CreateEmailVerificationQueryParams
  body: CreateEmailVerificationRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CheckVerificationStatusPathParams = {
  "email": string;
}
export type CheckVerificationStatusQueryParams = EmptyObject
export type CheckVerificationStatusRequestBody = undefined
export interface CheckVerificationStatusResponses {
  "200": Models.EmailVerification
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CheckVerificationStatusSuccessResponse = CheckVerificationStatusResponses["200"]
export interface CheckVerificationStatusInput {
  path: CheckVerificationStatusPathParams
  query?: CheckVerificationStatusQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListEmailPathParams = EmptyObject
export type ListEmailQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "campaign_id"?: string;
  "list_id"?: string;
  "i_status"?: number;
  "eaccount"?: string;
  "is_unread"?: boolean;
  "has_reminder"?: boolean;
  "mode"?: "emode_focused" | "emode_others" | "emode_all";
  "preview_only"?: boolean;
  "sort_order"?: "asc" | "desc";
  "scheduled_only"?: boolean;
  "assigned_to"?: string;
  "lead"?: string;
  "company_domain"?: string;
  "marked_as_done"?: boolean;
  "email_type"?: "received" | "sent" | "manual";
  "min_timestamp_created"?: string;
  "max_timestamp_created"?: string;
  "latest_of_thread"?: boolean;
}
export type ListEmailRequestBody = undefined
export interface ListEmailResponses {
  "200": {
  "items": Models.Email[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListEmailSuccessResponse = ListEmailResponses["200"]
export interface ListEmailInput {
  path?: ListEmailPathParams
  query?: ListEmailQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ForwardEmailPathParams = EmptyObject
export type ForwardEmailQueryParams = EmptyObject
export type ForwardEmailRequestBody = {
  "body": {
    "html": string;
  } | {
    "text": string;
  };
} | {
  "include_original_body": true;
}
export interface ForwardEmailResponses {
  "200": Models.Email
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ForwardEmailSuccessResponse = ForwardEmailResponses["200"]
export interface ForwardEmailInput {
  path?: ForwardEmailPathParams
  query?: ForwardEmailQueryParams
  body: ForwardEmailRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ReplyToEmailPathParams = EmptyObject
export type ReplyToEmailQueryParams = EmptyObject
export type ReplyToEmailRequestBody = {
  "eaccount": string;
  "reply_to_uuid": string;
  "subject": string;
  "body": {
    "html"?: string;
    "text"?: string;
  };
  "additional_recipients"?: string[];
  "cc_address_email_list"?: string;
  "bcc_address_email_list"?: string;
  "reminder_ts"?: string;
  "assigned_to"?: string;
}
export interface ReplyToEmailResponses {
  "200": Models.Email
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ReplyToEmailSuccessResponse = ReplyToEmailResponses["200"]
export interface ReplyToEmailInput {
  path?: ReplyToEmailPathParams
  query?: ReplyToEmailQueryParams
  body: ReplyToEmailRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type SendTestEmailPathParams = EmptyObject
export type SendTestEmailQueryParams = EmptyObject
export type SendTestEmailRequestBody = {
  "eaccount": string;
  "to_address_email_list": string;
  "subject": string;
  "body": {
    "html": string;
  };
}
export interface SendTestEmailResponses {
  "200": {
  "status": "success";
} | {
  "error": "ACC_AUTH_ERROR" | "ACC_NOT_FOUND" | "ACC_UNKNOWN_ERROR";
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type SendTestEmailSuccessResponse = SendTestEmailResponses["200"]
export interface SendTestEmailInput {
  path?: SendTestEmailPathParams
  query?: SendTestEmailQueryParams
  body: SendTestEmailRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MarkThreadAsReadPathParams = {
  "thread_id": string;
}
export type MarkThreadAsReadQueryParams = EmptyObject
export type MarkThreadAsReadRequestBody = undefined
export interface MarkThreadAsReadResponses {
  "200": {
  "success"?: boolean;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MarkThreadAsReadSuccessResponse = MarkThreadAsReadResponses["200"]
export interface MarkThreadAsReadInput {
  path: MarkThreadAsReadPathParams
  query?: MarkThreadAsReadQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CountUnreadEmailsPathParams = EmptyObject
export type CountUnreadEmailsQueryParams = EmptyObject
export type CountUnreadEmailsRequestBody = undefined
export interface CountUnreadEmailsResponses {
  "200": {
  "count"?: number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CountUnreadEmailsSuccessResponse = CountUnreadEmailsResponses["200"]
export interface CountUnreadEmailsInput {
  path?: CountUnreadEmailsPathParams
  query?: CountUnreadEmailsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetEmailPathParams = {
  "id": string;
}
export type GetEmailQueryParams = EmptyObject
export type GetEmailRequestBody = undefined
export interface GetEmailResponses {
  "200": Models.Email
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetEmailSuccessResponse = GetEmailResponses["200"]
export interface GetEmailInput {
  path: GetEmailPathParams
  query?: GetEmailQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchEmailPathParams = {
  "id": string;
}
export type PatchEmailQueryParams = EmptyObject
export type PatchEmailRequestBody = {
  "is_unread"?: number | null;
  "reminder_ts"?: string | null;
}
export interface PatchEmailResponses {
  "200": Models.Email
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchEmailSuccessResponse = PatchEmailResponses["200"]
export interface PatchEmailInput {
  path: PatchEmailPathParams
  query?: PatchEmailQueryParams
  body?: PatchEmailRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteEmailPathParams = {
  "id": string;
}
export type DeleteEmailQueryParams = EmptyObject
export type DeleteEmailRequestBody = null
export interface DeleteEmailResponses {
  "200": Models.Email
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteEmailSuccessResponse = DeleteEmailResponses["200"]
export interface DeleteEmailInput {
  path: DeleteEmailPathParams
  query?: DeleteEmailQueryParams
  body?: DeleteEmailRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListInboxPlacementAnalyticsPathParams = EmptyObject
export type ListInboxPlacementAnalyticsQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "test_id": string;
  "date_from"?: string;
  "date_to"?: string;
  "recipient_geo"?: string;
  "recipient_type"?: string;
  "recipient_esp"?: string;
  "sender_email"?: string;
}
export type ListInboxPlacementAnalyticsRequestBody = undefined
export interface ListInboxPlacementAnalyticsResponses {
  "200": {
  "items": Models.InboxPlacementAnalytics[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListInboxPlacementAnalyticsSuccessResponse = ListInboxPlacementAnalyticsResponses["200"]
export interface ListInboxPlacementAnalyticsInput {
  path?: ListInboxPlacementAnalyticsPathParams
  query: ListInboxPlacementAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementAnalyticsDeliverabilityInsightsPathParams = EmptyObject
export type GetInboxPlacementAnalyticsDeliverabilityInsightsQueryParams = EmptyObject
export type GetInboxPlacementAnalyticsDeliverabilityInsightsRequestBody = {
  "test_id": string;
  "date_from"?: string;
  "date_to"?: string;
  "previous_date_from"?: string;
  "previous_date_to"?: string;
  "show_previous"?: boolean;
  "recipient_geo"?: (1 | 2 | 3 | 4)[];
  "recipient_type"?: (1 | 2)[];
  "recipient_esp"?: (1 | 2 | 12 | 13)[];
}
export interface GetInboxPlacementAnalyticsDeliverabilityInsightsResponses {
  "200": {
  "test_id"?: string;
  "from"?: null | string;
  "to"?: null | string;
  "previous_from"?: null | string;
  "previous_to"?: null | string;
  "sender_esp"?: 1 | 2 | 12 | 13;
  "recipient_esp"?: 1 | 2 | 12 | 13;
  "spam_percentage"?: null | number;
  "inbox_percentage"?: null | number;
  "category_percentage"?: null | number;
  "prev_spam_percentage"?: null | number;
  "prev_inbox_percentage"?: null | number;
  "prev_category_percentage"?: null | number;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementAnalyticsDeliverabilityInsightsSuccessResponse = GetInboxPlacementAnalyticsDeliverabilityInsightsResponses["200"]
export interface GetInboxPlacementAnalyticsDeliverabilityInsightsInput {
  path?: GetInboxPlacementAnalyticsDeliverabilityInsightsPathParams
  query?: GetInboxPlacementAnalyticsDeliverabilityInsightsQueryParams
  body: GetInboxPlacementAnalyticsDeliverabilityInsightsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementAnalyticsStatsByDatePathParams = EmptyObject
export type GetInboxPlacementAnalyticsStatsByDateQueryParams = EmptyObject
export type GetInboxPlacementAnalyticsStatsByDateRequestBody = {
  "test_id": string;
  "date_from"?: string;
  "date_to"?: string;
  "recipient_geo"?: (1 | 2 | 3 | 4)[];
  "recipient_type"?: (1 | 2)[];
  "recipient_esp"?: (1 | 2 | 12 | 13)[];
  "sender_email"?: string;
}
export interface GetInboxPlacementAnalyticsStatsByDateResponses {
  "200": {
  "timestamp_created_date": string;
  "sent_count": number;
  "received_count": number;
  "spam_count": number;
  "inbox_count": number;
  "category_count": number;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementAnalyticsStatsByDateSuccessResponse = GetInboxPlacementAnalyticsStatsByDateResponses["200"]
export interface GetInboxPlacementAnalyticsStatsByDateInput {
  path?: GetInboxPlacementAnalyticsStatsByDatePathParams
  query?: GetInboxPlacementAnalyticsStatsByDateQueryParams
  body: GetInboxPlacementAnalyticsStatsByDateRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementAnalyticsStatsByTestIdPathParams = EmptyObject
export type GetInboxPlacementAnalyticsStatsByTestIdQueryParams = EmptyObject
export type GetInboxPlacementAnalyticsStatsByTestIdRequestBody = {
  "test_ids": string[];
  "date_from"?: string;
  "date_to"?: string;
  "recipient_geo"?: (1 | 2 | 3 | 4)[];
  "recipient_type"?: (1 | 2)[];
  "recipient_esp"?: (1 | 2 | 12 | 13)[];
  "sender_email"?: string;
}
export interface GetInboxPlacementAnalyticsStatsByTestIdResponses {
  "200": {
  "test_id": string;
  "count": number;
  "spam_count": number;
  "spam_percent": number;
  "inbox_count": number;
  "inbox_percent": number;
  "category_count": number;
  "category_percent": number;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementAnalyticsStatsByTestIdSuccessResponse = GetInboxPlacementAnalyticsStatsByTestIdResponses["200"]
export interface GetInboxPlacementAnalyticsStatsByTestIdInput {
  path?: GetInboxPlacementAnalyticsStatsByTestIdPathParams
  query?: GetInboxPlacementAnalyticsStatsByTestIdQueryParams
  body: GetInboxPlacementAnalyticsStatsByTestIdRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementAnalyticsPathParams = {
  "id": string;
}
export type GetInboxPlacementAnalyticsQueryParams = EmptyObject
export type GetInboxPlacementAnalyticsRequestBody = undefined
export interface GetInboxPlacementAnalyticsResponses {
  "200": Models.InboxPlacementAnalytics
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementAnalyticsSuccessResponse = GetInboxPlacementAnalyticsResponses["200"]
export interface GetInboxPlacementAnalyticsInput {
  path: GetInboxPlacementAnalyticsPathParams
  query?: GetInboxPlacementAnalyticsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListInboxPlacementBlacklistAndSpamAssassinReportPathParams = EmptyObject
export type ListInboxPlacementBlacklistAndSpamAssassinReportQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "test_id": string;
  "date_from"?: string;
  "date_to"?: string;
  "skip_spam_assassin_report"?: boolean;
  "skip_blacklist_report"?: boolean;
}
export type ListInboxPlacementBlacklistAndSpamAssassinReportRequestBody = undefined
export interface ListInboxPlacementBlacklistAndSpamAssassinReportResponses {
  "200": {
  "items": Models.InboxPlacementBlacklistAndSpamAssassinReport[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse = ListInboxPlacementBlacklistAndSpamAssassinReportResponses["200"]
export interface ListInboxPlacementBlacklistAndSpamAssassinReportInput {
  path?: ListInboxPlacementBlacklistAndSpamAssassinReportPathParams
  query: ListInboxPlacementBlacklistAndSpamAssassinReportQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementBlacklistAndSpamAssassinReportPathParams = {
  "id": string;
}
export type GetInboxPlacementBlacklistAndSpamAssassinReportQueryParams = EmptyObject
export type GetInboxPlacementBlacklistAndSpamAssassinReportRequestBody = undefined
export interface GetInboxPlacementBlacklistAndSpamAssassinReportResponses {
  "200": Models.InboxPlacementBlacklistAndSpamAssassinReport
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementBlacklistAndSpamAssassinReportSuccessResponse = GetInboxPlacementBlacklistAndSpamAssassinReportResponses["200"]
export interface GetInboxPlacementBlacklistAndSpamAssassinReportInput {
  path: GetInboxPlacementBlacklistAndSpamAssassinReportPathParams
  query?: GetInboxPlacementBlacklistAndSpamAssassinReportQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListInboxPlacementTestPathParams = EmptyObject
export type ListInboxPlacementTestQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "status"?: 1 | 2 | 3;
  "sort_order"?: "asc" | "desc";
}
export type ListInboxPlacementTestRequestBody = undefined
export interface ListInboxPlacementTestResponses {
  "200": {
  "items": Models.InboxPlacementTest[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListInboxPlacementTestSuccessResponse = ListInboxPlacementTestResponses["200"]
export interface ListInboxPlacementTestInput {
  path?: ListInboxPlacementTestPathParams
  query?: ListInboxPlacementTestQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateInboxPlacementTestPathParams = EmptyObject
export type CreateInboxPlacementTestQueryParams = EmptyObject
export type CreateInboxPlacementTestRequestBody = {
  "name": string;
  "delivery_mode"?: 1 | 2 | null | null;
  "description"?: string | null;
  "schedule"?: {
    "days"?: Record<string, boolean>;
    "timing"?: {
      "from"?: string;
    };
    "timezone"?: "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
  };
  "type": 1 | 2;
  "sending_method": 1 | 2;
  "campaign_id"?: null | string;
  "email_subject": string;
  "email_body": string;
  "emails": string[];
  "test_code"?: string | null;
  "tags"?: string[] | null;
  "text_only"?: boolean | null;
  "recipients_labels"?: {
    "region": string;
    "sub_region": string;
    "type": string;
    "esp": string;
  }[];
  "timestamp_next_run"?: string | null;
  "automations"?: null | {
    "when": {
      "condition": "placement_goes_below" | "placement_goes_above" | "added_to_blacklists" | "removed_from_blacklists";
      "condition_value"?: null | number;
    };
    "then": {
      "webhook_url"?: string;
      "pause_sending_campaigns_for"?: number;
      "pause"?: boolean;
      "enable_slow_ramp"?: boolean;
      "disable_slow_ramp"?: boolean;
      "add_tags"?: string[];
      "remove_tags"?: string[];
    };
  }[];
  "status"?: 1 | 2 | 3 | null;
  "not_sending_status"?: "daily_limits_hit" | "other" | null;
  "run_immediately"?: boolean;
}
export interface CreateInboxPlacementTestResponses {
  "200": Models.InboxPlacementTest
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateInboxPlacementTestSuccessResponse = CreateInboxPlacementTestResponses["200"]
export interface CreateInboxPlacementTestInput {
  path?: CreateInboxPlacementTestPathParams
  query?: CreateInboxPlacementTestQueryParams
  body: CreateInboxPlacementTestRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementTestESPOptionsPathParams = EmptyObject
export type GetInboxPlacementTestESPOptionsQueryParams = EmptyObject
export type GetInboxPlacementTestESPOptionsRequestBody = undefined
export interface GetInboxPlacementTestESPOptionsResponses {
  "200": {
  "region": string;
  "sub_region": string;
  "type": string;
  "esp": string;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementTestESPOptionsSuccessResponse = GetInboxPlacementTestESPOptionsResponses["200"]
export interface GetInboxPlacementTestESPOptionsInput {
  path?: GetInboxPlacementTestESPOptionsPathParams
  query?: GetInboxPlacementTestESPOptionsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetInboxPlacementTestPathParams = {
  "id": string;
}
export type GetInboxPlacementTestQueryParams = {
  "with_metadata"?: boolean;
}
export type GetInboxPlacementTestRequestBody = undefined
export interface GetInboxPlacementTestResponses {
  "200": {
  "id"?: string;
  "organization_id"?: string;
  "name"?: string;
  "delivery_mode"?: 1 | 2 | null | null;
  "description"?: null | string;
  "schedule"?: {
    "days"?: Record<string, boolean>;
    "timing"?: {
      "from"?: string;
    };
    "timezone"?: "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
  };
  "type"?: 1 | 2;
  "sending_method"?: 1 | 2;
  "campaign_id"?: null | string;
  "email_subject"?: string;
  "email_body"?: string;
  "emails"?: string[];
  "test_code"?: null | string;
  "tags"?: null | string[];
  "text_only"?: null | boolean;
  "recipients"?: string[];
  "recipients_labels"?: {
    "region": string;
    "sub_region": string;
    "type": string;
    "esp": string;
  }[];
  "timestamp_created"?: string;
  "timestamp_next_run"?: null | string;
  "automations"?: null | {
    "when": {
      "condition": "placement_goes_below" | "placement_goes_above" | "added_to_blacklists" | "removed_from_blacklists";
      "condition_value"?: null | number;
    };
    "then": {
      "webhook_url"?: string;
      "pause_sending_campaigns_for"?: number;
      "pause"?: boolean;
      "enable_slow_ramp"?: boolean;
      "disable_slow_ramp"?: boolean;
      "add_tags"?: string[];
      "remove_tags"?: string[];
    };
  }[];
  "status"?: 1 | 2 | 3 | null;
  "not_sending_status"?: "daily_limits_hit" | "other" | null;
  "metadata"?: {
    "campaign"?: {
      "id"?: string;
      "name"?: string;
    };
    "tags"?: Record<string, {
      "id": string;
      "label": string;
    }>;
  };
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetInboxPlacementTestSuccessResponse = GetInboxPlacementTestResponses["200"]
export interface GetInboxPlacementTestInput {
  path: GetInboxPlacementTestPathParams
  query?: GetInboxPlacementTestQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchInboxPlacementTestPathParams = {
  "id": string;
}
export type PatchInboxPlacementTestQueryParams = EmptyObject
export type PatchInboxPlacementTestRequestBody = {
  "name"?: string;
  "schedule"?: {
    "days"?: Record<string, boolean>;
    "timing"?: {
      "from"?: string;
    };
    "timezone"?: "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
  };
  "automations"?: null | {
    "when": {
      "condition": "placement_goes_below" | "placement_goes_above" | "added_to_blacklists" | "removed_from_blacklists";
      "condition_value"?: null | number;
    };
    "then": {
      "webhook_url"?: string;
      "pause_sending_campaigns_for"?: number;
      "pause"?: boolean;
      "enable_slow_ramp"?: boolean;
      "disable_slow_ramp"?: boolean;
      "add_tags"?: string[];
      "remove_tags"?: string[];
    };
  }[];
  "status"?: 1 | 2 | 3 | null;
}
export interface PatchInboxPlacementTestResponses {
  "200": Models.InboxPlacementTest
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchInboxPlacementTestSuccessResponse = PatchInboxPlacementTestResponses["200"]
export interface PatchInboxPlacementTestInput {
  path: PatchInboxPlacementTestPathParams
  query?: PatchInboxPlacementTestQueryParams
  body?: PatchInboxPlacementTestRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteInboxPlacementTestPathParams = {
  "id": string;
}
export type DeleteInboxPlacementTestQueryParams = EmptyObject
export type DeleteInboxPlacementTestRequestBody = null
export interface DeleteInboxPlacementTestResponses {
  "200": Models.InboxPlacementTest
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteInboxPlacementTestSuccessResponse = DeleteInboxPlacementTestResponses["200"]
export interface DeleteInboxPlacementTestInput {
  path: DeleteInboxPlacementTestPathParams
  query?: DeleteInboxPlacementTestQueryParams
  body?: DeleteInboxPlacementTestRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListLeadLabelPathParams = EmptyObject
export type ListLeadLabelQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "search"?: string;
  "interest_status"?: "positive" | "neutral" | "negative";
}
export type ListLeadLabelRequestBody = undefined
export interface ListLeadLabelResponses {
  "200": {
  "items": Models.LeadLabel[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListLeadLabelSuccessResponse = ListLeadLabelResponses["200"]
export interface ListLeadLabelInput {
  path?: ListLeadLabelPathParams
  query?: ListLeadLabelQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateLeadLabelPathParams = EmptyObject
export type CreateLeadLabelQueryParams = EmptyObject
export type CreateLeadLabelRequestBody = {
  "label": string;
  "interest_status_label": "positive" | "negative" | "neutral";
  "description"?: string | null;
  "use_with_ai"?: boolean | null;
}
export interface CreateLeadLabelResponses {
  "200": Models.LeadLabel
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateLeadLabelSuccessResponse = CreateLeadLabelResponses["200"]
export interface CreateLeadLabelInput {
  path?: CreateLeadLabelPathParams
  query?: CreateLeadLabelQueryParams
  body: CreateLeadLabelRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type TestAiReplyLabelLeadLabelsPathParams = EmptyObject
export type TestAiReplyLabelLeadLabelsQueryParams = EmptyObject
export type TestAiReplyLabelLeadLabelsRequestBody = {
  "reply_text": string;
}
export interface TestAiReplyLabelLeadLabelsResponses {
  "200": {
  "result"?: string;
  "custom_labels_considered"?: string[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "error"?: string;
}
  "500": {
  "error"?: string;
}
}
export type TestAiReplyLabelLeadLabelsSuccessResponse = TestAiReplyLabelLeadLabelsResponses["200"]
export interface TestAiReplyLabelLeadLabelsInput {
  path?: TestAiReplyLabelLeadLabelsPathParams
  query?: TestAiReplyLabelLeadLabelsQueryParams
  body: TestAiReplyLabelLeadLabelsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetLeadLabelPathParams = {
  "id": string;
}
export type GetLeadLabelQueryParams = EmptyObject
export type GetLeadLabelRequestBody = undefined
export interface GetLeadLabelResponses {
  "200": Models.LeadLabel
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetLeadLabelSuccessResponse = GetLeadLabelResponses["200"]
export interface GetLeadLabelInput {
  path: GetLeadLabelPathParams
  query?: GetLeadLabelQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchLeadLabelPathParams = {
  "id": string;
}
export type PatchLeadLabelQueryParams = EmptyObject
export type PatchLeadLabelRequestBody = {
  "label"?: string;
  "interest_status_label"?: "positive" | "negative" | "neutral";
  "description"?: string | null;
  "use_with_ai"?: boolean | null;
}
export interface PatchLeadLabelResponses {
  "200": Models.LeadLabel
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchLeadLabelSuccessResponse = PatchLeadLabelResponses["200"]
export interface PatchLeadLabelInput {
  path: PatchLeadLabelPathParams
  query?: PatchLeadLabelQueryParams
  body?: PatchLeadLabelRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteLeadLabelPathParams = {
  "id": string;
}
export type DeleteLeadLabelQueryParams = EmptyObject
export type DeleteLeadLabelRequestBody = {
  "reassigned_status"?: number;
}
export interface DeleteLeadLabelResponses {
  "200": Models.LeadLabel
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteLeadLabelSuccessResponse = DeleteLeadLabelResponses["200"]
export interface DeleteLeadLabelInput {
  path: DeleteLeadLabelPathParams
  query?: DeleteLeadLabelQueryParams
  body?: DeleteLeadLabelRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListLeadListPathParams = EmptyObject
export type ListLeadListQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "has_enrichment_task"?: boolean;
  "search"?: string;
}
export type ListLeadListRequestBody = undefined
export interface ListLeadListResponses {
  "200": {
  "items": Models.LeadList[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListLeadListSuccessResponse = ListLeadListResponses["200"]
export interface ListLeadListInput {
  path?: ListLeadListPathParams
  query?: ListLeadListQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateLeadListPathParams = EmptyObject
export type CreateLeadListQueryParams = EmptyObject
export type CreateLeadListRequestBody = {
  "has_enrichment_task"?: boolean | null;
  "owned_by"?: string | null;
  "name": string;
}
export interface CreateLeadListResponses {
  "200": Models.LeadList
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateLeadListSuccessResponse = CreateLeadListResponses["200"]
export interface CreateLeadListInput {
  path?: CreateLeadListPathParams
  query?: CreateLeadListQueryParams
  body: CreateLeadListRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetLeadListPathParams = {
  "id": string;
}
export type GetLeadListQueryParams = EmptyObject
export type GetLeadListRequestBody = undefined
export interface GetLeadListResponses {
  "200": Models.LeadList
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetLeadListSuccessResponse = GetLeadListResponses["200"]
export interface GetLeadListInput {
  path: GetLeadListPathParams
  query?: GetLeadListQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchLeadListPathParams = {
  "id": string;
}
export type PatchLeadListQueryParams = EmptyObject
export type PatchLeadListRequestBody = {
  "has_enrichment_task"?: boolean | null;
  "owned_by"?: string | null;
  "name"?: string;
}
export interface PatchLeadListResponses {
  "200": Models.LeadList
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchLeadListSuccessResponse = PatchLeadListResponses["200"]
export interface PatchLeadListInput {
  path: PatchLeadListPathParams
  query?: PatchLeadListQueryParams
  body?: PatchLeadListRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteLeadListPathParams = {
  "id": string;
}
export type DeleteLeadListQueryParams = EmptyObject
export type DeleteLeadListRequestBody = null
export interface DeleteLeadListResponses {
  "200": Models.LeadList
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteLeadListSuccessResponse = DeleteLeadListResponses["200"]
export interface DeleteLeadListInput {
  path: DeleteLeadListPathParams
  query?: DeleteLeadListQueryParams
  body?: DeleteLeadListRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetVerificationStatsPathParams = {
  "id": string;
}
export type GetVerificationStatsQueryParams = EmptyObject
export type GetVerificationStatsRequestBody = undefined
export interface GetVerificationStatsResponses {
  "200": {
  "stats": {
    "verified"?: number;
    "invalid"?: number;
    "risky"?: number;
    "catch_all"?: number;
    "job_change"?: number;
    "verification_job_pending_leadfinder"?: number;
    "verification_job_pending_user"?: number;
  };
  "total_leads": number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetVerificationStatsSuccessResponse = GetVerificationStatsResponses["200"]
export interface GetVerificationStatsInput {
  path: GetVerificationStatsPathParams
  query?: GetVerificationStatsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateLeadPathParams = EmptyObject
export type CreateLeadQueryParams = EmptyObject
export type CreateLeadRequestBody = {
  "campaign"?: string | null;
  "email"?: string | null;
  "personalization"?: string | null;
  "website"?: string | null;
  "last_name"?: string | null;
  "first_name"?: string | null;
  "company_name"?: string | null;
  "job_title"?: string | null;
  "phone"?: string | null;
  "lt_interest_status"?: 1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4;
  "pl_value_lead"?: string | null;
  "list_id"?: string | null;
  "assigned_to"?: string | null;
  "skip_if_in_workspace"?: boolean;
  "skip_if_in_campaign"?: boolean;
  "skip_if_in_list"?: boolean;
  "blocklist_id"?: string;
  "verify_leads_for_lead_finder"?: boolean;
  "verify_leads_on_import"?: boolean;
  "custom_variables"?: Record<string, string | number | boolean | null>;
}
export interface CreateLeadResponses {
  "200": Models.Lead
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateLeadSuccessResponse = CreateLeadResponses["200"]
export interface CreateLeadInput {
  path?: CreateLeadPathParams
  query?: CreateLeadQueryParams
  body?: CreateLeadRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type BulkDeleteLeadsPathParams = EmptyObject
export type BulkDeleteLeadsQueryParams = EmptyObject
export type BulkDeleteLeadsRequestBody = unknown | unknown
export interface BulkDeleteLeadsResponses {
  "200": {
  "count"?: number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type BulkDeleteLeadsSuccessResponse = BulkDeleteLeadsResponses["200"]
export interface BulkDeleteLeadsInput {
  path?: BulkDeleteLeadsPathParams
  query?: BulkDeleteLeadsQueryParams
  body?: BulkDeleteLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type BulkAddLeadsPathParams = EmptyObject
export type BulkAddLeadsQueryParams = EmptyObject
export type BulkAddLeadsRequestBody = {
  "campaign_id"?: string;
  "list_id"?: string;
  "leads": {
    "email"?: string | null;
    "personalization"?: string | null;
    "website"?: string | null;
    "last_name"?: string | null;
    "first_name"?: string | null;
    "company_name"?: string | null;
    "job_title"?: string | null;
    "phone"?: string | null;
    "lt_interest_status"?: 1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4;
    "pl_value_lead"?: string | null;
    "assigned_to"?: string | null;
    "custom_variables"?: Record<string, string | number | boolean | null>;
  }[];
  "blocklist_id"?: string | null;
  "assigned_to"?: string;
  "verify_leads_on_import"?: boolean;
  "skip_if_in_workspace"?: boolean;
  "skip_if_in_campaign"?: boolean;
  "skip_if_in_list"?: boolean;
}
export interface BulkAddLeadsResponses {
  "200": {
  "status": string;
  "total_sent": number;
  "leads_uploaded": number;
  "in_blocklist": number;
  "blocklist_used": null | string;
  "duplicated_leads": number;
  "skipped_count": number;
  "invalid_email_count": number;
  "incomplete_count": number;
  "duplicate_email_count": number;
  "remaining_in_plan": null | number;
  "created_leads": {
    "index": number;
    "id": string;
    "email"?: null | string;
    "first_name"?: null | string;
    "last_name"?: null | string;
    "phone"?: null | string;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type BulkAddLeadsSuccessResponse = BulkAddLeadsResponses["200"]
export interface BulkAddLeadsInput {
  path?: BulkAddLeadsPathParams
  query?: BulkAddLeadsQueryParams
  body: BulkAddLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type BulkAssignLeadsPathParams = EmptyObject
export type BulkAssignLeadsQueryParams = EmptyObject
export type BulkAssignLeadsRequestBody = {
  "search"?: string;
  "filter"?: "FILTER_VAL_CONTACTED" | "FILTER_VAL_NOT_CONTACTED" | "FILTER_VAL_COMPLETED" | "FILTER_VAL_UNSUBSCRIBED" | "FILTER_VAL_ACTIVE" | "FILTER_LEAD_INTERESTED" | "FILTER_LEAD_NOT_INTERESTED" | "FILTER_LEAD_MEETING_BOOKED" | "FILTER_LEAD_MEETING_COMPLETED" | "FILTER_LEAD_CLOSED" | "FILTER_LEAD_OUT_OF_OFFICE" | "FILTER_LEAD_WRONG_PERSON" | "FILTER_LEAD_LOST" | "FILTER_LEAD_NO_SHOW" | "FILTER_LEAD_CUSTOM_LABEL_POSITIVE" | "FILTER_LEAD_CUSTOM_LABEL_NEGATIVE" | "FILTER_VAL_BOUNCED" | "FILTER_VAL_SKIPPED" | "FILTER_VAL_RISKY" | "FILTER_VAL_INVALID" | "FILTER_VAL_VALID" | "FILTER_VAL_IN_SUBSEQUENCE" | "FILTER_VAL_OPENED_NO_REPLY" | "FILTER_VAL_COMPLETED_NO_REPLY" | "FILTER_VAL_NO_OPENS" | "FILTER_VAL_REPLIED" | "FILTER_VAL_LINK_CLICKED";
  "campaign"?: string;
  "list_id"?: string;
  "in_campaign"?: boolean;
  "in_list"?: boolean;
  "organization_user_ids": string[];
  "smart_view_id"?: string;
  "ids"?: string[];
  "limit"?: number;
  "queries"?: {
    "actionType": "reply" | "email-open" | "last-contacted" | "link-click" | "lead-status" | "lead-status-change";
    "values": {
      "occurrence-days"?: number;
      "occurrence-count"?: {
        "condition"?: "more" | "less" | "equal";
        "count"?: number;
      };
      "lead-status"?: {
        "status"?: number;
        "condition"?: "is" | "is-not";
      };
    };
  }[];
  "assigned_to"?: string;
  "has_clause"?: boolean;
}
export interface BulkAssignLeadsResponses {
  "202": {
  "status"?: string;
  "message"?: string;
}
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type BulkAssignLeadsSuccessResponse = BulkAssignLeadsResponses["202"]
export interface BulkAssignLeadsInput {
  path?: BulkAssignLeadsPathParams
  query?: BulkAssignLeadsQueryParams
  body: BulkAssignLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListLeadsPathParams = EmptyObject
export type ListLeadsQueryParams = EmptyObject
export type ListLeadsRequestBody = {
  "search"?: string;
  "filter"?: string;
  "campaign"?: string;
  "list_id"?: string;
  "in_campaign"?: boolean;
  "in_list"?: boolean;
  "ids"?: string[];
  "queries"?: {
    "actionType": "reply" | "email-open" | "last-contacted" | "link-click" | "lead-status" | "lead-status-change";
    "values": {
      "occurrence-days"?: number;
      "occurrence-count"?: {
        "condition"?: "more" | "less" | "equal";
        "count"?: number;
      };
      "lead-status"?: {
        "status"?: number;
        "condition"?: "is" | "is-not";
      };
    };
  }[];
  "excluded_ids"?: string[];
  "contacts"?: string[];
  "limit"?: number;
  "starting_after"?: string;
  "organization_user_ids"?: string[];
  "smart_view_id"?: string;
  "is_website_visitor"?: boolean;
  "distinct_contacts"?: boolean;
  "enrichment_status"?: 1 | -1 | 11 | -2;
  "esg_code"?: "0" | "1" | "2" | "3" | "4" | "all" | "none";
}
export interface ListLeadsResponses {
  "200": {
  "items": Models.Lead[];
  "next_starting_after"?: string;
}
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListLeadsSuccessResponse = ListLeadsResponses["200"]
export interface ListLeadsInput {
  path?: ListLeadsPathParams
  query?: ListLeadsQueryParams
  body?: ListLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MergeLeadsPathParams = EmptyObject
export type MergeLeadsQueryParams = EmptyObject
export type MergeLeadsRequestBody = {
  "lead_id": string;
  "destination_lead_id": string;
}
export interface MergeLeadsResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MergeLeadsSuccessResponse = MergeLeadsResponses["200"]
export interface MergeLeadsInput {
  path?: MergeLeadsPathParams
  query?: MergeLeadsQueryParams
  body: MergeLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MoveLeadsPathParams = EmptyObject
export type MoveLeadsQueryParams = EmptyObject
export type MoveLeadsRequestBody = {
  "search"?: string;
  "filter"?: string;
  "campaign"?: string;
  "list_id"?: string;
  "in_campaign"?: boolean;
  "in_list"?: boolean;
  "ids"?: string[];
  "queries"?: {
    "actionType": "reply" | "email-open" | "last-contacted" | "link-click" | "lead-status" | "lead-status-change";
    "values": {
      "occurrence-days"?: number;
      "occurrence-count"?: {
        "condition"?: "more" | "less" | "equal";
        "count"?: number;
      };
      "lead-status"?: {
        "status"?: number;
        "condition"?: "is" | "is-not";
      };
    };
  }[];
  "excluded_ids"?: string[];
  "contacts"?: string[];
  "to_campaign_id"?: string;
  "to_list_id"?: string;
  "ignore_resource_filter_clauses"?: boolean;
  "check_duplicates_in_campaigns"?: boolean;
  "skip_leads_in_verification"?: boolean;
  "limit"?: number;
  "assigned_to"?: string;
  "esp_code"?: 0 | 1 | 2 | 3 | 8 | 9 | 10 | 12 | 13 | 999 | 1000;
  "esg_code"?: "0" | "1" | "2" | "3" | "4" | "all" | "none";
  "copy_leads"?: boolean;
  "check_duplicates"?: boolean;
  "reset_interest_status"?: boolean;
}
export interface MoveLeadsResponses {
  "200": Models.BackgroundJob
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MoveLeadsSuccessResponse = MoveLeadsResponses["200"]
export interface MoveLeadsInput {
  path?: MoveLeadsPathParams
  query?: MoveLeadsQueryParams
  body?: MoveLeadsRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type MoveLeadToSubsequencePathParams = EmptyObject
export type MoveLeadToSubsequenceQueryParams = EmptyObject
export type MoveLeadToSubsequenceRequestBody = {
  "subsequence_id": string;
  "id": string;
}
export interface MoveLeadToSubsequenceResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type MoveLeadToSubsequenceSuccessResponse = MoveLeadToSubsequenceResponses["200"]
export interface MoveLeadToSubsequenceInput {
  path?: MoveLeadToSubsequencePathParams
  query?: MoveLeadToSubsequenceQueryParams
  body: MoveLeadToSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type RemoveLeadFromSubsequencePathParams = EmptyObject
export type RemoveLeadFromSubsequenceQueryParams = EmptyObject
export type RemoveLeadFromSubsequenceRequestBody = {
  "id": string;
}
export interface RemoveLeadFromSubsequenceResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type RemoveLeadFromSubsequenceSuccessResponse = RemoveLeadFromSubsequenceResponses["200"]
export interface RemoveLeadFromSubsequenceInput {
  path?: RemoveLeadFromSubsequencePathParams
  query?: RemoveLeadFromSubsequenceQueryParams
  body: RemoveLeadFromSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type UpdateLeadInterestStatusPathParams = EmptyObject
export type UpdateLeadInterestStatusQueryParams = EmptyObject
export type UpdateLeadInterestStatusRequestBody = {
  "lead_email": string;
  "interest_value": number | null;
  "campaign_id"?: string;
  "ai_interest_value"?: number;
  "disable_auto_interest"?: boolean;
  "list_id"?: string;
}
export interface UpdateLeadInterestStatusResponses {
  "202": {
  "message"?: string;
}
  "400": {
  "error"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type UpdateLeadInterestStatusSuccessResponse = UpdateLeadInterestStatusResponses["202"]
export interface UpdateLeadInterestStatusInput {
  path?: UpdateLeadInterestStatusPathParams
  query?: UpdateLeadInterestStatusQueryParams
  body: UpdateLeadInterestStatusRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetLeadPathParams = {
  "id": string;
}
export type GetLeadQueryParams = EmptyObject
export type GetLeadRequestBody = undefined
export interface GetLeadResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetLeadSuccessResponse = GetLeadResponses["200"]
export interface GetLeadInput {
  path: GetLeadPathParams
  query?: GetLeadQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchLeadPathParams = {
  "id": string;
}
export type PatchLeadQueryParams = EmptyObject
export type PatchLeadRequestBody = {
  "personalization"?: string | null;
  "website"?: string | null;
  "last_name"?: string | null;
  "first_name"?: string | null;
  "company_name"?: string | null;
  "job_title"?: string | null;
  "phone"?: string | null;
  "lt_interest_status"?: 1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4;
  "pl_value_lead"?: string | null;
  "assigned_to"?: string | null;
  "custom_variables"?: Record<string, string | number | boolean | null>;
}
export interface PatchLeadResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchLeadSuccessResponse = PatchLeadResponses["200"]
export interface PatchLeadInput {
  path: PatchLeadPathParams
  query?: PatchLeadQueryParams
  body?: PatchLeadRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteLeadPathParams = {
  "id": string;
}
export type DeleteLeadQueryParams = EmptyObject
export type DeleteLeadRequestBody = null
export interface DeleteLeadResponses {
  "200": Models.Lead
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteLeadSuccessResponse = DeleteLeadResponses["200"]
export interface DeleteLeadInput {
  path: DeleteLeadPathParams
  query?: DeleteLeadQueryParams
  body?: DeleteLeadRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type InitGoogleOAuthPathParams = EmptyObject
export type InitGoogleOAuthQueryParams = EmptyObject
export type InitGoogleOAuthRequestBody = undefined
export interface InitGoogleOAuthResponses {
  "200": {
  "session_id"?: string;
  "auth_url"?: string;
  "expires_at"?: string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
  "503": {
  "statusCode": 503;
  "error": "Service Unavailable";
  "message": string;
}
}
export type InitGoogleOAuthSuccessResponse = InitGoogleOAuthResponses["200"]
export interface InitGoogleOAuthInput {
  path?: InitGoogleOAuthPathParams
  query?: InitGoogleOAuthQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type InitMicrosoftOAuthPathParams = EmptyObject
export type InitMicrosoftOAuthQueryParams = EmptyObject
export type InitMicrosoftOAuthRequestBody = undefined
export interface InitMicrosoftOAuthResponses {
  "200": {
  "session_id"?: string;
  "auth_url"?: string;
  "expires_at"?: string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
  "503": {
  "statusCode": 503;
  "error": "Service Unavailable";
  "message": string;
}
}
export type InitMicrosoftOAuthSuccessResponse = InitMicrosoftOAuthResponses["200"]
export interface InitMicrosoftOAuthInput {
  path?: InitMicrosoftOAuthPathParams
  query?: InitMicrosoftOAuthQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetOAuthSessionStatusPathParams = {
  "sessionId": string;
}
export type GetOAuthSessionStatusQueryParams = EmptyObject
export type GetOAuthSessionStatusRequestBody = undefined
export interface GetOAuthSessionStatusResponses {
  "200": {
  "status"?: "pending" | "success" | "error" | "expired";
  "email"?: string;
  "name"?: string;
  "error"?: string;
  "error_description"?: string;
}
}
export type GetOAuthSessionStatusSuccessResponse = GetOAuthSessionStatusResponses["200"]
export interface GetOAuthSessionStatusInput {
  path: GetOAuthSessionStatusPathParams
  query?: GetOAuthSessionStatusQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListCampaignSubsequencePathParams = EmptyObject
export type ListCampaignSubsequenceQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "parent_campaign": string;
  "search"?: string;
}
export type ListCampaignSubsequenceRequestBody = undefined
export interface ListCampaignSubsequenceResponses {
  "200": {
  "items": Models.CampaignSubsequence[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListCampaignSubsequenceSuccessResponse = ListCampaignSubsequenceResponses["200"]
export interface ListCampaignSubsequenceInput {
  path?: ListCampaignSubsequencePathParams
  query: ListCampaignSubsequenceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateCampaignSubsequencePathParams = EmptyObject
export type CreateCampaignSubsequenceQueryParams = EmptyObject
export type CreateCampaignSubsequenceRequestBody = {
  "parent_campaign": string;
  "name": string;
  "conditions": {
    "crm_status"?: (1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4)[];
    "lead_activity"?: (4 | 91 | 2)[];
    "reply_contains"?: string;
  };
  "subsequence_schedule": {
    "start_date"?: string | null;
    "end_date"?: string | null;
    "schedules": {
      "name": string;
      "timing": {
        "from": string;
        "to": string;
      };
      "days": {
        "0"?: boolean;
        "1"?: boolean;
        "2"?: boolean;
        "3"?: boolean;
        "4"?: boolean;
        "5"?: boolean;
        "6"?: boolean;
      };
      "timezone": "Etc/GMT+12" | "Etc/GMT+11" | "Etc/GMT+10" | "America/Anchorage" | "America/Dawson" | "America/Creston" | "America/Chihuahua" | "America/Boise" | "America/Belize" | "America/Chicago" | "America/Bahia_Banderas" | "America/Regina" | "America/Bogota" | "America/Detroit" | "America/Indiana/Marengo" | "America/Caracas" | "America/Asuncion" | "America/Glace_Bay" | "America/Campo_Grande" | "America/Anguilla" | "America/Santiago" | "America/St_Johns" | "America/Sao_Paulo" | "America/Argentina/La_Rioja" | "America/Araguaina" | "America/Godthab" | "America/Montevideo" | "America/Bahia" | "America/Noronha" | "America/Scoresbysund" | "Atlantic/Cape_Verde" | "Africa/Casablanca" | "America/Danmarkshavn" | "Europe/Isle_of_Man" | "Atlantic/Canary" | "Africa/Abidjan" | "Arctic/Longyearbyen" | "Europe/Belgrade" | "Africa/Ceuta" | "Europe/Sarajevo" | "Africa/Algiers" | "Africa/Windhoek" | "Asia/Nicosia" | "Asia/Beirut" | "Africa/Cairo" | "Asia/Damascus" | "Europe/Bucharest" | "Africa/Blantyre" | "Europe/Helsinki" | "Europe/Istanbul" | "Asia/Jerusalem" | "Africa/Tripoli" | "Asia/Amman" | "Asia/Baghdad" | "Europe/Kaliningrad" | "Asia/Aden" | "Africa/Addis_Ababa" | "Europe/Kirov" | "Europe/Astrakhan" | "Asia/Tehran" | "Asia/Dubai" | "Asia/Baku" | "Indian/Mahe" | "Asia/Tbilisi" | "Asia/Yerevan" | "Asia/Kabul" | "Antarctica/Mawson" | "Asia/Yekaterinburg" | "Asia/Karachi" | "Asia/Kolkata" | "Asia/Colombo" | "Asia/Kathmandu" | "Antarctica/Vostok" | "Asia/Dhaka" | "Asia/Rangoon" | "Antarctica/Davis" | "Asia/Novokuznetsk" | "Asia/Hong_Kong" | "Asia/Krasnoyarsk" | "Asia/Brunei" | "Australia/Perth" | "Asia/Taipei" | "Asia/Choibalsan" | "Asia/Irkutsk" | "Asia/Dili" | "Asia/Pyongyang" | "Australia/Adelaide" | "Australia/Darwin" | "Australia/Brisbane" | "Australia/Melbourne" | "Antarctica/DumontDUrville" | "Australia/Currie" | "Asia/Chita" | "Antarctica/Macquarie" | "Asia/Sakhalin" | "Pacific/Auckland" | "Etc/GMT-12" | "Pacific/Fiji" | "Asia/Anadyr" | "Asia/Kamchatka" | "Etc/GMT-13" | "Pacific/Apia";
    }[];
  };
  "sequences": {
    "steps": {
      "type": "email";
      "delay": number;
      "delay_unit"?: "minutes" | "hours" | "days";
      "pre_delay"?: number;
      "pre_delay_unit"?: "minutes" | "hours" | "days";
      "variants": {
        "subject": string;
        "body": string;
        "v_disabled"?: boolean;
      }[];
    }[];
  }[];
  "daily_limit_mode"?: "inherit" | "custom" | "unlimited";
  "daily_limit"?: number | null;
  "ignore_account_daily_limit"?: boolean;
}
export interface CreateCampaignSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateCampaignSubsequenceSuccessResponse = CreateCampaignSubsequenceResponses["200"]
export interface CreateCampaignSubsequenceInput {
  path?: CreateCampaignSubsequencePathParams
  query?: CreateCampaignSubsequenceQueryParams
  body: CreateCampaignSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetCampaignSubsequencePathParams = {
  "id": string;
}
export type GetCampaignSubsequenceQueryParams = EmptyObject
export type GetCampaignSubsequenceRequestBody = undefined
export interface GetCampaignSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetCampaignSubsequenceSuccessResponse = GetCampaignSubsequenceResponses["200"]
export interface GetCampaignSubsequenceInput {
  path: GetCampaignSubsequencePathParams
  query?: GetCampaignSubsequenceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchCampaignSubsequencePathParams = {
  "id": string;
}
export type PatchCampaignSubsequenceQueryParams = EmptyObject
export type PatchCampaignSubsequenceRequestBody = {
  "name"?: string;
  "daily_limit_mode"?: "inherit" | "custom" | "unlimited";
  "daily_limit"?: number | null;
  "ignore_account_daily_limit"?: boolean;
}
export interface PatchCampaignSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchCampaignSubsequenceSuccessResponse = PatchCampaignSubsequenceResponses["200"]
export interface PatchCampaignSubsequenceInput {
  path: PatchCampaignSubsequencePathParams
  query?: PatchCampaignSubsequenceQueryParams
  body?: PatchCampaignSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteCampaignSubsequencePathParams = {
  "id": string;
}
export type DeleteCampaignSubsequenceQueryParams = EmptyObject
export type DeleteCampaignSubsequenceRequestBody = null
export interface DeleteCampaignSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteCampaignSubsequenceSuccessResponse = DeleteCampaignSubsequenceResponses["200"]
export interface DeleteCampaignSubsequenceInput {
  path: DeleteCampaignSubsequencePathParams
  query?: DeleteCampaignSubsequenceQueryParams
  body?: DeleteCampaignSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DuplicateSubsequencePathParams = {
  "id": string;
}
export type DuplicateSubsequenceQueryParams = EmptyObject
export type DuplicateSubsequenceRequestBody = {
  "parent_campaign": string;
  "name": string;
}
export interface DuplicateSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DuplicateSubsequenceSuccessResponse = DuplicateSubsequenceResponses["200"]
export interface DuplicateSubsequenceInput {
  path: DuplicateSubsequencePathParams
  query?: DuplicateSubsequenceQueryParams
  body: DuplicateSubsequenceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PauseSubsequencePathParams = {
  "id": string;
}
export type PauseSubsequenceQueryParams = EmptyObject
export type PauseSubsequenceRequestBody = undefined
export interface PauseSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PauseSubsequenceSuccessResponse = PauseSubsequenceResponses["200"]
export interface PauseSubsequenceInput {
  path: PauseSubsequencePathParams
  query?: PauseSubsequenceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ResumeSubsequencePathParams = {
  "id": string;
}
export type ResumeSubsequenceQueryParams = EmptyObject
export type ResumeSubsequenceRequestBody = undefined
export interface ResumeSubsequenceResponses {
  "200": Models.CampaignSubsequence
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ResumeSubsequenceSuccessResponse = ResumeSubsequenceResponses["200"]
export interface ResumeSubsequenceInput {
  path: ResumeSubsequencePathParams
  query?: ResumeSubsequenceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetSubsequenceSendingStatusPathParams = {
  "id": string;
}
export type GetSubsequenceSendingStatusQueryParams = {
  "with_ai_summary"?: boolean;
}
export type GetSubsequenceSendingStatusRequestBody = undefined
export interface GetSubsequenceSendingStatusResponses {
  "200": {
  "diagnostics"?: null | {
    "campaign_id"?: string;
    "subsequence_id"?: string;
    "last_updated"?: string;
    "status"?: "campaign_paused" | "campaign_draft" | "campaign_completed" | "campaign_running_subsequences" | "campaign_bounce_protect" | "campaign_accounts_unhealthy" | "campaign_account_suspended" | "out_of_schedule" | "waiting_for_leads" | "daily_limit_met" | "account_daily_limit_met" | "new_lead_limit_met" | "all_accounts_unhealthy" | "waiting_for_esp_match" | "domain_limit_reached" | "follow_up_delay_not_met" | "no_accounts_available" | "healthy" | null;
    "issue_tracking"?: {
      "current_status_code"?: null | string;
      "issue_first_seen_at"?: null | string;
      "consecutive_loops_with_issue"?: number;
      "last_healthy_send_at"?: null | string;
    };
    "accounts_summary"?: {
      "total_connected"?: number;
      "available"?: number;
      "unavailable"?: {
        "daily_limit_hit"?: number;
        "slow_ramp_limit_hit"?: number;
        "disconnected"?: number;
        "global_gap_not_met"?: number;
      };
    };
    "campaign_daily_limit"?: {
      "limit"?: number;
      "sent"?: number;
      "limit_hit"?: boolean;
    };
    "new_lead_limit"?: {
      "enabled"?: boolean;
      "limit"?: null | number;
      "contacted"?: number;
      "limit_hit"?: boolean;
    };
    "schedule_status"?: {
      "in_schedule"?: boolean;
    };
    "send_one_by_one"?: {
      "enabled"?: boolean;
      "single_account_per_wait_gap"?: boolean;
    };
    "follow_ups_waiting"?: {
      "count"?: number;
      "earliest_wait_time_seconds"?: null | number;
    };
    "esp_routing_status"?: {
      "enabled"?: boolean;
      "waiting_for_match"?: boolean;
      "connected_esps"?: number[];
    };
    "domain_limiter"?: {
      "active"?: boolean;
      "domains_at_limit"?: number;
    };
    "leads_status"?: {
      "no_leads_ready"?: boolean;
      "account_unavailable_skips"?: number;
      "delay_not_met_skips"?: number;
    };
    [key: string]: unknown;
  };
  "summary"?: null | {
    "status"?: null | string;
    "status_message"?: null | string;
    "issue_started_at"?: null | string;
    "last_healthy_send_at"?: null | string;
    "ai_summary"?: null | string;
    [key: string]: unknown;
  };
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetSubsequenceSendingStatusSuccessResponse = GetSubsequenceSendingStatusResponses["200"]
export interface GetSubsequenceSendingStatusInput {
  path: GetSubsequenceSendingStatusPathParams
  query?: GetSubsequenceSendingStatusQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateSuperSearchEnrichmentPathParams = EmptyObject
export type CreateSuperSearchEnrichmentQueryParams = EmptyObject
export type CreateSuperSearchEnrichmentRequestBody = {
  "resource_id": string;
  "type"?: "work_email_enrichment" | "fully_enriched_profile" | "email_verification" | "joblisting" | "technologies" | "news" | "funding" | "engagement_score" | "ai_enrichment" | "custom_flow";
  "limit"?: number;
  "filters"?: Record<string, unknown>[];
  "custom_flow"?: string[];
  "integration_actions"?: Record<string, Record<string, {
    "mapping": Record<string, string>;
  }>>;
}
export interface CreateSuperSearchEnrichmentResponses {
  "200": {
  "id": string;
  "limit"?: number;
  "organization_id": string;
  "resource_id": string;
  "enrichment_payload"?: {
    "joblisting"?: boolean;
    "email_verification"?: boolean;
    "work_email_enrichment"?: boolean;
    "fully_enriched_profile"?: boolean;
    "custom_flow"?: string[];
    [key: string]: unknown;
  };
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateSuperSearchEnrichmentSuccessResponse = CreateSuperSearchEnrichmentResponses["200"]
export interface CreateSuperSearchEnrichmentInput {
  path?: CreateSuperSearchEnrichmentPathParams
  query?: CreateSuperSearchEnrichmentQueryParams
  body: CreateSuperSearchEnrichmentRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateAIEnrichmentPathParams = EmptyObject
export type CreateAIEnrichmentQueryParams = EmptyObject
export type CreateAIEnrichmentRequestBody = {
  "resource_id": string;
  "output_column": string;
  "resource_type": 1 | 2;
  "input_columns"?: string[];
  "model_version": "3.5" | "4.0" | "gpt-4o" | "o3" | "gpt-4.1" | "gpt-4.1-mini" | "gpt-5-mini" | "gpt-5-nano" | "gpt-5" | "gpt-5.4" | "claude-4.5-sonnet" | "claude-4.6-sonnet" | "r1" | "grok-4.3" | "gemini-3.0-flash" | "gemini-3.5-flash" | "sonar" | "sonar-pro" | "instantly-ai-lightspeed-agent-for-web-research" | "instantly-ai-lightspeed-agent-for-email-generation";
  "use_instantly_account"?: boolean;
  "overwrite"?: boolean;
  "auto_update"?: boolean;
  "skip_leads_without_email"?: boolean;
  "limit"?: number;
  "prompt"?: string;
  "template_id"?: string;
  "status"?: 1 | 2 | 3 | 4;
  "filters"?: Record<string, unknown>[];
}
export interface CreateAIEnrichmentResponses {
  "200": {
  "id": string;
  "resource_id": string;
  "resource_type": "CAMPAIGN" | "LIST" | 1 | 2;
  "output_column": string;
  "status": number;
  "model_version": string;
  "input_columns"?: string[];
  "overwrite": boolean;
  "auto_update": boolean;
  "limit"?: number;
  "template_id"?: null | string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateAIEnrichmentSuccessResponse = CreateAIEnrichmentResponses["200"]
export interface CreateAIEnrichmentInput {
  path?: CreateAIEnrichmentPathParams
  query?: CreateAIEnrichmentQueryParams
  body: CreateAIEnrichmentRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetAiEnrichmentForResourcePathParams = {
  "resource_id": string;
}
export type GetAiEnrichmentForResourceQueryParams = EmptyObject
export type GetAiEnrichmentForResourceRequestBody = undefined
export interface GetAiEnrichmentForResourceResponses {
  "200": {
  "id"?: string;
  "organization_id": string;
  "resource_id": string;
  "resource_type": "CAMPAIGN" | "LIST" | 1 | 2;
  "output_column": string;
  "status": number;
}[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetAiEnrichmentForResourceSuccessResponse = GetAiEnrichmentForResourceResponses["200"]
export interface GetAiEnrichmentForResourceInput {
  path: GetAiEnrichmentForResourcePathParams
  query?: GetAiEnrichmentForResourceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CountLeadsFromSupersearchPathParams = EmptyObject
export type CountLeadsFromSupersearchQueryParams = EmptyObject
export type CountLeadsFromSupersearchRequestBody = {
  "search_filters": {
    "locations"?: ({
      "place_id": string;
      "label"?: string;
    } | unknown | unknown | unknown)[] | {
      "include"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
      "exclude"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
    };
    "department"?: ("Engineering" | "Finance & Administration" | "Human Resources" | "IT & IS" | "Marketing" | "Operations" | "Sales" | "Support" | "Other")[];
    "level"?: ("C-Level" | "VP-Level" | "Director-Level" | "Manager-Level" | "Staff" | "Entry level" | "Mid-Senior level" | "Director" | "Associate" | "Owner" | "Executive" | "Manager" | "Senior" | "Chief X Officer (CxO)" | "Internship" | "Vice President (VP)" | "Unpaid / Internship" | "Partner")[];
    "employeeCount"?: ("0 - 25" | "25 - 100" | "100 - 250" | "250 - 1000" | "1K - 10K" | "10K - 50K" | "50K - 100K" | "> 100K" | {
      "op": string;
      "min"?: number;
      "max"?: number;
    })[];
    "revenue"?: ("$0 - 1M" | "$1 - 10M" | "$10 - 50M" | "$50 - 100M" | "$100 - 250M" | "$250 - 500M" | "$500M - 1B" | "> $1B")[];
    "news"?: ("launches" | "expands_offices_to" | "hires" | "partners_with" | "leaves" | "receives_financing" | "recognized_as" | "closes_offices_in" | "is_developing" | "has_issues_with" | "promotes" | "opens_new_location" | "receives_award" | "acquires" | "invests_into_assets" | "signs_new_client" | "increases_headcount_by" | "retires_from" | "invests_into" | "integrates_with" | "expands_facilities" | "goes_public" | "sells_assets_to" | "identified_as_competitor_of" | "decreases_headcount_by" | "expands_offices_in" | "files_suit_against" | "merges_with")[];
    "title"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "name"?: string[];
    "company_name"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "look_alike"?: string;
    "keyword_filter"?: {
      "exclude"?: string;
      "include"?: string;
    };
    "industry"?: {
      "exclude"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
      "include"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
    };
    "subIndustry"?: {
      "exclude"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
      "include"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
    };
    "domains"?: string[];
    "funding_type"?: ("angel" | "seed" | "pre_seed" | "series_a" | "pre_series_a" | "series_b" | "pre_series_b" | "series_c" | "pre_series_c" | "series_d" | "pre_series_d" | "series_e" | "pre_series_e" | "series_f" | "pre_series_f" | "series_g" | "pre_series_g" | "series_h" | "pre_series_h" | "series_i" | "pre_series_i" | "series_j" | "pre_series_j")[];
    "signals"?: (string | {
      "key": string;
      "period_days"?: number;
      "keywords"?: string[] | Record<string, string[]>;
    })[];
    "skip_owned_leads"?: boolean;
    "show_one_lead_per_company"?: boolean;
    "location_mode"?: "contact" | "company";
  };
  "skip_owned_leads"?: boolean;
  "show_one_lead_per_company"?: boolean;
}
export interface CountLeadsFromSupersearchResponses {
  "200": {
  "number_of_leads"?: number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CountLeadsFromSupersearchSuccessResponse = CountLeadsFromSupersearchResponses["200"]
export interface CountLeadsFromSupersearchInput {
  path?: CountLeadsFromSupersearchPathParams
  query?: CountLeadsFromSupersearchQueryParams
  body: CountLeadsFromSupersearchRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type EnrichLeadsFromSupersearchPathParams = EmptyObject
export type EnrichLeadsFromSupersearchQueryParams = EmptyObject
export type EnrichLeadsFromSupersearchRequestBody = {
  "search_filters": {
    "locations"?: ({
      "place_id": string;
      "label"?: string;
    } | unknown | unknown | unknown)[] | {
      "include"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
      "exclude"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
    };
    "department"?: ("Engineering" | "Finance & Administration" | "Human Resources" | "IT & IS" | "Marketing" | "Operations" | "Sales" | "Support" | "Other")[];
    "level"?: ("C-Level" | "VP-Level" | "Director-Level" | "Manager-Level" | "Staff" | "Entry level" | "Mid-Senior level" | "Director" | "Associate" | "Owner" | "Executive" | "Manager" | "Senior" | "Chief X Officer (CxO)" | "Internship" | "Vice President (VP)" | "Unpaid / Internship" | "Partner")[];
    "employeeCount"?: ("0 - 25" | "25 - 100" | "100 - 250" | "250 - 1000" | "1K - 10K" | "10K - 50K" | "50K - 100K" | "> 100K" | {
      "op": string;
      "min"?: number;
      "max"?: number;
    })[];
    "revenue"?: ("$0 - 1M" | "$1 - 10M" | "$10 - 50M" | "$50 - 100M" | "$100 - 250M" | "$250 - 500M" | "$500M - 1B" | "> $1B")[];
    "news"?: ("launches" | "expands_offices_to" | "hires" | "partners_with" | "leaves" | "receives_financing" | "recognized_as" | "closes_offices_in" | "is_developing" | "has_issues_with" | "promotes" | "opens_new_location" | "receives_award" | "acquires" | "invests_into_assets" | "signs_new_client" | "increases_headcount_by" | "retires_from" | "invests_into" | "integrates_with" | "expands_facilities" | "goes_public" | "sells_assets_to" | "identified_as_competitor_of" | "decreases_headcount_by" | "expands_offices_in" | "files_suit_against" | "merges_with")[];
    "title"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "name"?: string[];
    "company_name"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "look_alike"?: string;
    "keyword_filter"?: {
      "exclude"?: string;
      "include"?: string;
    };
    "industry"?: {
      "exclude"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
      "include"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
    };
    "subIndustry"?: {
      "exclude"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
      "include"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
    };
    "domains"?: string[];
    "funding_type"?: ("angel" | "seed" | "pre_seed" | "series_a" | "pre_series_a" | "series_b" | "pre_series_b" | "series_c" | "pre_series_c" | "series_d" | "pre_series_d" | "series_e" | "pre_series_e" | "series_f" | "pre_series_f" | "series_g" | "pre_series_g" | "series_h" | "pre_series_h" | "series_i" | "pre_series_i" | "series_j" | "pre_series_j")[];
    "signals"?: (string | {
      "key": string;
      "period_days"?: number;
      "keywords"?: string[] | Record<string, string[]>;
    })[];
    "skip_owned_leads"?: boolean;
    "show_one_lead_per_company"?: boolean;
    "location_mode"?: "contact" | "company";
  };
  "search_name"?: string;
  "work_email_enrichment"?: boolean;
  "fully_enriched_profile"?: boolean;
  "custom_flow"?: string[];
  "signal_enrichment"?: (string | {
    "key": string;
    "period_days"?: number;
    "keywords"?: string[] | Record<string, string[]>;
  })[];
  "resource_id"?: string;
  "auto_update"?: boolean;
  "live_list"?: {
    "schedule": {
      "frequency": "daily" | "weekly" | "monthly";
      "day_of_week"?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
      "day_of_month"?: number;
      "time"?: string;
      "timezone"?: string;
    };
    "leads_per_run"?: number;
    "push_to_campaign_id"?: string;
  };
  "skip_rows_without_email"?: boolean;
  "list_name"?: string;
  "limit": number;
  "ai_enrichment"?: Record<string, unknown>;
}
export interface EnrichLeadsFromSupersearchResponses {
  "200": {
  "id": string;
  "organization_id": string;
  "resource_id": string;
  "resource_type"?: 1 | 2;
  "search_filters"?: Record<string, unknown>;
  "limit"?: number;
  "list_name"?: string;
  "custom_flow"?: string[];
  "background_job_id"?: null | string;
  "live_list_workflow_id"?: null | string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type EnrichLeadsFromSupersearchSuccessResponse = EnrichLeadsFromSupersearchResponses["200"]
export interface EnrichLeadsFromSupersearchInput {
  path?: EnrichLeadsFromSupersearchPathParams
  query?: EnrichLeadsFromSupersearchQueryParams
  body: EnrichLeadsFromSupersearchRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetEnrichmentHistoryPathParams = {
  "resource_id": string;
}
export type GetEnrichmentHistoryQueryParams = {
  "offset"?: number;
  "limit"?: number;
}
export type GetEnrichmentHistoryRequestBody = undefined
export interface GetEnrichmentHistoryResponses {
  "200": Record<string, unknown>[]
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetEnrichmentHistorySuccessResponse = GetEnrichmentHistoryResponses["200"]
export interface GetEnrichmentHistoryInput {
  path: GetEnrichmentHistoryPathParams
  query?: GetEnrichmentHistoryQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PreviewLeadsFromSupersearchPathParams = EmptyObject
export type PreviewLeadsFromSupersearchQueryParams = EmptyObject
export type PreviewLeadsFromSupersearchRequestBody = {
  "search_filters": {
    "locations"?: ({
      "place_id": string;
      "label"?: string;
    } | unknown | unknown | unknown)[] | {
      "include"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
      "exclude"?: ({
        "place_id": string;
        "label"?: string;
      } | unknown | unknown | unknown)[];
    };
    "department"?: ("Engineering" | "Finance & Administration" | "Human Resources" | "IT & IS" | "Marketing" | "Operations" | "Sales" | "Support" | "Other")[];
    "level"?: ("C-Level" | "VP-Level" | "Director-Level" | "Manager-Level" | "Staff" | "Entry level" | "Mid-Senior level" | "Director" | "Associate" | "Owner" | "Executive" | "Manager" | "Senior" | "Chief X Officer (CxO)" | "Internship" | "Vice President (VP)" | "Unpaid / Internship" | "Partner")[];
    "employeeCount"?: ("0 - 25" | "25 - 100" | "100 - 250" | "250 - 1000" | "1K - 10K" | "10K - 50K" | "50K - 100K" | "> 100K" | {
      "op": string;
      "min"?: number;
      "max"?: number;
    })[];
    "revenue"?: ("$0 - 1M" | "$1 - 10M" | "$10 - 50M" | "$50 - 100M" | "$100 - 250M" | "$250 - 500M" | "$500M - 1B" | "> $1B")[];
    "news"?: ("launches" | "expands_offices_to" | "hires" | "partners_with" | "leaves" | "receives_financing" | "recognized_as" | "closes_offices_in" | "is_developing" | "has_issues_with" | "promotes" | "opens_new_location" | "receives_award" | "acquires" | "invests_into_assets" | "signs_new_client" | "increases_headcount_by" | "retires_from" | "invests_into" | "integrates_with" | "expands_facilities" | "goes_public" | "sells_assets_to" | "identified_as_competitor_of" | "decreases_headcount_by" | "expands_offices_in" | "files_suit_against" | "merges_with")[];
    "title"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "name"?: string[];
    "company_name"?: {
      "include"?: string[];
      "exclude"?: string[];
    };
    "look_alike"?: string;
    "keyword_filter"?: {
      "exclude"?: string;
      "include"?: string;
    };
    "industry"?: {
      "exclude"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
      "include"?: ("Agriculture & Mining" | "Business Services" | "Computers & Electronics" | "Consumer Services" | "Education" | "Energy & Utilities" | "Financial Services" | "Government" | "Healthcare, Pharmaceuticals, & Biotech" | "Manufacturing" | "Media & Entertainment" | "Non-Profit" | "Other" | "Real Estate & Construction" | "Retail" | "Software & Internet" | "Telecommunications" | "Transportation & Storage" | "Travel, Recreation, and Leisure" | "Wholesale & Distribution")[];
    };
    "subIndustry"?: {
      "exclude"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
      "include"?: ("Dairy" | "Farming" | "Fishery" | "Food & Beverages" | "Food Production" | "Mining & Metals" | "Paper & Forest Products" | "Ranching" | "Tobacco" | "Alternative Dispute Resolution" | "Animation" | "Business Supplies and Equipment" | "Design" | "Environmental Services" | "Events Services" | "Executive Office" | "Facilities Services" | "Fund-Raising" | "Graphic Design" | "Human Resources" | "Import and Export" | "Individual & Family Services" | "Information Services" | "International Trade and Development" | "Law Practice" | "Legal Services" | "Management Consulting" | "Market Research" | "Marketing and Advertising" | "Outsourcing/Offshoring" | "Professional Training & Coaching" | "Program Development" | "Public Relations and Communications" | "Public Safety" | "Security and Investigations" | "Staffing and Recruiting" | "Think Tanks" | "Translation and Localization" | "Writing and Editing" | "Computer Games" | "Computer Hardware" | "Computer Networking" | "Consumer Electronics" | "Semiconductors" | "Consumer Goods" | "Consumer Services" | "Education Management" | "E-Learning" | "Higher Education" | "Primary/Secondary Education" | "Research" | "Oil & Energy" | "Renewables & Environment" | "Utilities" | "Accounting" | "Banking" | "Capital Markets" | "Financial Services" | "Insurance" | "Investment Banking" | "Investment Management" | "Venture Capital & Private Equity" | "Defense & Space" | "Government Administration" | "Government Relations" | "International Affairs" | "Judiciary" | "Law Enforcement" | "Legislative Office" | "Military" | "Museums and Institutions" | "Public Policy" | "Alternative Medicine" | "Biotechnology" | "Health, Wellness and Fitness" | "Hospital & Health Care" | "Medical Devices" | "Medical Practice" | "Mental Health Care" | "Pharmaceuticals" | "Veterinary" | "Automotive" | "Aviation & Aerospace" | "Chemicals" | "Electrical/Electronic Manufacturing" | "Furniture" | "Industrial Automation" | "Machinery" | "Mechanical or Industrial Engineering" | "Plastics" | "Railroad Manufacture" | "Shipbuilding" | "Textiles" | "Broadcast Media" | "Media Production" | "Motion Pictures and Film" | "Music" | "Newspapers" | "Online Media" | "Printing" | "Publishing" | "Civic & Social Organization" | "Libraries" | "Non-Profit Organization Management" | "Philanthropy" | "Political Organization" | "Religious Institutions" | "Arts and Crafts" | "Nanotechnology" | "Architecture & Planning" | "Building Materials" | "Civil Engineering" | "Commercial Real Estate" | "Construction" | "Glass, Ceramics & Concrete" | "Real Estate" | "Apparel & Fashion" | "Cosmetics" | "Luxury Goods & Jewelry" | "Retail" | "Supermarkets" | "Computer & Network Security" | "Computer Software" | "Information Technology and Services" | "Internet" | "Telecommunications" | "Wireless" | "Airlines/Aviation" | "Logistics and Supply Chain" | "Maritime" | "Package/Freight Delivery" | "Packaging and Containers" | "Warehousing" | "Transportation/Trucking/Railroad" | "Entertainment" | "Fine Art" | "Gambling & Casinos" | "Hospitality" | "Leisure, Travel & Tourism" | "Performing Arts" | "Photography" | "Recreational Facilities and Services" | "Restaurants" | "Sporting Goods" | "Sports" | "Wine and Spirits" | "Wholesale")[];
    };
    "domains"?: string[];
    "funding_type"?: ("angel" | "seed" | "pre_seed" | "series_a" | "pre_series_a" | "series_b" | "pre_series_b" | "series_c" | "pre_series_c" | "series_d" | "pre_series_d" | "series_e" | "pre_series_e" | "series_f" | "pre_series_f" | "series_g" | "pre_series_g" | "series_h" | "pre_series_h" | "series_i" | "pre_series_i" | "series_j" | "pre_series_j")[];
    "signals"?: (string | {
      "key": string;
      "period_days"?: number;
      "keywords"?: string[] | Record<string, string[]>;
    })[];
    "skip_owned_leads"?: boolean;
    "show_one_lead_per_company"?: boolean;
    "location_mode"?: "contact" | "company";
  };
  "skip_owned_leads"?: boolean;
  "show_one_lead_per_company"?: boolean;
}
export interface PreviewLeadsFromSupersearchResponses {
  "200": {
  "number_of_leads"?: number;
  "number_of_redacted_results"?: number;
  "leads"?: {
    "firstName"?: string;
    "lastName"?: string;
    "fullName"?: string;
    "jobTitle"?: string;
    "location"?: string;
    "linkedIn"?: string;
    "companyName"?: string;
    "companyLogo"?: string;
    "companyId"?: string;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PreviewLeadsFromSupersearchSuccessResponse = PreviewLeadsFromSupersearchResponses["200"]
export interface PreviewLeadsFromSupersearchInput {
  path?: PreviewLeadsFromSupersearchPathParams
  query?: PreviewLeadsFromSupersearchQueryParams
  body: PreviewLeadsFromSupersearchRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type RunEnrichmentPathParams = EmptyObject
export type RunEnrichmentQueryParams = EmptyObject
export type RunEnrichmentRequestBody = {
  "resource_id": string;
  "lead_ids"?: string[];
  "limit"?: number;
  "column_name"?: string;
  "overwrite"?: boolean;
  "starting_row"?: number;
  "count"?: number;
  "filters"?: {
    "column_name": string;
    "type": number;
    "value": string[];
  }[];
}
export interface RunEnrichmentResponses {
  "200": {
  "id"?: string;
  "resource_id"?: string;
  "enrichment_payload"?: Record<string, unknown>;
}
  "400": {
  "message"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type RunEnrichmentSuccessResponse = RunEnrichmentResponses["200"]
export interface RunEnrichmentInput {
  path?: RunEnrichmentPathParams
  query?: RunEnrichmentQueryParams
  body: RunEnrichmentRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type SignalKeywordsFacetPathParams = EmptyObject
export type SignalKeywordsFacetQueryParams = EmptyObject
export type SignalKeywordsFacetRequestBody = {
  "category": string;
  "field": string;
  "prefix"?: string;
  "limit"?: number;
}
export interface SignalKeywordsFacetResponses {
  "200": {
  "keywords"?: {
    "keyword"?: string;
    "count"?: number;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type SignalKeywordsFacetSuccessResponse = SignalKeywordsFacetResponses["200"]
export interface SignalKeywordsFacetInput {
  path?: SignalKeywordsFacetPathParams
  query?: SignalKeywordsFacetQueryParams
  body: SignalKeywordsFacetRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetEnrichmentForResourcePathParams = {
  "resource_id": string;
}
export type GetEnrichmentForResourceQueryParams = EmptyObject
export type GetEnrichmentForResourceRequestBody = undefined
export interface GetEnrichmentForResourceResponses {
  "200": {
  "resource_id": string;
  "in_progress"?: boolean;
  "has_no_leads"?: boolean;
  "exists"?: boolean;
  "enrichment_payload": {
    "work_email_enrichment"?: boolean;
    "fully_enriched_profile"?: boolean;
    "email_verification"?: boolean;
    "joblisting"?: boolean;
    "technologies"?: boolean;
    "news"?: boolean;
    "funding"?: boolean;
    "engagement_score"?: boolean;
    "ai_enrichment"?: Record<string, unknown>;
    "custom_flow"?: string[];
    "limit"?: number;
    "autofill"?: boolean;
    [key: string]: unknown;
  };
  "auto_update"?: boolean;
  "is_evergreen"?: boolean;
  "search_filters"?: Record<string, unknown>;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetEnrichmentForResourceSuccessResponse = GetEnrichmentForResourceResponses["200"]
export interface GetEnrichmentForResourceInput {
  path: GetEnrichmentForResourcePathParams
  query?: GetEnrichmentForResourceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type UpdateEnrichmentSettingsForResourcePathParams = {
  "resource_id": string;
}
export type UpdateEnrichmentSettingsForResourceQueryParams = EmptyObject
export type UpdateEnrichmentSettingsForResourceRequestBody = {
  "auto_update"?: boolean;
  "skip_rows_without_email"?: boolean;
  "is_evergreen"?: boolean;
}
export interface UpdateEnrichmentSettingsForResourceResponses {
  "200": Models.SuperSearchEnrichment
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type UpdateEnrichmentSettingsForResourceSuccessResponse = UpdateEnrichmentSettingsForResourceResponses["200"]
export interface UpdateEnrichmentSettingsForResourceInput {
  path: UpdateEnrichmentSettingsForResourcePathParams
  query?: UpdateEnrichmentSettingsForResourceQueryParams
  body?: UpdateEnrichmentSettingsForResourceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListWebhookEventPathParams = EmptyObject
export type ListWebhookEventQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "success"?: boolean;
  "from"?: string;
  "to"?: string;
  "search"?: string;
}
export type ListWebhookEventRequestBody = undefined
export interface ListWebhookEventResponses {
  "200": {
  "items": Models.WebhookEvent[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListWebhookEventSuccessResponse = ListWebhookEventResponses["200"]
export interface ListWebhookEventInput {
  path?: ListWebhookEventPathParams
  query?: ListWebhookEventQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWebhookEventsSummaryPathParams = EmptyObject
export type GetWebhookEventsSummaryQueryParams = {
  "from"?: string;
  "to"?: string;
}
export type GetWebhookEventsSummaryRequestBody = undefined
export interface GetWebhookEventsSummaryResponses {
  "200": {
  "total_events": number;
  "successful_events": number;
  "failed_events": number;
  "success_rate": number;
  "failure_rate": number;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWebhookEventsSummarySuccessResponse = GetWebhookEventsSummaryResponses["200"]
export interface GetWebhookEventsSummaryInput {
  path?: GetWebhookEventsSummaryPathParams
  query?: GetWebhookEventsSummaryQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWebhookEventsSummaryByDatePathParams = EmptyObject
export type GetWebhookEventsSummaryByDateQueryParams = {
  "from"?: string;
  "to"?: string;
}
export type GetWebhookEventsSummaryByDateRequestBody = undefined
export interface GetWebhookEventsSummaryByDateResponses {
  "200": {
  "items"?: {
    "date": string;
    "total_events": number;
    "successful_events": number;
    "failed_events": number;
    "success_rate": number;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWebhookEventsSummaryByDateSuccessResponse = GetWebhookEventsSummaryByDateResponses["200"]
export interface GetWebhookEventsSummaryByDateInput {
  path?: GetWebhookEventsSummaryByDatePathParams
  query?: GetWebhookEventsSummaryByDateQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWebhookEventPathParams = {
  "id": string;
}
export type GetWebhookEventQueryParams = EmptyObject
export type GetWebhookEventRequestBody = undefined
export interface GetWebhookEventResponses {
  "200": Models.WebhookEvent
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWebhookEventSuccessResponse = GetWebhookEventResponses["200"]
export interface GetWebhookEventInput {
  path: GetWebhookEventPathParams
  query?: GetWebhookEventQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListWebhookPathParams = EmptyObject
export type ListWebhookQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "campaign"?: string;
  "event_type"?: "all_events" | "email_sent" | "email_opened" | "email_link_clicked" | "reply_received" | "email_bounced" | "lead_unsubscribed" | "campaign_completed" | "account_error" | "lead_neutral" | "lead_interested" | "lead_not_interested" | "lead_meeting_booked" | "lead_meeting_completed" | "lead_closed" | "lead_out_of_office" | "lead_wrong_person";
}
export type ListWebhookRequestBody = undefined
export interface ListWebhookResponses {
  "200": {
  "items": Models.Webhook[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListWebhookSuccessResponse = ListWebhookResponses["200"]
export interface ListWebhookInput {
  path?: ListWebhookPathParams
  query?: ListWebhookQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateWebhookPathParams = EmptyObject
export type CreateWebhookQueryParams = EmptyObject
export type CreateWebhookRequestBody = {
  "campaign"?: string | null;
  "name"?: string | null;
  "target_hook_url": string;
  "event_type"?: "all_events" | "email_sent" | "email_opened" | "email_link_clicked" | "reply_received" | "email_bounced" | "lead_unsubscribed" | "campaign_completed" | "account_error" | "lead_neutral" | "lead_interested" | "lead_not_interested" | "lead_meeting_booked" | "lead_meeting_completed" | "lead_closed" | "lead_out_of_office" | "lead_wrong_person" | "lead_no_show" | "supersearch_enrichment_completed" | null;
  "custom_interest_value"?: number | null;
  "headers"?: Record<string, string> | null;
}
export interface CreateWebhookResponses {
  "200": Models.Webhook
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateWebhookSuccessResponse = CreateWebhookResponses["200"]
export interface CreateWebhookInput {
  path?: CreateWebhookPathParams
  query?: CreateWebhookQueryParams
  body: CreateWebhookRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListWebhookEventTypesPathParams = EmptyObject
export type ListWebhookEventTypesQueryParams = EmptyObject
export type ListWebhookEventTypesRequestBody = undefined
export interface ListWebhookEventTypesResponses {
  "200": {
  "event_types"?: {
    "id"?: string;
    "label"?: string;
    "type"?: string;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListWebhookEventTypesSuccessResponse = ListWebhookEventTypesResponses["200"]
export interface ListWebhookEventTypesInput {
  path?: ListWebhookEventTypesPathParams
  query?: ListWebhookEventTypesQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWebhookPathParams = {
  "id": string;
}
export type GetWebhookQueryParams = EmptyObject
export type GetWebhookRequestBody = undefined
export interface GetWebhookResponses {
  "200": Models.Webhook
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWebhookSuccessResponse = GetWebhookResponses["200"]
export interface GetWebhookInput {
  path: GetWebhookPathParams
  query?: GetWebhookQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchWebhookPathParams = {
  "id": string;
}
export type PatchWebhookQueryParams = EmptyObject
export type PatchWebhookRequestBody = {
  "campaign"?: string | null;
  "name"?: string | null;
  "target_hook_url"?: string;
  "event_type"?: "all_events" | "email_sent" | "email_opened" | "email_link_clicked" | "reply_received" | "email_bounced" | "lead_unsubscribed" | "campaign_completed" | "account_error" | "lead_neutral" | "lead_interested" | "lead_not_interested" | "lead_meeting_booked" | "lead_meeting_completed" | "lead_closed" | "lead_out_of_office" | "lead_wrong_person" | "lead_no_show" | "supersearch_enrichment_completed" | null;
  "custom_interest_value"?: number | null;
  "headers"?: Record<string, string> | null;
}
export interface PatchWebhookResponses {
  "200": Models.Webhook
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchWebhookSuccessResponse = PatchWebhookResponses["200"]
export interface PatchWebhookInput {
  path: PatchWebhookPathParams
  query?: PatchWebhookQueryParams
  body?: PatchWebhookRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteWebhookPathParams = {
  "id": string;
}
export type DeleteWebhookQueryParams = EmptyObject
export type DeleteWebhookRequestBody = null
export interface DeleteWebhookResponses {
  "200": Models.Webhook
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteWebhookSuccessResponse = DeleteWebhookResponses["200"]
export interface DeleteWebhookInput {
  path: DeleteWebhookPathParams
  query?: DeleteWebhookQueryParams
  body?: DeleteWebhookRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ResumeWebhookPathParams = {
  "id": string;
}
export type ResumeWebhookQueryParams = EmptyObject
export type ResumeWebhookRequestBody = undefined
export interface ResumeWebhookResponses {
  "200": Models.Webhook
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ResumeWebhookSuccessResponse = ResumeWebhookResponses["200"]
export interface ResumeWebhookInput {
  path: ResumeWebhookPathParams
  query?: ResumeWebhookQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type TestWebhookPathParams = {
  "id": string;
}
export type TestWebhookQueryParams = EmptyObject
export type TestWebhookRequestBody = undefined
export interface TestWebhookResponses {
  "200": {
  "success"?: boolean;
  "message"?: string;
  "response_time_ms"?: number;
  "status_code"?: number;
  "error"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type TestWebhookSuccessResponse = TestWebhookResponses["200"]
export interface TestWebhookInput {
  path: TestWebhookPathParams
  query?: TestWebhookQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspacePlanDetailsPathParams = EmptyObject
export type GetWorkspacePlanDetailsQueryParams = EmptyObject
export type GetWorkspacePlanDetailsRequestBody = undefined
export interface GetWorkspacePlanDetailsResponses {
  "200": {
  "organization_id"?: string;
  "organization_name"?: string;
  "subscriptions"?: {
    "outreach"?: {
      "plan_name"?: string;
      "addons_qty"?: number;
      "total_lead_limit"?: number;
      "current_lead_count"?: number;
      "base_lead_limit"?: number;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "current_period_end"?: null | number;
      "cancel_at_time"?: null | number;
      "price_in_dollars"?: null | number;
      "product_id"?: "pid_ls_v1" | "pid_hg_v1" | "pid_g_v1" | "pid_g_v2" | "pid_nic_v1" | "pid_nic_v1_annual" | "pid_gic_v1" | "pid_gic_v1_annual" | "pid_sic_v1" | "pid_sic_v1_annual" | "pid_hic_v1" | "pid_hic_v1_annual" | "pid_verify_v1_monthly" | "pid_hv_v1" | "pid_hv_v1_annual" | "pid_lsv_v1" | "pid_lsv_v1_annual" | "pid_crm_hg" | "pid_crm_g" | "pid_ip_g" | "pid_ip_hg" | "pid_addon_25kl_v1" | "pid_addon_lf_10k_v1" | "pid_addon_ic_50k_v1" | "pid_addon_lf_10k_v1_annual" | "pid_addon_ic_50k_v1_annual" | null | null;
    };
    "credits"?: {
      "plan_name"?: string;
      "total_credits"?: number;
      "available_credits"?: number;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "current_period_end"?: null | number;
      "cancel_at_time"?: null | number;
      "price_in_dollars"?: null | number;
      "product_id"?: "pid_nic_v1" | "pid_nic_v1_annual" | "pid_gic_v1" | "pid_gic_v1_annual" | "pid_sic_v1" | "pid_sic_v1_annual" | "pid_hic_v1" | "pid_hic_v1_annual" | null | null;
      "price_option_id"?: null | string;
    };
    "crm"?: {
      "plan_name"?: null | string;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "current_period_end"?: null | number;
      "cancel_at_time"?: null | number;
      "price_in_dollars"?: null | number;
      "product_id"?: null | string;
      "available_credits"?: null | number;
      "plan_limit"?: null | number;
    };
    "website_visitors"?: {
      "plan_name"?: null | string;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "current_period_end"?: null | number;
      "cancel_at_time"?: null | number;
      "price_in_dollars"?: null | number;
      "product_id"?: null | string;
      "available_credits"?: null | number;
      "plan_limit"?: null | number;
    };
    "inbox_placement"?: {
      "plan_name"?: null | string;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "current_period_end"?: null | number;
      "cancel_at_time"?: null | number;
      "price_in_dollars"?: null | number;
      "product_id"?: null | string;
      "available_credits"?: null | number;
      "plan_limit"?: null | number;
    };
  };
  "addons"?: {
    "outreach"?: {
      "product_id"?: "pid_addon_25kl_v1";
      "unit_lead_limit"?: number;
      "existing_quantity"?: number;
      "max_quantity"?: number;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "can_purchase"?: boolean;
      "purchase_blocked_reason"?: null | string;
      "annual_discount_percent"?: number;
      "monthly_pricing_tiers"?: {
        "from_quantity"?: number;
        "to_quantity"?: null | number;
        "price_in_dollars"?: number;
      }[];
    };
    "credits"?: {
      "product_id"?: "pid_addon_ic_50k_v1";
      "annual_product_id"?: "pid_addon_ic_50k_v1_annual";
      "unit_credits"?: number;
      "annual_unit_credits"?: number;
      "existing_quantity"?: number;
      "max_quantity"?: number;
      "interval"?: "day" | "week" | "month" | "year" | null | null;
      "can_purchase"?: boolean;
      "purchase_blocked_reason"?: null | string;
      "monthly_price_in_dollars"?: number;
      "annual_price_in_dollars"?: number;
    };
  };
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspacePlanDetailsSuccessResponse = GetWorkspacePlanDetailsResponses["200"]
export interface GetWorkspacePlanDetailsInput {
  path?: GetWorkspacePlanDetailsPathParams
  query?: GetWorkspacePlanDetailsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspaceSubscriptionDetailsPathParams = EmptyObject
export type GetWorkspaceSubscriptionDetailsQueryParams = EmptyObject
export type GetWorkspaceSubscriptionDetailsRequestBody = undefined
export interface GetWorkspaceSubscriptionDetailsResponses {
  "200": {
  "subscriptions"?: {
    "workspace_id"?: string;
    "interval"?: "month" | "year";
    "quantity"?: number;
    "product_id"?: "pid_ls_v1" | "pid_hg_v1" | "pid_g_v1" | "pid_g_v2" | "pid_nic_v1" | "pid_nic_v1_annual" | "pid_gic_v1" | "pid_gic_v1_annual" | "pid_sic_v1" | "pid_sic_v1_annual" | "pid_hic_v1" | "pid_hic_v1_annual" | "pid_verify_v1_monthly" | "pid_hv_v1" | "pid_hv_v1_annual" | "pid_lsv_v1" | "pid_lsv_v1_annual" | "pid_crm_hg" | "pid_crm_g" | "pid_ip_g" | "pid_ip_hg" | "pid_addon_25kl_v1" | "pid_addon_lf_10k_v1" | "pid_addon_ic_50k_v1" | "pid_addon_lf_10k_v1_annual" | "pid_addon_ic_50k_v1_annual";
    "product_type"?: "prt_outreach" | "prt_leadfinder";
    "plan_type"?: "plt_addon" | "plt_primary";
    "current_period_end"?: number;
    "cancel_at_time"?: null | number;
    "price_in_dollars"?: number;
    "price_id"?: string;
  }[];
  "all_subs_cancelled"?: boolean;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspaceSubscriptionDetailsSuccessResponse = GetWorkspaceSubscriptionDetailsResponses["200"]
export interface GetWorkspaceSubscriptionDetailsInput {
  path?: GetWorkspaceSubscriptionDetailsPathParams
  query?: GetWorkspaceSubscriptionDetailsQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListWorkspaceGroupMemberPathParams = EmptyObject
export type ListWorkspaceGroupMemberQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
}
export type ListWorkspaceGroupMemberRequestBody = undefined
export interface ListWorkspaceGroupMemberResponses {
  "200": {
  "items": Models.WorkspaceGroupMember[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListWorkspaceGroupMemberSuccessResponse = ListWorkspaceGroupMemberResponses["200"]
export interface ListWorkspaceGroupMemberInput {
  path?: ListWorkspaceGroupMemberPathParams
  query?: ListWorkspaceGroupMemberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateWorkspaceGroupMemberPathParams = EmptyObject
export type CreateWorkspaceGroupMemberQueryParams = EmptyObject
export type CreateWorkspaceGroupMemberRequestBody = {
  "sub_workspace_id": string;
}
export interface CreateWorkspaceGroupMemberResponses {
  "200": Models.WorkspaceGroupMember
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateWorkspaceGroupMemberSuccessResponse = CreateWorkspaceGroupMemberResponses["200"]
export interface CreateWorkspaceGroupMemberInput {
  path?: CreateWorkspaceGroupMemberPathParams
  query?: CreateWorkspaceGroupMemberQueryParams
  body: CreateWorkspaceGroupMemberRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetAdminWorkspaceGroupMemberPathParams = EmptyObject
export type GetAdminWorkspaceGroupMemberQueryParams = EmptyObject
export type GetAdminWorkspaceGroupMemberRequestBody = undefined
export interface GetAdminWorkspaceGroupMemberResponses {
  "200": {
  "workspace_name": string;
  "has_admin_workspace": boolean;
  "workspace_group_member_id"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetAdminWorkspaceGroupMemberSuccessResponse = GetAdminWorkspaceGroupMemberResponses["200"]
export interface GetAdminWorkspaceGroupMemberInput {
  path?: GetAdminWorkspaceGroupMemberPathParams
  query?: GetAdminWorkspaceGroupMemberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspaceGroupMemberPathParams = {
  "id": string;
}
export type GetWorkspaceGroupMemberQueryParams = EmptyObject
export type GetWorkspaceGroupMemberRequestBody = undefined
export interface GetWorkspaceGroupMemberResponses {
  "200": Models.WorkspaceGroupMember
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspaceGroupMemberSuccessResponse = GetWorkspaceGroupMemberResponses["200"]
export interface GetWorkspaceGroupMemberInput {
  path: GetWorkspaceGroupMemberPathParams
  query?: GetWorkspaceGroupMemberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteWorkspaceGroupMemberPathParams = {
  "id": string;
}
export type DeleteWorkspaceGroupMemberQueryParams = EmptyObject
export type DeleteWorkspaceGroupMemberRequestBody = null
export interface DeleteWorkspaceGroupMemberResponses {
  "200": Models.WorkspaceGroupMember
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteWorkspaceGroupMemberSuccessResponse = DeleteWorkspaceGroupMemberResponses["200"]
export interface DeleteWorkspaceGroupMemberInput {
  path: DeleteWorkspaceGroupMemberPathParams
  query?: DeleteWorkspaceGroupMemberQueryParams
  body?: DeleteWorkspaceGroupMemberRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ListWorkspaceMemberPathParams = EmptyObject
export type ListWorkspaceMemberQueryParams = {
  "limit"?: number;
  "starting_after"?: string;
  "accepted"?: boolean;
  "search"?: string;
}
export type ListWorkspaceMemberRequestBody = undefined
export interface ListWorkspaceMemberResponses {
  "200": {
  "items": Models.WorkspaceMember[];
  "next_starting_after"?: string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ListWorkspaceMemberSuccessResponse = ListWorkspaceMemberResponses["200"]
export interface ListWorkspaceMemberInput {
  path?: ListWorkspaceMemberPathParams
  query?: ListWorkspaceMemberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type CreateWorkspaceMemberPathParams = EmptyObject
export type CreateWorkspaceMemberQueryParams = EmptyObject
export type CreateWorkspaceMemberRequestBody = {
  "email": string;
  "user_email"?: string | null;
  "role": "owner" | "admin" | "editor" | "view" | "client";
  "permissions"?: ("dashboard.view" | "campaigns.view" | "campaigns.create" | "campaigns.edit" | "campaigns.delete" | "organization.manage" | "organization.integrations" | "organization.billing" | "organization.users.manage" | "leadFinder.view" | "customLeadLabels.create" | "customLeadLabels.edit" | "customLeadLabels.delete" | "unibox.all" | "analytics.view" | "agency.manage" | "accounts.view" | "accounts.manage" | "leadManagement.view" | "leads.move" | "crm.view" | "websiteVisitors.view" | "blocklist.manage" | "preferences.manage" | "inboxPlacement.view" | "aiAgents.manage" | "workspaceGroupMembers.invite" | "workspaceGroupMembers.remove" | "workspaceGroupMembers.leave")[] | null;
}
export interface CreateWorkspaceMemberResponses {
  "200": Models.WorkspaceMember
  "400": {
  "statusCode": 400;
  "error": "Bad Request";
  "message": string;
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type CreateWorkspaceMemberSuccessResponse = CreateWorkspaceMemberResponses["200"]
export interface CreateWorkspaceMemberInput {
  path?: CreateWorkspaceMemberPathParams
  query?: CreateWorkspaceMemberQueryParams
  body: CreateWorkspaceMemberRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspaceMemberPathParams = {
  "id": string;
}
export type GetWorkspaceMemberQueryParams = EmptyObject
export type GetWorkspaceMemberRequestBody = undefined
export interface GetWorkspaceMemberResponses {
  "200": Models.WorkspaceMember
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspaceMemberSuccessResponse = GetWorkspaceMemberResponses["200"]
export interface GetWorkspaceMemberInput {
  path: GetWorkspaceMemberPathParams
  query?: GetWorkspaceMemberQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchWorkspaceMemberPathParams = {
  "id": string;
}
export type PatchWorkspaceMemberQueryParams = EmptyObject
export type PatchWorkspaceMemberRequestBody = {
  "role"?: "owner" | "admin" | "editor" | "view" | "client";
}
export interface PatchWorkspaceMemberResponses {
  "200": Models.WorkspaceMember
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchWorkspaceMemberSuccessResponse = PatchWorkspaceMemberResponses["200"]
export interface PatchWorkspaceMemberInput {
  path: PatchWorkspaceMemberPathParams
  query?: PatchWorkspaceMemberQueryParams
  body?: PatchWorkspaceMemberRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteWorkspaceMemberPathParams = {
  "id": string;
}
export type DeleteWorkspaceMemberQueryParams = EmptyObject
export type DeleteWorkspaceMemberRequestBody = null
export interface DeleteWorkspaceMemberResponses {
  "200": Models.WorkspaceMember
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteWorkspaceMemberSuccessResponse = DeleteWorkspaceMemberResponses["200"]
export interface DeleteWorkspaceMemberInput {
  path: DeleteWorkspaceMemberPathParams
  query?: DeleteWorkspaceMemberQueryParams
  body?: DeleteWorkspaceMemberRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspacePathParams = EmptyObject
export type GetWorkspaceQueryParams = EmptyObject
export type GetWorkspaceRequestBody = undefined
export interface GetWorkspaceResponses {
  "200": Models.Workspace
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspaceSuccessResponse = GetWorkspaceResponses["200"]
export interface GetWorkspaceInput {
  path?: GetWorkspacePathParams
  query?: GetWorkspaceQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type PatchWorkspacePathParams = EmptyObject
export type PatchWorkspaceQueryParams = EmptyObject
export type PatchWorkspaceRequestBody = {
  "name"?: string;
  "org_logo_url"?: string | null;
}
export interface PatchWorkspaceResponses {
  "200": Models.Workspace
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type PatchWorkspaceSuccessResponse = PatchWorkspaceResponses["200"]
export interface PatchWorkspaceInput {
  path?: PatchWorkspacePathParams
  query?: PatchWorkspaceQueryParams
  body?: PatchWorkspaceRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ChangeWorkspaceOwnerPathParams = EmptyObject
export type ChangeWorkspaceOwnerQueryParams = EmptyObject
export type ChangeWorkspaceOwnerRequestBody = {
  "email": string;
  "sec": string;
}
export interface ChangeWorkspaceOwnerResponses {
  "200": Models.Workspace
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type ChangeWorkspaceOwnerSuccessResponse = ChangeWorkspaceOwnerResponses["200"]
export interface ChangeWorkspaceOwnerInput {
  path?: ChangeWorkspaceOwnerPathParams
  query?: ChangeWorkspaceOwnerQueryParams
  body: ChangeWorkspaceOwnerRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type GetWorkspaceDomainInfoPathParams = EmptyObject
export type GetWorkspaceDomainInfoQueryParams = EmptyObject
export type GetWorkspaceDomainInfoRequestBody = undefined
export interface GetWorkspaceDomainInfoResponses {
  "200": {
  "verified"?: boolean;
  "name"?: string;
  "verification"?: {
    "type"?: string;
    "domain"?: string;
    "value"?: string;
    "reason"?: string;
  }[];
}
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type GetWorkspaceDomainInfoSuccessResponse = GetWorkspaceDomainInfoResponses["200"]
export interface GetWorkspaceDomainInfoInput {
  path?: GetWorkspaceDomainInfoPathParams
  query?: GetWorkspaceDomainInfoQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}

export type AddWorkspaceAgencyDomainPathParams = EmptyObject
export type AddWorkspaceAgencyDomainQueryParams = EmptyObject
export type AddWorkspaceAgencyDomainRequestBody = {
  "domain": string;
}
export interface AddWorkspaceAgencyDomainResponses {
  "200": Models.Workspace
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type AddWorkspaceAgencyDomainSuccessResponse = AddWorkspaceAgencyDomainResponses["200"]
export interface AddWorkspaceAgencyDomainInput {
  path?: AddWorkspaceAgencyDomainPathParams
  query?: AddWorkspaceAgencyDomainQueryParams
  body: AddWorkspaceAgencyDomainRequestBody
  headers?: HeadersInit
  signal?: AbortSignal
}

export type DeleteWorkspaceDomainPathParams = EmptyObject
export type DeleteWorkspaceDomainQueryParams = EmptyObject
export type DeleteWorkspaceDomainRequestBody = undefined
export interface DeleteWorkspaceDomainResponses {
  "200": Models.Workspace
  "401": {
  "statusCode": 401;
  "error": "Unauthorized";
  "message": string;
}
  "402": {
  "statusCode": 402;
  "error": "Payment Required";
  "message": string;
}
  "404": {
  "statusCode": 404;
  "error": "Not Found";
  "message": string;
}
  "429": {
  "statusCode": 429;
  "error": "Too Many Requests";
  "message": string;
}
}
export type DeleteWorkspaceDomainSuccessResponse = DeleteWorkspaceDomainResponses["200"]
export interface DeleteWorkspaceDomainInput {
  path?: DeleteWorkspaceDomainPathParams
  query?: DeleteWorkspaceDomainQueryParams
  body?: undefined
  headers?: HeadersInit
  signal?: AbortSignal
}
