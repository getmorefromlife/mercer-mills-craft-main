import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Palette, Music, BarChart3, GraduationCap, Code, Film, Globe, ShieldCheck, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsSection from "@/components/TestimonialsSection";
import heroBg from "@/assets/hero-bg.jpg";

const productizedOffers = [
  {
    icon: Film,
    title: "Done-For-You Course Production",
    for: "Founders, educators, and institutions launching or scaling a digital course.",
    problem: "You have the expertise but no time to produce, edit, and launch a polished course.",
    includes: ["Curriculum mapping & instructional design", "Full video/audio production & editing", "Course platform setup (Teachable, Thinkific, Kajabi)", "Sales page copy & landing page design", "Launch sequence email templates"],
    timeline: "4–6 weeks",
    price: "Starting at $3,500",
  },
  {
    icon: Globe,
    title: "Thought Leader Content Engine",
    for: "Speakers, authors, founders, and executives who need consistent, high-caliber content.",
    problem: "You need a steady pipeline of premium content but don't have the bandwidth to produce it.",
    includes: ["Bi-weekly content production (articles, posts, scripts)", "Podcast/video episode editing & show notes", "Visual asset creation & brand consistency", "Distribution optimization (LinkedIn, YouTube, newsletter)", "Editorial calendar management"],
    timeline: "Ongoing (monthly retainer)",
    price: "Starting at $1,800/mo",
  },
  {
    icon: Code,
    title: "Launch-Ready Digital Product Build",
    for: "Founders and SMBs launching a digital product, landing page, or mini-funnel.",
    problem: "You need a professional-grade digital product or landing page but don't have a technical team.",
    includes: ["Custom landing page design & development", "Lead capture & email integration", "Payment gateway setup (Stripe, PayPal)", "Basic analytics & conversion tracking", "Mobile-optimized, SEO-ready build"],
    timeline: "10–14 days",
    price: "Starting at $2,200",
  },
];

const quickstart = {
  title: "10-Day Quickstart Sprint",
  for: "Anyone who needs to ship a first digital asset fast—landing page, MVP, or content system.",
  problem: "You need something real, fast, without committing to a full engagement.",
  includes: ["Kickoff call & scope lock (Day 1)", "Design & development sprint (Days 2–8)", "Review & revision (Day 9)", "Delivery & handoff (Day 10)"],
  price: "Flat $1,500",
};

const clientTypes = [
  "Founders", "SMEs", "Course Creators", "Agencies", "Non-Profits", "Educational Institutions",
];

const mills = [
  {
    icon: BookOpen, title: "The Literary Mill", desc: "Ghostwriting & Publishing", color: "text-primary",
    value: "We transform ideas into published works—books, lectures, and speeches that inform and inspire.",
    examples: ["Ghostwriting non-fiction books & memoirs", "Scripting lecture series & academic talks", "Building sermon/speech libraries for religious leaders"],
  },
  {
    icon: Palette, title: "The Visionary Mill", desc: "Animation & Design", color: "text-primary",
    value: "We create visual systems that communicate complex ideas with clarity and impact.",
    examples: ["Explainer videos & whiteboard animations", "Course visual assets & slide decks", "Brand identity systems & marketing collateral"],
  },
  {
    icon: Music, title: "The Sonic Mill", desc: "Music & Soundscapes", color: "text-primary",
    value: "We engineer audio experiences that elevate digital products and brand presence.",
    examples: ["Podcast intro/outro production & sound design", "Course background soundscapes & narration editing", "Custom music composition for digital media"],
  },
  {
    icon: BarChart3, title: "The Structural Mill", desc: "Agile Coaching & PM", color: "text-primary",
    value: "We design the systems and workflows that keep complex projects on track.",
    examples: ["Agile/PMO setup for growing teams", "Launch rescue & project recovery", "Process documentation & workflow automation"],
  },
  {
    icon: GraduationCap, title: "The Academy Mill", desc: "Educational Architecture", color: "text-primary",
    value: "We architect learning ecosystems—from curriculum to platform—for institutions and edtech.",
    examples: ["Curriculum design & learning outcome mapping", "Academy setup for institutes & edtech startups", "Assessment frameworks & certification pathways"],
  },
];

const techStack = [
  "React", "Node.js", "Next.js", "TypeScript", "AWS", "Tailwind CSS", "Framer Motion", "Webflow", "Vite", "PostgreSQL",
];

