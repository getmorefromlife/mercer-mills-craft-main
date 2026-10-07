import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Video,
  Sparkles,
  Zap,
  Lock,
  Clock,
  ExternalLink,
  ChevronRight,
  Play,
  Download,
  Star,
  Layers,
  Calendar,
  Check,
  Building,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import AuditBookingModal, { CALENDLY_URL } from "@/components/AuditBookingModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mercer & Mills Client Academy Experience Modules for the Interactive Walkthrough Preview
const sampleModules = [
  {
    id: 1,
    title: "Module 1: Day 1 Kickoff & The 45-Min Frictionless Asset Dump",
    duration: "3:45",
    description: "How we onboard you in 45 minutes: drop your raw Google Docs, Loom links, and messy Notion SOPs into our secure vault. Zero meetings, zero homework.",
    keyTakeaway: "Secure cloud vault credentials & mutual NDA execution packet.",
    checklistName: "Day 1 Asset Checklist (PDF)",
    downloadUrl: "/downloads/day-1-asset-checklist.html",
    hasChecklist: true,
  },
  {
    id: 2,
    title: "Module 2: Day 3 Architecture — Your Friction Audit & Curriculum Map",
    duration: "4:12",
    description: "We pinpoint your software's top 3 drop-off choke points and deliver a clear 5-7 module curriculum map structured for under-20-minute client mastery.",
    keyTakeaway: "PMP® Work Breakdown Structure (WBS) & Pedagogy Matrix sign-off.",
    checklistName: "Sample Curriculum Blueprint (PDF)",
    downloadUrl: "/downloads/sample-curriculum-blueprint.html",
    hasChecklist: true,
  },
  {
    id: 3,
    title: "Module 3: Day 7 Staging — First 4K Video & Voiceover Prototype",
    duration: "5:20",
    description: "You review your first fully produced lesson with high-definition screen pacing, dynamic zooms, crystal-clear voiceover, and action checklists.",
    keyTakeaway: "Milestone 1 sign-off gate before entering full-scale production.",
    checklistName: "Studio Style Guide (PDF)",
    downloadUrl: "/downloads/studio-style-guide.html",
    hasChecklist: true,
  },
  {
    id: 4,
    title: "Module 4: Day 11 Portal Setup — LMS Integration & Configuration",
    duration: "3:50",
    description: "We configure your turnkey student portal in your preferred LMS (Kajabi, Skool, Teachable, Notion, or custom portal) styled to match your exact brand.",
    keyTakeaway: "Zero IT headache: complete portal administration and user access provisioning.",
    checklistName: "Portal Setup Specs (PDF)",
    downloadUrl: "/downloads/portal-setup-specs.html",
    hasChecklist: true,
  },
  {
    id: 5,
    title: "Module 5: Day 14 Go-Live — Automated Welcome Sequences & Handover",
    duration: "4:05",
    description: "Complete 100% intellectual property transfer, raw 4K source files, plug-and-play welcome email sequences, and Care Plan onboarding.",
    keyTakeaway: "Full IP Assignment Agreement and automated client activation sequence.",
    checklistName: "Go-Live Launch Kit (PDF)",
    downloadUrl: "/downloads/go-live-launch-kit.html",
    hasChecklist: true,
  },
];

