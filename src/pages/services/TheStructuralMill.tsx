import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BarChart3, GitBranch, ClipboardCheck, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: GitBranch,
    title: "Agile/PMO Setup for Growing Teams",
    for: "Startups and scale-ups outgrowing ad-hoc project management and needing structured delivery.",
    problem: "Your team is shipping but missing deadlines, scope is creeping, and there is no repeatable process.",
    process: "We assess your current workflow, design a lightweight PMO structure, and implement agile ceremonies tailored to your team size.",
    deliverables: ["PMO framework design document", "Agile ceremony schedule (sprint planning, stand-ups, retros)", "Toolchain setup (Jira, Asana, or Notion)", "Team onboarding and process training"],
  },
  {
    icon: ClipboardCheck,
    title: "Launch Rescue & Project Recovery",
    for: "Teams with a stalled, over-budget, or behind-schedule project that needs to get back on track.",
    problem: "The project is stuck — missed deadlines, unclear ownership, and stakeholders losing confidence.",
    process: "We perform a rapid audit, identify blockers, reset scope and timeline, and run a recovery sprint to restore momentum.",
    deliverables: ["Project health audit report", "Recovery roadmap with revised timeline", "Blocker resolution and stakeholder reset", "Weekly progress dashboards"],
  },
  {
    icon: BarChart3,
    title: "Process Documentation & Workflow Automation",
    for: "Companies needing standardized processes so work doesn't depend on any single person.",
    problem: "Your workflows live in people's heads — when someone leaves, knowledge leaves with them.",
    process: "We document your key workflows, identify automation opportunities, and build SOPs that scale with your team.",
    deliverables: ["Standard operating procedure (SOP) library", "Process flow diagrams and decision trees", "Automation playbook with tool recommendations", "Training documentation for new hires"],
  },
  {
    icon: Users,
    title: "Sprint Planning & Stakeholder Management",
    for: "Product teams and agency leads juggling multiple stakeholders with competing priorities.",
    problem: "Stakeholders keep changing requirements mid-sprint, and the team can never get a full sprint done.",
    process: "We establish sprint cadences, teach stakeholder management techniques, and create transparent reporting that builds trust.",
    deliverables: ["Sprint framework with capacity planning", "Stakeholder communication template pack", "Sprint review and retro facilitation", "Velocity tracking and reporting dashboard"],
  },
  {
    icon: Shield,
    title: "Risk Mitigation & Quality Assurance",
    for: "Teams launching high-stakes projects where failure is not an option.",
    problem: "You don't know what could go wrong until it does — there is no structured risk or QA process.",
    process: "We build a risk register, define QA checkpoints at each project gate, and establish PMP-certified governance reviews.",
    deliverables: ["Risk register with mitigation plans", "QA checklist and gate review process", "PMP-certified governance framework", "Post-launch retrospective and continuous improvement plan"],
  },
];

const leadMagnetContent = {
  title: "Free Worksheet: The 10-Day Project Scoping Tool",
  subtitle: "A structured template for scoping any digital project — from idea to sprint-ready backlog in one session.",
  items: [
    "Define project objectives, success criteria, and constraints",
    "Map stakeholders, dependencies, and decision authority",
    "Break scope into deliverable-sized chunks with estimates",
    "Identify risks, assumptions, and mitigation strategies",
    "Output a sprint-ready backlog with prioritized epics",
  ],
};

const TheStructuralMill = () => {
  return (
    <>
      <Helmet>
        <title>The Structural Mill | Agile Coaching &amp; PM | Mercer &amp; Mills</title>
        <meta name="description" content="Fractional project management, agile coaching, PMO setup, sprint planning, and PMP-certified project governance for startups and scale-ups." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Structural Mill — Agile Coaching & Project Management",
          "provider": { "@type": "Organization", "name": "Mercer & Mills" },
          "description": "Agile/PMO setup, launch rescue, process automation, sprint planning, stakeholder management, and PMP-certified risk mitigation.",
          "areaServed": "Global",
          "audience": { "@type": "Audience", "audienceType": "Startups, Scale-ups, Product Teams, Agency Leads" },
          "serviceType": "Agile Coaching & Project Management",
        })}</script>
      </Helmet>

      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">Specialized Division</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The Structural Mill
            </h1>
            <p className="text-primary font-body text-lg md:text-xl font-semibold mb-6">Agile Coaching & Project Management</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
              We design the systems and workflows that keep complex projects on track. From PMO setup and sprint planning to launch rescue and risk mitigation — every project deserves PMP-certified precision.
            </p>
          </motion.div>

          <div className="mt-20 space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <service.icon className="h-7 w-7 text-primary flex-shrink-0" />
                      <h2 className="font-serif text-2xl font-bold">{service.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-6">
                      <div>
                        <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">Who it is for</h4>
                        <p className="text-muted-foreground text-sm">{service.for}</p>
                      </div>
                      <div>
                        <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">The challenge</h4>
                        <p className="text-muted-foreground text-sm">{service.problem}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">Our approach</h4>
                      <p className="text-muted-foreground text-sm">{service.process}</p>
                    </div>
                    <div className="mt-5">
                      <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-2">What you get</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:w-56 flex flex-col items-start lg:items-end gap-3 lg:pt-16">
                    <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                      <Button size="default" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide hover:opacity-90 transition-opacity w-full whitespace-nowrap">
                        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24">
            <SectionHeading
              subtitle="How We Work"
              title="The Mercer Method for Project Delivery"
              description="Our four-phase framework adapted for project management and governance engagements."
            />
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Process audit, stakeholder interviews, and maturity assessment." },
                  { step: "02", title: "Sprints", desc: "Process design sprints with iterative team feedback loops." },
                  { step: "03", title: "Quality Gate", desc: "Governance review, risk validation, and PMP-certified sign-off." },
                  { step: "04", title: "Launch", desc: "Framework rollout, team training, and continuous improvement." },
                ].map((step) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: parseInt(step.step) * 0.08 }}
                    className="relative"
                  >
                    <div className="bg-card border border-border rounded-xl p-6 text-center h-full hover:border-primary/40 hover:shadow-gold transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                        <span className="font-serif text-sm font-bold text-primary">{step.step}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 bg-midnight-gradient border border-primary/30 rounded-xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <BarChart3 className="h-10 w-10 text-primary mx-auto mb-6" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
                Free Resource
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-4">
                {leadMagnetContent.title}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
                {leadMagnetContent.subtitle}
              </p>
              <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
                {leadMagnetContent.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-4">Enter your email and we will send the worksheet straight to your inbox.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const email = data.get("email") as string;
                    const name = data.get("name") as string;
                    if (email) {
                      emailjs.send("service_s7renj5", "template_xa53n4r", { from_name: name || "Mill Visitor", from_email: email, subject: "Lead Magnet: Project Scoping Tool", message: `${name || "A visitor"} (${email}) requested the Project Scoping Worksheet.` }, "PtqOQs6UI94KMGudX").then(() => { window.location.href = "/guides/project-scoping-tool"; }).catch(() => { window.location.href = "/guides/project-scoping-tool"; });
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm font-body focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm font-body focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button type="submit" size="default" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap">
                    Send Me the Guide
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>

          <div className="mt-24 text-center">
            <p className="text-muted-foreground mb-6">Ready to bring structure to your next project? Book a free 20-minute call.</p>
            <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                Book a Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground/60 mt-3">
              No cost, no obligation. <span className="mx-2">·</span>
              <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheStructuralMill;
