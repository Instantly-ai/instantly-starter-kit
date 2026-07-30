/* eslint-disable */
// Generated file. Do not edit manually.

export type APIKey = {
  "id": string;
  "name": string;
  "scopes": ("all:all" | "all:create" | "all:read" | "all:update" | "all:delete" | "ai_agents:all" | "ai_agents:create" | "ai_agents:read" | "ai_agents:update" | "ai_agents:delete" | "api_keys:all" | "api_keys:create" | "api_keys:read" | "api_keys:update" | "api_keys:delete" | "audit_logs:all" | "audit_logs:create" | "audit_logs:read" | "audit_logs:update" | "audit_logs:delete" | "custom_prompt_templates:all" | "custom_prompt_templates:create" | "custom_prompt_templates:read" | "custom_prompt_templates:update" | "custom_prompt_templates:delete" | "account_campaign_mappings:all" | "account_campaign_mappings:create" | "account_campaign_mappings:read" | "account_campaign_mappings:update" | "account_campaign_mappings:delete" | "campaigns:all" | "campaigns:create" | "campaigns:read" | "campaigns:update" | "campaigns:delete" | "inbox_placement_tests:all" | "inbox_placement_tests:create" | "inbox_placement_tests:read" | "inbox_placement_tests:update" | "inbox_placement_tests:delete" | "inbox_placement_analytics:all" | "inbox_placement_analytics:create" | "inbox_placement_analytics:read" | "inbox_placement_analytics:update" | "inbox_placement_analytics:delete" | "inbox_placement_reports:all" | "inbox_placement_reports:create" | "inbox_placement_reports:read" | "inbox_placement_reports:update" | "inbox_placement_reports:delete" | "lead_lists:all" | "lead_lists:create" | "lead_lists:read" | "lead_lists:update" | "lead_lists:delete" | "leads:all" | "leads:create" | "leads:read" | "leads:update" | "leads:delete" | "background-jobs:all" | "background-jobs:create" | "background-jobs:read" | "background-jobs:update" | "background-jobs:delete" | "custom_tags:all" | "custom_tags:create" | "custom_tags:read" | "custom_tags:update" | "custom_tags:delete" | "custom_tag_mappings:all" | "custom_tag_mappings:create" | "custom_tag_mappings:read" | "custom_tag_mappings:update" | "custom_tag_mappings:delete" | "crm_actions:all" | "crm_actions:create" | "crm_actions:read" | "crm_actions:update" | "crm_actions:delete" | "accounts:all" | "accounts:create" | "accounts:read" | "accounts:update" | "accounts:delete" | "block_list_entries:all" | "block_list_entries:create" | "block_list_entries:read" | "block_list_entries:update" | "block_list_entries:delete" | "lead-labels:all" | "lead-labels:create" | "lead-labels:read" | "lead-labels:update" | "lead-labels:delete" | "email_verifications:all" | "email_verifications:create" | "email_verifications:read" | "emails:all" | "emails:create" | "emails:read" | "emails:update" | "emails:delete" | "email_templates:all" | "email_templates:create" | "email_templates:read" | "email_templates:update" | "email_templates:delete" | "workspaces:all" | "workspaces:create" | "workspaces:read" | "workspaces:update" | "workspaces:delete" | "workspace_billing:all" | "workspace_billing:create" | "workspace_billing:read" | "workspace_billing:update" | "workspace_billing:delete" | "workspace_group_members:all" | "workspace_group_members:create" | "workspace_group_members:read" | "workspace_group_members:update" | "workspace_group_members:delete" | "workspace_members:all" | "workspace_members:create" | "workspace_members:read" | "workspace_members:update" | "workspace_members:delete" | "subsequences:all" | "subsequences:create" | "subsequences:read" | "subsequences:update" | "subsequences:delete" | "ai_sdr:all" | "ai_sdr:create" | "ai_sdr:read" | "ai_sdr:update" | "ai_sdr:delete" | "ai_sdr_replies:all" | "ai_sdr_replies:create" | "ai_sdr_replies:read" | "ai_sdr_replies:update" | "ai_sdr_replies:delete" | "ai_inbox_manager_analytics:all" | "ai_inbox_manager_analytics:create" | "ai_inbox_manager_analytics:read" | "ai_inbox_manager_analytics:update" | "ai_inbox_manager_analytics:delete" | "sales_flows:all" | "sales_flows:create" | "sales_flows:read" | "sales_flows:update" | "sales_flows:delete" | "webhooks:all" | "webhooks:create" | "webhooks:read" | "webhooks:update" | "webhooks:delete" | "webhook_events:all" | "webhook_events:create" | "webhook_events:read" | "webhook_events:update" | "webhook_events:delete" | "security_tokens:all" | "security_tokens:create" | "security_tokens:read" | "security_tokens:update" | "security_tokens:delete" | "dfy_email_account_orders:all" | "dfy_email_account_orders:create" | "dfy_email_account_orders:read" | "dfy_email_account_orders:update" | "dfy_email_account_orders:delete" | "auth:all" | "auth:create" | "auth:read" | "auth:update" | "auth:delete")[];
  "key": string;
  "organization_id": string;
  "timestamp_created": string;
  "timestamp_updated": string;
}

