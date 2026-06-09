import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Layers, Palette, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const metadata = [
  { icon: Layers, label: "Project Type", value: "Brand Design & Visual Assets" },
  { icon: Clock, label: "Execution Time", value: "9 Days From Scratch" },
  { icon: Palette, label: "Design Language", value: "Minimalist Corporate Split" },
  { icon: Target, label: "Core Deliverables", value: "Logo, Stationery, Posters" },
];

const deliverables = [
  "Custom Vector Identity Mark: Engineered for infinite scaling across everything from app icons to large-scale billboards on Shahrah-e-Faisal.",
  "Premium Stationery Architecture: High-end, print-ready layout templates for corporate business cards, formal letterheads, and corporate retainership contracts.",
  "High-Conversion Social Poster Ecosystem: Optimized layout variations balancing crisp promotional typography with stunning, attention-grabbing surreal graphics.",
];

const IstaxBrandDisruption = () => {
  return (
    <>
      <Helmet>
        <title>ISTAX Brand Disruption | Portfolio | Mercer &amp; Mills</title>
        <meta name="description" content="A bold brand disruption strategy for ISTAX — redefining identity through strategic visual storytelling and market positioning by Mercer &amp; Mills." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "headline": "ISTAX Brand Disruption — A Bold Brand Disruption Strategy for Pakistan's Premier Tax Consultancy",
          "description": "A bold brand disruption strategy for ISTAX — redefining identity through strategic visual storytelling and market positioning by Mercer & Mills.",
          "author": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "about": "Brand Disruption",
          "keywords": "ISTAX, brand disruption, tax consultancy branding, visual storytelling, market positioning",
          "url": "https://mercerandmills.com/portfolio/istax-brand-disruption",
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
          <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">Brand Design</span>
        </div>

        <SectionHeading
          align="left"
          subtitle="Case Study"
          title="Visual Disruption in Finance: Designing a High-Impact Marketing & Collateral System for ISTAX"
          description="Translating Strategic Abstract Philosophy into Premium, Attention-Grabbing Digital & Physical Art Assets"
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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Design Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Financial design in South Asia is notoriously saturated with cluttered layouts, uninspired stock photography, and aggressive, unpolished colors. ISTAX required an elite visual language that could live fluidly across two polarized environments: corporate executive boardrooms (demanding stark minimalism and clean trust elements) and digital social feeds (demanding breathtaking visual concepts that command a user to stop scrolling). The visual identity had to immediately communicate premium craftsmanship and flawless professional execution.
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
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Design Sprint Breakdown</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Creative Masterstroke: The Interlocking Logo</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We engineered the ISTAX brand mark entirely from scratch. The visual signature features an elegant, continuous interlocking geometric line art configuration forming the characters <em>IS</em>. Conceptually, this custom logomark represents the unbreakable mathematical interconnectivity between the two core pillars of financial health: <strong>Income + Tax Compliance</strong>. The fluid lines embody a seamless journey, assuring the client that their revenue and structural legal protections are perfectly balanced and operating in unison.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
              "By balancing an emerald corporate green with a stark crisp white, we established a high-contrast palette that instantly signals prestige, growth, and institutional trust."
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
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Iterative Design & Review</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Dual-Layer Visual Execution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold mb-3">Layer 1: Corporate Minimalism</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The business card utilizes a striking asymmetric vertical split. One half features pristine white with the interlocking logo; the other features deep corporate emerald housing highly structured typography and custom communication icons. This ensures absolute readability and an elite tactile feel.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold mb-3">Layer 2: Surrealist Disruption</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The marketing poster breaks corporate design boundaries by integrating flowing abstract geometry, custom data visualization elements, and dreamlike financial architecture. It transforms the abstract concept of tax filing into a visual journey toward clarity and wealth acceleration.
                </p>
              </div>
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
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Launch — Delivery & Asset Handoff</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">Technical & Collateral Deliverables</h2>
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
          <p className="text-muted-foreground text-sm mb-4">Ready to visually dominate your market space? Let's build your custom design assets.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["LOGO SYSTEMS", "MARKETING COLLATERAL", "PREMIUM PRESENTATION DESIGN", "VISUAL ASSETS"].map((tag) => (
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

export default IstaxBrandDisruption;
