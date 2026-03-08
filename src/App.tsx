import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/facility" element={<FacilitySignup />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/consultation/:id" element={<ConsultationDetail />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/consultation/new" element={<NewConsultation />} />
          <Route path="/provider/patient/:id" element={<PatientProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
