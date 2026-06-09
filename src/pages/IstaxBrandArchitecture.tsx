import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Globe, MapPin, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const metadata = [
  { icon: Target, label: "Project Type", value: "Brand Identity & Strategy" },
  { icon: Clock, label: "Timeline", value: "9 Days (Sprint Delivery)" },
  { icon: Globe, label: "Launch Strategy", value: "Digital & Social Media" },
  { icon: MapPin, label: "Target Market", value: "Karachi, Pakistan" },
];

const demographicTiers = [
  {
    title: "Multi-Tier Salaried Individuals",
    description: "Engineered to accommodate the entire spectrum of salaried earners across Karachi—from mid-level corporate employees and banking associates to high-tier multinational executives and public sector professionals. The positioning addresses universal pain points: fear of miscalculation, confusion regarding active taxpayer status (FBR filer list benefits), and the lack of time to manually navigate documentation. By framing the service as an affordable, secure, and stress-free utility, we transformed tax compliance from a daunting chore into a routine, accessible financial checkup.",
  },
  {
    title: "Tech Startups & Modern SMBs",
    description: "Framed around financial runway compliance, tax-credit optimization, and seamless digital onboarding. Positioned ISTAX as an outsourced, agile CFO partner for Karachi's booming entrepreneurial landscape.",
  },
  {
    title: "Industrial & Manufacturing Conglomerates",
    description: "Anchored completely on corporate retainerships, multi-tier tax audits, and large-scale industrial compliance. The tone here is highly authoritative, risk-aversive, and financially optimized to protect corporate margins.",
  },
];

const deliverables = [
  "Brand Strategy Framework: Complete purpose, vision, and positioning matrix mapped to Pakistan's regulatory landscape.",
  "Verbal Identity System: Multi-tiered tone of voice matrix ranging from corporate authoritative to consumer-friendly.",
  "Social Media Launch Playbook: Comprehensive digital communication strategy engineered for high-conversion LinkedIn and Facebook deployments.",
];

const IstaxBrandArchitecture = () => {
  return (
    <>
      <Helmet>
        <title>ISTAX Brand Architecture | Portfolio | Mercer &amp; Mills</title>
        <meta name="description" content="Comprehensive brand architecture for ISTAX — structuring a scalable brand system across products, regions, and audiences by Mercer &amp; Mills." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "headline": "ISTAX Brand Architecture — Structuring a Scalable Brand System Across Products, Regions, and Audiences",
          "description": "Comprehensive brand architecture for ISTAX — structuring a scalable brand system across products, regions, and audiences by Mercer & Mills.",
          "author": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "about": "Brand Architecture",
          "keywords": "ISTAX, brand architecture, tax consultancy, brand system, scalable branding",
          "url": "https://mercerandmills.com/portfolio/istax-brand-architecture",
          "datePublished": "2026-05-29"
        })}</script>
      </Helmet>
      <section className="py-24">
      <div className="container">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="mb-6">
          <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">Brand Identity</span>
        </div>

        <SectionHeading
          align="left"
          subtitle="Case Study"
          title="Demystifying Tax Compliance: Building a Trust-First Brand Framework for ISTAX Consultants"
          description="Strategic Architecture & Positioning for Pakistan's Premier Modern Financial Consultancy"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metadata.map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-lg p-5">
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h4 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</h4>
              <p className="font-serif text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="aspect-video w-full mb-16 rounded-xl overflow-hidden bg-card border border-border">
          <iframe
            src="https://istax.netlify.app/"
            title="ISTAX Consultants Website"
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow=""
          />
        </div>

        <div className="space-y-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">01</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Discovery — How We Scoped the Project</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              In Pakistan's financial hub, Karachi—a hyper-dynamic megacity built on diverse socio-economic layers—traditional tax consultancies are widely perceived as archaic, intimidating, and opaque. ISTAX Consultants set out to break this stereotype. They required a comprehensive brand identity framework capable of appealing simultaneously to three distinct corporate and civilian demographics: multi-tier salaried individuals seeking hassle-free individual filing, fast-scaling technology startups in need of agile financial modeling, and massive cross-border manufacturing operations requiring complex corporate retainerships. The core challenge was translating cold legal tax compliance into an inviting, high-trust digital ecosystem without losing financial authority.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8 md:p-12"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">02</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Strategy Sprint Breakdown</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Strategy & Core DNA</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We decoupled ISTAX from legacy financial messaging by establishing a foundational philosophy centered on absolute transparency and modern accessibility. Over a high-velocity 9-day design and strategy sprint, we developed a brand ecosystem built around a singular verbal thesis: <em className="text-foreground font-semibold">Filing Made Easy. Every Tax, Every Time!</em> This positioning statement strips the institutional friction out of tax season, treating tax compliance not as a punitive burden, but as a strategic asset for wealth preservation and business velocity.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
              "By positioning compliance as a catalyst for economic growth rather than a complex regulatory hurdle, we built immediate, frictionless psychological safety for corporate stakeholders across Karachi."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">02</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Iterative Audience Design</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">Demographic-Targeted Messaging Architecture</h2>
            <div className="space-y-6">
              {demographicTiers.map((tier) => (
                <div key={tier.title} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-serif text-lg font-bold text-primary mb-3">{tier.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">04</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Launch — Final Deliverables & Handoff</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Deliverables Checklist</h2>
            <ul className="space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 bg-card border border-border rounded-lg p-5">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-4">Looking to establish real market authority? Let's build your Brand Identity.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["CONSULTANCY", "STRATEGY", "COPYWRITING", "COMPLETE VISUAL FRAMEWORKS"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <Link to="/contact">
            <Button size="lg" className="mt-8 bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default IstaxBrandArchitecture;
