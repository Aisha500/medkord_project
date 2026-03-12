import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';

export default function ProtectedRoute({ children, requiredType }: { children: React.ReactNode; requiredType?: 'patient' | 'facility_admin' }) {
  const { user, isReady, profile } = useAuth();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Shield className="h-8 w-8 animate-pulse text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requiredType && profile && profile.account_type !== requiredType) {
    return <Navigate to={profile.account_type === 'patient' ? '/patient' : '/provider'} replace />;
  }

  return <>{children}</>;
}
