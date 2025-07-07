interface SmartHrAddress {
  country_number?: string;
  zip_code?: string;
  pref?: string;
  city?: string;
  street?: string;
  building?: string;
  literal_yomi?: string;
}

interface SmartHrSr {
  id?: string;
  first_name?: string;
  last_name?: string;
  first_name_yomi?: string;
  last_name_yomi?: string;
  title?: string;
  association_pref?: string;
  agent_type?: "submit_agent";
  tel_number?: string;
  address?: SmartHrAddress;
}

interface SmartHrBizEstablishment {
  id?: string;
  hel_ins_type?: "kyokai_kenpo";
  hel_ins_name?: string;
  hel_ins_ref_code?: string;
  name?: string;
  soc_ins_name?: string;
  soc_ins_owner_id?: string;
  soc_ins_address?: SmartHrAddress;
  soc_ins_tel_number?: string;
  soc_ins_ref_code?: string;
  soc_ins_number?: string;
  lab_ins_name?: string;
  lab_ins_owner_id?: string;
  lab_ins_address?: SmartHrAddress;
  lab_ins_tel_number?: string;
  lab_ins_number?: string;
  emp_ins_number?: string;
  sr?: SmartHrSr;
  jurisdiction_tax?: string;
  salary_payer_address?: SmartHrAddress;
  updated_at?: string;
  created_at?: string;
}

interface SmartHrEmploymentType {
  id?: string;
  name?: string;
  preset_type?: "board_member";
  code?: string;
}

interface SmartHrImageFile {
  file_name?: string;
  url?: string;
}

interface SmartHrProfileImage {
  size_type?: "thumb";
  height?: number;
  width?: number;
  url?: string;
}

interface SmartHrPosition {
  id?: string;
  name?: string;
  rank?: number;
  code?: string;
  created_at?: string;
}

interface SmartHrGrade {
  id?: string;
  name?: string;
  rank?: number;
  created_at?: string;
  updated_at?: string;
}

