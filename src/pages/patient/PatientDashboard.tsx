import { Link } from 'react-router-dom';
import { User, Clock, FileText, Pill, FlaskConical, LogOut, Share2 } from 'lucide-react';
import MedCordLogo from '@/components/MedCordLogo';
import { Button } from '@/components/ui/button';
import { mockPatient, mockConsultations, mockPrescriptions, mockLabResults } from '@/data/mockData';
import { format } from 'date-fns';

const roleLabel: Record<string, string> = {
  doctor: 'Doctor',
  nurse: 'Nurse',
  lab_scientist: 'Lab Scientist',
  pharmacist: 'Pharmacist',
  physiotherapist: 'Physiotherapist',
  radiologist: 'Radiologist',
};

const PatientDashboard = () => {
  const patient = mockPatient;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero px-4 pb-8 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MedCordLogo size={24} className="text-primary-foreground" />
            <span className="font-bold text-primary-foreground">MedCord</span>
          </div>
          <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground">
            <LogOut className="h-5 w-5" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary-foreground">{patient.full_name}</h1>
            <p className="text-sm text-primary-foreground/80">
              {patient.blood_group} · {patient.genotype} · Allergies: {patient.allergies}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-4">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Consultations', value: mockConsultations.length, icon: Clock },
            { label: 'Prescriptions', value: mockPrescriptions.length, icon: Pill },
            { label: 'Lab Results', value: mockLabResults.length, icon: FlaskConical },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 text-center shadow-card">
              <stat.icon className="mx-auto mb-1 h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Consultation History</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>

          <div className="space-y-4">
            {mockConsultations.map((consultation, i) => (
              <Link to={`/patient/consultation/${consultation.id}`} key={consultation.id}>
                <div className="rounded-xl border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {format(new Date(consultation.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {roleLabel[consultation.provider_role] || consultation.provider_role}
                    </span>
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground text-sm">{consultation.diagnosis}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{consultation.chief_complaint}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    <span>{consultation.provider_name} · {consultation.facility_name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Lab Results */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">Recent Lab Results</h2>
          <div className="space-y-3">
            {mockLabResults.slice(0, 3).map((lab) => (
              <div key={lab.id} className="rounded-xl border bg-card p-4 shadow-card">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{lab.test_name}</h3>
                  <span className="text-xs text-muted-foreground">{format(new Date(lab.created_at), 'MMM d, yyyy')}</span>
                </div>
                <p className="text-xs text-muted-foreground">{lab.result}</p>
                {lab.reference_range && (
                  <p className="mt-1 text-xs text-muted-foreground/70">Ref: {lab.reference_range}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Active Prescriptions</h2>
          <div className="space-y-3">
            {mockPrescriptions.map((rx) => (
              <div key={rx.id} className="rounded-xl border bg-card p-4 shadow-card">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{rx.medication}</h3>
                  {rx.dispensed && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-primary">Dispensed</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {rx.dosage} · {rx.frequency} · {rx.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
