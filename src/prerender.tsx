import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import OurTeam from "./pages/OurTeam";
import TheMills from "./pages/TheMills";
import TheMercerMethod from "./pages/TheMercerMethod";
import Portfolio from "./pages/Portfolio";
import IstaxBrandDisruption from "./pages/IstaxBrandDisruption";
import IstaxBrandArchitecture from "./pages/IstaxBrandArchitecture";
import QaumiTaranahCinematic from "./pages/QaumiTaranahCinematic";
import Syedello from "./pages/Syedello";
import SyedelloLogo from "./pages/SyedelloLogo";
import FinancialCenter from "./pages/FinancialCenter";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import Services from "./pages/Services";
import BlogPost from "./pages/BlogPost";
import SprintBlueprint from "./pages/SprintBlueprint";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TheLiteraryMill from "./pages/services/TheLiteraryMill";
import TheVisionaryMill from "./pages/services/TheVisionaryMill";
import TheSonicMill from "./pages/services/TheSonicMill";
import TheStructuralMill from "./pages/services/TheStructuralMill";
import TheAcademyMill from "./pages/services/TheAcademyMill";
import CourseLaunchBlueprint from "./pages/guides/CourseLaunchBlueprint";
import ProjectScopingTool from "./pages/guides/ProjectScopingTool";
import PodcastLaunchSoundKit from "./pages/guides/PodcastLaunchSoundKit";
import BrandIdentityStarterKit from "./pages/guides/BrandIdentityStarterKit";
import FoundersManuscriptBlueprint from "./pages/guides/FoundersManuscriptBlueprint";
import TermsOfService from "./pages/TermsOfService";
import AIGovernance from "./pages/AIGovernance";
import { posts } from "@/lib/posts";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export async function prerender({ url }: { url: string }) {
  const helmetContext: Record<string, unknown> = {};

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <StaticRouter location={url}>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/ai-governance" element={<AIGovernance />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/istax-brand-disruption" element={<IstaxBrandDisruption />} />
                <Route path="/portfolio/istax-brand-architecture" element={<IstaxBrandArchitecture />} />
                <Route path="/portfolio/qaumi-taranah-cinematic" element={<QaumiTaranahCinematic />} />
                <Route path="/portfolio/syedello" element={<Syedello />} />
                <Route path="/portfolio/syedello-logo" element={<SyedelloLogo />} />
                <Route path="/financial-center" element={<FinancialCenter />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<BlogPost />} />
                <Route path="/sprint-blueprint" element={<SprintBlueprint />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const links = new Set<string>([
    "/privacy-policy",
    "/terms-of-service",
    "/ai-governance",
    "/our-team",
    "/portfolio",
    "/portfolio/istax-brand-disruption",
    "/portfolio/istax-brand-architecture",
    "/portfolio/qaumi-taranah-cinematic",
    "/portfolio/syedello",
    "/portfolio/syedello-logo",
    "/financial-center",
    "/contact",
    "/insights",
    "/sprint-blueprint",
  ]);
  for (const post of posts) {
    links.add(`/insights/${post.slug}`);
  }

  const helmet = (helmetContext as any).helmet;
  let head: Record<string, unknown> | undefined;
  if (helmet) {
    const titleMatch = helmet.title?.toString().match(/<title[^>]*>([^<]*)<\/title>/);
    const elements = new Set<string>();
    const meta = helmet.meta?.toString();
    const linkTags = helmet.link?.toString();
    const scriptTags = helmet.script?.toString();
    if (meta) elements.add(meta);
    if (linkTags) elements.add(linkTags);
    if (scriptTags) elements.add(scriptTags);
    const rawTitle = titleMatch ? titleMatch[1] : "";
    const decodedTitle = rawTitle.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    head = {
      title: decodedTitle,
      elements,
    };
  }

  return { html, links, head };
}