interface SmartHrJobCategory {
  id?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

interface SmartHrPaymentPeriod {
  id?: string;
  name?: string;
  period_type?: "monthly";
}

interface SmartHrBankAccount {
  bank_code?: string;
  bank_branch_code?: string;
  account_type?: "saving";
  account_number?: string;
  account_holder_name?: string;
  bankbook_image?: {
    file_name?: string;
    content?: string;
  };
  bank_account_setting_id?: string;
}

interface SmartHrDepartment {
  id?: string;
  name?: string;
  full_name?: string;
  position?: number;
  code?: string;
  parent?: string;
}

interface SmartHrCustomFieldElement {
  id?: string;
  name?: string;
  physical_name?: string;
  position?: number;
}

interface SmartHrCustomFieldTemplate {
  id?: string;
  name?: string;
  type?: "date";
  elements?: SmartHrCustomFieldElement[];
  group_id?: string;
  hint?: string;
  scale?: number;
  separated_by_commas?: boolean;
  position?: number;
  updated_at?: string;
  created_at?: string;
}

interface SmartHrCustomField {
  value?: string;
  template?: SmartHrCustomFieldTemplate;
}

export interface SmartHrCrew {
  id: string;
  user_id?: string;
  biz_establishment_id?: string;
  biz_establishment?: SmartHrBizEstablishment;
  emp_code?: string;
  emp_type?: "board_member";
  employment_type?: SmartHrEmploymentType;
  emp_status?: "employed";
  last_name?: string;
  first_name?: string;
  last_name_yomi?: string;
  first_name_yomi?: string;
  business_last_name?: string;
  business_first_name?: string;
  business_last_name_yomi?: string;
  business_first_name_yomi?: string;
  preferred_last_name?: string;
  preferred_first_name?: string;
  preferred_last_name_yomi?: string;
  preferred_first_name_yomi?: string;
  birth_at?: string;
  gender?: "male" | "female";
  identity_card_image1?: SmartHrImageFile;
  identity_card_image2?: SmartHrImageFile;
  tel_number?: string;
  address?: SmartHrAddress;
  address_image?: SmartHrImageFile;
  address_head_of_family?: string;
  address_relation_name?: string;
  email?: string;
  profile_images?: SmartHrProfileImage[];
  emergency_relation_name?: string;
  emergency_last_name?: string;
  emergency_first_name?: string;
  emergency_last_name_yomi?: string;
  emergency_first_name_yomi?: string;
  emergency_tel_number?: string;
  emergency_address?: SmartHrAddress;
  resident_card_address?: SmartHrAddress;
  resident_card_address_head_of_family?: string;
  resident_card_address_relation_name?: string;
  position?: string;
  positions?: SmartHrPosition[];
  grade?: SmartHrGrade;
  job_category?: SmartHrJobCategory;
  occupation?: string;
  entered_at?: string;
  resigned_at?: string;
  resigned_reason?: string;
  resume1?: SmartHrImageFile;
  resume2?: SmartHrImageFile;
  emp_ins_insured_person_number?: string;
  emp_ins_insured_person_number_image?: SmartHrImageFile;
  emp_ins_insured_person_number_unknown_reason_type?: "no_work_experience";
  emp_ins_qualified_at?: string;
  emp_ins_disqualified_at?: string;
  previous_workplace?: string;
  previous_employment_start_on?: string;
  previous_employment_end_on?: string;
  soc_ins_insured_person_number?: number;
  hel_ins_insured_person_number?: number;
  basic_pension_number?: string;
  basic_pension_number_image?: SmartHrImageFile;
  first_enrolling_in_emp_pns_ins_flag?: boolean;
  basic_pension_number_unknown_reason_type?: "non_pensionable";
  first_workplace?: string;
  first_workplace_address_text?: string;
  first_employment_start_on?: string;
  first_employment_end_on?: string;
  last_workplace?: string;
  last_workplace_address_text?: string;
  last_employment_start_on?: string;
  last_employment_end_on?: string;
  soc_ins_qualified_at?: string;
  soc_ins_disqualified_at?: string;
  having_spouse?: boolean;
  spouse_yearly_income?: number;
  monthly_income_currency?: number;
  monthly_income_goods?: number;
  payment_period?: SmartHrPaymentPeriod;
  monthly_base_salary?: number;
  monthly_standard_income_updated_at?: string;
  monthly_standard_income_hel?: number;
  monthly_standard_income_pns?: number;
  nearest_station_and_line?: string;
  commutation_1_expenses?: number;
  commutation_1_period?: "commutation_period_1_month";
  commutation_1_single_fare?: number;
  commutation_2_expenses?: number;
  commutation_2_period?: "commutation_period_1_month";
  commutation_2_single_fare?: number;
  foreign_resident_last_name?: string;
  foreign_resident_first_name?: string;
  foreign_resident_middle_name?: string;
  foreign_resident_card_number?: string;
  foreign_resident_card_image1?: SmartHrImageFile;
  foreign_resident_card_image2?: SmartHrImageFile;
  nationality_code?: string;
  resident_status_type?: string;
  resident_status_other_reason?: string;
  resident_end_at?: string;
  having_ex_activity_permission?: "permitted";
  other_be_workable_type?: "other_be_workable";
  bank_accounts?: SmartHrBankAccount[];
  department?: string;
  departments?: SmartHrDepartment[];
  contract_type?: "unlimited";
  contract_start_on?: string;
  contract_end_on?: string;
  contract_renewal_type?: "renewal";
  tax_cd?: "kou";
  handicapped_type?: "ordinary_handicapped";
  handicapped_note_type?: string;
  handicapped_note_delivery_at?: string;
  handicapped_image?: SmartHrImageFile;
  working_student_flag?: boolean;
  school_name?: string;
  student_card_image?: SmartHrImageFile;
  enrolled_at?: string;
  working_student_income?: number;
  employment_income_flag?: boolean;
  business_income_flag?: boolean;
  devidend_income_flag?: boolean;
  estate_income_flag?: boolean;
  widow_type?: "widow";
  widow_reason_type?: "divorce";
  widow_memo?: string;
  custom_fields?: SmartHrCustomField[];
  created_at?: string;
  updated_at?: string;
}
