import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pill, FlaskConical, Activity } from 'lucide-react';
import { mockConsultations, mockPrescriptions, mockLabResults } from '@/data/mockData';
import { format } from 'date-fns';

const ConsultationDetail = () => {
  const { id } = useParams();
  const consultation = mockConsultations.find((c) => c.id === id);
  const prescriptions = mockPrescriptions.filter((p) => p.consultation_id === id);
  const labResults = mockLabResults.filter((l) => l.consultation_id === id);

  if (!consultation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Consultation not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="gradient-hero px-4 pb-6 pt-6">
        <Link to="/patient" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-lg font-bold text-primary-foreground">{consultation.diagnosis}</h1>
        <p className="text-sm text-primary-foreground/80">
          {format(new Date(consultation.created_at), 'MMMM d, yyyy · h:mm a')}
        </p>
        <p className="mt-1 text-sm text-primary-foreground/70">
          {consultation.provider_name} · {consultation.facility_name}
        </p>
      </header>

      <div className="px-4 -mt-2 space-y-4">
        {/* Vitals */}
        {consultation.vitals && (
          <div className="rounded-xl border bg-card p-4 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">Vital Signs</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {consultation.vitals.blood_pressure && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{consultation.vitals.blood_pressure}</p>
                  <p className="text-xs text-muted-foreground">BP (mmHg)</p>
                </div>
              )}
              {consultation.vitals.pulse_rate && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{consultation.vitals.pulse_rate}</p>
                  <p className="text-xs text-muted-foreground">Pulse (bpm)</p>
                </div>
              )}
              {consultation.vitals.temperature && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{consultation.vitals.temperature}°C</p>
                  <p className="text-xs text-muted-foreground">Temp</p>
                </div>
              )}
              {consultation.vitals.weight && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{consultation.vitals.weight}kg</p>
                  <p className="text-xs text-muted-foreground">Weight</p>
                </div>
              )}
              {consultation.vitals.spo2 && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{consultation.vitals.spo2}%</p>
                  <p className="text-xs text-muted-foreground">SpO₂</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chief Complaint */}
        <Section title="Chief Complaint" content={consultation.chief_complaint} />
        {consultation.history_of_present_illness && <Section title="History" content={consultation.history_of_present_illness} />}
        {consultation.examination_findings && <Section title="Examination Findings" content={consultation.examination_findings} />}
        <Section title="Diagnosis" content={consultation.diagnosis} />
        {consultation.treatment_plan && <Section title="Treatment Plan" content={consultation.treatment_plan} />}

        {/* Prescriptions */}
        {prescriptions.length > 0 && (
          <div className="rounded-xl border bg-card p-4 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <Pill className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">Prescriptions</h2>
            </div>
            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="rounded-lg bg-secondary/50 p-3">
                  <p className="font-medium text-foreground text-sm">{rx.medication}</p>
                  <p className="text-xs text-muted-foreground">{rx.dosage} · {rx.frequency} · {rx.duration}</p>
                  {rx.dispensed && <p className="mt-1 text-xs text-primary font-medium">✓ Dispensed{rx.dispensed_by ? ` by ${rx.dispensed_by}` : ''}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lab Results */}
        {labResults.length > 0 && (
          <div className="rounded-xl border bg-card p-4 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">Lab Results</h2>
            </div>
            <div className="space-y-3">
              {labResults.map((lab) => (
                <div key={lab.id} className="rounded-lg bg-secondary/50 p-3">
                  <p className="font-medium text-foreground text-sm">{lab.test_name}</p>
                  <p className="text-xs text-muted-foreground">{lab.result}</p>
                  {lab.reference_range && <p className="text-xs text-muted-foreground/70">Ref: {lab.reference_range}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="rounded-xl border bg-card p-4 shadow-card">
    <h2 className="mb-2 font-semibold text-foreground text-sm">{title}</h2>
    <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
  </div>
);

export default ConsultationDetail;