export type Account = {
  "email": string;
  "timestamp_created": string;
  "timestamp_updated": string;
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
  "added_by"?: null | string;
  "daily_limit"?: null | number;
  "daily_limit_max"?: null | number;
  "warmup_limit_max"?: null | number;
  "modified_by"?: null | string;
  "tracking_domain_name"?: null | string;
  "tracking_domain_status"?: null | string;
  "status"?: 1 | 2 | 3 | -1 | -2 | -3;
  "enable_slow_ramp"?: null | boolean;
  "inbox_placement_test_limit"?: null | number;
  "organization": string;
  "timestamp_last_used"?: null | string;
  "warmup_status": 0 | 1 | -1 | -2 | -3;
  "status_message"?: {
    "code"?: string;
    "command"?: string;
    "response"?: string;
    "e_message"?: string;
    "responseCode"?: number;
    [key: string]: unknown;
  };
  "timestamp_warmup_start"?: null | string;
  "provider_code": 1 | 2 | 3 | 4 | 8;
  "setup_pending": boolean;
  "warmup_pool_id"?: null | string;
  "is_managed_account": boolean;
  "dfy_password_changed"?: null | boolean;
  "is_ready_made_account"?: null | boolean;
  "stat_warmup_score"?: null | number;
  "sending_gap"?: number;
  "signature"?: null | string;
  "reply_to"?: null | string;
  "autofix_failed"?: null | boolean;
}

export type AccountCampaignMapping = {
  "campaign_id": string;
  "campaign_name": string;
  "timestamp_created": string;
  "status"?: -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
}

export type AuditLog = {
  "id": string;
  "timestamp": string;
  "organization_id": string;
  "activity_type": 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35;
  "user_agent"?: null | string;
  "user_id"?: null | string;
  "ip_address": string;
  "from_api": boolean;
  "affected_count"?: null | number;
  "campaign_id"?: null | string;
  "webhook_id"?: null | string;
  "subsequence_id"?: null | string;
  "list_id"?: null | string;
  "audit_metadata"?: Record<string, unknown>;
  "user_name"?: null | string;
}

export type BackgroundJob = {
  "id": string;
  "workspace_id": string;
  "user_id"?: null | string;
  "type": "move-leads" | "import-leads" | "export-leads" | "update-warmup-accounts" | "rename-variable" | "broadcast-ai-generate" | "broadcast-website-scrape" | "import-subscribers-from-crm" | "resync-subscriber-crm-tags";
  "entity_id"?: null | string;
  "entity_type"?: "list" | "campaign" | "workspace" | "broadcast" | "subscriber-group-sync" | "subscriber-group";
  "data"?: {
    "moved_lead_emails"?: string[];
    [key: string]: unknown;
  };
  "progress": number;
  "status": "pending" | "in-progress" | "success" | "failed" | "draining" | "paused" | "cancelled";
  "created_at": string;
  "updated_at": string;
}

export type BlockListEntry = {
  "id": string;
  "timestamp_created": string;
  "organization_id": string;
  "bl_value": string;
  "is_domain": boolean;
}

export type CRMActions = Record<string, unknown>

