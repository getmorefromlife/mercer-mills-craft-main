import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Palette, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const metadata = [
  { icon: Layers, label: "Project Type", value: "Logo Design" },
  { icon: Clock, label: "Execution Time", value: "3 Days" },
  { icon: Palette, label: "Design Style", value: "Modern Minimalist" },
  { icon: Target, label: "Deliverable", value: "Scalable Vector Logo" },
];

const SyedelloLogo = () => {
  return (
    <>
      <Helmet>
        <title>Syedello — Logo Design | Portfolio | Mercer &amp; Mills</title>
        <meta name="description" content="Syedello logo design — a modern, minimalist brand mark for a free project management app, crafted by Mercer &amp; Mills." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "headline": "Syedello Logo Design — A Modern Minimalist Brand Mark for a Project Management App",
          "description": "A clean, recognizable logo design for Syedello — a free kanban-based project management application.",
          "author": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "about": "Logo Design",
          "keywords": "logo design, brand mark, project management app, minimalist logo, Syedello",
          "url": "https://mercerandmills.com/portfolio/syedello-logo",
          "datePublished": "2026-06-01"
        })}</script>
      </Helmet>
      <section className="py-24">
      <div className="container">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="mb-6">
          <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">Graphic Design</span>
        </div>

        <SectionHeading
          align="left"
          subtitle="Case Study"
          title="Syedello Logo: A Minimalist Mark for Modern Project Management"
          description="Designing a clean, versatile brand identity for a free kanban application built for agile teams"
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
            className="bg-card border border-border rounded-xl p-8 md:p-16 flex items-center justify-center"
          >
            <img src="/Syedello Logo.png" alt="Syedello Logo" className="max-w-full h-auto max-h-80 object-contain" />
          </motion.div>

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
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Concept — Design Direction</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">A Mark That Means Motion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Syedello is a project management app built around movement — cards shift between columns, tasks progress through stages, and teams move work forward. The logo needed to capture that energy in a single, simple mark. We explored geometric letterforms that suggest a kanban board column structure while remaining clean enough to work at any size — from a browser tab icon to a full-screen loading state.
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
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Execution — From Sketch to Vector</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">Clean Geometry, Purposeful Details</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Starting from hand-drawn thumbnails, we refined the mark through multiple vector iterations. The final design uses precise geometric construction — each curve and angle serves a purpose. The primary palette of deep navy and warm gold ties the app to the broader Mercer & Mills brand system while giving Syedello its own distinct personality.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
              "A great app logo doesn't just look good — it disappears when you're working and stands out when you're looking for it. That balance guided every decision."
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
                <span className="font-serif text-xs font-bold text-primary">03</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Delivery — Final Assets</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">A Versatile Brand System</h2>
            <p className="text-muted-foreground leading-relaxed">
              The final deliverable included the primary logo in multiple formats: SVG for web, PNG for social previews, and a simplified monochrome version for favicon use. Each format was tested across light and dark backgrounds to ensure readability in every context Syedello would be used.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-4">Need a logo or brand identity for your product? Let's create something memorable.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["LOGO DESIGN", "BRAND IDENTITY", "VECTOR ART", "ICON DESIGN"].map((tag) => (
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

export default SyedelloLogo;
