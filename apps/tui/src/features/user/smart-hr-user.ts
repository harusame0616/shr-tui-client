interface Role {
  id: string;
  name: string;
  description?: string;
  crews_scope: string;
  crews_scope_query?: Record<string, unknown>;
  session_timeout_in?: number;
  preset_type?: string;
}

interface AddonEnabled {
  code?: string;
  enabled?: boolean;
}

interface SuppressedEmailLog {
  id: string;
  suppression_type?: number;
  reason?: string;
  suppressed_at?: string;
  updated_at?: string;
  created_at?: string;
}

export interface SmartHrUser {
  id: string;
  email: string;
  admin: boolean | null;
  role: Role | null;
  agreement_for_electronic_delivery: boolean | null;
  crew_id: string | null;
  addons: AddonEnabled[] | null;
  invitation_created_at: string | null;
  invitation_opened_at: string | null;
  invitation_accepted_at: string | null;
  invitation_answered_at: string | null;
  suppressed_email_logs: SuppressedEmailLog[] | null;
  has_password: boolean | null;
  activated: boolean | null;
  suspended: boolean | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  updated_at: string | null;
  created_at: string | null;
}
