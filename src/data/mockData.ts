import type { Consultation, Prescription, LabResult, Patient, FacilityStaff } from '@/types/medcord';

export const mockPatient: Patient = {
  id: 'p1',
  user_id: 'u1',
  facility_id: 'f1',
  full_name: 'Adebayo Ogundimu',
  date_of_birth: '1988-03-15',
  gender: 'male',
  phone: '+234 801 234 5678',
  blood_group: 'O+',
  genotype: 'AA',
  allergies: 'Penicillin',
  created_at: '2025-01-10T09:00:00Z',
};

export const mockConsultations: Consultation[] = [
  {
    id: 'c1',
    patient_id: 'p1',
    facility_id: 'f1',
    provider_id: 's1',
    provider_name: 'Dr. Amina Ibrahim',
    provider_role: 'doctor',
    facility_name: 'Lagoon Specialist Clinic',
    chief_complaint: 'Persistent headache and dizziness for 3 days',
    history_of_present_illness: 'Patient reports onset of headache 3 days ago, worsening with activity. Associated dizziness, no visual disturbances or nausea.',
    examination_findings: 'Alert and oriented. BP elevated. No focal neurological deficit.',
    diagnosis: 'Hypertensive urgency',
    treatment_plan: 'Start antihypertensive, lifestyle modification counseling, follow-up in 1 week.',
    vitals: { blood_pressure: '160/95', pulse_rate: 88, temperature: 36.7, weight: 82, spo2: 98 },
    created_at: '2026-03-05T10:30:00Z',
  },
  {
    id: 'c2',
    patient_id: 'p1',
    facility_id: 'f1',
    provider_id: 's2',
    provider_name: 'Dr. Chukwuemeka Obi',
    provider_role: 'doctor',
    facility_name: 'Lagoon Specialist Clinic',
    chief_complaint: 'Follow-up for hypertension management',
    diagnosis: 'Essential hypertension — improving',
    treatment_plan: 'Continue current medication. Recheck in 2 weeks.',
    vitals: { blood_pressure: '138/88', pulse_rate: 76, temperature: 36.5, weight: 81 },
    created_at: '2026-02-20T14:00:00Z',
  },
  {
    id: 'c3',
    patient_id: 'p1',
    facility_id: 'f2',
    provider_id: 's3',
    provider_name: 'Dr. Fatima Bello',
    provider_role: 'doctor',
    facility_name: 'Unity Hospital Abuja',
    chief_complaint: 'Acute malaria symptoms — fever, chills, body aches',
    diagnosis: 'Plasmodium falciparum malaria',
    treatment_plan: 'Artemisinin-based combination therapy (ACT) for 3 days. Paracetamol PRN.',
    vitals: { blood_pressure: '120/80', pulse_rate: 102, temperature: 39.1, weight: 82 },
    created_at: '2025-12-10T09:15:00Z',
  },
];

export const mockPrescriptions: Prescription[] = [
  { id: 'rx1', consultation_id: 'c1', medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', dispensed: true, dispensed_by: 'Pharm. Ngozi Eze', created_at: '2026-03-05T10:45:00Z' },
  { id: 'rx2', consultation_id: 'c1', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', dispensed: true, dispensed_by: 'Pharm. Ngozi Eze', created_at: '2026-03-05T10:45:00Z' },
  { id: 'rx3', consultation_id: 'c3', medication: 'Coartem (Artemether/Lumefantrine)', dosage: '80/480mg', frequency: 'Twice daily', duration: '3 days', dispensed: true, created_at: '2025-12-10T09:30:00Z' },
];

export const mockLabResults: LabResult[] = [
  { id: 'l1', patient_id: 'p1', consultation_id: 'c1', test_name: 'Full Blood Count', result: 'WBC 6.2, RBC 4.8, Hb 14.2, Plt 250', reference_range: 'WBC 4-11, RBC 4.5-5.5, Hb 13-17', uploaded_by: 'Lab. Sci. Tunde Bakare', created_at: '2026-03-05T12:00:00Z' },
  { id: 'l2', patient_id: 'p1', consultation_id: 'c1', test_name: 'Lipid Profile', result: 'Total Chol 220, LDL 145, HDL 42, TG 165', reference_range: 'Total <200, LDL <100, HDL >40', uploaded_by: 'Lab. Sci. Tunde Bakare', created_at: '2026-03-05T12:30:00Z' },
  { id: 'l3', patient_id: 'p1', consultation_id: 'c3', test_name: 'Malaria Parasite (RDT)', result: 'Positive for P. falciparum', uploaded_by: 'Lab. Sci. Aisha Mohammed', created_at: '2025-12-10T09:00:00Z' },
];

export const mockStaff: FacilityStaff[] = [
  { id: 's1', facility_id: 'f1', user_id: 'u2', role: 'doctor', full_name: 'Dr. Amina Ibrahim', email: 'amina@lagoon.clinic', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 's2', facility_id: 'f1', user_id: 'u3', role: 'doctor', full_name: 'Dr. Chukwuemeka Obi', email: 'chukwuemeka@lagoon.clinic', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 's3', facility_id: 'f1', user_id: 'u4', role: 'nurse', full_name: 'Nurse Grace Adeyemi', email: 'grace@lagoon.clinic', is_active: true, created_at: '2025-02-01T00:00:00Z' },
  { id: 's4', facility_id: 'f1', user_id: 'u5', role: 'lab_scientist', full_name: 'Lab. Sci. Tunde Bakare', email: 'tunde@lagoon.clinic', is_active: true, created_at: '2025-02-15T00:00:00Z' },
  { id: 's5', facility_id: 'f1', user_id: 'u6', role: 'pharmacist', full_name: 'Pharm. Ngozi Eze', email: 'ngozi@lagoon.clinic', is_active: true, created_at: '2025-03-01T00:00:00Z' },
  { id: 's6', facility_id: 'f1', user_id: 'u7', role: 'clinic_admin', full_name: 'Admin Blessing Okafor', email: 'blessing@lagoon.clinic', is_active: false, created_at: '2025-01-01T00:00:00Z' },
];
