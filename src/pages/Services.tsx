import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen, Palette, Music, BarChart3, GraduationCap, Code, Film, Globe, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnet from "@/components/LeadMagnet";

const offeredServices = [
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
  {
    icon: Zap,
    title: "10-Day Quickstart Sprint",
    for: "Anyone who needs to ship a first digital asset fast—landing page, MVP, or content system.",
    problem: "You need something real, fast, without committing to a full engagement.",
    includes: ["Kickoff call & scope lock (Day 1)", "Design & development sprint (Days 2–8)", "Review & revision (Day 9)", "Delivery & handoff (Day 10)"],
    timeline: "10 days",
    price: "Flat $1,500",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your vision, market, and technical requirements." },
  { step: "02", title: "Architecture", desc: "Solution design, technology selection, and sprint roadmap." },
  { step: "03", title: "Execution", desc: "Agile development with continuous delivery and stakeholder reviews." },
  { step: "04", title: "Quality Gate", desc: "Rigorous QA, performance testing, and PMP-certified sign-off." },
  { step: "05", title: "Launch & Optimize", desc: "Deployment, monitoring, and iterative post-launch refinement." },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | Mercer &amp; Mills | Digital Production &amp; PMP Project Management</title>
        <meta name="description" content="From done-for-you course production to fractional project management and web development. Mercer &amp; Mills delivers enterprise-grade digital products." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            { "@type": "Service", "position": 1, "name": "Done-For-You Course Production", "provider": { "@type": "Organization", "name": "Mercer & Mills" } },
            { "@type": "Service", "position": 2, "name": "Thought Leader Content Engine", "provider": { "@type": "Organization", "name": "Mercer & Mills" } },
            { "@type": "Service", "position": 3, "name": "Fractional Project Management", "provider": { "@type": "Organization", "name": "Mercer & Mills" } },
            { "@type": "Service", "position": 4, "name": "Custom Web Development", "provider": { "@type": "Organization", "name": "Mercer & Mills" } }
          ]
        })}</script>
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading subtitle="What We Do" title="Services & Productized Offers" description="Clear scopes, fixed timelines, transparent pricing—designed to get you from idea to launch without the friction." />

        <div className="space-y-8 mb-24">
          {offeredServices.map((offer, i) => (
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
                      Start With a Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Five Mills */}
        <div className="mb-24">
          <SectionHeading
            subtitle="Browse by Specialization"
            title="The Five Mills"
            description="Each mill is a specialized division with dedicated expertise. Click to explore services, process, and pricing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
            {[
              { id: "literary", icon: BookOpen, title: "The Literary Mill", subtitle: "Ghostwriting & Publishing", to: "/services/the-literary-mill" },
              { id: "visionary", icon: Palette, title: "The Visionary Mill", subtitle: "Animation & Design", to: "/services/the-visionary-mill" },
              { id: "sonic", icon: Music, title: "The Sonic Mill", subtitle: "Music & Soundscapes", to: "/services/the-sonic-mill" },
              { id: "structural", icon: BarChart3, title: "The Structural Mill", subtitle: "Agile Coaching & PM", to: "/services/the-structural-mill" },
              { id: "academy", icon: GraduationCap, title: "The Academy Mill", subtitle: "Educational Architecture", to: "/services/the-academy-mill" },
            ].map((mill) => {
              const content = (
                <motion.div
                  key={mill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`bg-card border border-border rounded-xl p-6 text-center h-full hover:border-primary/40 transition-all duration-300 ${mill.to ? "hover:shadow-gold cursor-pointer group" : ""}`}
                >
                  <mill.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-lg font-bold mb-1">{mill.title}</h3>
                  <p className="text-muted-foreground text-xs mb-4">{mill.subtitle}</p>
                  {mill.to ? (
                    <span className="inline-flex items-center gap-1 text-primary text-xs font-body font-semibold group-hover:gap-2 transition-all">
                      View Services <ArrowRight className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-muted-foreground/50 text-xs font-body">Coming Soon</span>
                  )}
                </motion.div>
              );
              return mill.to ? <Link key={mill.id} to={mill.to}>{content}</Link> : content;
            })}
          </div>
        </div>

        {/* Process Overview */}
        <SectionHeading subtitle="How We Work" title="Our Process" description="A battle-tested methodology refined over years of enterprise delivery." />
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((step) => (
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
      </section>

      <section className="py-16 bg-secondary">
        <div className="container max-w-4xl">
          <LeadMagnet />
        </div>
      </section>

      <section className="py-24">
      <div className="container">
        <div className="mt-24 text-center">
          <p className="text-muted-foreground mb-6">Not sure which offer fits? Book a free 20-minute call and we'll figure it out together.</p>
          <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
              Start With a Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground/60 mt-3">No cost, no obligation. <span className="mx-2">·</span> <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Services;
