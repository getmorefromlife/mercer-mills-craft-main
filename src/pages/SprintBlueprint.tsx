import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Target, Users, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const phases = [
  {
    day: "Day 1–2",
    icon: Target,
    title: "Discovery & Alignment",
    tasks: [
      "Stakeholder interview & goal mapping",
      "Define success metrics (KPIs)",
      "User persona creation",
      "Competitive landscape audit",
      "Scope definition & constraint identification",
    ],
    deliverable: "Project charter & discovery deck",
  },
  {
    day: "Day 3–4",
    icon: Users,
    title: "Design & Prototyping",
    tasks: [
      "Information architecture & sitemap",
      "Wireframing (low-fidelity)",
      "Visual direction & mood board",
      "High-fidelity mockups (key screens)",
      "Client review & feedback round",
    ],
    deliverable: "Clickable prototype in Figma",
  },
  {
    day: "Day 5–7",
    icon: Rocket,
    title: "Build & Develop",
    tasks: [
      "Frontend development (or CMS setup)",
      "Content population & copywriting",
      "Integration setup (analytics, forms, chat)",
      "Responsive QA across devices",
      "Performance optimization",
    ],
    deliverable: "Staging environment with live content",
  },
  {
    day: "Day 8–10",
    icon: Clock,
    title: "QA, Launch & Handoff",
    tasks: [
      "Full regression testing",
      "Browser & device compatibility check",
      "Client walkthrough & final revisions",
      "Domain pointing & SSL verification",
      "Launch!",
    ],
    deliverable: "Live product + handoff documentation",
  },
];

const SprintBlueprint = () => {
  return (
    <>
      <Helmet>
        <title>10-Day Sprint Blueprint | Mercer &amp; Mills</title>
        <meta name="description" content="A step-by-step framework for taking a raw concept to a launch-ready digital product in 10 days. Free download." />
      </Helmet>

      <section className="py-28 md:py-36 bg-midnight-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Free Resource</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              The 10-Day Digital Product <span className="text-gradient-gold">Sprint Blueprint</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              A battle-tested framework for going from raw concept to launch-ready product in two weeks flat.
              Used by founders, agencies, and enterprise teams to ship faster without sacrificing quality.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 10 Days</span>
              <span className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> 4 Phases</span>
              <span className="flex items-center gap-2"><Rocket className="h-4 w-4 text-primary" /> Launch Ready</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <phase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-body font-semibold text-primary uppercase tracking-wider">{phase.day}</span>
                    <h2 className="font-serif text-2xl font-bold mt-0.5">{phase.title}</h2>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="bg-primary/5 border border-primary/10 rounded-lg px-4 py-3">
                  <span className="text-xs font-body font-semibold text-primary uppercase tracking-wider">Deliverable</span>
                  <p className="text-sm text-foreground mt-0.5 font-medium">{phase.deliverable}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Why This Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-body font-semibold mb-2">Scope-Locked</h3>
                <p className="text-xs text-muted-foreground">Every sprint ends with a clear, shippable deliverable. No scope creep.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-body font-semibold mb-2">Client-Aligned</h3>
                <p className="text-xs text-muted-foreground">Built-in review checkpoints so you're never surprised at launch.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Rocket className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-body font-semibold mb-2">Ready to Ship</h3>
                <p className="text-xs text-muted-foreground">No half-baked handoffs. You get a live, deployed product.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Sprint?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Let's run your project through the 10-Day Sprint framework. Book a free strategy call.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SprintBlueprint;