const workflow = [
  { step: "01", title: "Scoping", desc: "Deep discovery to align on vision, timeline, and deliverables." },
  { step: "02", title: "Sprint Planning", desc: "Agile roadmap with milestone mapping and resource allocation." },
  { step: "03", title: "Quality Assurance", desc: "Multi-layer review with PMP-certified governance gates." },
  { step: "04", title: "Delivery", desc: "Strategic deployment with post-launch optimization." },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Mercer &amp; Mills | Digital Production Agency | Remote &amp; Global</title>
        <meta name="description" content="International remote digital production agency. PMP-certified project management, web development, content production, and creative services for founders and enterprises." />
      </Helmet>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="container relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">
              Remote-First Innovation · Global Precision
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Digital Craftsmanship.{" "}
              <span className="text-gradient-gold">Enterprise Execution.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              We help founders, creators, and education brands turn complex ideas into world-class digital products, content, and courses.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-10 max-w-2xl">
              From solo founders to global teams, we adapt our production rigor to your stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-8 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-8 py-6 text-base hover:bg-primary/10">
                  View Portfolio
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-3">No cost, no obligation. <span className="mx-2">·</span> <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Message us on WhatsApp</a></p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-border/40">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-primary font-body font-semibold uppercase tracking-[0.2em] mb-4 text-center">
              Trusted by Founders &amp; Leaders
            </p>
            <div className="bg-midnight-gradient border border-border rounded-xl p-8 md:p-10 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-serif text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                "Syed delivered exceptional work. His communication, professionalism, and project management skills are top-notch. I'd highly recommend him to anyone looking for high-quality work delivered on time."
              </blockquote>
              <div>
                <p className="font-body font-semibold text-sm text-foreground">Syed Zaidi</p>
                <p className="text-xs text-muted-foreground">Founder, Istax Consultants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productized Services */}
      <section className="py-24 bg-secondary" id="services">
        <div className="container">
          <SectionHeading subtitle="How We Work" title="Productized Offers" description="Clear scopes, fixed timelines, transparent pricing—designed to get you from idea to launch without the friction." />

          <div className="space-y-8 mb-16">
            {productizedOffers.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <offer.icon className="h-8 w-8 text-primary flex-shrink-0" />
                      <h2 className="font-serif text-2xl font-bold">{offer.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-6">
                      <div>
                        <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">Who it's for</h4>
                        <p className="text-muted-foreground text-sm">{offer.for}</p>
                      </div>
                      <div>
                        <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">Problem it solves</h4>
                        <p className="text-muted-foreground text-sm">{offer.problem}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-2">What's included</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                        {offer.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:w-64 flex flex-col items-start lg:items-end gap-3 lg:pt-10">
                    <div className="text-right">
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{offer.timeline}</p>
                      <p className="font-serif text-2xl font-bold text-primary mt-1">{offer.price}</p>
                    </div>
                    <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                      <Button size="default" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide hover:opacity-90 transition-opacity w-full whitespace-nowrap">
                        Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quickstart Sprint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-midnight-gradient border border-primary/30 rounded-xl p-8 md:p-10 text-center"
          >
            <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-3">{quickstart.title}</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-2">{quickstart.for}</p>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-5">{quickstart.problem}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {quickstart.includes.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="font-serif text-xl font-bold text-primary">{quickstart.price}</p>
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground/60">No cost, no obligation. <span className="mx-2">·</span> <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20">
        <div className="container">
          <SectionHeading subtitle="Our Clients" title="Who We Work With" description="We partner with ambitious organizations and individuals at every stage." />
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {clientTypes.map((type) => (
              <span key={type} className="font-serif text-xl md:text-2xl font-bold text-muted-foreground/60 hover:text-primary transition-colors">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Five Mills */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <SectionHeading subtitle="Our Expertise" title="The Five Mills" description="Five specialized divisions working in concert to deliver exceptional results." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mills.map((mill, i) => (
              <motion.div
                key={mill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to="/the-mills" className="block group h-full">
                  <div className="bg-card border border-border rounded-lg p-8 h-full hover:border-primary/40 hover:shadow-gold transition-all duration-300 flex flex-col">
                    <mill.icon className={`h-10 w-10 ${mill.color} mb-4`} />
                    <h3 className="font-serif text-xl font-bold mb-1">{mill.title}</h3>
                    <p className="text-primary font-body text-xs font-semibold uppercase tracking-[0.15em] mb-3">{mill.desc}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{mill.value}</p>
                    <ul className="space-y-1.5 mt-auto">
                      {mill.examples.map((ex) => (
                        <li key={ex} className="flex items-start gap-2 text-muted-foreground text-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PMP Credentials & Human Line */}
      <section className="py-16">
        <div className="container text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["PMP", "PSM II", "PAL I"].map((cert) => (
              <span key={cert} className="px-4 py-2 border border-primary/30 rounded text-sm font-body font-semibold text-primary tracking-wider">
                {cert}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            "You bring the vision, we engineer the execution with{' '}
            <span className="text-foreground font-semibold">PMP-certified rigor</span>."
          </p>
        </div>
      </section>

      {/* Tech Stack & Methodology */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <SectionHeading subtitle="Engineering Standards" title="Tech Stack & Methodology" description="Modern tooling paired with battle-tested project governance." />

          <div className="mb-16">
            <h3 className="font-serif text-xl font-bold text-center mb-8 text-primary">Our Technology Ecosystem</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-body font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-center mb-8 text-primary">PMP-Certified Workflow</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workflow.map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: parseInt(item.step) * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-lg font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg">
            <SectionHeading
              subtitle="Ready to Begin?"
              title="Let's Build Your Legacy"
              description="Schedule a free 20-minute strategy call with our global remote team and discover what's possible."
            />
            <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground/60 mt-3">No cost, no obligation. <span className="mx-2">·</span> <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
