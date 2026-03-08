import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface PrescriptionEntry {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const NewConsultation = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionEntry[]>([]);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { medication: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Consultation recorded successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center gap-4">
          <Link to="/provider" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-foreground">New Consultation</h1>
        </div>
      </header>

      <div className="container max-w-3xl py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-foreground">Patient</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Search patient</Label>
                <Input placeholder="Name or phone number" />
              </div>
              <div className="space-y-2">
                <Label>Patient ID</Label>
                <Input placeholder="Auto-filled" disabled />
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-foreground">Vital Signs</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Blood Pressure</Label>
                <Input placeholder="120/80" />
              </div>
              <div className="space-y-2">
                <Label>Pulse Rate</Label>
                <Input placeholder="72 bpm" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Temperature</Label>
                <Input placeholder="36.5°C" type="number" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input placeholder="kg" type="number" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>SpO₂</Label>
                <Input placeholder="98%" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Resp. Rate</Label>
                <Input placeholder="/min" type="number" />
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-foreground">Clinical Notes</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Chief Complaint *</Label>
                <Textarea placeholder="Patient's main reason for visit..." rows={2} />
              </div>
              <div className="space-y-2">
                <Label>History of Present Illness</Label>
                <Textarea placeholder="Detailed history..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Examination Findings</Label>
                <Textarea placeholder="Physical examination results..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Diagnosis *</Label>
                <Input placeholder="Primary diagnosis" />
              </div>
              <div className="space-y-2">
                <Label>Treatment Plan</Label>
                <Textarea placeholder="Recommended treatment and follow-up..." rows={3} />
              </div>
            </div>
          </div>

          {/* Prescriptions */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Prescriptions</h2>
              <Button type="button" variant="outline" size="sm" onClick={addPrescription}>
                <Plus className="h-3 w-3 mr-1" /> Add Medication
              </Button>
            </div>

            {prescriptions.length === 0 && (
              <p className="text-sm text-muted-foreground">No prescriptions added yet.</p>
            )}

            {prescriptions.map((_, index) => (
              <div key={index} className="mb-4 rounded-lg border bg-muted/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Medication {index + 1}</span>
                  <button type="button" onClick={() => removePrescription(index)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <Label className="text-xs">Medication</Label>
                    <Input placeholder="Drug name" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Dosage</Label>
                    <Input placeholder="e.g. 500mg" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Frequency</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="od">Once daily</SelectItem>
                        <SelectItem value="bd">Twice daily</SelectItem>
                        <SelectItem value="tds">Three times daily</SelectItem>
                        <SelectItem value="qds">Four times daily</SelectItem>
                        <SelectItem value="prn">As needed (PRN)</SelectItem>
                        <SelectItem value="stat">Stat (immediate)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Duration</Label>
                    <Input placeholder="e.g. 7 days" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" asChild>
              <Link to="/provider">Cancel</Link>
            </Button>
            <Button variant="hero" type="submit" size="lg">
              Save Consultation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConsultation;
