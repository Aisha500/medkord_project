import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import MedCordLogo from '@/components/MedCordLogo';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'patient' | 'provider'>('patient');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Please enter email and password', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
    } else {
      navigate(accountType === 'patient' ? '/patient' : '/provider');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 gradient-hero lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center">
          <MedCordLogo size={64} className="mx-auto mb-6 text-primary-foreground" />
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Welcome back to MedCord</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Access your medical records securely. Your health history, always at your fingertips.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <MedCordLogo size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MedCord</span>
          </Link>

          <h1 className="mb-2 text-2xl font-bold text-foreground">Sign in to your account</h1>
          <p className="mb-8 text-muted-foreground">Enter your credentials to continue</p>

          {/* Account type toggle */}
          <div className="mb-6 flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => setAccountType('patient')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${accountType === 'patient' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
            >
              Individual
            </button>
            <button
              onClick={() => setAccountType('provider')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${accountType === 'provider' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
            >
              Healthcare Provider
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full" size="lg" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to={accountType === 'patient' ? '/signup/patient' : '/signup/facility'} className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
