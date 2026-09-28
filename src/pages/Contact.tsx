import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Mail, Phone, Copy, BookOpen, Palette, Music, BarChart3, GraduationCap, CheckCircle, ChevronDown, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import SectionHeading from "@/components/SectionHeading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const mills = [
  {
    id: "literary",
    icon: BookOpen,
    title: "The Literary Mill",
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
    services: [
      "Curriculum design & learning outcome mapping",
      "Academy setup for institutes & edtech startups",
      "Assessment frameworks & certification pathways",
      "Homeschooling frameworks & value-based foundations",
      "Ethical & leadership training programs",
    ],
  },
];

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", referralCode: "" });
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("mm_ref");
    if (stored && !formData.referralCode) {
      setFormData((prev) => ({ ...prev, referralCode: stored }));
    }
  }, []);

  const selectedCount = selectedServices.size;

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    }).catch(() => {
      toast.error("Failed to copy");
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let messageWithServices = formData.message;
    const parts: string[] = [];
    if (selectedCount > 0) {
      parts.push(`--- Services Requested ---\n${Array.from(selectedServices).join("\n")}`);
    }
    if (formData.referralCode.trim()) {
      parts.push(`--- Referral Code ---\n${formData.referralCode.trim()}`);
    }
    if (parts.length > 0) {
      messageWithServices = `${parts.join("\n\n")}\n\n--- Project Details ---\n${formData.message}`;
    }

    const SERVICE_ID = "service_s7renj5";
    const TEMPLATE_ID = "template_xa53n4r";
    const PUBLIC_KEY = "PtqOQs6UI94KMGudX";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      user_name: formData.name,
      user_email: formData.email,
      company: formData.company,
      message: messageWithServices,
    }, PUBLIC_KEY)
      .then(() => {
        toast.success("Thank you for reaching out. Our team will respond within 24 hours.");
        setFormData({ name: "", email: "", company: "", message: "", referralCode: "" });
        setSelectedServices(new Set());
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message. Please try again or email us directly.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Contact | Mercer &amp; Mills | Book a Free Strategy Call</title>
        <meta name="description" content="Get in touch with Mercer &amp; Mills. Book a 20-minute strategy call, send us a message, or connect via WhatsApp. No cost, no obligation." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading subtitle="Get in Touch" title="Contact Us" description="Tell us what you need. Select from our productized services below and we'll respond with a sprint roadmap within 24 hours." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-2">
                {[
                  { num: 1, label: "Services" },
                  { num: 2, label: "Project Details" },
                  { num: 3, label: "Contact & Submit" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold ${step === s.num ? "bg-gold-gradient text-primary-foreground" : step > s.num ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {step > s.num ? <CheckCircle className="h-4 w-4" /> : s.num}
                    </div>
                    <span className={`text-xs font-body hidden sm:inline ${step === s.num ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                    {s.num < 3 && <div className={`hidden sm:block w-8 h-px ${step > s.num ? "bg-primary/40" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                {step === 1 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg font-bold text-primary">Services You Need</h3>
                      {selectedCount > 0 && (
                        <button onClick={() => setSelectedServices(new Set())} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <Trash2 className="h-3 w-3" /> Clear
                        </button>
                      )}
                    </div>

                    {selectedCount > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
                        {Array.from(selectedServices).map((s) => (
                          <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-body">
                            {s}
                            <button onClick={() => toggleService(s)} className="hover:text-foreground transition-colors">&times;</button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      {mills.map((mill) => (
                        <details key={mill.id} className="bg-secondary border border-border rounded-lg group">
                          <summary className="flex items-center gap-2 px-3 py-2.5 cursor-pointer list-none hover:bg-primary/5 rounded-lg transition-colors">
                            <mill.icon className="h-4 w-4 text-primary" />
                            <span className="font-body text-sm font-semibold text-foreground flex-1">{mill.title}</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="px-3 pb-3 space-y-1.5 border-t border-border pt-2 mt-0">
                            {mill.services.map((service) => {
                              const checked = selectedServices.has(service);
                              return (
                                <div
                                  key={service}
                                  className={`flex items-start gap-3 p-3 rounded-md transition-colors cursor-pointer hover:bg-primary/5 ${checked ? "bg-primary/10" : ""}`}
                                  onClick={() => toggleService(service)}
                                >
                                  <Checkbox checked={checked} className="mt-0.5" />
                                  <span className={`text-xs font-body leading-relaxed ${checked ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                    {service}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </details>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-2.5 bg-gold-gradient text-primary-foreground font-body font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                      >
                        Next Step <ChevronDown className="h-4 w-4 -rotate-90" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Tell Us About Your Project</label>
                        <Textarea
                          required
                          name="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-card border-border focus:border-primary min-h-[140px]"
                          placeholder="Describe your project, goals, timeline, and any budget considerations..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Company / Organization</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="Your Organization"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-2.5 border border-border text-muted-foreground font-body font-semibold text-sm rounded-lg hover:bg-secondary transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 bg-gold-gradient text-primary-foreground font-body font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                      >
                        Next Step <ChevronDown className="h-4 w-4 -rotate-90" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Full Name</label>
                        <Input
                          required
                          name="user_name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="John Mercer"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Email</label>
                        <Input
                          required
                          type="email"
                          name="user_email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-body font-medium text-muted-foreground mb-2 block">Referral Code <span className="text-muted-foreground/60 font-normal">(optional)</span></label>
                      <Input
                        name="referral_code"
                        value={formData.referralCode}
                        onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                        className="bg-card border-border focus:border-primary"
                        placeholder="e.g. AE-MERCER-2026"
                      />
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-2.5 border border-border text-muted-foreground font-body font-semibold text-sm rounded-lg hover:bg-secondary transition-colors"
                      >
                        Back
                      </button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity"
                      >
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="bg-card border border-border rounded-xl p-8 space-y-8">
              <h3 className="font-serif text-2xl font-bold text-primary">Office Information</h3>
              {[
                { icon: MapPin, label: "Location", value: "Remote — International Team" },
                { icon: Clock, label: "Business Hours (PST)", value: "Monday – Friday: 9:00 AM – 6:00 PM\nSaturday: By Appointment\nSunday: Closed" },
                { icon: Mail, label: "Email", value: "partnerships@mercerandmills.com", href: "mailto:partnerships@mercerandmills.com", copyable: true },
                { icon: Phone, label: "Phone", value: "840-207-8720", href: "tel:18402078720" },
                { icon: MessageCircle, label: "WhatsApp", value: "+1 (530) 423-5158", href: "https://wa.me/15304235158" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-semibold text-sm text-foreground mb-1">{item.label}</h4>
                    <div className="flex items-center gap-2">
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground text-sm whitespace-pre-line hover:text-primary transition-colors break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm whitespace-pre-line">{item.value}</p>
                      )}
                      {item.copyable && (
                        <button
                          onClick={() => copyToClipboard(item.value, item.label)}
                          className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                          aria-label="Copy email"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </ErrorBoundary>
  );
};

export default Contact;
