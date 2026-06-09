import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";

const ReferralRedirect = () => {
  const { name } = useParams();
  if (name) localStorage.setItem("mm_ref", decodeURIComponent(name));
  return <Navigate to="/" replace />;
};

const OurTeam = lazy(() => import("./pages/OurTeam"));
const TheMills = lazy(() => import("./pages/TheMills"));
const TheMercerMethod = lazy(() => import("./pages/TheMercerMethod"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const IstaxBrandDisruption = lazy(() => import("./pages/IstaxBrandDisruption"));
const IstaxBrandArchitecture = lazy(() => import("./pages/IstaxBrandArchitecture"));
const QaumiTaranahCinematic = lazy(() => import("./pages/QaumiTaranahCinematic"));
const FinancialCenter = lazy(() => import("./pages/FinancialCenter"));
const Contact = lazy(() => import("./pages/Contact"));
const Insights = lazy(() => import("./pages/Insights"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SprintBlueprint = lazy(() => import("./pages/SprintBlueprint"));
const TheLiteraryMill = lazy(() => import("./pages/services/TheLiteraryMill"));
const TheVisionaryMill = lazy(() => import("./pages/services/TheVisionaryMill"));
const TheSonicMill = lazy(() => import("./pages/services/TheSonicMill"));
const TheStructuralMill = lazy(() => import("./pages/services/TheStructuralMill"));
const TheAcademyMill = lazy(() => import("./pages/services/TheAcademyMill"));
const CourseLaunchBlueprint = lazy(() => import("./pages/guides/CourseLaunchBlueprint"));
const ProjectScopingTool = lazy(() => import("./pages/guides/ProjectScopingTool"));
const PodcastLaunchSoundKit = lazy(() => import("./pages/guides/PodcastLaunchSoundKit"));
const BrandIdentityStarterKit = lazy(() => import("./pages/guides/BrandIdentityStarterKit"));
const FoundersManuscriptBlueprint = lazy(() => import("./pages/guides/FoundersManuscriptBlueprint"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground text-sm">Loading...</p>
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
              <Route path="/r/:name" element={<ReferralRedirect />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/services" element={<Services />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/the-mills" element={<TheMills />} />
              <Route path="/the-mercer-method" element={<TheMercerMethod />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/istax-brand-disruption" element={<IstaxBrandDisruption />} />
              <Route path="/portfolio/istax-brand-architecture" element={<IstaxBrandArchitecture />} />
              <Route path="/portfolio/qaumi-taranah-cinematic" element={<QaumiTaranahCinematic />} />
              <Route path="/financial-center" element={<FinancialCenter />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<BlogPost />} />
              <Route path="/sprint-blueprint" element={<SprintBlueprint />} />
              <Route path="/services/the-literary-mill" element={<TheLiteraryMill />} />
              <Route path="/services/the-visionary-mill" element={<TheVisionaryMill />} />
              <Route path="/services/the-sonic-mill" element={<TheSonicMill />} />
              <Route path="/services/the-structural-mill" element={<TheStructuralMill />} />
              <Route path="/services/the-academy-mill" element={<TheAcademyMill />} />
              <Route path="/guides/course-launch-blueprint" element={<CourseLaunchBlueprint />} />
              <Route path="/guides/project-scoping-tool" element={<ProjectScopingTool />} />
              <Route path="/guides/podcast-launch-sound-kit" element={<PodcastLaunchSoundKit />} />
              <Route path="/guides/brand-identity-starter-kit" element={<BrandIdentityStarterKit />} />
              <Route path="/guides/founders-manuscript-blueprint" element={<FoundersManuscriptBlueprint />} />
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
