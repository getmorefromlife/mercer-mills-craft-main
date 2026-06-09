import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Music, Headphones, Mic, Radio, Disc3, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: Headphones,
    title: "Podcast Intro/Outro Production & Sound Design",
    for: "Podcasters, media companies, and content creators launching or rebranding a show.",
    problem: "Your podcast content is strong but the audio branding is flat — no intro hook, no outro, no sonic identity.",
    process: "We compose custom intro/outro music, design sound transitions, and produce professional audio branding that sets your podcast apart.",
    deliverables: ["Custom intro music (15–30 seconds)", "Custom outro music (15–30 seconds)", "Transition stings and sound effects", "Mix-ready broadcast files"],
  },
  {
    icon: Mic,
    title: "Course Background Soundscapes & Narration Editing",
    for: "Course creators and educators producing video or audio-based learning content.",
    problem: "Your course audio sounds dry — background noise, uneven levels, and no sound design to keep learners engaged.",
    process: "We clean and balance narration audio, compose subtle background soundscapes, and layer in audio cues that reinforce learning.",
    deliverables: ["Noise-cleaned and leveled narration tracks", "Custom background soundscape composition", "Audio cue and transition system", "Multi-format export (MP3, WAV, AAC)"],
  },
  {
    icon: Music,
    title: "Custom Music Composition for Digital Media",
    for: "Filmmakers, content creators, and brands needing original music for digital projects.",
    problem: "Stock music sounds generic — you need original compositions that match your brand and message.",
    process: "We compose and produce original music tailored to your project's tone, genre, and duration — from cinematic scores to brand anthems.",
    deliverables: ["Original composition (full length)", "Stem files (isolated instrument tracks)", "Alternate versions (30s, 60s, full)", "License and usage rights"],
  },
  {
    icon: Radio,
    title: "Sonic Branding & Audio Identity",
    for: "Brands and agencies building a cohesive audio identity across touchpoints.",
    problem: "Your visual brand is strong but audio is inconsistent — website, ads, and videos sound like different companies.",
    process: "We design a sonic brand system — brand mnemonic, sound logo, and audio guidelines — that makes your brand recognizable by ear.",
    deliverables: ["Sound logo (2–5 second audio mark)", "Brand mnemonic (10–15 second theme)", "Audio brand guidelines document", "Application examples (ads, hold music, video)"],
  },
  {
    icon: Disc3,
    title: "Audio Post-Production & Mastering",
    for: "Musicians, podcasters, and content producers needing professional polish on final audio.",
    problem: "Your raw recordings have potential but need professional mixing, mastering, and final quality control.",
    process: "We provide full audio post-production — editing, EQ, compression, stereo imaging, and loudness normalization — delivering broadcast-ready masters.",
    deliverables: ["Full mix with multitrack session file", "Mastered final stereo file", "Loudness-normalized versions", "Format variants (streaming, broadcast, podcast)"],
  },
];

const leadMagnetContent = {
  title: "Free Guide: The Podcast Launch Sound Kit",
  subtitle: "A 6-step checklist for setting up professional podcast audio — from mic selection to final master.",
  items: [
    "Choose the right microphone and recording setup for your budget",
    "Set up your recording environment for clean vocal capture",
    "Structure your podcast workflow from raw take to finished episode",
    "Design your intro, outro, and transition audio branding",
    "Export and distribute with proper loudness standards",
    "Build a consistent release cadence that grows your audience",
  ],
};

const TheSonicMill = () => {
  return (
    <>
      <Helmet>
        <title>The Sonic Mill | Music &amp; Soundscapes | Mercer &amp; Mills</title>
        <meta name="description" content="Podcast production, custom music composition, audio post-production, sonic branding, and course audio engineering. PMP-certified audio production." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sonic Mill — Music & Soundscapes",
          "provider": { "@type": "Organization", "name": "Mercer & Mills" },
          "description": "Podcast intro/outro production, course soundscapes, custom music composition, sonic branding, and audio post-production for digital creators.",
          "areaServed": "Global",
          "audience": { "@type": "Audience", "audienceType": "Podcasters, Course Creators, Filmmakers, Brands" },
          "serviceType": "Music & Soundscapes",
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
              <Music className="h-8 w-8 text-primary" />
              <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">Specialized Division</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The Sonic Mill
            </h1>
            <p className="text-primary font-body text-lg md:text-xl font-semibold mb-6">Music & Soundscapes</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
              We engineer audio experiences that elevate digital products and brand presence. From podcast sound design and custom composition to full audio post-production — every frequency is intentional.
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
              title="The Mercer Method for Audio"
              description="Our four-phase delivery framework adapted for music and audio production."
            />
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Creative brief, reference analysis, and tonal direction." },
                  { step: "02", title: "Sprints", desc: "Iterative composition and production in focused audio sprints." },
                  { step: "03", title: "Quality Gate", desc: "Mix review, revision cycles, and PMP-certified delivery." },
                  { step: "04", title: "Launch", desc: "Master delivery, format exports, and asset handoff." },
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
              <Headphones className="h-10 w-10 text-primary mx-auto mb-6" />
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
                      emailjs.send("service_s7renj5", "template_xa53n4r", { from_name: name || "Mill Visitor", from_email: email, subject: "Lead Magnet: Podcast Launch Sound Kit", message: `${name || "A visitor"} (${email}) requested the Podcast Launch Sound Kit.` }, "PtqOQs6UI94KMGudX").then(() => { window.location.href = "/guides/podcast-launch-sound-kit"; }).catch(() => { window.location.href = "/guides/podcast-launch-sound-kit"; });
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
            <p className="text-muted-foreground mb-6">Ready to create your sonic identity? Book a free 20-minute call.</p>
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

export default TheSonicMill;
