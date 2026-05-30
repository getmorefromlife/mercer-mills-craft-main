import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, Zap, ShieldCheck, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "Deep-dive stakeholder interviews, market analysis, and strategic alignment to define your vision with crystalline clarity.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Sprints",
    description: "Agile-driven execution in focused two-week sprints. Iterative development with continuous feedback loops and transparent progress.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Quality Gate",
    description: "Rigorous quality assurance through multi-layer review, stakeholder validation, and PMP-certified project governance.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    description: "Strategic deployment with full go-to-market support, performance monitoring, and post-launch optimization.",
  },
];

const TheMercerMethod = () => {
  return (
    <>
      <Helmet>
        <title>The Mercer Method | Mercer &amp; Mills | PMP-Certified Delivery Framework</title>
        <meta name="description" content="Our proven PMP-certified methodology for delivering digital projects on time and on budget. Discovery, execution, delivery." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading subtitle="Our Process" title="The Mercer Method" description="A battle-tested four-phase methodology that transforms ambitious visions into delivered excellence." />

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-xl p-8 h-full hover:border-primary/40 hover:shadow-gold transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <step.icon className="h-8 w-8 text-primary" />
                    <span className="font-serif text-2xl md:text-4xl font-bold text-muted/50 group-hover:text-primary/30 transition-colors">{step.step}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default TheMercerMethod;
