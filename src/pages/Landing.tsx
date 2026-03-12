import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MediCordLogo from '@/components/MediCordLogo';
import { useState } from 'react';

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <MedCordLogo size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MedCord</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Button variant="hero" asChild><Link to="/signup/patient">Get Started</Link></Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-background p-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link to="/login" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Button variant="hero" asChild><Link to="/signup/patient" onClick={() => setMobileMenuOpen(false)}>Get Started</Link></Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="container relative py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Built for Nigerian Healthcare
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              Your Medical Records,{' '}
              <span className="text-primary">Always Accessible</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-2xl mx-auto">
              MedCord digitizes patient consultation history so healthcare providers can record faster, and patients can access their medical records from any device.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
                <Link to="/signup/patient">Register as Individual</Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" asChild>
                <Link to="/signup/facility">Register My Facility</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-card py-20">
        <div className="container">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground">How MedCord Works</h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-muted-foreground">
            A simple, secure system connecting patients and healthcare providers.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'For Patients',
                description: 'Sign up once. View your complete medical history, prescriptions, and lab results on your phone — anytime, anywhere.',
                icon: '📱',
              },
              {
                title: 'For Healthcare Providers',
                description: 'Record consultations in under 60 seconds. Digital records that follow the patient across facilities.',
                icon: '🩺',
              },
              {
                title: 'For Health Facilities',
                description: 'Register your clinic, invite staff, assign roles. Manage patient records digitally with proper access control.',
                icon: '🏥',
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border bg-background p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Ready to go digital?</h2>
          <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
            Join clinics across Nigeria that are moving to digital medical records with MedCord.
          </p>
          <Button size="lg" className="bg-background text-primary hover:bg-background/90 text-base px-8 py-6" asChild>
            <Link to="/signup/facility">Register Your Facility</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
              <MedCordLogo size={16} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">MedCord</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MedCord. Securing healthcare records for Nigeria.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
