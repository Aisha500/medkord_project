import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User, Clock, Pill, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPatient, mockConsultations, mockPrescriptions, mockLabResults } from '@/data/mockData';
import { format } from 'date-fns';

const PatientProfile = () => {
  const patient = mockPatient;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center gap-4">
          <Link to="/provider" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-foreground">Patient Profile</h1>
          <div className="ml-auto">
            <Button variant="hero" size="sm" asChild>
              <Link to="/provider/consultation/new">New Consultation</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl py-6 space-y-6">
        {/* Patient info */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
              {patient.full_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{patient.full_name}</h2>
              <p className="text-sm text-muted-foreground">{patient.gender} · DOB: {format(new Date(patient.date_of_birth), 'MMM d, yyyy')} · {patient.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
            <div><p className="text-xs text-muted-foreground">Blood Group</p><p className="font-medium text-foreground">{patient.blood_group || '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">Genotype</p><p className="font-medium text-foreground">{patient.genotype || '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">Allergies</p><p className="font-medium text-foreground">{patient.allergies || 'None'}</p></div>
          </div>
        </div>

        {/* Consultation timeline */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Consultation History</h2>
          </div>
          <div className="space-y-4">
            {mockConsultations.map((c) => (
              <div key={c.id} className="rounded-lg border p-4 transition-all hover:shadow-card-hover">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{c.diagnosis}</h3>
                  <span className="text-xs text-muted-foreground">{format(new Date(c.created_at), 'MMM d, yyyy')}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{c.chief_complaint}</p>
                {c.vitals && (
                  <div className="flex flex-wrap gap-3 mb-2">
                    {c.vitals.blood_pressure && <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">BP: {c.vitals.blood_pressure}</span>}
                    {c.vitals.temperature && <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Temp: {c.vitals.temperature}°C</span>}
                    {c.vitals.pulse_rate && <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Pulse: {c.vitals.pulse_rate}</span>}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{c.provider_name} · {c.facility_name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lab results */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Lab Results</h2>
          </div>
          <div className="space-y-3">
            {mockLabResults.map((lab) => (
              <div key={lab.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground text-sm">{lab.test_name}</h3>
                  <span className="text-xs text-muted-foreground">{format(new Date(lab.created_at), 'MMM d, yyyy')}</span>
                </div>
                <p className="text-sm text-muted-foreground">{lab.result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
