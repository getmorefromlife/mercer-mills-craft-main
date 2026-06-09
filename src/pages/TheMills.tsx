import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Palette, Music, BarChart3, GraduationCap, CheckCircle, ArrowRight, Send, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const mills = [
  {
    id: "literary",
    icon: BookOpen,
    title: "The Literary Mill",
    subtitle: "Ghostwriting & Publishing",
    description: "We transform ideas into published works—books, lectures, and speeches that inform and inspire.",
    color: "text-primary",
    services: [
      "Ghostwriting non-fiction books & memoirs",
      "Scripting lecture series & academic talks",
      "Building sermon/speech libraries",
      "Manuscript development & editing",
      "Publishing strategy & book marketing",
    ],
  },
  {
    id: "visionary",
    icon: Palette,
    title: "The Visionary Mill",
    subtitle: "Animation & Design",
    description: "We create visual systems that communicate complex ideas with clarity and impact.",
    color: "text-primary",
    services: [
      "Explainer videos & whiteboard animations",
      "Course visual assets & slide decks",
      "Brand identity systems & marketing collateral",
      "Motion graphics & 3D animation",
      "UI/UX design for digital products",
    ],
  },
  {
    id: "sonic",
    icon: Music,
    title: "The Sonic Mill",
    subtitle: "Music & Soundscapes",
    description: "We engineer audio experiences that elevate digital products and brand presence.",
    color: "text-primary",
    services: [
      "Podcast intro/outro production & sound design",
      "Course background soundscapes & narration editing",
      "Custom music composition for digital media",
      "Sonic branding & audio identity",
      "Audio post-production & mastering",
    ],
  },
  {
    id: "structural",
    icon: BarChart3,
    title: "The Structural Mill",
    subtitle: "Agile Coaching & Project Management",
    description: "We design the systems and workflows that keep complex projects on track with PMP-certified precision.",
    color: "text-primary",
    services: [
      "Agile/PMO setup for growing teams",
      "Launch rescue & project recovery",
      "Process documentation & workflow automation",
      "Sprint planning & stakeholder management",
      "Risk mitigation & quality assurance",
    ],
  },
  {
    id: "academy",
    icon: GraduationCap,
    title: "The Academy Mill",
    subtitle: "Educational Architecture",
    description: "We architect learning ecosystems—from curriculum to platform—for institutions and edtech.",
    color: "text-primary",
    services: [
      "Curriculum design & learning outcome mapping",
      "Academy setup for institutes & edtech startups",
      "Assessment frameworks & certification pathways",
      "Homeschooling frameworks & value-based foundations",
      "Ethical & leadership training programs",
    ],
  },
];

