import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FileCheck,
  ListChecks,
  Compass,
  Palette,
  Server,
  Rocket,
  Send,
  Printer,
  Copy,
  Check,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Landmark,
  Share2,
  Sparkles,
  ArrowRight,
  Eye,
  Edit3,
} from "lucide-react";
import { useClientProfile } from "@/hooks/useClientProfile";

// Types for customizable document data
interface CustomLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface CustomModule {
  id: number;
  title: string;
  duration: string;
  outcome: string;
  gate: string;
  companion: string;
}

interface CustomChecklistSection {
  title: string;
  items: string[];
}

const DEFAULT_INVOICE_ITEMS: CustomLineItem[] = [
  {
    id: "1",
    description:
      "Milestone 1 (50% upfront deposit): 14-Day Turnkey Client Academy Sprint. Includes Discovery Intake, curriculum architecture, 4K screen production, interactive checklists, and PMP® daily sprint tracking.",
    quantity: 1,
    rate: 1750,
  },
  {
    id: "2",
    description:
      "Milestone 2 (50% final balance): Final delivery, portal deployment (Skool/Notion/custom LMS), automated welcome email templates, and complete IP & source file transfer.",
    quantity: 1,
    rate: 1750,
  },
];

const DEFAULT_MODULES: CustomModule[] = [
  {
    id: 1,
    title: "Workspace Initialization & Team Provisioning",
    duration: "3:30",
    outcome: "Client signs in, configures security/2FA, and provisions team roles without support friction.",
    gate: "Active workspace configuration verified; team access dispatched.",
    companion: "Vector PDF Quick-Start Provisioning Checklist",
  },
  {
    id: 2,
    title: "Core Integrations & Automated Webhook Sync",
    duration: "4:00",
    outcome: "Connect primary CRM, communication rails (Slack/Email), and API endpoints.",
    gate: "Automated handshake ping successfully sent and confirmed.",
    companion: "Integration Mapping Table & Webhook Validator",
  },
  {
    id: 3,
    title: "Building Your First High-Value Revenue Asset",
    duration: "5:00",
    outcome: "Guided walkthrough to generate the first productive workflow, campaign, or report.",
    gate: "Primary asset saved, tested, and published to live environment.",
    companion: "3-Step Production Action Framework",
  },
  {
    id: 4,
    title: "Advanced Workflows & Automated Triggers",
    duration: "3:45",
    outcome: "Configure exception handling, automated alerts, and custom conditional logic.",
    gate: "Automation condition fired and validated in test sandbox.",
    companion: "Logic Gate Cheat Sheet",
  },
  {
    id: 5,
    title: "Go-Live Verification, Analytics & Churn Defense",
    duration: "4:00",
    outcome: "Master performance dashboards, audit exports, and on-demand escalation channels.",
    gate: "Client completes final checkpoint; Onboarding Graduation Badge unlocked.",
    companion: "Day 14 Handoff & IP Assignment Kit",
  },
];

const DEFAULT_INTAKE_SECTIONS: CustomChecklistSection[] = [
  {
    title: "Section 1: The Repository Cloud Vault",
    items: [
      "Internal Knowledge & SOPs: Drop raw Google Docs, Notion exports, manuals, and help center articles into /01_Documentation",
      "Unedited Video Walkthroughs: Upload 2–3 unedited Loom/Zoom recordings of past customer demos or internal feature runs into /02_Recordings",
      "Brand Assets & Typography: Provide high-resolution vector logos (SVG/PNG), brand fonts, and hex codes into /03_Branding",
    ],
  },
  {
    title: "Section 2: Sandbox Access & Environment",
    items: [
      "Staging Credentials: Provide demo/sandbox user credentials (team@mercerandmills.com) with representative dummy test data.",
      "Target Portal Destination: Confirm designated LMS (Skool Community, Notion Workspace, Kajabi, Teachable, or custom portal).",
    ],
  },
  {
    title: "Section 3: Governance & Privacy Lock",
    items: [
      "Mutual NDA Execution: Executed bilateral Non-Disclosure Agreement securely stored on file.",
      "50% Milestone 1 Deposit: Production kickoff deposit verified and locked on calendar.",
      "Enterprise AI Data Privacy: Zero-retention private workflow initialized; client data is never trained on public AI models.",
    ],
  },
];

type ActiveTab =
  | "invoice"
  | "agreement"
  | "intake"
  | "curriculum"
  | "styleguide"
  | "lms"
  | "golive"
  | "dispatch";

