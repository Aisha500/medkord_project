import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';

const FacilitySignup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MedCord</span>
        </Link>

        <div className="rounded-xl border bg-card p-8 shadow-card">
          <h1 className="mb-2 text-xl font-bold text-foreground">Register Your Health Facility</h1>
          <p className="mb-6 text-sm text-muted-foreground">Set up your clinic, hospital, or health centre on MedCord</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="facilityName">Facility name</Label>
              <Input id="facilityName" placeholder="Lagoon Specialist Clinic" />
            </div>

            <div className="space-y-2">
              <Label>Facility type</Label>
              <Select>
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
                <Input id="city" placeholder="Lagos" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Lagos State" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="12 Medical Drive, Victoria Island" />
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="mb-4 text-sm font-medium text-foreground">Administrator Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Full name</Label>
                  <Input id="adminName" placeholder="Dr. Amina Ibrahim" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Phone</Label>
                  <Input id="adminPhone" type="tel" placeholder="+234..." />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input id="adminEmail" type="email" placeholder="admin@clinic.com" />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input id="adminPassword" type="password" placeholder="••••••••" />
              </div>
            </div>

            <Button variant="hero" className="w-full" size="lg" asChild>
              <Link to="/provider">Register Facility</Link>
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
