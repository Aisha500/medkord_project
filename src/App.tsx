import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import PatientSignup from "./pages/auth/PatientSignup";
import FacilitySignup from "./pages/auth/FacilitySignup";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ConsultationDetail from "./pages/patient/ConsultationDetail";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import NewConsultation from "./pages/provider/NewConsultation";
import PatientProfile from "./pages/provider/PatientProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/patient" element={<PatientSignup />} />
            <Route path="/signup/facility" element={<FacilitySignup />} />
            <Route path="/patient" element={<ProtectedRoute requiredType="patient"><PatientDashboard /></ProtectedRoute>} />
            <Route path="/patient/consultation/:id" element={<ProtectedRoute requiredType="patient"><ConsultationDetail /></ProtectedRoute>} />
            <Route path="/provider" element={<ProtectedRoute requiredType="facility_admin"><ProviderDashboard /></ProtectedRoute>} />
            <Route path="/provider/consultation/new" element={<ProtectedRoute requiredType="facility_admin"><NewConsultation /></ProtectedRoute>} />
            <Route path="/provider/patient/:id" element={<ProtectedRoute requiredType="facility_admin"><PatientProfile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
