import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  "Define clear learning objectives and success metrics before writing a single lesson",
  "Structure curriculum around competency milestones, not just topics",
  "Choose the right platform (Teachable, Thinkific, Kajabi) based on your audience",
  "Design assessments that measure real progress, not just recall",
  "Build a launch marketing sequence that fills seats before go-live",
];

export default function CourseLaunchBlueprint() {
  return (
    <>
      <Helmet>
        <title>Course Launch Blueprint | Mercer & Mills</title>
        <meta name="description" content="Free guide: A step-by-step framework for designing, building, and launching a digital course or academy program." />
      </Helmet>
      <section className="py-28 md:py-36 bg-midnight-gradient">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Free Resource</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              The <span className="text-gradient-gold">Course Launch Blueprint</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              A step-by-step framework for designing, building, and launching a digital course or academy program — delivered straight to your inbox.
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
            <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Course?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Let's map out your curriculum, choose your platform, and build a launch plan — together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/services/the-academy-mill">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  Back to The Academy Mill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
