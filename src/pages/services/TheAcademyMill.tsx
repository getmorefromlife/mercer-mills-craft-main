import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, ClipboardList, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: BookOpen,
    title: "Curriculum Design & Learning Outcome Mapping",
    for: "Educational institutions, edtech startups, and training organizations building or restructuring programs.",
    problem: "Your curriculum exists but learning outcomes are vague, assessment is inconsistent, and accreditation is at risk.",
    process: "We map competencies to learning outcomes, design scaffolded curriculum pathways, and build assessment frameworks that measure real progress.",
    deliverables: ["Curriculum map with outcome alignment", "Lesson scope and sequence document", "Assessment rubric and grading criteria", "Instructor guide and delivery notes"],
  },
  {
    icon: School,
    title: "Academy Setup for Institutes & Edtech Startups",
    for: "Founders and institutions launching a new academy, training program, or online learning platform.",
    problem: "You have the domain expertise but no structured approach to building an academy from the ground up.",
    process: "We design the academic architecture — from program structure and course catalog to platform selection and launch strategy.",
    deliverables: ["Academy blueprint and program catalog", "Platform recommendation (Teachable, Kajabi, Thinkific, or custom)", "Course production pipeline and timeline", "Launch and enrollment strategy"],
  },
  {
    icon: ClipboardList,
    title: "Assessment Frameworks & Certification Pathways",
    for: "Organizations needing rigorous assessment systems and certification programs.",
    problem: "Learners complete your program but there is no standardized way to evaluate mastery or issue credentials.",
    process: "We design multi-level assessment frameworks — formative, summative, and capstone — with certification criteria and digital badge systems.",
    deliverables: ["Assessment framework document", "Certification criteria and pathway map", "Digital badge and credential design", "Quality assurance and moderation process"],
  },
  {
    icon: Lightbulb,
    title: "Homeschooling Frameworks & Value-Based Foundations",
    for: "Families and micro-schools building customized homeschooling curricula with ethical and value foundations.",
    problem: "Off-the-shelf curricula don't reflect your family's values, and building from scratch is overwhelming.",
    process: "We co-design a values-aligned learning framework that meets educational standards while reflecting your family's philosophy.",
    deliverables: ["Customized learning plan per student", "Value-aligned lesson materials and resources", "Progress tracking and portfolio system", "Annual learning outcome report template"],
  },
  {
    icon: GraduationCap,
    title: "Ethical & Leadership Training Programs",
    for: "Companies, nonprofits, and religious organizations developing character-based leadership programs.",
    problem: "Your team needs leadership development that goes beyond skills — it needs ethical grounding and moral framework.",
    process: "We design immersive training programs that integrate ethical decision-making with practical leadership competencies.",
    deliverables: ["Training program curriculum and facilitator guide", "Case study and discussion module pack", "Participant workbook and reflection journal", "Program evaluation and impact assessment"],
  },
];

const leadMagnetContent = {
  title: "Free Guide: The Course Launch Blueprint",
  subtitle: "A step-by-step framework for designing, building, and launching a digital course or academy program.",
  items: [
    "Define your learning objectives and target audience",
    "Structure your curriculum into modules and lessons",
    "Choose the right platform and production approach",
    "Build assessments that prove learning outcomes",
    "Launch with a marketing plan that fills your first cohort",
  ],
};

const TheAcademyMill = () => {
  return (
    <>
      <Helmet>
        <title>The Academy Mill | Educational Architecture | Mercer &amp; Mills</title>
        <meta name="description" content="Curriculum design, academy setup, assessment frameworks, homeschooling curricula, and leadership training programs. PMP-certified educational architecture." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Academy Mill — Educational Architecture",
          "provider": { "@type": "Organization", "name": "Mercer & Mills" },
          "description": "Curriculum design, academy setup for edtech startups, assessment frameworks, homeschooling curricula, and ethical leadership training programs.",
          "areaServed": "Global",
          "audience": { "@type": "Audience", "audienceType": "Educational Institutions, Edtech Startups, Homeschooling Families, Nonprofits" },
          "serviceType": "Educational Architecture",
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
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">Specialized Division</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The Academy Mill
            </h1>
            <p className="text-primary font-body text-lg md:text-xl font-semibold mb-6">Educational Architecture</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
              We architect learning ecosystems — from curriculum to platform — for institutions, edtech startups, and homeschooling families. Every program is designed for measurable outcomes and lasting impact.
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
              title="The Mercer Method for Education"
              description="Our four-phase delivery framework adapted for curriculum and educational architecture."
            />
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Needs analysis, stakeholder consultation, and learning goal definition." },
                  { step: "02", title: "Sprints", desc: "Curriculum design sprints with iterative review and validation." },
                  { step: "03", title: "Quality Gate", desc: "Content review, pilot testing, and PMP-certified quality check." },
                  { step: "04", title: "Launch", desc: "Program rollout, facilitator training, and continuous improvement plan." },
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
              <GraduationCap className="h-10 w-10 text-primary mx-auto mb-6" />
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
                <p className="text-sm text-muted-foreground mb-4">Enter your email and we will send the blueprint straight to your inbox.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const email = data.get("email") as string;
                    const name = data.get("name") as string;
                    if (email) {
                      emailjs.send("service_s7renj5", "template_xa53n4r", { from_name: name || "Mill Visitor", from_email: email, subject: "Lead Magnet: Course Launch Blueprint", message: `${name || "A visitor"} (${email}) requested the Course Launch Blueprint.` }, "PtqOQs6UI94KMGudX").then(() => { window.location.href = "/guides/course-launch-blueprint"; }).catch(() => { window.location.href = "/guides/course-launch-blueprint"; });
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
            <p className="text-muted-foreground mb-6">Ready to architect your learning ecosystem? Book a free 20-minute call.</p>
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

export default TheAcademyMill;