const faqs = [
  {
    q: "How does payment and invoicing work?",
    a: "All sprint engagements follow a predictable 50/50 milestone structure: a 50% deposit locks your start date on our production calendar, and the remaining 50% is billed upon Day 14 delivery and sign-off. We provide formal commercial invoices with company registration (FBR NTN: 6622762) and automated digital receipts.",
  },
  {
    q: "What payment methods do you accept for international clients?",
    a: "We accommodate global B2B procurement with multiple options: all major corporate credit/debit cards (Visa, MasterCard, Amex), US domestic ACH bank transfers, Wise, and direct international bank wires (SWIFT / IBAN).",
  },
  {
    q: "Do we sign a mutual Non-Disclosure Agreement (NDA)?",
    a: "Yes, 100%. Before you share access to sandbox environments, raw Loom clips, or proprietary SOPs, we execute a bilateral, US-standard mutual NDA. Upon final milestone payment, 100% of all intellectual property, scripts, voiceovers, and courseware transfer exclusively to your company.",
  },
  {
    q: "How much time is required from our internal team?",
    a: "Approximately 45 minutes on Day 1 to upload your existing product notes, documentation links, and raw screen captures into our secure drive. Our learning architects handle all scriptwriting, video recording, and LMS integration. You then spend ~30 minutes on Day 13 for final review.",
  },
  {
    q: "What happens if our software UI or product features change later?",
    a: "You retain all original 4K video project files, MP4 exports, and Figma/slide templates to edit internally at any time. Alternatively, you can enroll in our $1,500/month Knowledge Operations Care Plan for continuous monthly video refreshes and LMS governance.",
  },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("General Audit");
  const [activeSampleModule, setActiveSampleModule] = useState(sampleModules[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section 7 Embedded Qualification Form state
  const [embedCompanyUrl, setEmbedCompanyUrl] = useState("");
  const [embedBottleneck, setEmbedBottleneck] = useState("");
  const [embedTimeframe, setEmbedTimeframe] = useState("Next 14 days");
  const [embedEmail, setEmbedEmail] = useState("");
  const [embedQualified, setEmbedQualified] = useState(false);

  const openAuditWithPackage = (pkg: string) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  const handleEmbeddedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "mm_audit_qualification",
        JSON.stringify({
          companyUrl: embedCompanyUrl,
          bottleneck: embedBottleneck,
          timeframe: embedTimeframe,
          email: embedEmail,
          package: selectedPackage,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // safe fallback
    }
    setEmbedQualified(true);
  };

  return (
    <>
      <Helmet>
        <title>Mercer & Mills Knowledge Operations | Turnkey Client Academies in 14 Days</title>
        <meta
          name="description"
          content="Turn your complex software and messy SOPs into a studio-grade client onboarding academy in 14 days under certified PMP sprint governance."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* SECTION 2: HERO SECTION (Above the Fold)                                  */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0B0F17] linear-grid py-20 lg:py-28">
        {/* Subtle radial glow overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-8 shadow-sm">
              <span className="text-sm">🏆</span>
              <span>PMP®-Certified Knowledge Architecture</span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mb-6">
              Turn Your Complex Software &amp; Messy SOPs Into a{" "}
              <span className="text-gradient-electric">Studio-Grade Client Academy</span> in 14 Days.
            </h1>

            {/* Subheadline */}
            <p className="text-slate-400 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mb-10 font-normal">
              Eliminate customer churn, accelerate time-to-value, and stop repeating the same Zoom demos.
              We take your scattered Google Docs and raw screen recordings and deliver a turnkey, interactive
              onboarding academy—under certified PMP sprint governance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
              <Button
                size="lg"
                onClick={() => openAuditWithPackage("Hero CTA")}
                className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
              >
                Book a 15-Minute Onboarding Audit
                <ArrowRight className="w-5 h-5" />
              </Button>

              <a
                href="#sample-walkthrough"
                className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 text-base font-medium rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-all gap-2"
              >
                See Sample Academy Walkthrough ↓
              </a>
            </div>

            {/* Trust & Credibility Bar */}
            <div className="pt-6 border-t border-slate-800/80 w-full max-w-3xl flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Guaranteed 14-Day Delivery SLA</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Enterprise Zero-Data-Training AI Governance</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Certified PMP®, PSM II, PAL I Leadership</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE "ONBOARDING LEAK" COMPARISON (#problem)                    */}
      {/* ========================================================================= */}
      <section id="problem" className="py-24 bg-[#0B0F17] border-t border-slate-800/80 relative">
        <div className="container max-w-5xl mx-auto px-4">
          <SectionHeading
            subtitle="THE COST OF FRICTION"
            title="The $50,000 Revenue Leak in Your Onboarding Flow"
            description="B2B SaaS and service firms lose up to 23% of new customers in the first 60 days simply because getting started is overwhelming."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-8">
            {/* Column 1: The Outdated Way */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-8 bg-[#0F172A]/70 border border-red-900/30 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-950/60">
                  <h3 className="font-heading text-lg font-bold text-slate-300">
                    The Outdated Way
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-950/40 text-red-400 border border-red-900/40">
                    High Churn &amp; Waste
                  </span>
                </div>

                <ul className="space-y-5 text-slate-400 text-sm leading-relaxed">
                  <li className="flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-200">Sending 45-page Google Docs</strong> that 90% of customers never read.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-200">Customer Success teams trapped</strong> repeating identical 1-on-1 Zoom demos every week.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-200">Confusion and slow time-to-value</strong> leading to poor feature adoption and Month 2 churn.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-200">Waiting 8 weeks</strong> for bloated creative agencies to deliver static slides with hourly invoices.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-red-950/40 text-xs text-red-300/80 font-medium">
                Outcome: Lost expansion revenue, stressed CS managers, and wasted acquisition CAC.
              </div>
            </motion.div>

            {/* Column 2: The Mercer & Mills Onboarding Engine */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-8 bg-[#0F172A] border-2 border-blue-500/50 shadow-xl shadow-blue-900/20 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-900/40">
                  <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    <span>The Mercer &amp; Mills Engine</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    High Adoption &amp; Retention
                  </span>
                </div>

                <ul className="space-y-5 text-slate-300 text-sm leading-relaxed">
                  <li className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5 to 7 bite-sized, interactive video modules</strong> completed in under 20 minutes total.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Self-serve customer mastery</strong> that frees your CS team to drive high-margin upsells.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pedagogical curriculum structure</strong> driving 92%+ 90-day retention and rapid adoption.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">PMP-certified 14-day sprint delivery.</strong> Fixed timeline, predictable cost, zero management friction.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-900/40 text-xs text-blue-300 font-medium">
                Outcome: Customers activate on Day 1, recommend your software, and stay for years.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE 14-DAY CORE SPRINT ARCHITECTURE (#sprint)                  */}
      {/* ========================================================================= */}
      <section id="sprint" className="py-24 bg-[#080C14] border-t border-slate-800/80 relative">
        <div className="container max-w-5xl mx-auto px-4">
          <SectionHeading
            subtitle="HOW IT WORKS"
            title="From Raw Documents to a Live Academy in 14 Business Days"
            description="A battle-tested, three-phase sprint designed to demand minimal time from your team while delivering studio-grade polish."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mt-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-heading font-bold text-lg mb-6">
                  01
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                  Day 1
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  The Frictionless Dump
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You drop your messy Google Docs, raw Zoom recordings, Loom clips, and product notes into our secure drive.
                  That is the only work your team ever does.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
                Time required from you: 45 minutes
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl bg-[#0F172A] border border-blue-500/30 shadow-lg shadow-blue-950/20 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-heading font-bold text-lg mb-6">
                  02
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                  Days 2–12
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  AI-Accelerated Production &amp; Pedagogy
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our learning architects structure the curriculum. We script, record 4K screen walkthroughs,
                  generate crystal-clear studio audio, and design interactive PDF action checklists.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-blue-400 font-medium">
                PMP® Daily progress tracking &amp; milestones
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-heading font-bold text-lg mb-6">
                  03
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                  Day 14
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  Turnkey Deployment &amp; Launch
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We deliver a live, branded Academy hosted in your preferred platform (Skool, Notion, Kajabi, Teachable, or custom portal), complete with copy-paste automated welcome email templates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
                100% turnkey handoff &amp; full IP transfer
              </div>
            </motion.div>
          </div>

          {/* Interactive Academy Walkthrough Showcase (#sample-walkthrough) */}
          <div id="sample-walkthrough" className="mt-20 pt-12 border-t border-slate-800/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3 inline-block">
                INTERACTIVE PREVIEW
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">
                See How Mercer &amp; Mills Solves Onboarding: The 14-Day Experience
              </h3>
              <p className="text-slate-400 text-sm">
                We practice what we preach. Click through our actual 5-phase client onboarding architecture to see how we eliminate friction for YOU from Day 1 to Day 14 under certified PMP® governance.
              </p>
            </div>

            {/* Portal Mockup UI */}
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden shadow-2xl shadow-blue-950/20">
              {/* Window Header */}
              <div className="bg-[#080C14] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-slate-400 font-mono hidden sm:inline">
                    academy.mercerandmills.com/client-onboarding
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Interactive Prototype</span>
                </div>
              </div>

              {/* Portal Content: Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                {/* Left: Module List (4 cols) */}
                <div className="lg:col-span-5 border-r border-slate-800 p-5 bg-[#0B0F17]/70 space-y-2">
                  <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                      Curriculum (5 Modules)
                    </span>
                    <span className="text-xs text-blue-400 font-medium">21 Min Total</span>
                  </div>

                  <div className="space-y-2 mt-3">
                    {sampleModules.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setActiveSampleModule(mod)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                          activeSampleModule.id === mod.id
                            ? "bg-blue-600/15 border-blue-500/50 text-white shadow-sm"
                            : "bg-[#0F172A]/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                            activeSampleModule.id === mod.id
                              ? "bg-blue-500 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {mod.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-semibold truncate leading-tight">
                            {mod.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {mod.duration}
                            </span>
                            <span>•</span>
                            <span>PDF Checklist</span>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 mt-1 flex-shrink-0 transition-transform ${
                            activeSampleModule.id === mod.id ? "text-blue-400 translate-x-0.5" : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Active Player & Takeaways (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  {/* Fake 4K Video Player */}
                  <div className="relative rounded-xl border border-slate-800 bg-[#080C14] aspect-video flex flex-col items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      4K Studio Master · Crisp Audio
                    </div>
                    <div className="relative z-10 text-center space-y-3 px-4">
                      <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform cursor-pointer">
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                      <p className="text-xs text-slate-300 font-medium max-w-sm">
                        High-definition screen capture with guided narration &amp; animated visual callouts
                      </p>
                    </div>

                    {/* Fake Scrub Bar */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                      <span>0:00</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-blue-500" />
                      </div>
                      <span>{activeSampleModule.duration}</span>
                    </div>
                  </div>

                  {/* Module Details & Deliverables */}
                  <div className="space-y-4">
                    <h4 className="font-heading text-lg font-bold text-white">
                      {activeSampleModule.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {activeSampleModule.description}
                    </p>

                    <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-xs text-slate-300">
                        <span className="font-semibold text-blue-400 block mb-0.5">Pedagogical Design Gate:</span>
                        {activeSampleModule.keyTakeaway}
                      </div>

                      <a
                        href={activeSampleModule.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs border border-blue-500 shadow-md shadow-blue-500/20 transition-all whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {activeSampleModule.checklistName || "Open Action Checklist (PDF)"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: TRANSPARENT PRODUCTIZED PRICING (#pricing)                     */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-24 bg-[#0B0F17] border-t border-slate-800/80 relative">
        <div className="container max-w-5xl mx-auto px-4">
          <SectionHeading
            subtitle="INVESTMENT"
            title="Predictable Pricing. Zero Hourly Billing."
            description="Flat-fee sprints with clear deliverables and guaranteed SLAs. Choose the tier that fits your stage."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-stretch">
            {/* CARD 1: The Architecture Blueprint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 bg-[#0F172A] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">
                  Diagnosis &amp; Prototype
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  The Architecture Blueprint
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Ideal for teams needing an immediate diagnosis and curriculum roadmap.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-heading text-white">$750</span>
                    <span className="text-xs text-slate-400 font-medium">one-time</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">100% upfront · 72-Hour Delivery SLA</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Complete Onboarding Friction Audit</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>5–7 Module Pedagogical Curriculum Map</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>1 Fully Produced Prototype Video &amp; Checklist</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>72-Hour Guaranteed Delivery SLA</span>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/25 text-xs text-blue-300 mt-3">
                    <strong>Bonus:</strong> 100% of this fee is credited toward the Full Sprint upon upgrade.
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openAuditWithPackage("Architecture Blueprint ($750)")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm h-12 rounded-xl transition-all border border-slate-700"
                >
                  Start Blueprint Sprint
                </Button>
              </div>
            </motion.div>

            {/* CARD 2: The 14-Day Turnkey Academy (FEATURED) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-8 bg-[#0F172A] border-2 border-blue-500 shadow-xl shadow-blue-900/30 flex flex-col justify-between relative transform lg:-translate-y-2"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                Most Popular · Complete Engine
              </div>

              <div>
                <div className="text-xs uppercase font-semibold text-blue-400 tracking-wider mb-2 mt-2">
                  Turnkey Infrastructure
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  The 14-Day Turnkey Academy
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  The complete, plug-and-play onboarding infrastructure.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-heading text-white">$3,500</span>
                    <span className="text-xs text-slate-400 font-medium">flat fee</span>
                  </div>
                  <div className="text-[11px] text-blue-300 mt-1">50% deposit / 50% on completion</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Up to 7 Studio-Grade Video Modules (4K Screen capture + Crisp Audio)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Downloadable PDF Action Checklists &amp; Quizzes</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Turnkey Portal Setup (Skool, Notion, Teachable, or Kajabi)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>PMP® Daily Sprint Tracking &amp; Dedicated PM Governance</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Plug-and-Play Customer Welcome Email Sequences</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-white">14-Day Delivery SLA Guarantee</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openAuditWithPackage("14-Day Turnkey Academy ($3,500)")}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm h-12 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
                >
                  Book 14-Day Sprint
                </Button>
              </div>
            </motion.div>

            {/* CARD 3: Knowledge Operations Care Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl p-8 bg-[#0F172A] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">
                  Ongoing Continuity
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Knowledge Operations Care Plan
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Ongoing maintenance as your product, features, and SOPs evolve.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-heading text-white">$1,500</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Recurring continuity · Cancel anytime</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Up to 2 New/Updated Training Modules per Month</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Ongoing LMS Management &amp; Monthly Completion Analytics</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Rapid 48-Hour SOP Updates for New Features</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Quarterly Churn &amp; Onboarding Optimization Review</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openAuditWithPackage("Care Plan Retainer ($1,500/mo)")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm h-12 rounded-xl transition-all border border-slate-700"
                >
                  Inquire for Retainer
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: ENTERPRISE DATA PRIVACY & GOVERNANCE (#governance)             */}
      {/* ========================================================================= */}
      <section id="governance" className="py-24 bg-[#080C14] border-t border-slate-800/80 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#0F172A] to-[#0B0F17] border border-blue-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Glow background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-blue-400">
                  Data Security &amp; IP Protection
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Enterprise Data Security. Zero Model Training.
                </h2>
              </div>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              We operate under strict PMP-certified governance. All proprietary client workflows, product data,
              and internal transcripts are processed exclusively within private, encrypted commercial environments
              where AI foundation model training is permanently disabled. Your IP is 100% confidential and is never
              leaked to public machine learning models.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800/80">
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                Zero Data Retention / Training
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                Mutual NDA Guaranteed
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                SOC2-Aligned Protocols
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Verified Testimonial */}
      <section className="py-16 bg-[#0B0F17] border-t border-slate-800/80">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="font-heading text-lg sm:text-xl text-slate-200 leading-relaxed italic max-w-2xl mx-auto mb-6">
            "Syed delivered exceptional work. His communication, professionalism, and project management skills are top-notch. I'd highly recommend him to anyone looking for high-quality work delivered on time."
          </blockquote>
          <div>
            <p className="font-semibold text-sm text-white">Syed Zaidi</p>
            <p className="text-xs text-slate-400">Founder, Istax Consultants</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6B: EXECUTIVE B2B FAQ (Billing, NDAs, Workflows)                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#0B0F17] border-t border-slate-800/80">
        <div className="container max-w-4xl mx-auto px-4">
          <SectionHeading
            subtitle="TRANSPARENT OPERATIONS"
            title="Frequently Asked Questions"
            description="Clear answers regarding billing, international payment rails, IP ownership, and sprint workflows."
          />

          <div className="space-y-4 mt-12">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="font-heading font-semibold text-base sm:text-lg text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FINAL CALL TO ACTION & EMBEDDED BOOKING (#audit)              */}
      {/* ========================================================================= */}
      <section id="audit" className="py-24 bg-[#080C14] border-t border-slate-800/80 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3 inline-block">
              GET STARTED
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ready to Eliminate Onboarding Churn?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Book a 15-minute diagnostic call with Syed Imon Rizvi, PMP®. We will review your current documentation and map out your custom 14-day sprint.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 sm:p-10 bg-[#0F172A] border border-slate-800 shadow-2xl"
          >
            {!embedQualified ? (
              <form onSubmit={handleEmbeddedSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Field 1: Company Website URL */}
                  <div className="space-y-2">
                    <Label htmlFor="embed-company" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      1. Company Website or App URL *
                    </Label>
                    <Input
                      id="embed-company"
                      required
                      placeholder="https://yourcompany.com"
                      value={embedCompanyUrl}
                      onChange={(e) => setEmbedCompanyUrl(e.target.value)}
                      className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-12"
                    />
                  </div>

                  {/* Field 3: Launch timeframe */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                      3. Desired Launch Timeframe *
                    </Label>
                    <div className="grid grid-cols-2 gap-2 h-12">
                      {["Next 14 days", "Next 30 days"].map((tf) => (
                        <button
                          type="button"
                          key={tf}
                          onClick={() => setEmbedTimeframe(tf)}
                          className={`rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                            embedTimeframe === tf
                              ? "border-blue-500 bg-blue-500/20 text-white"
                              : "border-slate-800 bg-[#0B0F17] text-slate-400 hover:text-white"
                          }`}
                        >
                          {tf}
                          {embedTimeframe === tf && <Check className="w-3.5 h-3.5 text-blue-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 2: Biggest Onboarding Bottleneck */}
                <div className="space-y-2">
                  <Label htmlFor="embed-bottleneck" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                    2. What is your biggest onboarding bottleneck right now? *
                  </Label>
                  <Textarea
                    id="embed-bottleneck"
                    required
                    rows={3}
                    placeholder="e.g., Users sign up but drop off before setting up their first integration; our support team spends 15 hours a week giving the exact same demo."
                    value={embedBottleneck}
                    onChange={(e) => setEmbedBottleneck(e.target.value)}
                    className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 resize-none text-sm"
                  />
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="embed-email" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                    Your Work Email (Optional for instant calendar invite)
                  </Label>
                  <Input
                    id="embed-email"
                    type="email"
                    placeholder="founder@yourcompany.com"
                    value={embedEmail}
                    onChange={(e) => setEmbedEmail(e.target.value)}
                    className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-12 text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  Step 2: Choose Your 15-Minute Slot on the Calendar
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setEmbedQualified(true)}
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors underline"
                  >
                    Prefer to pick a time first? View available slots directly →
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                  <span>✓ 100% Free Diagnostic</span>
                  <span>✓ Zero Sales Pressure</span>
                  <span>✓ PMP® Scoping Document Included</span>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-300">
                    <span className="text-blue-400 font-semibold">Diagnostic details recorded:</span>{" "}
                    {embedCompanyUrl || "General"} · {embedTimeframe}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmbedQualified(false)}
                    className="text-slate-400 hover:text-slate-200 underline"
                  >
                    Edit details
                  </button>
                </div>

                {/* Embedded Calendar Widget */}
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0B0F17]">
                  <iframe
                    src={`${CALENDLY_URL}?embed_domain=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.hostname : "mercerandmills.com"
                    )}&embed_type=Inline`}
                    width="100%"
                    height="650"
                    title="15-Minute Diagnostic Call with Syed Imon Rizvi, PMP"
                    className="border-0 w-full"
                  />
                </div>

                <div className="text-center pt-2">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
                  >
                    Having trouble viewing the calendar? Open in a full window
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Global Booking Modal */}
      <AuditBookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackage={selectedPackage}
      />
    </>
  );
};

export default Index;
