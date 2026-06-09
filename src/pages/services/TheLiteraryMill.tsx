import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen, Feather, ScrollText, FileEdit, BookMarked, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: Feather,
    title: "Ghostwriting Non-Fiction Books & Memoirs",
    for: "Founders, executives, and public figures with a story or system to share.",
    problem: "You have decades of insight but no time to write a book-length manuscript.",
    process: "We conduct deep-dive interviews, extract your core narratives, and craft a manuscript in your authentic voice — from outline to final draft.",
    deliverables: ["Full-length manuscript (40,000–80,000 words)", "Chapter-by-chapter outline approved upfront", "Author voice calibration document", "Editorial review and revision cycle"],
  },
  {
    icon: ScrollText,
    title: "Scripting Lecture Series & Academic Talks",
    for: "Academic leaders, researchers, and institutional speakers preparing multi-part lecture series.",
    problem: "You need a coherent, publication-ready script that translates complex research into engaging spoken content.",
    process: "We structure your research into a narrative arc, write for spoken delivery, and align with academic citation standards.",
    deliverables: ["Full lecture scripts (30–60 min each)", "Speaker notes and cue cards", "Visual presentation storyboard", "Source citation appendix"],
  },
  {
    icon: FileEdit,
    title: "Building Sermon & Speech Libraries",
    for: "Religious leaders, spiritual educators, and executive communicators building a body of spoken work.",
    problem: "You need a scalable, organized library of original sermons or speeches that maintain thematic consistency.",
    process: "We develop a thematic architecture, write or transcribe each message, and organize them into searchable libraries.",
    deliverables: ["Searchable speech/sermon archive", "Thematic tagging and categorization", "Ready-to-deliver manuscript format", "Optional audio recording scripts"],
  },
  {
    icon: BookMarked,
    title: "Manuscript Development & Editing",
    for: "Authors with a draft who need professional structural editing, line editing, or developmental feedback.",
    problem: "Your manuscript has promise but needs professional shaping before submission or self-publication.",
    process: "We perform a full editorial assessment, then work through structural edits, line edits, and proofreading in sequence.",
    deliverables: ["Developmental edit report", "Line-edited manuscript with tracked changes", "Style guide and consistency check", "Proofread final manuscript"],
  },
  {
    icon: BookOpen,
    title: "Publishing Strategy & Book Marketing",
    for: "Authors preparing to self-publish or seeking traditional publishing pathways.",
    problem: "You have a finished manuscript but no roadmap for publishing, distribution, or audience building.",
    process: "We evaluate your manuscript and goals, recommend the optimal publishing route, and build a pre-launch marketing plan.",
    deliverables: ["Publishing route analysis (traditional vs. self-pub)", "Book cover and interior design brief", "Amazon/KDP metadata optimization", "Launch timeline and marketing checklist"],
  },
];

const leadMagnetContent = {
  title: "Free Guide: The Founder's Manuscript Blueprint",
  subtitle: "A 5-step framework for turning your expertise into a publishable non-fiction manuscript — without quitting your day job.",
  items: [
    "Define your core thesis and target reader in one afternoon",
    "Structure chapters that sell themselves to publishers",
    "Build a writing habit that produces 500 words a day",
    "Navigate the editing process without losing your voice",
    "Choose between traditional publishing and self-publishing",
  ],
};

const TheLiteraryMill = () => {
  return (
    <>
      <Helmet>
        <title>The Literary Mill | Ghostwriting &amp; Publishing | Mercer &amp; Mills</title>
        <meta name="description" content="Executive ghostwriting, book manuscript development, lecture scripting, and publishing strategy for founders, leaders, and institutions. PMP-certified precision." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Literary Mill — Ghostwriting & Publishing",
          "provider": { "@type": "Organization", "name": "Mercer & Mills" },
          "description": "Professional ghostwriting, manuscript development, lecture scripting, sermon libraries, and publishing strategy for founders, executives, and institutions.",
          "areaServed": "Global",
          "audience": { "@type": "Audience", "audienceType": "Founders, Executives, Religious Leaders, Academics" },
          "serviceType": "Ghostwriting & Publishing",
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">Specialized Division</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The Literary Mill
            </h1>
            <p className="text-primary font-body text-lg md:text-xl font-semibold mb-6">Ghostwriting & Publishing</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
              We transform ideas into published works — books, lectures, and speeches that inform and inspire. Whether you are a founder with a system to share, an executive building a legacy, or a religious leader shaping a congregation, our ghostwriters and editors bring your voice to the page with clarity and authority.
            </p>
          </motion.div>

          {/* Services */}
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

          {/* Process */}
          <div className="mt-24">
            <SectionHeading
              subtitle="How We Work"
              title="The Mercer Method for Publishing"
              description="Our four-phase delivery framework adapted for ghostwriting and publishing projects."
            />
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Deep-dive interviews to extract your voice, story, and core messages." },
                  { step: "02", title: "Sprints", desc: "Focused writing sprints delivering chapters on a two-week cadence." },
                  { step: "03", title: "Quality Gate", desc: "Multi-layer editorial review with PMP-certified governance." },
                  { step: "04", title: "Launch", desc: "Publishing strategy, distribution setup, and audience launch." },
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

          {/* Lead Magnet */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 bg-midnight-gradient border border-primary/30 rounded-xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-6" />
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
                      emailjs.send("service_s7renj5", "template_xa53n4r", { from_name: name || "Mill Visitor", from_email: email, subject: "Lead Magnet: Founder's Manuscript Blueprint", message: `${name || "A visitor"} (${email}) requested the Founder's Manuscript Blueprint.` }, "PtqOQs6UI94KMGudX").then(() => { window.location.href = "/guides/founders-manuscript-blueprint"; }).catch(() => { window.location.href = "/guides/founders-manuscript-blueprint"; });
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

          {/* CTA */}
          <div className="mt-24 text-center">
            <p className="text-muted-foreground mb-6">Ready to turn your ideas into a published work? Book a free 20-minute call.</p>
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

export default TheLiteraryMill;
