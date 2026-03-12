import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MedCordLogo from '@/components/MedCordLogo';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const FacilitySignup = () => {
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName || !adminEmail || !adminPassword || !facilityName) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await signUp(adminEmail, adminPassword, {
      full_name: adminName,
      phone: adminPhone,
      account_type: 'facility_admin',
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Facility registered!', description: 'Please check your email to verify your account before signing in.' });
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <MedCordLogo size={20} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MedCord</span>
        </Link>

        <div className="rounded-xl border bg-card p-8 shadow-card">
          <h1 className="mb-2 text-xl font-bold text-foreground">Register Your Health Facility</h1>
          <p className="mb-6 text-sm text-muted-foreground">Set up your clinic, hospital, or health centre on MedCord</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="facilityName">Facility name</Label>
              <Input id="facilityName" placeholder="Lagoon Specialist Clinic" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Facility type</Label>
              <Select value={facilityType} onValueChange={setFacilityType}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinic">Clinic</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="phc">Primary Health Centre (PHC)</SelectItem>
                  <SelectItem value="specialist">Specialist Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Lagos" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Lagos State" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="12 Medical Drive, Victoria Island" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="mb-4 text-sm font-medium text-foreground">Administrator Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Full name</Label>
                  <Input id="adminName" placeholder="Dr. Amina Ibrahim" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Phone</Label>
                  <Input id="adminPhone" type="tel" placeholder="+234..." value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input id="adminEmail" type="email" placeholder="admin@clinic.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input id="adminPassword" type="password" placeholder="••••••••" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
              </div>
            </div>

            <Button variant="hero" className="w-full" size="lg" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register Facility'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already registered? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilitySignup;