export type Campaign = {
  "id": string;
  "name": string;
  "pl_value"?: null | number;
  "status": -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
  "is_evergreen"?: null | boolean;
  "campaign_schedule": {
    "start_date"?: null | string;
    "end_date"?: null | string;
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
  "timestamp_created": string;
  "timestamp_updated": string;
  "email_gap"?: null | number;
  "random_wait_max"?: null | number;
  "text_only"?: null | boolean;
  "first_email_text_only"?: null | boolean;
  "email_list"?: string[];
  "daily_limit"?: null | number;
  "stop_on_reply"?: null | boolean;
  "email_tag_list"?: string[];
  "link_tracking"?: null | boolean;
  "open_tracking"?: boolean;
  "stop_on_auto_reply"?: null | boolean;
  "daily_max_leads"?: null | number;
  "prioritize_new_leads"?: null | boolean;
  "auto_variant_select"?: null | {
    "trigger": "reply_rate" | "click_rate" | "open_rate";
  };
  "match_lead_esp"?: null | boolean;
  "not_sending_status"?: 1 | 2 | 3 | 4 | 99 | null;
  "stop_for_company"?: null | boolean;
  "core_variables"?: null | Record<string, unknown>;
  "custom_variables"?: null | Record<string, unknown>;
  "insert_unsubscribe_header"?: null | boolean;
  "allow_risky_contacts"?: null | boolean;
  "disable_bounce_protect"?: null | boolean;
  "limit_emails_per_company_override"?: null | {
    "mode": "custom" | "disabled";
    "daily_limit"?: number;
    "scope"?: "per_campaign" | "across_workspace";
  };
  "cc_list"?: string[];
  "bcc_list"?: string[];
  "organization"?: null | string;
  "owned_by"?: null | string;
  "ai_sdr_id"?: null | string;
  "provider_routing_rules"?: {
    "action"?: "send" | "do_not_send";
    "recipient_esp"?: ("all" | "google" | "outlook" | "other")[];
    "sender_esp"?: ("all" | "google" | "outlook" | "other")[];
  }[];
}

export type CampaignSubsequence = {
  "id": string;
  "timestamp_created": string;
  "parent_campaign": string;
  "workspace": string;
  "status": -99 | -1 | -2 | 0 | 1 | 2 | 3 | 4;
  "timestamp_leads_updated": string;
  "name": string;
  "conditions": {
    "crm_status"?: (1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4)[];
    "lead_activity"?: (4 | 91 | 2)[];
    "reply_contains"?: string;
  };
  "subsequence_schedule": {
    "start_date"?: null | string;
    "end_date"?: null | string;
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
  "daily_limit"?: null | number;
  "ignore_account_daily_limit"?: boolean;
}

export type CustomPromptTemplate = {
  "id": string;
  "workspace_id": string;
  "created_by": string;
  "name": string;
  "description"?: null | string;
  "category": 1 | 2 | 3 | 4 | 5 | 6;
  "properties"?: null | {
    "name"?: string;
    "property"?: string;
  }[];
  "prompt": string;
  "is_public": boolean;
  "model_version"?: "3.5" | "gpt-5" | "gpt-5.4" | "gpt-5-mini" | "gpt-5-nano" | "4.0" | "4.0-Omni" | "gpt-4o" | "o3" | "gpt-4.1" | "gpt-4.1-mini" | "claude-4.5-sonnet" | "claude-4.6-sonnet" | "r1" | "grok-4.3" | "gemini-3.0-flash" | "gemini-3.5-flash" | "instantly-ai-lightspeed-agent" | "sonar" | "sonar-pro";
  "from_shared"?: null | boolean;
  "like_count"?: null | number;
  "execution_count"?: null | number;
  "liked"?: null | boolean;
  "template_type"?: "custom" | "public" | null;
  "created_by_instantly"?: null | boolean;
  "creator"?: null | {
    "id"?: string;
    "payload"?: {
      "name"?: {
        "first"?: string;
        "last"?: string;
      };
    };
  };
}

export type CustomTag = {
  "id": string;
  "timestamp_created": string;
  "timestamp_updated": string;
  "organization_id": string;
  "label": string;
  "description"?: null | string;
}

export type CustomTagMapping = {
  "id": string;
  "tag_id": string;
  "resource_id": string;
  "resource_type": 1 | 2;
  "timestamp_created": string;
  "organization_id": string;
}

export type DFYEmailAccountOrder = {
  "workspace_id": string;
  "domain": string;
  "forwarding_domain"?: null | string;
  "is_pre_warmed_up"?: null | boolean;
  "timestamp_cancelled"?: null | string;
  "timestamp_created": string;
}

export type Email = {
  "id": string;
  "timestamp_created": string;
  "timestamp_email": string;
  "message_id": string;
  "subject": string;
  "from_address_email"?: null | string;
  "to_address_email_list": string;
  "cc_address_email_list"?: null | string;
  "bcc_address_email_list"?: null | string;
  "reply_to"?: null | string;
  "body": {
    "text"?: string;
    "html"?: string;
  };
  "organization_id": string;
  "campaign_id"?: null | string;
  "subsequence_id"?: null | string;
  "list_id"?: null | string;
  "lead"?: null | string;
  "lead_id"?: null | string;
  "eaccount": string;
  "ue_type"?: 1 | 2 | 3 | 4 | null;
  "step"?: null | string;
  "is_unread"?: null | number;
  "is_auto_reply"?: null | number;
  "reminder_ts"?: null | string;
  "ai_interest_value"?: null | number;
  "ai_assisted"?: null | number;
  "is_focused"?: null | number;
  "i_status"?: null | number;
  "thread_id"?: null | string;
  "content_preview"?: null | string;
  "attachment_json"?: null | {
    "files": {
      "filename": string;
      "size"?: number;
      "type"?: string;
      "url"?: string;
      "error"?: null | string;
    }[];
  };
  "from_address_json"?: null | unknown[];
  "to_address_json"?: null | unknown[];
  "cc_address_json"?: null | unknown[];
  "ai_agent_id"?: null | string;
}

export type EmailTemplate = {
  "id": string;
  "timestamp_created": string;
  "body": string;
  "name": string;
  "subject"?: null | string;
  "organization": string;
}

export type EmailVerification = {
  "status"?: "success" | "error" | null;
  "email": string;
  "verification_status": "pending" | "verified" | "invalid";
  "catch_all"?: true | false | "pending";
  "credits"?: null | number;
  "credits_used"?: null | number;
}

export type InboxPlacementAnalytics = {
  "id": string;
  "timestamp_created": string;
  "timestamp_created_date": string;
  "organization_id": string;
  "test_id": string;
  "is_spam"?: null | boolean;
  "has_category"?: null | boolean;
  "sender_email"?: null | string;
  "sender_esp"?: 1 | 2 | 12 | 13 | null;
  "recipient_email"?: null | string;
  "recipient_esp"?: 1 | 2 | 12 | 13 | null;
  "recipient_geo"?: 1 | 2 | 3 | 4 | null;
  "recipient_type"?: 1 | 2 | null;
  "spf_pass"?: null | boolean;
  "dkim_pass"?: null | boolean;
  "dmarc_pass"?: null | boolean;
  "smtp_ip_blacklist_report"?: null | Record<string, unknown>;
  "authentication_failure_results"?: null | {
    "authentication_results"?: string;
    "dkim_signature"?: string;
    "received_spf"?: string;
  };
  "record_type"?: 1 | 2 | null;
}

export type InboxPlacementBlacklistAndSpamAssassinReport = {
  "id": string;
  "timestamp_created": string;
  "timestamp_created_date": string;
  "organization_id": string;
  "test_id": string;
  "domain_blacklist_count"?: null | number;
  "domain": string;
  "domain_ip": string;
  "domain_ip_blacklist_count"?: null | number;
  "spam_assassin_score": number;
  "spam_assassin_report"?: {
    "is_spam"?: boolean;
    "report"?: {
      "description": string;
      "name": string;
      "score": string;
    }[];
    "spam_score"?: number;
  };
  "blacklist_report"?: {
    "address"?: string;
    "blacklisted_count"?: number;
    "details"?: {
      "blacklist"?: string;
      "is_listed"?: boolean;
      "test_type"?: string;
    }[];
    "ip"?: string;
    "is_blacklisted"?: boolean;
    "is_domain"?: boolean;
  };
}

export type InboxPlacementTest = {
  "id": string;
  "organization_id": string;
  "name": string;
  "delivery_mode"?: 1 | 2 | null | null;
  "description"?: null | string;
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
  "test_code"?: null | string;
  "tags"?: null | string[];
  "text_only"?: null | boolean;
  "recipients": string[];
  "recipients_labels"?: {
    "region": string;
    "sub_region": string;
    "type": string;
    "esp": string;
  }[];
  "timestamp_created": string;
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
}

export type Lead = {
  "id": string;
  "timestamp_created": string;
  "timestamp_updated": string;
  "organization": string;
  "campaign"?: null | string;
  "status": 1 | 2 | 3 | -1 | -2 | -3;
  "email"?: null | string;
  "personalization"?: null | string;
  "website"?: null | string;
  "last_name"?: null | string;
  "first_name"?: null | string;
  "company_name"?: null | string;
  "job_title"?: null | string;
  "phone"?: null | string;
  "email_open_count": number;
  "email_reply_count": number;
  "email_click_count": number;
  "company_domain": string;
  "status_summary": {
    "lastStep"?: {
      "from"?: string;
      "stepID"?: string;
      "timestamp_executed"?: string;
    };
    "domain_complete"?: boolean;
  };
  "payload"?: null | {
    "firstName"?: string;
    "lastName"?: string;
    "companyName"?: string;
    "jobTitle"?: string;
    "website"?: string;
    "phone"?: string;
    "personalization"?: string;
    [key: string]: null | string | number | boolean | Record<string, unknown> | undefined;
  };
  "status_summary_subseq"?: {
    "from"?: string;
    "stepID"?: string;
    "timestampExecuted"?: string;
  };
  "last_step_from"?: null | string;
  "last_step_id"?: null | string;
  "last_step_timestamp_executed"?: null | string;
  "email_opened_step"?: null | number;
  "email_opened_variant"?: null | number;
  "email_replied_step"?: null | number;
  "email_replied_variant"?: null | number;
  "email_clicked_step"?: null | number;
  "email_clicked_variant"?: null | number;
  "lt_interest_status"?: 1 | 2 | 3 | 4 | 0 | -1 | -2 | -3 | -4;
  "subsequence_id"?: null | string;
  "verification_status"?: 1 | -1 | -2 | -3 | -4 | 11 | 12;
  "pl_value_lead"?: null | string;
  "timestamp_added_subsequence"?: null | string;
  "timestamp_last_contact"?: null | string;
  "timestamp_last_open"?: null | string;
  "timestamp_last_reply"?: null | string;
  "timestamp_last_interest_change"?: null | string;
  "timestamp_last_click"?: null | string;
  "enrichment_status"?: 1 | -1 | 11 | -2;
  "list_id"?: null | string;
  "last_contacted_from"?: null | string;
  "uploaded_by_user"?: null | string;
  "upload_method"?: "manual" | "api" | "website-visitor";
  "assigned_to"?: null | string;
  "is_website_visitor"?: null | boolean;
  "timestamp_last_touch"?: null | string;
  "esp_code"?: 0 | 1 | 2 | 3 | 8 | 9 | 10 | 12 | 13 | 999 | 1000;
  "esg_code"?: 0 | 1 | 2 | 3 | 4;
}

export type LeadLabel = {
  "id": string;
  "timestamp_created": string;
  "created_by": string;
  "organization_id": string;
  "label": string;
  "interest_status_label": "positive" | "negative" | "neutral";
  "interest_status": number;
  "description"?: null | string;
  "use_with_ai"?: null | boolean;
}

export type LeadList = {
  "id": string;
  "organization_id": string;
  "has_enrichment_task"?: null | boolean;
  "owned_by"?: null | string;
  "name": string;
  "timestamp_created": string;
}

export type SalesFlow = {
  "id": string;
  "timestamp_created": string;
  "organization_id": string;
  "name": string;
  "is_default"?: null | boolean;
  "queries": {
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
  "created_by": string;
  "list_id"?: null | string;
  "campaign_id"?: null | string;
  "list_name"?: null | string;
  "campaign_name"?: null | string;
}

export type SuperSearchEnrichment = {
  "id": string;
  "limit"?: null | number;
  "organization_id": string;
  "enrichment_payload"?: Record<string, unknown>;
  "auto_update"?: null | boolean;
  "skip_rows_without_email"?: null | boolean;
  "in_progress"?: null | boolean;
  "type"?: "work_email_enrichment" | "fully_enriched_profile" | "email_verification" | "joblisting" | "technologies" | "news" | "funding" | "engagement_score" | "ai_enrichment" | "custom_flow";
  "resource_id": string;
  "resource_type": 1 | 2;
}

export type Webhook = {
  "id": string;
  "organization": string;
  "campaign"?: null | string;
  "name"?: null | string;
  "target_hook_url": string;
  "event_type"?: "all_events" | "email_sent" | "email_opened" | "email_link_clicked" | "reply_received" | "email_bounced" | "lead_unsubscribed" | "campaign_completed" | "account_error" | "lead_neutral" | "lead_interested" | "lead_not_interested" | "lead_meeting_booked" | "lead_meeting_completed" | "lead_closed" | "lead_out_of_office" | "lead_wrong_person" | "lead_no_show" | "supersearch_enrichment_completed" | null;
  "custom_interest_value"?: null | number;
  "headers"?: null | Record<string, string>;
  "timestamp_created": string;
  "status"?: null | number;
  "timestamp_error"?: null | string;
}

export type WebhookEvent = {
  "id": string;
  "timestamp_created": string;
  "timestamp_created_date": string;
  "organization_id": string;
  "payload"?: Record<string, unknown>;
  "success": boolean;
  "retry_count": number;
  "will_retry": boolean;
  "webhook_url": string;
  "status_code"?: null | number;
  "error_message"?: null | string;
  "timestamp_next_retry"?: null | string;
  "retry_group_id"?: null | string;
  "retry_successful"?: null | boolean;
  "lead_email"?: null | string;
  "response_time_ms"?: null | number;
}

export type Workspace = {
  "id": string;
  "timestamp_created": string;
  "timestamp_updated": string;
  "owner": string;
  "name": string;
  "plan_id"?: null | string;
  "add_unsub_to_block"?: null | boolean;
  "default_opportunity_value"?: null | number;
  "plan_id_leadfinder"?: null | string;
  "plan_id_verification"?: {
    "quantity"?: number;
    "product_id"?: string;
    "timestamp_updated"?: string;
  };
  "org_logo_url"?: null | string;
  "org_client_domain"?: null | string;
  "plan_id_crm"?: null | string;
  "plan_id_website_visitor"?: null | string;
  "plan_id_inbox_placement"?: null | string;
}

export type WorkspaceBilling = Record<string, unknown>

export type WorkspaceGroupMember = {
  "id": string;
  "admin_workspace_id": string;
  "sub_workspace_id": string;
  "status": "pending" | "accepted" | "rejected";
  "timestamp_created": string;
  "timestamp_updated": string;
  "sub_workspace_name"?: null | string;
  "admin_workspace_name"?: null | string;
}

export type WorkspaceMember = {
  "id": string;
  "email": string;
  "user_id": string;
  "user_email"?: null | string;
  "name"?: {
    "first"?: string;
    "last"?: string;
  };
  "role": "owner" | "admin" | "editor" | "view" | "client";
  "timestamp_created": string;
  "workspace_id": string;
  "accepted": boolean;
  "issuer_id"?: null | string;
  "permissions"?: null | ("dashboard.view" | "campaigns.view" | "campaigns.create" | "campaigns.edit" | "campaigns.delete" | "organization.manage" | "organization.integrations" | "organization.billing" | "organization.users.manage" | "leadFinder.view" | "customLeadLabels.create" | "customLeadLabels.edit" | "customLeadLabels.delete" | "unibox.all" | "analytics.view" | "agency.manage" | "accounts.view" | "accounts.manage" | "leadManagement.view" | "leads.move" | "crm.view" | "websiteVisitors.view" | "blocklist.manage" | "preferences.manage" | "inboxPlacement.view" | "aiAgents.manage" | "workspaceGroupMembers.invite" | "workspaceGroupMembers.remove" | "workspaceGroupMembers.leave")[];
}