export default function AdminHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as ActiveTab) || "invoice";
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // Sync with global profile state
  const { profile, updateProfile, resetProfile } = useClientProfile();

  // Document custom states
  const [invoiceItems, setInvoiceItems] = useState<CustomLineItem[]>(DEFAULT_INVOICE_ITEMS);
  const [modules, setModules] = useState<CustomModule[]>(DEFAULT_MODULES);
  const [intakeSections, setIntakeSections] = useState<CustomChecklistSection[]>(DEFAULT_INTAKE_SECTIONS);
  const [includePayoneerSlot, setIncludePayoneerSlot] = useState(false);
  const [payoneerUrl, setPayoneerUrl] = useState("");

  // Style guide customizable text
  const [styleVideoRes, setStyleVideoRes] = useState("Native 4K UHD (3840 × 2160) at 60 FPS for ultra-crisp interface readability.");
  const [styleAudioSpec, setStyleAudioSpec] = useState("Standardized to -14.0 LUFS with -60 dB noise floor (studio condenser / ElevenLabs Enterprise).");

  // LMS custom specs
  const [lmsPlatforms, setLmsPlatforms] = useState("Notion Executive Portals, Skool Community Classrooms, Kajabi, Teachable, Circle, Custom In-App HLS Embeds");

  // Go-Live Welcome email customized text
  const [welcomeEmailSubject, setWelcomeEmailSubject] = useState(
    () => `Welcome to ${profile.clientCompany || "[Company Name]"} — Access Your Onboarding Academy`
  );

  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  // Keep search params in sync with tab
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handlePrint = () => {
    window.print();
  };

  const notifyCopied = (label: string) => {
    setCopiedAction(label);
    setTimeout(() => setCopiedAction(null), 2500);
  };

  // Preset packages
  const applyPreset = (tier: "turnkey" | "blueprint" | "care") => {
    if (tier === "turnkey") {
      updateProfile({ packageType: "turnkey", totalInvestment: 3500, depositAmount: 1750 });
      setInvoiceItems([
        {
          id: "1",
          description: "Milestone 1 (50% upfront deposit): 14-Day Turnkey Client Academy Sprint.",
          quantity: 1,
          rate: 1750,
        },
        {
          id: "2",
          description: "Milestone 2 (50% final balance): Day 14 Portal Deployment & Complete IP Transfer.",
          quantity: 1,
          rate: 1750,
        },
      ]);
    } else if (tier === "blueprint") {
      updateProfile({ packageType: "blueprint", totalInvestment: 750, depositAmount: 750 });
      setInvoiceItems([
        {
          id: "1",
          description: "3-Day Architecture Blueprint Sprint: Curriculum matrix, workflow friction audit, LMS platform recommendation.",
          quantity: 1,
          rate: 750,
        },
      ]);
    } else {
      updateProfile({ packageType: "care", totalInvestment: 1500, depositAmount: 1500 });
      setInvoiceItems([
        {
          id: "1",
          description: "Monthly Knowledge Operations Retainer: Ongoing curriculum updates, learner analytics, monthly video additions.",
          quantity: 1,
          rate: 1500,
        },
      ]);
    }
  };

  const invoiceSubtotal = invoiceItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);

  // Client link generator
  const getClientDownloadUrl = (fileName: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams();
    if (profile.clientCompany) params.set("company", profile.clientCompany);
    if (profile.clientName) params.set("client", profile.clientName);
    const query = params.toString() ? `?${params.toString()}` : "";
    return `${origin}/downloads/${fileName}${query}`;
  };

  // Copy full client email package
  const copyClientPacket = () => {
    const company = profile.clientCompany || "Client Team";
    const client = profile.clientName || "Valued Client";
    const text = `
Hi ${client.split(" ")[0]},

Welcome to the Mercer & Mills 14-Day Knowledge Operations Sprint!

Here is your complete onboarding & governance package ready for review:

1. COMMERCIAL INVOICE & SETTLEMENT:
   Invoice Ref: ${profile.invoiceNumber}
   Total Amount: $${profile.totalInvestment.toLocaleString()} USD (Milestone 1 Deposit: $${profile.depositAmount.toLocaleString()} USD)
   Direct Wire / Wise IBAN: PK22UNIL0109000297908151 (Beneficiary: Syed Imon Rizvi)

2. SPRINT MASTER AGREEMENT & MUTUAL NDA:
   Agreement Ref: ${profile.agreementId}
   Service Provider: Mercer & Mills Knowledge Operations (Pakistan / Global Remote Operations · FBR NTN: 6622762)
   Includes Certified PMP® 14-Day Delivery SLA & Enterprise Zero-Retention AI Data Privacy.

3. YOUR 5 SPRINT DELIVERABLE BLUEPRINTS:
   • Day 1 Asset Intake Checklist: ${getClientDownloadUrl("day-1-asset-checklist.html")}
   • 5-Module Curriculum Map: ${getClientDownloadUrl("sample-curriculum-blueprint.html")}
   • Studio Style Guide & Standards: ${getClientDownloadUrl("studio-style-guide.html")}
   • Turnkey LMS Architecture Specs: ${getClientDownloadUrl("portal-setup-specs.html")}
   • Go-Live Launch Kit & IP Transfer: ${getClientDownloadUrl("go-live-launch-kit.html")}

We are excited to build your turnkey academy under certified PMP® governance.

Best regards,
Syed Imon Rizvi, PMP®
Managing Director · Mercer & Mills Knowledge Operations
Email: syedimonrizvipmp@gmail.com | Desk: +1 (530) 423-5158
    `.trim();

    navigator.clipboard.writeText(text);
    notifyCopied("Full Client Email Packet Copied!");
  };

  return (
    <>
      <Helmet>
        <title>Admin Operations Hub | Mercer &amp; Mills Knowledge Operations</title>
        <meta
          name="description"
          content="Unified client document management, invoice generation, sprint agreement drafting, and deliverable kit customization."
        />
      </Helmet>

      {/* Global Print Optimization */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 10mm 12mm;
          }
          header, footer, nav, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            padding: 0 !important;
            margin: 0 !important;
          }
          body * {
            visibility: hidden;
          }
          #admin-printable-sheet, #admin-printable-sheet * {
            visibility: visible;
          }
          #admin-printable-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 16px !important;
            box-shadow: none !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 8px !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#080C14] text-slate-100 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Admin Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 no-print">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to="/financial-center"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors"
                >
                  ← Financial Center
                </Link>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-semibold text-blue-400">
                  Operations &amp; Document Engine
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-blue-500" />
                Executive Client Operations Hub
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Unified workspace to edit, synchronize, print, and dispatch all 7 client onboarding &amp; commercial agreements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyClientPacket}
                className="px-4 py-2.5 rounded-xl border border-blue-500/40 bg-blue-950/40 hover:bg-blue-900/50 text-blue-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                {copiedAction === "Full Client Email Packet Copied!" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Send className="w-4 h-4 text-blue-400" />
                )}
                {copiedAction === "Full Client Email Packet Copied!"
                  ? "Copied Full Packet!"
                  : "Copy Complete Client Packet"}
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
              >
                <Printer className="w-4 h-4" />
                Print Current Doc as PDF
              </button>
            </div>
          </div>

          {/* Master Synchronized Client Intake Banner */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  Master Client Profile (Auto-Synchronized Across All 7 Documents)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-400">
                  Quick Presets:
                </div>
                <button
                  onClick={() => applyPreset("turnkey")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                    profile.packageType === "turnkey"
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
                  }`}
                >
                  14-Day ($3.5k)
                </button>
                <button
                  onClick={() => applyPreset("blueprint")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                    profile.packageType === "blueprint"
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
                  }`}
                >
                  Blueprint ($750)
                </button>
                <button
                  onClick={() => applyPreset("care")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                    profile.packageType === "care"
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
                  }`}
                >
                  Care ($1.5k/mo)
                </button>
                <button
                  onClick={resetProfile}
                  className="text-xs text-slate-400 hover:text-red-400 underline ml-2"
                >
                  Reset Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Client Company / Entity</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Health Technologies"
                  value={profile.clientCompany}
                  onChange={(e) => updateProfile({ clientCompany: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Authorized Signer</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={profile.clientName}
                  onChange={(e) => updateProfile({ clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Signer Title</label>
                <input
                  type="text"
                  value={profile.clientTitle}
                  onChange={(e) => updateProfile({ clientTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Client Email</label>
                <input
                  type="email"
                  placeholder="alex@acme.com"
                  value={profile.clientEmail}
                  onChange={(e) => updateProfile({ clientEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Country / Region</label>
                <input
                  type="text"
                  value={profile.clientCountry}
                  onChange={(e) => updateProfile({ clientCountry: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-print">
            {[
              { id: "invoice", label: "1. Commercial Invoice", icon: FileText },
              { id: "agreement", label: "2. Sprint Agreement & NDA", icon: FileCheck },
              { id: "intake", label: "3. Day 1 Intake Checklist", icon: ListChecks },
              { id: "curriculum", label: "4. Curriculum Blueprint", icon: Compass },
              { id: "styleguide", label: "5. Studio Style Guide", icon: Palette },
              { id: "lms", label: "6. LMS Architecture Specs", icon: Server },
              { id: "golive", label: "7. Go-Live & IP Transfer", icon: Rocket },
              { id: "dispatch", label: "8. Client Dispatch Center", icon: Send },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ActiveTab)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-[#0F172A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Commercial Invoice */}
          {activeTab === "invoice" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Edit Controls */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Invoice Metadata &amp; Dates
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Invoice #</label>
                      <input
                        type="text"
                        value={profile.invoiceNumber}
                        onChange={(e) => updateProfile({ invoiceNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Currency</label>
                      <input
                        type="text"
                        disabled
                        value="USD ($)"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Issue Date</label>
                      <input
                        type="date"
                        value={profile.issueDate}
                        onChange={(e) => updateProfile({ issueDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Due Date</label>
                      <input
                        type="date"
                        value={profile.dueDate}
                        onChange={(e) => updateProfile({ dueDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Line Items Editor */}
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                      Editable Line Items
                    </h3>
                    <button
                      onClick={() =>
                        setInvoiceItems([
                          ...invoiceItems,
                          {
                            id: Date.now().toString(),
                            description: "Custom Knowledge Operations Sprint Service",
                            quantity: 1,
                            rate: 500,
                          },
                        ])
                      }
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {invoiceItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-400">Line Item #{idx + 1}</span>
                          {invoiceItems.length > 1 && (
                            <button
                              onClick={() => setInvoiceItems(invoiceItems.filter((it) => it.id !== item.id))}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) =>
                            setInvoiceItems(
                              invoiceItems.map((it) =>
                                it.id === item.id ? { ...it, description: e.target.value } : it
                              )
                            )
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-500 text-[10px]">Qty</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                setInvoiceItems(
                                  invoiceItems.map((it) =>
                                    it.id === item.id
                                      ? { ...it, quantity: parseInt(e.target.value) || 1 }
                                      : it
                                  )
                                )
                              }
                              className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500 text-[10px]">Rate ($ USD)</label>
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={item.rate}
                              onChange={(e) =>
                                setInvoiceItems(
                                  invoiceItems.map((it) =>
                                    it.id === item.id
                                      ? { ...it, rate: parseFloat(e.target.value) || 0 }
                                      : it
                                  )
                                )
                              }
                              className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Printable A4 Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-8 font-sans"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mt-1">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <div className="mt-4 text-xs text-slate-600 space-y-0.5 leading-relaxed">
                        <p className="font-semibold text-slate-800">
                          Managing Director: Syed Imon Rizvi, PMP®
                        </p>
                        <p>
                          Provider Jurisdiction:{" "}
                          <span className="font-semibold text-slate-800">Pakistan (Global Remote Operations)</span>
                        </p>
                        <p>
                          Corporate NTN:{" "}
                          <span className="font-mono font-semibold text-slate-800">6622762</span>{" "}
                          (FBR IRIS Verified, Pakistan)
                        </p>
                        <p>Email: syedimonrizvipmp@gmail.com</p>
                        <p>Desk: +1 (530) 423-5158 | +92 330 365 8220</p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-3xl font-black font-heading text-slate-900 tracking-tight">
                        INVOICE
                      </span>
                      <div className="mt-2 text-xs text-slate-600 space-y-1">
                        <p>
                          <span className="text-slate-400">Invoice #: </span>
                          <span className="font-mono font-bold text-slate-900">
                            {profile.invoiceNumber}
                          </span>
                        </p>
                        <p>
                          <span className="text-slate-400">Date Issued: </span>
                          <span className="font-medium text-slate-900">{profile.issueDate}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">Due Date: </span>
                          <span className="font-bold text-blue-700">{profile.dueDate}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Billed To */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                        Billed To
                      </span>
                      <p className="font-bold text-slate-900 text-sm">
                        {profile.clientName || "Client Representative"}
                      </p>
                      <p className="text-xs font-semibold text-slate-700">
                        {profile.clientCompany || "Client Organization"}
                      </p>
                      {profile.clientEmail && (
                        <p className="text-xs text-slate-600 font-mono mt-0.5">
                          {profile.clientEmail}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5">{profile.clientCountry}</p>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                        Project Terms
                      </span>
                      <p className="text-xs font-semibold text-slate-800">
                        14-Day Knowledge Operations Sprint
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Milestone Sign-off &amp; Full IP Transfer
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        50/50 Milestone Contract
                      </span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-300 text-slate-500 uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 font-bold">Description</th>
                        <th className="py-2.5 px-3 text-center font-bold">Qty</th>
                        <th className="py-2.5 px-3 text-right font-bold">Rate</th>
                        <th className="py-2.5 pl-3 text-right font-bold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {invoiceItems.map((it) => (
                        <tr key={it.id}>
                          <td className="py-4 pr-4">
                            <p className="font-semibold text-slate-900 leading-snug">
                              {it.description}
                            </p>
                            <span className="text-[10px] text-slate-500 mt-1 block">
                              Deliverable governed under Certified PMP® Quality Assurance
                            </span>
                          </td>
                          <td className="py-4 px-3 text-center font-mono text-slate-700">
                            {it.quantity}
                          </td>
                          <td className="py-4 px-3 text-right font-mono text-slate-700">
                            ${it.rate.toLocaleString()}
                          </td>
                          <td className="py-4 pl-3 text-right font-mono font-bold text-slate-900">
                            ${(it.quantity * it.rate).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Subtotal */}
                  <div className="border-t-2 border-slate-200 pt-4 flex flex-col items-end">
                    <div className="w-full sm:w-64 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal:</span>
                        <span className="font-mono font-medium">
                          ${invoiceSubtotal.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px]">
                        <span>Export Tax / VAT:</span>
                        <span className="font-mono">0.00% (Exempt)</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-2">
                        <span>Total Amount Due:</span>
                        <span className="font-mono text-blue-700">
                          ${invoiceSubtotal.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Rails */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-blue-600" />
                      Payment Settlement Instructions (Direct Deposit)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 font-sans">
                        <p className="font-bold text-slate-900 text-xs">Direct International Bank Wire</p>
                        <p><strong>Beneficiary:</strong> Syed Imon Rizvi</p>
                        <p><strong>Bank:</strong> United Bank Limited (UBL)</p>
                        <p><strong>IBAN:</strong> <span className="font-mono font-bold text-slate-900">PK22UNIL0109000297908151</span></p>
                        <p><strong>SWIFT:</strong> UNILPKKA | Pakistan</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 font-sans">
                        <p className="font-bold text-slate-900 text-xs">Fast Card / ACH via Wise / Remitly</p>
                        <p>1. Recipient: <strong>Syed Imon Rizvi</strong></p>
                        <p>2. Select: <strong>United Bank Limited (UBL)</strong></p>
                        <p>3. Enter IBAN: <span className="font-mono font-bold text-slate-900">PK22UNIL0109000297908151</span></p>
                        <p className="text-[10px] text-slate-500">Instant domestic US ACH or card settlement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Sprint Agreement & NDA */}
          {activeTab === "agreement" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Agreement Controls */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Agreement Reference &amp; Scope
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Agreement Ref</label>
                      <input
                        type="text"
                        value={profile.agreementId}
                        onChange={(e) => updateProfile({ agreementId: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Effective Date</label>
                      <input
                        type="date"
                        value={profile.effectiveDate}
                        onChange={(e) => updateProfile({ effectiveDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">Total Project ($)</label>
                      <input
                        type="number"
                        value={profile.totalInvestment}
                        onChange={(e) => updateProfile({ totalInvestment: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium mb-1 block">50% Deposit ($)</label>
                      <input
                        type="number"
                        value={profile.depositAmount}
                        onChange={(e) => updateProfile({ depositAmount: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Direct E-Sign Links */}
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3 text-xs">
                  <span className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    Dispatch via E-Signature Platform
                  </span>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://www.signwell.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Open SignWell <ExternalLink className="w-3 h-3 text-blue-400" />
                    </a>
                    <a
                      href="https://www.pandadoc.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Open PandaDoc <ExternalLink className="w-3 h-3 text-blue-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Agreement Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-2">
                        Provider: <span className="font-semibold text-slate-800">Pakistan (Global Remote Operations)</span> · FBR NTN: <span className="font-mono font-bold">6622762</span> | Lead: Syed Imon Rizvi, PMP®
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-xl font-black font-heading text-slate-900 uppercase">
                        Sprint Agreement &amp; NDA
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-1">Ref: {profile.agreementId}</p>
                      <p className="text-[11px] text-slate-600">Effective Date: {profile.effectiveDate}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                    <p>
                      This Agreement is entered into between <strong>Mercer &amp; Mills Knowledge Operations</strong> (&ldquo;Provider&rdquo;, registered entity in <strong>Pakistan</strong> under FBR NTN 6622762, Global Remote Delivery Hub) and{" "}
                      <strong>{profile.clientCompany || "[Client Company Name]"}</strong> (&ldquo;Client&rdquo;), represented by{" "}
                      <strong>{profile.clientName || "[Signer Name]"}</strong>, {profile.clientTitle} ({profile.clientCountry}).
                    </p>
                  </div>

                  <div className="space-y-4 text-[11px] text-slate-700">
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
                        1. Engagement Scope &amp; Deliverables
                      </h4>
                      <p>
                        Provider shall execute a dedicated <strong>14-Day Knowledge Operations Sprint</strong> to convert Client&rsquo;s internal SOPs and knowledge into a turnkey client academy. Deliverables include:
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-600">
                        <li>Pedagogical curriculum architecture and module scripting</li>
                        <li>High-definition 4K screen capture walkthroughs with studio audio</li>
                        <li>Interactive PDF checklists and action frameworks</li>
                        <li>Turnkey LMS portal deployment (Skool, Notion, Kajabi, or custom)</li>
                        <li>Automated welcome email templates &amp; handoff documentation</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
                        2. 50/50 Milestone Investment &amp; Payment Schedule
                      </h4>
                      <p>
                        Total fixed sprint investment: <strong>${profile.totalInvestment.toLocaleString()} USD</strong>.
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-600">
                        <li>
                          <strong>Milestone 1 (50% Upfront Deposit): ${profile.depositAmount.toLocaleString()} USD</strong> due upon signing to lock production calendar, initiate Discovery Intake, and begin curriculum scoping.
                        </li>
                        <li>
                          <strong>Milestone 2 (50% Final Balance): ${(profile.totalInvestment - profile.depositAmount).toLocaleString()} USD</strong> due on Day 14 upon live portal staging review and prior to final credential transfer.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
                        3. Enterprise AI Data Privacy &amp; Zero-Data Retention
                      </h4>
                      <p>
                        Provider agrees that all proprietary workflows, codebases, Loom recordings, client documentation, and business records shared during the sprint remain strictly confidential. Provider utilizes enterprise zero-data-retention AI environments; Client data is never retained, logged, shared, or utilized to train public or private AI models.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
                        4. 100% Intellectual Property Transfer
                      </h4>
                      <p>
                        All deliverables produced under this Agreement are deemed &ldquo;work-for-hire.&rdquo; Upon receipt of the Milestone 2 balance, 100% of all copyrights, video master files, scripts, and portal rights permanently transfer to the Client. Zero recurring platform fees.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
                        5. PMP® 14-Day Delivery SLA &amp; Governance
                      </h4>
                      <p>
                        Sprint execution is governed under Certified Project Management Professional (PMP®) agile standards with a guaranteed 14-day completion SLA. Client agrees to provide prompt feedback within 48 hours of milestone staging reviews to maintain the sprint timeline.
                      </p>
                    </div>
                  </div>

                  <div className="border-t-2 border-slate-200 pt-6 grid grid-cols-2 gap-8 text-[11px]">
                    <div className="space-y-3">
                      <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
                        For Mercer &amp; Mills:
                      </span>
                      <div className="h-10 border-b border-slate-400 flex items-end pb-1 font-serif text-slate-900 text-sm italic font-semibold">
                        Syed Imon Rizvi
                      </div>
                      <div className="text-slate-600 space-y-0.5">
                        <p><strong>Name:</strong> Syed Imon Rizvi, PMP®</p>
                        <p><strong>Title:</strong> Managing Director &amp; Lead Architect</p>
                        <p><strong>Jurisdiction:</strong> Pakistan (Global Remote Operations)</p>
                        <p><strong>Entity NTN:</strong> 6622762 (FBR Pakistan)</p>
                        <p><strong>Date:</strong> {profile.effectiveDate}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
                        For Client:
                      </span>
                      <div className="h-10 border-b border-slate-400 flex items-end pb-1 text-slate-400 font-mono text-[10px]">
                        [Sign Here or via SignWell / PandaDoc]
                      </div>
                      <div className="text-slate-600 space-y-0.5">
                        <p><strong>Name:</strong> {profile.clientName || "_______________________"}</p>
                        <p><strong>Title:</strong> {profile.clientTitle || "_______________________"}</p>
                        <p><strong>Company:</strong> {profile.clientCompany || "_______________________"}</p>
                        <p><strong>Date:</strong> _______________________</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Day 1 Intake Checklist */}
          {activeTab === "intake" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Intake Editor */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                      Customize Checklist Items
                    </h3>
                    <button
                      onClick={() => setIntakeSections(DEFAULT_INTAKE_SECTIONS)}
                      className="text-slate-400 hover:text-slate-200 text-[11px] underline"
                    >
                      Reset Sections
                    </button>
                  </div>
                  {intakeSections.map((sec, secIdx) => (
                    <div key={secIdx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="font-bold text-blue-400 block">{sec.title}</span>
                      {sec.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newSections = [...intakeSections];
                              newSections[secIdx].items[itemIdx] = e.target.value;
                              setIntakeSections(newSections);
                            }}
                            className="flex-1 px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Managing Director: Syed Imon Rizvi, PMP® · Pakistan (Global Remote Operations) · FBR NTN: 6622762
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider border border-blue-200">
                        Certified PMP® SLA Gated
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-2">REF: MM-SOW-01</p>
                    </div>
                  </div>

                  {profile.clientCompany && (
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-slate-800">
                      PREPARED EXCLUSIVELY FOR: {profile.clientCompany} {profile.clientName ? `· Attn: ${profile.clientName}` : ""}
                    </div>
                  )}

                  <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200 text-blue-950">
                    <strong className="block text-xs uppercase font-bold text-blue-900 mb-1">
                      Objective
                    </strong>
                    Complete all raw asset ingestion in under 45 minutes with zero operational homework or meeting fatigue.
                  </div>

                  {intakeSections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                        {sec.title}
                      </h4>
                      <div className="space-y-1.5">
                        {sec.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50"
                          >
                            <div className="w-4 h-4 border-2 border-slate-800 rounded mt-0.5 flex-shrink-0" />
                            <div className="text-slate-800 text-[11px] leading-snug">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex justify-between items-center text-[11px] font-bold">
                    <span>STATUS: <strong className="text-blue-700">SCOPE VERIFIED</strong></span>
                    <span className="text-emerald-700">PMP® 14-DAY SPRINT ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Curriculum Blueprint */}
          {activeTab === "curriculum" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Curriculum Editor */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                      Module Architecture (5 Modules)
                    </h3>
                    <button
                      onClick={() => setModules(DEFAULT_MODULES)}
                      className="text-slate-400 hover:text-slate-200 text-[11px] underline"
                    >
                      Reset Default Modules
                    </button>
                  </div>

                  <div className="space-y-3">
                    {modules.map((mod, idx) => (
                      <div key={mod.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-400">Module #{idx + 1}</span>
                          <input
                            type="text"
                            value={mod.duration}
                            onChange={(e) => {
                              const newMods = [...modules];
                              newMods[idx].duration = e.target.value;
                              setModules(newMods);
                            }}
                            className="w-20 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-white font-mono text-[11px] text-right"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[10px] block">Title</label>
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => {
                              const newMods = [...modules];
                              newMods[idx].title = e.target.value;
                              setModules(newMods);
                            }}
                            className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[10px] block">Outcome</label>
                          <textarea
                            rows={2}
                            value={mod.outcome}
                            onChange={(e) => {
                              const newMods = [...modules];
                              newMods[idx].outcome = e.target.value;
                              setModules(newMods);
                            }}
                            className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Managing Director: Syed Imon Rizvi, PMP® · Pakistan (Global Remote Operations) · FBR NTN: 6622762
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider border border-blue-200">
                        Pedagogy Gate Certified
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-2">REF: MM-ARCH-02</p>
                    </div>
                  </div>

                  {profile.clientCompany && (
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-slate-800">
                      CURRICULUM BLUEPRINT PREPARED FOR: {profile.clientCompany}
                    </div>
                  )}

                  <div className="space-y-3">
                    {modules.map((mod, idx) => (
                      <div
                        key={mod.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Module {idx + 1}: {mod.title}</span>
                          <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[10px]">
                            {mod.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700"><strong>Core Outcome:</strong> {mod.outcome}</p>
                        <p className="text-[11px] text-slate-600"><strong>Verification Gate:</strong> {mod.gate}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center text-[10px] text-slate-600">
                    Bloom&rsquo;s Revised Taxonomy · Cognitive Retention Standard · Guaranteed Under-20-Min Client TTV
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Studio Style Guide */}
          {activeTab === "styleguide" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Studio Production Benchmarks
                  </h3>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Video Standards</label>
                    <textarea
                      rows={3}
                      value={styleVideoRes}
                      onChange={(e) => setStyleVideoRes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Audio Mastering Target</label>
                    <textarea
                      rows={3}
                      value={styleAudioSpec}
                      onChange={(e) => setStyleAudioSpec(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Right Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Managing Director: Syed Imon Rizvi, PMP® · Pakistan (Global Remote Operations) · FBR NTN: 6622762
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider border border-blue-200">
                        PMP® Quality Benchmarked
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-2">REF: MM-STD-03</p>
                    </div>
                  </div>

                  {profile.clientCompany && (
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-slate-800">
                      STUDIO PRODUCTION SPECIFICATIONS STYLED FOR: {profile.clientCompany}
                    </div>
                  )}

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      1. 4K Visual Capture &amp; Dynamic Zoom Standards
                    </h4>
                    <p className="text-slate-700 text-[11px]">{styleVideoRes}</p>
                    <p className="text-slate-600 text-[10px]">
                      Automated 1.25x – 1.4x focal zoom on critical UI actions · Synchronized animated kinetic subtitles.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      2. Studio Audio Mastering &amp; Voiceover
                    </h4>
                    <p className="text-slate-700 text-[11px]">{styleAudioSpec}</p>
                    <p className="text-slate-600 text-[10px]">
                      Calibrated direct-response cadence between 135 and 150 words per minute.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      3. Quality Assurance &amp; Milestone 1 Sign-Off Gate
                    </h4>
                    <p className="text-slate-700 text-[11px]">
                      PMP® peer review on Day 7 prototype. Full production proceeds only after formal client sign-off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: LMS Setup Specs */}
          {activeTab === "lms" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    LMS Destination &amp; Provisioning
                  </h3>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Supported Destinations</label>
                    <textarea
                      rows={3}
                      value={lmsPlatforms}
                      onChange={(e) => setLmsPlatforms(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Right Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Managing Director: Syed Imon Rizvi, PMP® · Pakistan (Global Remote Operations) · FBR NTN: 6622762
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider border border-blue-200">
                        Zero-IT Deployment
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-2">REF: MM-TECH-04</p>
                    </div>
                  </div>

                  {profile.clientCompany && (
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-slate-800">
                      LMS PROVISIONING ARCHITECTURE FOR: {profile.clientCompany}
                    </div>
                  )}

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      Target Hosting Platforms
                    </h4>
                    <p className="text-slate-700 text-[11px]">{lmsPlatforms}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      Streaming &amp; Access Controls
                    </h4>
                    <p className="text-slate-700 text-[11px]">
                      Adaptive bitrate streaming (HLS) with low-latency CDN · Role-based permissions (Super-Admin, Team Leads, Students).
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-blue-950 text-[11px]">
                    <strong>Zero IT Burden:</strong> All curriculum hierarchies, assets, and permissions configured turnkey by Mercer &amp; Mills prior to hand-off.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Go-Live & IP Transfer */}
          {activeTab === "golive" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-6 no-print">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Welcome Email &amp; IP Assignment
                  </h3>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Email Subject</label>
                    <input
                      type="text"
                      value={welcomeEmailSubject}
                      onChange={(e) => setWelcomeEmailSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Right Printable Sheet */}
              <div className="lg:col-span-7">
                <div
                  id="admin-printable-sheet"
                  className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                        Knowledge Operations &amp; Learning Architecture
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Managing Director: Syed Imon Rizvi, PMP® · Pakistan (Global Remote Operations) · FBR NTN: 6622762
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider border border-emerald-200">
                        Final SLA Sign-Off
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-2">REF: MM-REL-05</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong className="block text-xs uppercase font-bold text-emerald-900 mb-1">
                      100% Intellectual Property Assignment
                    </strong>
                    Upon settlement of Milestone 2, Mercer &amp; Mills permanently assigns 100% of worldwide copyrights, master 4K MP4s, scripts, and portal rights to <strong>{profile.clientCompany || "the Client"}</strong> as work-for-hire. Zero platform fees.
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                      Plug-and-Play Client Welcome Email
                    </h4>
                    <div className="font-mono text-[10.5px] bg-white p-3 rounded border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                      Subject: {welcomeEmailSubject}
                      {"\n\n"}
                      Hi {profile.clientName ? profile.clientName.split(" ")[0] : "[Customer Name]"},
                      {"\n\n"}
                      Welcome aboard! To ensure you get maximum value from our platform in under 20 minutes without any confusion, we have built a dedicated Onboarding Academy for your team:
                      {"\n\n"}
                      👉 Access Your Academy Here: [PORTAL_LINK]
                      {"\n\n"}
                      Complete the 5 bite-sized walkthrough modules, and you will be completely set up and ready to launch.
                      {"\n\n"}
                      Best regards,
                      {"\n"}
                      {profile.clientName || "[Signer Name]"} &amp; The {profile.clientCompany || "[Company Name]"} Team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 8: Client Dispatch Center */}
          {activeTab === "dispatch" && (
            <div className="space-y-6 no-print">
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-400" />
                    Personalized Client Dispatch Links
                  </h3>
                  <button
                    onClick={copyClientPacket}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/30"
                  >
                    <Copy className="w-4 h-4" />
                    Copy All Links &amp; Packet
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  These links are pre-parameterized with your active client profile ({profile.clientCompany || "Client Organization"}). When your client opens them on any browser, the document is already styled specifically for their entity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  {[
                    { name: "Day 1 Intake Checklist", file: "day-1-asset-checklist.html", ref: "MM-SOW-01" },
                    { name: "5-Module Curriculum Blueprint", file: "sample-curriculum-blueprint.html", ref: "MM-ARCH-02" },
                    { name: "Studio Style Guide & Standards", file: "studio-style-guide.html", ref: "MM-STD-03" },
                    { name: "LMS Architecture Specs", file: "portal-setup-specs.html", ref: "MM-TECH-04" },
                    { name: "Go-Live Launch Kit & IP", file: "go-live-launch-kit.html", ref: "MM-REL-05" },
                  ].map((doc, idx) => {
                    const url = getClientDownloadUrl(doc.file);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{doc.name}</span>
                            <span className="text-[10px] text-blue-400 font-mono bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900">
                              {doc.ref}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate font-mono">{url}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              notifyCopied(`Copied ${doc.name} Link!`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                          >
                            Copy Link
                          </button>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
