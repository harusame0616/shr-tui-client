export interface SmartHrRole {
  id?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SmartHrUser {
  id: string;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  first_name_yomi?: string;
  last_name_yomi?: string;
  employment_type_id?: string;
  department_names?: string[];
  role?: SmartHrRole;
  invited?: boolean;
  activated?: boolean;
  suspended?: boolean;
  locale?: string;
  created_at?: string;
  updated_at?: string;
}
