import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const ClinicsPage = lazy(() => import("./pages/ClinicsPage"));
const ClinicPage = lazy(() => import("./pages/ClinicPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const DoctorPage = lazy(() => import("./pages/DoctorPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const BookingsPage = lazy(() => import("./pages/SimplePages").then((m) => ({ default: m.BookingsPage })));
const ProfilePage = lazy(() => import("./pages/SimplePages").then((m) => ({ default: m.ProfilePage })));
const ForClinicsPage = lazy(() => import("./pages/SimplePages").then((m) => ({ default: m.ForClinicsPage })));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollTop = () => {
  const { pathname } = useLocation();
  const type = useNavigationType();
  useEffect(() => { if (type !== "POP") window.scrollTo(0, 0); }, [pathname, type]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clinics" element={<ClinicsPage />} />
            <Route path="/clinics/:id" element={<ClinicPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorPage />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/for-clinics" element={<ForClinicsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
