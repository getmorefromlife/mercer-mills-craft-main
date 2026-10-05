import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Copy,
  CheckCircle2,
  MessageCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Globe,
  User,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/SectionHeading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const sprintPackages = [
  {
    id: "turnkey-academy",
    title: "14-Day Turnkey Client Academy",
    price: "$3,500",
    badge: "Full Sprint",
    desc: "Complete 5-7 module onboarding video curriculum, LMS integration, interactive job aids, and activation email sequence.",
  },
  {
    id: "blueprint-audit",
    title: "Onboarding Architecture Blueprint",
    price: "$750",
    badge: "72-Hour Delivery",
    desc: "Comprehensive friction audit, 5-7 module curriculum map, and 1 produced pilot module (100% credited toward full sprint).",
  },
  {
    id: "care-plan",
    title: "Knowledge Operations Care Plan",
    price: "$1,500/mo",
    badge: "Continuity",
    desc: "Ongoing curriculum updates, up to 2 new/updated modules/mo, LMS administration, and monthly completion analytics.",
  },
  {
    id: "custom-enterprise",
    title: "Enterprise / Custom Knowledge Sprint",
    price: "Custom",
    badge: "Bespoke",
    desc: "Multi-product academies, SOC2-compliant LMS installations, or custom enterprise workflow modernization.",
  },
];

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [selectedPackage, setSelectedPackage] = useState("14-Day Turnkey Client Academy");
  const [timeframe, setTimeframe] = useState("Next 14 Business Days");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyUrl: "",
    bottleneck: "",
    referralCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedInfo, setLastSubmittedInfo] = useState<{
    name: string;
    email: string;
    company: string;
    package: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mm_ref");
    if (stored && !formData.referralCode) {
      setFormData((prev) => ({ ...prev, referralCode: stored }));
    }
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard`);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionSnapshot = {
      name: formData.name,
      email: formData.email,
      company: formData.companyUrl,
      package: selectedPackage,
    };
    setLastSubmittedInfo(submissionSnapshot);

    const compiledMessage = `--- Knowledge Operations Inquiry ---
Sprint Package: ${selectedPackage}
Desired Timeframe: ${timeframe}
Company / App URL: ${formData.companyUrl}
${formData.referralCode.trim() ? `Referral Code: ${formData.referralCode.trim()}\n` : ""}
--- Onboarding Bottleneck & Project Details ---
${formData.bottleneck}`;

    const SERVICE_ID = "service_s7renj5";
    const TEMPLATE_ID = "template_xa53n4r";
    const PUBLIC_KEY = "PtqOQs6UI94KMGudX";

    // Optional webhook for Make.com / Telegram / Zapier instant notifications
    const customWebhook = typeof window !== "undefined" ? localStorage.getItem("mm_webhook_url") : null;
    if (customWebhook) {
      try {
        fetch(customWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...submissionSnapshot,
            timeframe,
            details: formData.bottleneck,
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.warn("Webhook dispatch error:", err));
      } catch (err) {
        console.warn("Webhook error:", err);
      }
    }

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          company: formData.companyUrl,
          message: compiledMessage,
        },
        PUBLIC_KEY
      )
      .then(() => {
        toast.success("Thank you for reaching out. Syed Imon Rizvi will review your details and respond within 24 hours.");
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          companyUrl: "",
          bottleneck: "",
          referralCode: "",
        });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message. Please email syedimonrizvipmp@gmail.com directly or book on Calendly.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Contact &amp; Book Sprint | Mercer &amp; Mills Knowledge Operations</title>
        <meta
          name="description"
          content="Initiate your 14-day client academy sprint or schedule a 20-minute diagnostic with Syed Imon Rizvi, PMP®. Remote Global Delivery Hub."
        />
      </Helmet>

      <section className="py-16 md:py-24 bg-[#0B0F17] text-white">
        <div className="container px-4">
          <SectionHeading
            subtitle="Initiate Your Sprint"
            title="Contact &amp; Scoping Inquiries"
            description="Select your knowledge operations sprint package below. We will review your product notes and return a customized execution roadmap within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
            {/* Left Column: Focused Knowledge Operations Sprint Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              {isSubmitted ? (
                <div className="bg-[#0F172A] border border-blue-500/40 rounded-2xl p-8 sm:p-10 space-y-6 text-center shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-heading">
                      Sprint Scope Inquiry Received
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you! Syed Imon Rizvi, PMP® will personally review your onboarding requirements and return a customized execution roadmap within 24 hours.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-4 max-w-md mx-auto text-left">
                    <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      Need Immediate Answers or Want to Lock in Your Sprint Slot?
                    </h4>
                    <a
                      href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md shadow-blue-500/20 transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      Pick Your 20-Min Slot on Calendly
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/15304235158?text=${encodeURIComponent(
                          `Hi Mercer & Mills team, I just submitted an inquiry for ${
                            lastSubmittedInfo?.package || "the Client Academy Sprint"
                          } on behalf of ${lastSubmittedInfo?.company || "our team"}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                        US WhatsApp
                      </a>
                      <a
                        href={`https://wa.me/923303658220?text=${encodeURIComponent(
                          `Hi Syed Imon Rizvi, I just submitted an inquiry on Mercer & Mills for ${
                            lastSubmittedInfo?.package || "the Client Academy Sprint"
                          } on behalf of ${lastSubmittedInfo?.company || "our team"}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Founder WhatsApp
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-slate-500 hover:text-slate-300 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
                >
                {/* 1. Sprint Package Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      1. Select Your Sprint Package *
                    </Label>
                    <span className="text-xs text-blue-400 font-medium">Flat-fee · Zero hourly creep</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sprintPackages.map((pkg) => (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.title)}
                        className={`p-4 rounded-xl border text-left transition-all relative ${
                          selectedPackage === pkg.title
                            ? "border-blue-500 bg-blue-500/10 text-white shadow-md shadow-blue-500/10"
                            : "border-slate-800 bg-[#0B0F17]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                            {pkg.badge}
                          </span>
                          <span className="text-sm font-bold text-white font-mono">{pkg.price}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-1 flex items-center justify-between">
                          {pkg.title}
                          {selectedPackage === pkg.title && (
                            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 ml-1" />
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{pkg.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Target Timeframe */}
                <div className="space-y-2 pt-2">
                  <Label className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                    2. Desired Delivery Timeframe *
                  </Label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["Next 14 Business Days", "Next 30 Days", "Flexible / Scoping"].map((tf) => (
                      <button
                        type="button"
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          timeframe === tf
                            ? "border-blue-500 bg-blue-500/15 text-white"
                            : "border-slate-800 bg-[#0B0F17] text-slate-400 hover:text-white"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Company Website & Project Scope */}
                <div className="space-y-2 pt-2">
                  <Label htmlFor="companyUrl" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                    3. Company Website, App, or Documentation Link *
                  </Label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <Input
                      id="companyUrl"
                      required
                      placeholder="https://yourcompany.com or app link"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      className="pl-10 bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottleneck" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                    4. Current Onboarding Bottleneck &amp; Project Requirements *
                  </Label>
                  <Textarea
                    id="bottleneck"
                    required
                    rows={4}
                    placeholder="Describe your current onboarding pain points (e.g., users drop off before activating, support team repeating the same 1-on-1 demos, outdated Notion SOPs, or preparing a new software launch)..."
                    value={formData.bottleneck}
                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                    className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 resize-none text-sm leading-relaxed"
                  />
                </div>

                {/* 5. Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      Your Name *
                    </Label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <Input
                        id="name"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      Work Email *
                    </Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <Input
                        id="email"
                        required
                        type="email"
                        placeholder="founder@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralCode" className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                    Referral Code <span className="text-slate-600 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="referralCode"
                    placeholder="e.g. MM-FOUNDER-2026"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                    className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Transmitting Project Scope..."
                    ) : (
                      <>
                        Submit Sprint Scope Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    Mutual NDA Guaranteed
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    24-Hour Roadmap Turnaround
                  </span>
                  <span>·</span>
                  <span>Direct PMP® Review</span>
                </div>
              </form>
              )}
            </motion.div>

            {/* Right Column: Instant Calendar Booking & Office Directory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Direct Calendar Card */}
              <div className="bg-gradient-to-br from-blue-950/40 via-[#0F172A] to-[#0F172A] border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl shadow-blue-950/20">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    <Calendar className="w-3.5 h-3.5" />
                    Instant Calendar Scheduling
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Prefer to Talk Directly?
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Skip the form and choose an open 20-minute slot on our live calendar to discuss your onboarding sprint directly with Syed Imon Rizvi, PMP®.
                </p>
                <div className="pt-2">
                  <a
                    href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Select Date &amp; Time on Calendly
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Office & Direct Contact Information */}
              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Direct Contact &amp; Governance
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Leadership point of contact for international and regional clients
                  </p>
                </div>

                <div className="space-y-5 divide-y divide-slate-800/80">
                  {/* Leadership Lead */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <User className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Lead Knowledge Architect
                      </h4>
                      <p className="text-sm font-semibold text-white">
                        Syed Imon Rizvi, PMP®, PSM II, PAL I
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Certified Project Management Professional (PMI USA)
                      </p>
                    </div>
                  </div>

                  {/* North America & Global Line */}
                  <div className="flex items-start gap-3.5 pt-4">
                    <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                          North America &amp; Global Line
                        </h4>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Direct &amp; WhatsApp
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href="https://wa.me/15304235158"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-200 hover:text-blue-400 font-mono transition-colors"
                        >
                          +1 (530) 423-5158
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("+15304235158", "US Line")}
                          className="text-slate-500 hover:text-slate-300"
                          aria-label="Copy US Line"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Recommended for US, Canadian &amp; European clients
                      </p>
                    </div>
                  </div>

                  {/* Direct Desk / Pakistan WhatsApp Line */}
                  <div className="flex items-start gap-3.5 pt-4">
                    <MessageCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                          Founder Direct Desk (WhatsApp)
                        </h4>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Pakistan &amp; Regional
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href="https://wa.me/923303658220"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-200 hover:text-emerald-400 font-mono transition-colors"
                        >
                          +92 330 365 8220
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("+923303658220", "Pakistan WhatsApp")}
                          className="text-slate-500 hover:text-slate-300"
                          aria-label="Copy Pakistan WhatsApp"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Direct cell &amp; WhatsApp line for Syed Imon Rizvi
                      </p>
                    </div>
                  </div>

                  {/* Partnerships Email */}
                  <div className="flex items-start gap-3.5 pt-4">
                    <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Official Inquiries &amp; MSAs
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href="mailto:syedimonrizvipmp@gmail.com"
                          className="text-sm text-slate-200 hover:text-blue-400 font-mono transition-colors"
                        >
                          syedimonrizvipmp@gmail.com
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("syedimonrizvipmp@gmail.com", "Email")}
                          className="text-slate-500 hover:text-slate-300"
                          aria-label="Copy Email"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Registration */}
                  <div className="flex items-start gap-3.5 pt-4">
                    <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Commercial Tax &amp; Entity Registration
                      </h4>
                      <p className="text-sm text-slate-300">
                        Federal Board of Revenue (FBR), Pakistan
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        NTN: <span className="font-mono text-white font-semibold">6622762</span>
                      </p>
                      <a
                        href="https://iris.fbr.gov.pk/#verifications"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 mt-1"
                      >
                        Verify Official FBR Status on IRIS Portal ↗
                      </a>
                    </div>
                  </div>

                  {/* Location & Hours */}
                  <div className="flex items-start gap-3.5 pt-4">
                    <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Operations Model
                      </h4>
                      <p className="text-sm text-slate-300">
                        Remote Global Delivery Hub (Pakistan)
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Serving B2B SaaS &amp; Service Clients in North America, UK, Europe &amp; MENA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4">
                    <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Business Hours
                      </h4>
                      <p className="text-xs text-slate-300">
                        Monday – Friday: 9:00 AM – 6:00 PM PST
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Async Slack / Loom sprint updates with 24-hour SLA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Contact;
