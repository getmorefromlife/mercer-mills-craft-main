import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, BarChart3, GraduationCap, Database, Palette, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import ceoImg from "@/assets/Syed Imon Rizvi CEO.png";
import faridaImg from "@/assets/Farida Rizvi.jpg";
import aliImg from "@/assets/Syed Mohammad Ali Rizvi - Education Consultant.png";
import awaisImg from "@/assets/Syed Awais Rizvi - SAP Architect.jpg";

const consultants = [
  {
    name: "Farida Rizvi",
    role: "Global Director of Curriculum Innovation & Educational Transformation",
    creds: "Educational Systems Consultant & Curriculum Architect",
    mill: "Academy Mill",
    icon: GraduationCap,
    image: faridaImg,
    linkedin: "https://www.linkedin.com/in/faridarizvi/",
    bio: "Interdisciplinary educational systems strategist specializing in curriculum architecture, assessment innovation, teacher development, institutional transformation, inclusive learning systems, accreditation alignment, and AI-enabled educational innovation. Advising schools, educational organizations, and learning communities in designing future-ready, human-centered, and strategically aligned educational ecosystems.",
  },
  {
    name: "Syed Muhammad Ali Rizvi",
    role: "Chief Learning Architect & Education Strategist",
    creds: "B.Eng, B.Ed, M.Ed, MA Environmental Sciences",
    mill: "Academy Mill",
    icon: GraduationCap,
    image: aliImg,
    linkedin: "https://www.linkedin.com/in/syedmuhammadalirizvi310/",
    bio: "A seasoned educationist and academician at the intersection of leadership, pedagogy, and technology, driven by a deep conviction that education should foster holistic growth and strong ethical foundations alongside knowledge.",
  },
  {
    name: "Syed Imon Rizvi",
    role: "Creative Director",
    creds: "Video Editor, Typography Artist, Graphic Designer",
    mill: "Visionary Mill",
    icon: Palette,
    image: ceoImg,
    bio: "Non-linear video editor, typography artist, graphic designer, and filmmaker with a passion for visual storytelling across digital media — personally directing every creative project at Mercer & Mills.",
  },
  {
    name: "Syed Imon Rizvi",
    role: "Composer & Soundtrack Producer",
    creds: "Singer, Recording Artist, Producer",
    mill: "Sonic Mill",
    icon: Music,
    image: ceoImg,
    bio: "Composer, singer, recording artist, producer, and soundtrack composer with credits in film, digital media, and audio production — the creative force behind every Sonic Mill deliverable.",
  },
  {
    name: "Syed Imon Rizvi",
    role: "Agile Delivery Lead",
    creds: "PMP, PSM II, PAL I",
    mill: "Structural Mill",
    icon: BarChart3,
    image: ceoImg,
    bio: "PMP-certified project manager with over a decade of experience in enterprise agile transformation, delivery governance, and project rescue — personally overseeing every engagement at Mercer & Mills.",
  },
  {
    name: "Syed Awais Rizvi",
    role: "Principal Enterprise Transformation Architect",
    creds: "SAP S/4HANA, SAP ECC SD",
    mill: "Structural Mill",
    icon: Database,
    image: awaisImg,
    linkedin: "https://www.linkedin.com/in/syedawaisrizvi/",
    bio: "Over 18 years of experience in project implementation, program management, and SAP consulting across automotive, pharmaceutical, chemicals, and fire & safety sectors. Expertise spans SAP SD, VC, MM, WM, and VMS with global project delivery across Europe, AIPAC, Middle East, and North America.",
  },
  {
    name: "Imran",
    role: "Marketing Team",
    creds: "",
    mill: "Visionary Mill",
    icon: Users,
    image: null,
    linkedin: "",
    bio: "Member of the Mercer & Mills marketing team.",
  },
  {
    name: "Faizan",
    role: "Marketing Team",
    creds: "",
    mill: "Visionary Mill",
    icon: Users,
    image: null,
    linkedin: "",
    bio: "Member of the Mercer & Mills marketing team.",
  },
];

const values = [
  { title: "PMP-Certified Precision", desc: "Every project follows a governance framework that eliminates guesswork." },
  { title: "Remote-First Innovation", desc: "We bring the creative energy and technical edge of a distributed global team to every engagement." },
  { title: "Founder-First Approach", desc: "We understand the constraints of founders and structure engagements that respect both budget and timeline." },
  { title: "Global Talent, Single Point of Contact", desc: "You get one lead who coordinates a world-class team — not a roster of strangers to manage." },
];

