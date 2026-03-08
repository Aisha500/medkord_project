export type UserRole = 'patient' | 'facility_admin';

export type StaffRole =
  | 'doctor'
  | 'nurse'
  | 'physiotherapist'
  | 'radiologist'
  | 'lab_scientist'
  | 'pharmacist'
  | 'clinic_admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'clinic' | 'hospital' | 'phc' | 'specialist';
  address: string;
  city: string;
  state: string;
  phone: string;
  admin_id: string;
  created_at: string;
}

export interface FacilityStaff {
  id: string;
  facility_id: string;
  user_id: string;
  role: StaffRole;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  facility_id: string;
  full_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  blood_group?: string;
  genotype?: string;
  allergies?: string;
  created_at: string;
}

export interface Consultation {
  id: string;
  patient_id: string;
  facility_id: string;
  provider_id: string;
  provider_name: string;
  provider_role: StaffRole;
  facility_name: string;
  chief_complaint: string;
  history_of_present_illness?: string;
  examination_findings?: string;
  diagnosis: string;
  treatment_plan?: string;
  notes?: string;
  vitals?: VitalSigns;
  created_at: string;
}

export interface VitalSigns {
  blood_pressure?: string;
  pulse_rate?: number;
  temperature?: number;
  respiratory_rate?: number;
  weight?: number;
  height?: number;
  spo2?: number;
}

export interface Prescription {
  id: string;
  consultation_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  dispensed: boolean;
  dispensed_by?: string;
  created_at: string;
}

export interface LabResult {
  id: string;
  patient_id: string;
  consultation_id?: string;
  test_name: string;
  result: string;
  reference_range?: string;
  uploaded_by: string;
  file_url?: string;
  created_at: string;
}
