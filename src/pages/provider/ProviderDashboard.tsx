import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Plus, UserPlus, Settings, FileText, Activity, LogOut } from 'lucide-react';
import MedKordLogo from '@/components/MedKordLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockConsultations, mockStaff } from '@/data/mockData';
import { format } from 'date-fns';

const tabs = [
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'staff', label: 'Staff', icon: UserPlus },
  { id: 'recent', label: 'Recent', icon: Activity },
];

const mockPatients = [
  { id: 'p1', name: 'Adebayo Ogundimu', phone: '+234 801 234 5678', lastVisit: '2026-03-05', gender: 'M', age: 38 },
  { id: 'p2', name: 'Chidinma Nwosu', phone: '+234 802 345 6789', lastVisit: '2026-03-04', gender: 'F', age: 29 },
  { id: 'p3', name: 'Ibrahim Musa', phone: '+234 803 456 7890', lastVisit: '2026-03-03', gender: 'M', age: 45 },
  { id: 'p4', name: 'Folake Adeyemi', phone: '+234 804 567 8901', lastVisit: '2026-03-01', gender: 'F', age: 62 },
  { id: 'p5', name: 'Emeka Okafor', phone: '+234 805 678 9012', lastVisit: '2026-02-28', gender: 'M', age: 34 },
];

const roleLabels: Record<string, string> = {
  doctor: 'Doctor', nurse: 'Nurse', lab_scientist: 'Lab Scientist',
  pharmacist: 'Pharmacist', physiotherapist: 'Physiotherapist',
  radiologist: 'Radiologist', clinic_admin: 'Clinic Admin',
};

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <MediCordLogo size={16} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">MediCord</span>
        </div>

        <div className="p-4">
          <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Lagoon Specialist Clinic</p>
          <p className="text-xs text-muted-foreground">Dr. Amina Ibrahim · Admin</p>
        </div>

        <nav className="px-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <MediCordLogo size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm">MediCord</span>
          </div>
          <Link to="/" className="text-muted-foreground"><LogOut className="h-5 w-5" /></Link>
        </div>
        <div className="flex border-t">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="lg:ml-64">
        <div className="p-4 lg:p-8">
          {activeTab === 'patients' && (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Patients</h1>
                  <p className="text-sm text-muted-foreground">{mockPatients.length} registered patients</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" asChild>
                    <Link to="/provider/consultation/new"><Plus className="h-4 w-4 mr-1" /> New Consultation</Link>
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or phone..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-xl border bg-card shadow-card overflow-hidden">
                <div className="hidden sm:grid sm:grid-cols-5 border-b bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span className="col-span-2">Patient</span>
                  <span>Phone</span>
                  <span>Last Visit</span>
                  <span>Action</span>
                </div>
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="flex flex-col gap-2 border-b px-4 py-4 sm:grid sm:grid-cols-5 sm:items-center last:border-0">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.gender} · {patient.age}yrs</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(patient.lastVisit), 'MMM d, yyyy')}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/provider/patient/${patient.id}`}><FileText className="h-3 w-3 mr-1" /> View</Link>
                      </Button>
                      <Button variant="hero" size="sm" asChild>
                        <Link to="/provider/consultation/new"><Plus className="h-3 w-3 mr-1" /> Consult</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'staff' && (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
                  <p className="text-sm text-muted-foreground">{mockStaff.length} team members</p>
                </div>
                <Button variant="hero"><UserPlus className="h-4 w-4 mr-1" /> Invite Staff</Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockStaff.map((staff) => (
                  <div key={staff.id} className="rounded-xl border bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                        {staff.full_name.split(' ').slice(-1)[0][0]}{staff.full_name.split(' ')[0][0]}
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${staff.is_active ? 'bg-secondary text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {staff.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{staff.full_name}</h3>
                    <p className="text-xs text-primary font-medium">{roleLabels[staff.role]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{staff.email}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'recent' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Recent Consultations</h1>
                <p className="text-sm text-muted-foreground">Latest clinical encounters</p>
              </div>

              <div className="space-y-4">
                {mockConsultations.map((c) => (
                  <div key={c.id} className="rounded-xl border bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{c.diagnosis}</h3>
                        <p className="text-sm text-muted-foreground">{c.chief_complaint}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {format(new Date(c.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.provider_name} · {c.facility_name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