const OurTeam = () => {
  return (
    <>
      <Helmet>
        <title>Our Team | Mercer &amp; Mills | PMP-Certified Digital Production</title>
        <meta name="description" content="Meet Syed Imon Rizvi, PMP-certified founder and principal project manager, and our network of expert consultants across five specialized mills." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Syed Imon Rizvi",
          "jobTitle": "Founding Partner & Chief Visionary Officer",
          "knowsAbout": ["Project Management", "Digital Production", "Video Editing", "Music Production", "Agile Methodologies"],
          "hasCredential": ["PMP", "PSM II", "PAL I"],
          "worksFor": {
            "@type": "Organization",
            "name": "Mercer & Mills"
          }
        })}</script>
      </Helmet>
      {/* Hero */}
      <section className="py-28 md:py-36">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Who We Are</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              One Lead.{" "}
              <span className="text-gradient-gold">A Network of Experts.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              You're not hiring a faceless agency. You're working directly with a PMP-certified principal who assembles the exact freelance team your project needs — no overhead, no bureaucracy, no runaround.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-3 block">Our Leadership</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Meet Our Founding Partner &amp; CVO</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-midnight-gradient border border-border overflow-hidden">
                <img src={ceoImg} alt="Syed Imon Rizvi" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Syed Imon Rizvi</h2>
                <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-body font-semibold text-primary uppercase tracking-wider">Founding Partner & Chief Visionary Officer (CVO)</span>
                <a href="https://www.linkedin.com/in/syedimonrizvi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["PMP", "PSM II", "PAL I"].map((cert) => (
                  <span key={cert} className="px-2.5 py-1 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                    {cert}
                  </span>
                ))}
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With PMP-certified project management credentials and over a decade of experience leading digital production across three continents, Syed founded Mercer & Mills to bridge the gap between freelance talent and enterprise-grade execution.
                </p>
                <p>
                  His philosophy is simple: <strong className="text-foreground">clients don't need another agency — they need a reliable lead who can assemble the right team, enforce quality standards, and deliver on time.</strong> Every project at Mercer & Mills is personally overseen by Syed, ensuring PMP-level governance without the agency markup.
                </p>
                <p>
                  Beyond project governance, Syed is a practicing creative — a non-linear video editor, typography artist, graphic designer, composer, singer, recording artist, producer, filmmaker, and soundtrack composer. He personally leads the Visionary and Sonic Mills, bringing hands-on creative direction to every visual and audio deliverable the agency produces.
                </p>
                <p>
                  Operating remotely across time zones. International team.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syed Awais Rizvi */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-3 block">Our Network</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Meet Our Principal Enterprise Transformation Architect</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-midnight-gradient border border-border overflow-hidden">
                <img src={awaisImg} alt="Syed Awais Rizvi" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Syed Awais Rizvi</h2>
                <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-body font-semibold text-primary uppercase tracking-wider">Principal Enterprise Transformation Architect</span>
                <a href="https://www.linkedin.com/in/syedawaisrizvi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Syed Awais Rizvi LinkedIn profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["SAP S/4HANA", "SAP ECC SD"].map((cert) => (
                  <span key={cert} className="px-2.5 py-1 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                    {cert}
                  </span>
                ))}
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 18 years of experience in project implementation, program management, and SAP consulting, Syed Awais Rizvi leads the SAP practice at Mercer & Mills. His expertise spans SAP SD, VC, MM, WM, and VMS with global project delivery across Europe, AIPAC, Middle East, and North America.
                </p>
                <p>
                  He has delivered enterprise-scale solutions across automotive, pharmaceutical, chemicals, and fire & safety sectors — bringing deep technical knowledge and cross-cultural program management to every engagement. His project portfolio includes multi-million dollar implementations for Fortune 500 organizations.
                </p>
                <p>
                  As Principal Enterprise Transformation Architect, Syed Awais ensures that every Structural Mill engagement involving enterprise systems is architected for scalability, compliance, and long-term maintainability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Model */}
      <section className="py-24">
        <div className="container">
          <SectionHeading
            subtitle="How It Works"
            title="The Mercer & Mills Model"
            description="We combine a single point of accountability with a curated network of independent experts — giving you agency-quality deliverables at freelance-friendly terms."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            {[
              { step: "01", title: "You Meet Your Lead", desc: "Syed personally handles every discovery call. No sales team, no account manager shuffle — just a direct conversation with the person who will run your project." },
              { step: "02", title: "We Assemble the Team", desc: "Based on your scope, we pull the right experts from our network — ghostwriters, designers, engineers, sound producers, or curriculum architects." },
              { step: "03", title: "One Invoice, One Point of Contact", desc: "You never manage multiple freelancers. Syed coordinates the team, enforces milestones, and delivers a single finished product on time and on budget." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <SectionHeading
            subtitle="Our Network"
            title="Trusted Consultants"
            description="A curated roster of independent experts who partner with us on a per-project basis. Each vetted, each specialized, each aligned with our quality standards."
          />
          <div className="space-y-12 mt-12">
            {consultants.filter((p) => p.name !== "Syed Imon Rizvi").map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-midnight-gradient border border-border overflow-hidden">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <person.icon className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{person.name}</h2>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-body font-semibold text-primary uppercase tracking-wider">{person.role}</span>
                    {person.linkedin && (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`${person.name} LinkedIn`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full text-xs font-body font-semibold text-primary uppercase tracking-wider">
                      <person.icon className="h-3 w-3" /> {person.mill}
                    </span>
                    {person.creds && (
                      <span className="px-2.5 py-1 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">{person.creds}</span>
                    )}
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{person.bio}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-10 max-w-xl mx-auto">
            Our network expands based on project needs. If your engagement requires a specialist not listed here, we'll find the right fit.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container">
          <SectionHeading
            subtitle="Our Principles"
            title="What We Stand For"
            description="Four commitments that define every project we take on."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <ShieldCheck className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <SectionHeading
              subtitle="Ready to Work With Us?"
              title="One Call to Get Started"
              description="Speak directly with Syed — not a sales team. Your first 20-minute strategy call is free, no commitment required."
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Work With This Team <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/the-mills">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-3">No cost, no obligation. <span className="mx-2">·</span> <a href="https://wa.me/15304235158" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;
