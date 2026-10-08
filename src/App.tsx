import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import AdminGate from "@/components/AdminGate";
import Index from "./pages/Index";

const ReferralRedirect = () => {
  const { name } = useParams();
  if (name) localStorage.setItem("mm_ref", decodeURIComponent(name));
  return <Navigate to="/" replace />;
};

const OurTeam = lazy(() => import("./pages/OurTeam"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const IstaxBrandDisruption = lazy(() => import("./pages/IstaxBrandDisruption"));
const IstaxBrandArchitecture = lazy(() => import("./pages/IstaxBrandArchitecture"));
const QaumiTaranahCinematic = lazy(() => import("./pages/QaumiTaranahCinematic"));
const Syedello = lazy(() => import("./pages/Syedello"));
const SyedelloLogo = lazy(() => import("./pages/SyedelloLogo"));
const FinancialCenter = lazy(() => import("./pages/FinancialCenter"));
const AdminHub = lazy(() => import("./pages/AdminHub"));
const InvoiceGenerator = lazy(() => import("./pages/InvoiceGenerator"));
const AgreementGenerator = lazy(() => import("./pages/AgreementGenerator"));
const Contact = lazy(() => import("./pages/Contact"));
const Insights = lazy(() => import("./pages/Insights"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SprintBlueprint = lazy(() => import("./pages/SprintBlueprint"));
const ClientOnboarding = lazy(() => import("./pages/ClientOnboarding"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AIGovernance = lazy(() => import("./pages/AIGovernance"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#0B0F17]">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/client-onboarding" element={<ClientOnboarding />} />
              <Route path="/r/:name" element={<ReferralRedirect />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/ai-governance" element={<AIGovernance />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/istax-brand-disruption" element={<IstaxBrandDisruption />} />
              <Route path="/portfolio/istax-brand-architecture" element={<IstaxBrandArchitecture />} />
              <Route path="/portfolio/qaumi-taranah-cinematic" element={<QaumiTaranahCinematic />} />
              <Route path="/portfolio/syedello" element={<Syedello />} />
              <Route path="/portfolio/syedello-logo" element={<SyedelloLogo />} />
              <Route path="/financial-center" element={<FinancialCenter />} />
              <Route
                path="/admin"
                element={
                  <AdminGate>
                    <AdminHub />
                  </AdminGate>
                }
              />
              <Route
                path="/admin/hub"
                element={
                  <AdminGate>
                    <AdminHub />
                  </AdminGate>
                }
              />
              <Route
                path="/admin/documents"
                element={
                  <AdminGate>
                    <AdminHub />
                  </AdminGate>
                }
              />
              <Route
                path="/admin/invoice"
                element={
                  <AdminGate>
                    <InvoiceGenerator />
                  </AdminGate>
                }
              />
              <Route
                path="/billing"
                element={
                  <AdminGate>
                    <InvoiceGenerator />
                  </AdminGate>
                }
              />
              <Route
                path="/agreement-generator"
                element={
                  <AdminGate>
                    <AgreementGenerator />
                  </AdminGate>
                }
              />
              <Route
                path="/admin/agreement"
                element={
                  <AdminGate>
                    <AgreementGenerator />
                  </AdminGate>
                }
              />
              <Route
                path="/agreement"
                element={
                  <AdminGate>
                    <AgreementGenerator />
                  </AdminGate>
                }
              />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<BlogPost />} />
              <Route path="/sprint-blueprint" element={<SprintBlueprint />} />
              
              {/* Purged five mills redirects to home */}
              <Route path="/the-mills" element={<Navigate to="/" replace />} />
              <Route path="/the-mercer-method" element={<Navigate to="/#sprint" replace />} />
              <Route path="/services" element={<Navigate to="/#sprint" replace />} />
              <Route path="/services/*" element={<Navigate to="/#sprint" replace />} />
              <Route path="/guides/*" element={<Navigate to="/#sprint" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

export default App;
