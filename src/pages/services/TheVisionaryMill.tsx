import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Palette, Video, Image, Brush, Film, Monitor, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: Video,
    title: "Explainer Videos & Whiteboard Animations",
    for: "Startups, educators, and B2B companies needing to communicate complex ideas quickly.",
    problem: "Your product or concept is hard to explain in text — you need a visual narrative that sells in seconds.",
    process: "We script, storyboard, and produce custom explainer videos with your brand voice, using animation styles matched to your audience.",
    deliverables: ["60–120 second explainer video", "Custom storyboard and script", "Voiceover recording and sound design", "Whiteboard or motion graphic format"],
  },
  {
    icon: Image,
    title: "Course Visual Assets & Slide Decks",
    for: "Course creators, educators, and trainers building visually cohesive learning materials.",
    problem: "Your course content is strong but the visuals are inconsistent, dated, or unengaging.",
    process: "We design a visual system for your course — slide templates, diagrams, icon sets, and workbook layouts — that keeps learners engaged.",
    deliverables: ["Custom slide deck template (PowerPoint/Keynote/Google Slides)", "Diagrams, charts, and infographics", "Workbook and handout layout design", "Icon and illustration library"],
  },
  {
    icon: Brush,
    title: "Brand Identity Systems & Marketing Collateral",
    for: "Founders and companies launching or rebranding who need a cohesive visual identity.",
    problem: "You have a logo but no brand system — your marketing materials don't look like they belong to the same company.",
    process: "We build a complete brand identity system — color, typography, spacing, and application guidelines — then produce the collateral you need.",
    deliverables: ["Brand style guide document", "Logo variations and usage rules", "Business card, letterhead, and email signature templates", "Social media kit (profile, cover, post templates)"],
  },
  {
    icon: Film,
    title: "Motion Graphics & 3D Animation",
    for: "Digital products, SaaS companies, and content creators needing animated visual assets.",
    problem: "Static images don't capture attention anymore — you need motion to communicate features and brand personality.",
    process: "We design and animate motion graphics for product demos, social content, and brand videos, from 2D motion to 3D product visualization.",
    deliverables: ["Animated product demos (15–60 seconds)", "Social media motion clips", "Lottie/web animation files", "3D product visualization renders"],
  },
  {
    icon: Monitor,
    title: "UI/UX Design for Digital Products",
    for: "Founders and product teams building web apps, landing pages, or mobile experiences.",
    problem: "You have a functional product but the user experience feels unfinished or confusing.",
    process: "We design intuitive interfaces and seamless user flows — from wireframes to high-fidelity prototypes — optimized for conversion.",
    deliverables: ["User flow diagrams and wireframes", "High-fidelity UI mockups (Figma)", "Clickable interactive prototype", "Design system component library"],
  },
];

const leadMagnetContent = {
  title: "Free Guide: The Visual Brand Identity Starter Kit",
  subtitle: "A 5-step framework for building a cohesive visual brand system — without hiring a full creative agency.",
  items: [
    "Define your brand personality and visual archetype",
    "Choose a color palette that communicates your values",
    "Select typography that works across print and digital",
    "Build a reusable template system for social and marketing",
    "Create a simple brand guide that keeps your team aligned",
  ],
};

const TheVisionaryMill = () => {
  return (
    <>
      <Helmet>
        <title>The Visionary Mill | Animation &amp; Design | Mercer &amp; Mills</title>
        <meta name="description" content="Explainer video production, brand identity design, motion graphics, slide deck design, and UI/UX for digital products. PMP-certified visual production." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Visionary Mill — Animation & Design",
          "provider": { "@type": "Organization", "name": "Mercer & Mills" },
          "description": "Explainer videos, whiteboard animation, brand identity systems, motion graphics, slide deck design, and UI/UX design for digital products.",
          "areaServed": "Global",
          "audience": { "@type": "Audience", "audienceType": "Founders, Educators, Course Creators, SaaS Companies" },
          "serviceType": "Animation & Design",
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
              <Palette className="h-8 w-8 text-primary" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">Specialized Division</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The Visionary Mill
            </h1>
            <p className="text-primary font-body text-lg md:text-xl font-semibold mb-6">Animation & Design</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
              We create visual systems that communicate complex ideas with clarity and impact. From explainer videos and whiteboard animations to full brand identity systems and UI/UX design — every pixel serves a purpose.
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
              title="The Mercer Method for Design"
              description="Our four-phase delivery framework adapted for animation and design projects."
            />
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Brand audit, audience research, and creative brief development." },
                  { step: "02", title: "Sprints", desc: "Rapid design sprints delivering concepts on a weekly cadence." },
                  { step: "03", title: "Quality Gate", desc: "Stakeholder reviews, iteration cycles, and PMP-certified sign-off." },
                  { step: "04", title: "Launch", desc: "Asset delivery, brand guide handoff, and production files." },
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
              <Palette className="h-10 w-10 text-primary mx-auto mb-6" />
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
                <p className="text-sm text-muted-foreground mb-4">Enter your email and we will send the guide straight to your inbox.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const email = data.get("email") as string;
                    const name = data.get("name") as string;
                    if (email) {
                      emailjs.send("service_s7renj5", "template_xa53n4r", { from_name: name || "Mill Visitor", from_email: email, subject: "Lead Magnet: Brand Identity Starter Kit", message: `${name || "A visitor"} (${email}) requested the Brand Identity Starter Kit.` }, "PtqOQs6UI94KMGudX").then(() => { window.location.href = "/guides/brand-identity-starter-kit"; }).catch(() => { window.location.href = "/guides/brand-identity-starter-kit"; });
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
            <p className="text-muted-foreground mb-6">Ready to bring your visual ideas to life? Book a free 20-minute call.</p>
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

export default TheVisionaryMill;
