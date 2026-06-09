import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Palette, Brush } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  "Define your brand personality through archetypes and tone of voice",
  "Build a cohesive color palette with primary, secondary, and accent colors",
  "Select typography that communicates your brand values across media",
  "Create a template system for consistent social, web, and print assets",
  "Document it all in a brand guide your team can actually use",
];

export default function BrandIdentityStarterKit() {
  return (
    <>
      <Helmet>
        <title>Brand Identity Starter Kit | Mercer & Mills</title>
        <meta name="description" content="Free guide: A 5-step framework for building a cohesive visual brand system — without hiring a full creative agency." />
      </Helmet>
      <section className="py-28 md:py-36 bg-midnight-gradient">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Free Resource</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              The <span className="text-gradient-gold">Visual Brand Identity Starter Kit</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              A 5-step framework for building a cohesive visual brand system — without hiring a full creative agency.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-8 text-center">What's Inside</h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 bg-card border border-border rounded-lg p-5"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-serif text-sm font-bold text-primary">{i + 1}</span>
                  </span>
                  <p className="text-muted-foreground">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <Palette className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Brand?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Let's define your visual identity and build a brand system that works across every touchpoint.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/services/the-visionary-mill">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  Back to The Visionary Mill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
