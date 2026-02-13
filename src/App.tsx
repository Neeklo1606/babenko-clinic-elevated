import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const DirectionsPage = lazy(() => import("./pages/DirectionsPage"));
const DirectionPage = lazy(() => import("./pages/DirectionPage"));
const Dermatology = lazy(() => import("./pages/Dermatology"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const LaserCO2 = lazy(() => import("./pages/LaserCO2"));
const Appointment = lazy(() => import("./pages/Appointment"));
const PricesPage = lazy(() => import("./pages/PricesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/directions" element={<DirectionsPage />} />
            <Route path="/directions/dermatology" element={<Dermatology />} />
            <Route path="/directions/:slug" element={<DirectionPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/laser-co2" element={<LaserCO2 />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/dermatology" element={<Dermatology />} />
            <Route path="/doctor/babenko" element={<DoctorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