const TheMills = () => {
  const form = useRef<HTMLFormElement>(null);
  const [active, setActive] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formExpanded, setFormExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeMill = mills[active];
  const selectedCount = selectedServices.size;

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  };

  const clearSelections = () => setSelectedServices(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCount === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    setIsSubmitting(true);

    const SERVICE_ID = "service_s7renj5";
    const TEMPLATE_ID = "template_xa53n4r";
    const PUBLIC_KEY = "PtqOQs6UI94KMGudX";

    const servicesList = Array.from(selectedServices).join("\n");
    const messageWithServices = `--- Services Requested ---\n${servicesList}\n\n--- Project Details ---\n${formData.message}`;

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      company: formData.company,
      message: messageWithServices,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("Your inquiry has been submitted. Our team will respond within 24 hours.");
        setFormData({ name: "", email: "", company: "", message: "" });
        setSelectedServices(new Set());
        setFormExpanded(false);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send. Please try again or email us directly.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>The Five Mills | Mercer &amp; Mills | Specialized Digital Production</title>
        <meta name="description" content="Explore our five specialized mills: Visionary, Sonic, Structural, Code, and Academy. Each mill delivers expert-level digital production and creative services." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading
          subtitle="Our Divisions"
          title="The Five Mills"
          description="Browse our specialized divisions. Select the services you need, then request a quote."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {mills.map((mill, i) => (
            <button
              key={mill.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-semibold tracking-wide transition-all duration-300 ${active === i
                ? "bg-gold-gradient text-primary-foreground shadow-gold"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
            >
              <mill.icon className="h-4 w-4" />
              {mill.title}
            </button>
          ))}
        </div>

        {/* Active Mill with Checkboxes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20"
          >
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <activeMill.icon className="h-8 w-8 text-primary" />
                <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">{activeMill.subtitle}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{activeMill.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{activeMill.description}</p>
            </div>
            <div className="lg:col-span-3 bg-card border border-border rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-serif text-xl font-semibold text-primary">Core Services</h4>
                {selectedCount > 0 && (
                  <button onClick={clearSelections} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Trash2 className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {activeMill.services.map((service, i) => {
                  const checked = selectedServices.has(service);
                  return (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-lg transition-colors cursor-pointer hover:bg-primary/5 ${checked ? "bg-primary/10 border border-primary/30" : ""}`}
                      onClick={() => toggleService(service)}
                    >
                      <Checkbox checked={checked} className="mt-0.5" />
                      <span className={`text-sm font-body leading-relaxed ${checked ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {service}
                      </span>
                      {checked && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 ml-auto" />}
                    </motion.div>
                  );
                })}
              </div>
              {(activeMill.id === "literary" || activeMill.id === "visionary" || activeMill.id === "sonic" || activeMill.id === "structural" || activeMill.id === "academy") && (
                <div className="lg:col-span-3 mt-4">
                  <Link
                    to={activeMill.id === "literary" ? "/services/the-literary-mill" : activeMill.id === "visionary" ? "/services/the-visionary-mill" : activeMill.id === "sonic" ? "/services/the-sonic-mill" : activeMill.id === "structural" ? "/services/the-structural-mill" : "/services/the-academy-mill"}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-body font-semibold"
                  >
                    View Full Service Page <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Selected Services Summary Bar */}
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-midnight-gradient border border-primary/30 rounded-xl p-6 md:p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-serif text-lg font-bold">
                    {selectedCount} Service{selectedCount !== 1 ? "s" : ""} Selected
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(selectedServices).map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-body">
                      {s}
                      <button onClick={() => toggleService(s)} className="hover:text-foreground transition-colors">&times;</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap flex-shrink-0">
                <Button variant="outline" size="default" onClick={clearSelections} className="border-border text-muted-foreground hover:text-foreground">
                  Clear All
                </Button>
                <Button
                  size="default"
                  className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
                  onClick={() => {
                    setFormExpanded(true);
                    setTimeout(() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                  }}
                >
                  Request Pricing <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inquiry Form */}
        <AnimatePresence>
          {formExpanded && (
            <motion.div
              id="inquiry-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-card border border-border rounded-xl p-8 md:p-12">
                <SectionHeading
                  subtitle="Get a Quote"
                  title="Tell Us What You Need"
                  description="Fill out the form below and our team will respond with pricing and availability within 24 hours."
                />
                <form ref={form} onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 space-y-8">
                  {/* Selected Services Review */}
                  {selectedCount > 0 && (
                    <div className="bg-secondary border border-border rounded-lg p-5">
                      <h4 className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-3">Services Requested</h4>
                      <div className="space-y-2">
                        {mills.map((mill) => {
                          const millServices = mill.services.filter((s) => selectedServices.has(s));
                          if (millServices.length === 0) return null;
                          return (
                            <div key={mill.id} className="flex items-start gap-2 text-sm">
                              <mill.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-foreground font-medium text-xs">{mill.title}: </span>
                                {millServices.map((s, i) => (
                                  <span key={s} className="text-muted-foreground">
                                    {s}{i < millServices.length - 1 ? "; " : ""}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Service Multi-Select by Mill */}
                  <div>
                    <label className="text-sm font-body font-medium text-muted-foreground mb-3 block">
                      Adjust or add more services
                    </label>
                    <div className="space-y-3">
                      {mills.map((mill) => (
                        <details key={mill.id} className="bg-secondary border border-border rounded-lg group">
                          <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer list-none hover:bg-primary/5 rounded-lg transition-colors">
                            <mill.icon className="h-4 w-4 text-primary" />
                            <span className="font-body text-sm font-semibold text-foreground flex-1">{mill.title}</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="px-4 pb-4 space-y-2 border-t border-border pt-3 mt-0">
                            {mill.services.map((service) => {
                              const checked = selectedServices.has(service);
                              return (
                                <div
                                  key={service}
                                  className={`flex items-start gap-3 p-4 rounded-md transition-colors cursor-pointer hover:bg-primary/5 ${checked ? "bg-primary/10" : ""}`}
                                  onClick={() => toggleService(service)}
                                >
                                  <Checkbox checked={checked} className="mt-0.5" />
                                  <span className={`text-sm font-body leading-relaxed ${checked ? "text-foreground" : "text-muted-foreground"}`}>
                                    {service}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Full Name *</label>
                      <Input
                        required
                        name="user_name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder="John Mercer"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Email *</label>
                      <Input
                        required
                        type="email"
                        name="user_email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Company</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-secondary border-border focus:border-primary"
                      placeholder="Your Organization"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Project Details *</label>
                    <Textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-secondary border-border focus:border-primary min-h-[120px]"
                      placeholder="Tell us about your project, timeline, and budget range..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || selectedCount === 0}
                    className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!formExpanded && selectedCount === 0 && (
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10"
              onClick={() => setFormExpanded(true)}
            >
              Browse & Select Services Above, or Jump to the Full Form <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default TheMills;
