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
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Layers,
  Download,
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

export interface RegistryDoc {
  id: ActiveTab;
  code: string;
  day: string;
  label: string;
  title: string;
  pdf: string;
  filename: string;
  html: string;
  badge: string;
  icon: typeof FileText;
}

export const DOC_REGISTRY: RegistryDoc[] = [
  {
    id: "invoice",
    code: "MM-INV",
    day: "Day 0",
    label: "1. Commercial Invoice",
    title: "Commercial Sprint Invoice (Milestone 1 Deposit)",
    pdf: "/downloads/commercial-invoice.pdf",
    filename: "Mercer-Mills-Commercial-Invoice-MM-INV-2025-001.pdf",
    html: "/downloads/commercial-invoice.html",
    badge: "Commercial",
    icon: FileText,
  },
  {
    id: "agreement",
    code: "MM-AGR",
    day: "Day 0",
    label: "2. Sprint Agreement & NDA",
    title: "Sprint Master Agreement & Mutual NDA",
    pdf: "/downloads/sprint-agreement-nda.pdf",
    filename: "Mercer-Mills-Sprint-Agreement-NDA.pdf",
    html: "/downloads/sprint-agreement-nda.html",
    badge: "Legal SLA",
    icon: FileCheck,
  },
  {
    id: "intake",
    code: "MM-SOW-01",
    day: "Day 1",
    label: "3. Day 1 Intake Checklist",
    title: "Day 1 Client Intake & Asset Vault Checklist",
    pdf: "/downloads/day-1-asset-checklist.pdf",
    filename: "Day-1-Asset-Checklist-Mercer-Mills.pdf",
    html: "/downloads/day-1-asset-checklist.html",
    badge: "Asset Vault",
    icon: ListChecks,
  },
  {
    id: "curriculum",
    code: "MM-SOW-02",
    day: "Day 4",
    label: "4. Curriculum Blueprint",
    title: "Friction Audit & 5-Module Curriculum Blueprint",
    pdf: "/downloads/sample-curriculum-blueprint.pdf",
    filename: "Sample-Curriculum-Blueprint-Mercer-Mills.pdf",
    html: "/downloads/sample-curriculum-blueprint.html",
    badge: "Instructional Map",
    icon: Compass,
  },
  {
    id: "styleguide",
    code: "MM-SOW-03",
    day: "Day 7",
    label: "5. Studio Style Guide",
    title: "Studio Style Guide & AV Standards",
    pdf: "/downloads/studio-style-guide.pdf",
    filename: "Studio-Style-Guide-Mercer-Mills.pdf",
    html: "/downloads/studio-style-guide.html",
    badge: "4K Audiovisual",
    icon: Palette,
  },
  {
    id: "lms",
    code: "MM-SOW-04",
    day: "Day 10",
    label: "6. LMS Architecture Specs",
    title: "LMS Architecture & Platform Specs",
    pdf: "/downloads/portal-setup-specs.pdf",
    filename: "Portal-Setup-Specs-Mercer-Mills.pdf",
    html: "/downloads/portal-setup-specs.html",
    badge: "Platform Specs",
    icon: Server,
  },
  {
    id: "golive",
    code: "MM-SOW-05",
    day: "Day 14",
    label: "7. Go-Live & IP Transfer",
    title: "Go-Live Launch Kit & 100% IP Transfer",
    pdf: "/downloads/go-live-launch-kit.pdf",
    filename: "Go-Live-Launch-Kit-Mercer-Mills.pdf",
    html: "/downloads/go-live-launch-kit.html",
    badge: "IP Transfer",
    icon: Rocket,
  },
  {
    id: "dispatch",
    code: "MM-DISPATCH",
    day: "Dispatch",
    label: "8. Client Dispatch Center",
    title: "Master Client Dispatch & Kickoff Packet",
    pdf: "/downloads/client-dispatch-packet.pdf",
    filename: "Master-Dispatch-Packet-Mercer-Mills.pdf",
    html: "/downloads/client-dispatch-packet.html",
    badge: "Master Suite",
    icon: Send,
  },
];

interface PhaseGuideProps {
  phaseNumber: string;
  phaseName: string;
  stepNumber: number;
  totalSteps?: number;
  dayBadge: string;
  docCode: string;
  title: string;
  whenToSend: string;
  whyItMatters: string;
  sopSteps: string[];
  nextTabId?: ActiveTab;
  nextTabLabel?: string;
  onNavigateNext?: (tab: ActiveTab) => void;
}

function PhaseGuideBanner({
  phaseNumber,
  phaseName,
  stepNumber,
  totalSteps = 7,
  dayBadge,
  docCode,
  title,
  whenToSend,
  whyItMatters,
  sopSteps,
  nextTabId,
  nextTabLabel,
  onNavigateNext,
}: PhaseGuideProps) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#0F172A] to-slate-900/60 p-5 space-y-4 no-print shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
            {phaseNumber}: {phaseName}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            TIMING: {dayBadge}
          </span>
          <span className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {docCode}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Workflow Step {stepNumber} of {totalSteps}
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Dispatch Playbook: {title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> When to Send &amp; Trigger Event:
            </span>
            <p className="text-slate-300 leading-relaxed">{whenToSend}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Strategic Rationale &amp; Value:
            </span>
            <p className="text-slate-300 leading-relaxed">{whyItMatters}</p>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
        <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Standard Operating Procedure (SOP) Action Steps:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {sopSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-300 text-[11px] leading-tight">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {nextTabId && onNavigateNext && (
        <div className="flex justify-end pt-1">
          <button
            onClick={() => onNavigateNext(nextTabId)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            Next Step in Sequence: {nextTabLabel || "Next Doc"} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

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
            size: A4 portrait;
            margin: 8mm 10mm;
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
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 12px !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            page-break-inside: avoid;
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
              <a
                href={DOC_REGISTRY.find((d) => d.id === activeTab)?.pdf || "/downloads/commercial-invoice.pdf"}
                download={DOC_REGISTRY.find((d) => d.id === activeTab)?.filename || "Mercer-Mills-Document.pdf"}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
                title="Download pristine formatted PDF directly without browser print"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                1-Click Download Current PDF
              </a>
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
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-700"
              >
                <Printer className="w-4 h-4" />
                Print View
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

          {/* Master 4-Stage Sprint Lifecycle Stepper Bar */}
          <div className="rounded-2xl bg-[#0B1120] border border-slate-800 p-4 no-print space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Chronological Client Onboarding Lifecycle (14-Day PMP® Agile SLA)
              </span>
              <span className="text-[11px] text-slate-400">
                Click any phase to jump to its corresponding operational documents
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                {
                  stage: "Phase 1: Day 0",
                  name: "Commercial & Legal Lock",
                  sub: "Deposit Invoice & Mutual NDA",
                  targetTab: "invoice" as ActiveTab,
                  active: activeTab === "invoice" || activeTab === "agreement",
                },
                {
                  stage: "Phase 2: Day 1",
                  name: "Asset Vault Ingestion",
                  sub: "45-Min SOP & Video Intake",
                  targetTab: "intake" as ActiveTab,
                  active: activeTab === "intake",
                },
                {
                  stage: "Phase 3: Days 4–7",
                  name: "Pedagogy & Style QA",
                  sub: "5-Module Map & 4K Style Guide",
                  targetTab: "curriculum" as ActiveTab,
                  active: activeTab === "curriculum" || activeTab === "styleguide",
                },
                {
                  stage: "Phase 4: Days 10–14",
                  name: "Go-Live & IP Handoff",
                  sub: "LMS Staging & 100% IP Transfer",
                  targetTab: "lms" as ActiveTab,
                  active: activeTab === "lms" || activeTab === "golive",
                },
              ].map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabChange(phase.targetTab)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    phase.active
                      ? "bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono uppercase text-blue-400">
                      {phase.stage}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        phase.active ? "bg-blue-400 animate-pulse" : "bg-slate-700"
                      }`}
                    />
                  </div>
                  <p className="font-bold text-white text-xs mt-1 truncate">{phase.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{phase.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Master 1-Click Document & Checklist Download Center */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-[#0F172A] to-slate-900/60 p-5 space-y-4 no-print shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Master 1-Click Document &amp; Checklist Download Center</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                      8 Official Documents
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Download pristine vector PDFs instantly without browser print distortion, or view full interactive HTML blueprints.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {DOC_REGISTRY.map((doc) => {
                const isCurrent = activeTab === doc.id;
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? "bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-950/30"
                        : "bg-[#0A0E1A]/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700">
                          {doc.day}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                          {doc.code}
                        </span>
                      </div>
                      <div className="font-bold text-white text-xs flex items-center gap-1.5 pt-1">
                        <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={doc.pdf}
                        download={doc.filename}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all"
                        title={`Download ${doc.title} as PDF`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                      <a
                        href={doc.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Open Interactive HTML Blueprint"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => handleTabChange(doc.id)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800/60 hover:bg-blue-600/30 text-slate-400 hover:text-blue-300 border border-slate-800 text-[11px] transition-colors"
                        title="Edit in Workspace"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-print">
            {[
              { id: "invoice", label: "1. Commercial Invoice", day: "Day 0", icon: FileText },
              { id: "agreement", label: "2. Sprint Agreement & NDA", day: "Day 0", icon: FileCheck },
              { id: "intake", label: "3. Day 1 Intake Checklist", day: "Day 1", icon: ListChecks },
              { id: "curriculum", label: "4. Curriculum Blueprint", day: "Day 4", icon: Compass },
              { id: "styleguide", label: "5. Studio Style Guide", day: "Day 7", icon: Palette },
              { id: "lms", label: "6. LMS Architecture Specs", day: "Day 10", icon: Server },
              { id: "golive", label: "7. Go-Live & IP Transfer", day: "Day 14", icon: Rocket },
              { id: "dispatch", label: "8. Client Dispatch Center", day: "Dispatch", icon: Send },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ActiveTab)}
                  className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-[#0F172A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-800 text-amber-400"
                    }`}
                  >
                    {tab.day}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Commercial Invoice */}
          {activeTab === "invoice" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 1"
                phaseName="Commercial &amp; Legal Governance"
                stepNumber={1}
                totalSteps={7}
                dayBadge="Day 0 (Pre-Kickoff)"
                docCode="MM-INV"
                title="Milestone 1 Upfront Deposit Invoice (50%)"
                whenToSend="Send immediately upon verbal agreement or initial discovery call before scheduling the production kickoff."
                whyItMatters="Locks the 14-day production calendar, reserves studio engineering resources, and enforces 50/50 payment milestone terms."
                sopSteps={[
                  "Verify client corporate billing name and authorized contact email in the Master Profile banner above.",
                  "Select sprint preset ($3,500 Turnkey / $750 Blueprint / $1,500 Retainer) or add custom line items.",
                  "Click 'Print Current Doc as PDF' or copy direct bank wire / Wise instructions to dispatch to client.",
                ]}
                nextTabId="agreement"
                nextTabLabel="2. Sprint Agreement &amp; NDA"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-INV · Commercial Sprint Invoice
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/commercial-invoice.pdf"
                      download="Mercer-Mills-Commercial-Invoice-MM-INV-2025-001.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/commercial-invoice.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 2: Sprint Agreement & NDA */}
          {activeTab === "agreement" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 1"
                phaseName="Commercial &amp; Legal Governance"
                stepNumber={2}
                totalSteps={7}
                dayBadge="Day 0 (Pre-Kickoff)"
                docCode="MM-AGR"
                title="Master Services Agreement &amp; Mutual NDA"
                whenToSend="Send alongside the Commercial Invoice before receiving any proprietary client SOPs or demo videos."
                whyItMatters="Legally binds the PMP® 14-day delivery SLA, establishes Enterprise Zero-Retention AI Data Privacy, and guarantees 100% IP transfer upon Milestone 2."
                sopSteps={[
                  "Confirm Effective Date and signer credentials in the Master Profile above.",
                  "Click 'Open SignWell' or 'Open PandaDoc' to dispatch for instant binding e-signature.",
                  "Verify dual signature receipt prior to releasing Day 1 Ingestion Cloud Vault access.",
                ]}
                nextTabId="intake"
                nextTabLabel="3. Day 1 Intake Checklist"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-AGR · Sprint Master Agreement &amp; Mutual NDA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/sprint-agreement-nda.pdf"
                      download="Mercer-Mills-Sprint-Agreement-NDA.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/sprint-agreement-nda.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 3: Day 1 Intake Checklist */}
          {activeTab === "intake" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 2"
                phaseName="Asset Vault Ingestion"
                stepNumber={3}
                totalSteps={7}
                dayBadge="Day 1 (Sprint Kickoff)"
                docCode="MM-SOW-01"
                title="Day 1 Client Intake &amp; Asset Vault Checklist"
                whenToSend="Send on Day 1 immediately after Milestone 1 deposit confirmation."
                whyItMatters="Eliminates meeting fatigue and homework for the client by providing a simple 45-minute checklist to upload unedited demo recordings, raw SOPs, and brand assets."
                sopSteps={[
                  "Share client cloud vault links (/01_Documentation, /02_Recordings, /03_Branding).",
                  "Customize any client-specific credential requirements in the checklist editor.",
                  "Verify client staging access (dummy test account) before beginning curriculum scoping on Day 2.",
                ]}
                nextTabId="curriculum"
                nextTabLabel="4. Curriculum Blueprint"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-SOW-01 · Day 1 Intake &amp; Asset Vault Checklist
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/day-1-asset-checklist.pdf"
                      download="Day-1-Asset-Checklist-Mercer-Mills.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/day-1-asset-checklist.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 4: Curriculum Blueprint */}
          {activeTab === "curriculum" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 3"
                phaseName="Pedagogy &amp; Production QA"
                stepNumber={4}
                totalSteps={7}
                dayBadge="Day 4 (Mid-Sprint Alignment)"
                docCode="MM-ARCH-02"
                title="5-Module Curriculum Architecture Blueprint"
                whenToSend="Send on Day 4 after ingesting client SOPs and prior to 4K video recording."
                whyItMatters="Aligns stakeholders on learning outcomes, under-20-minute client Time-to-Value (TTV), and cognitive retention gates, preventing production rework."
                sopSteps={[
                  "Review raw Loom demos and refine the 5 module titles, durations, and outcomes.",
                  "Obtain written or asynchronous client sign-off on the curriculum sequence.",
                  "Lock module scripts into production queue for Day 5–7 video capture.",
                ]}
                nextTabId="styleguide"
                nextTabLabel="5. Studio Style Guide"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-SOW-02 · Curriculum &amp; Pedagogy Blueprint
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/sample-curriculum-blueprint.pdf"
                      download="Sample-Curriculum-Blueprint-Mercer-Mills.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/sample-curriculum-blueprint.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Studio Style Guide */}
          {activeTab === "styleguide" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 3"
                phaseName="Pedagogy &amp; Production QA"
                stepNumber={5}
                totalSteps={7}
                dayBadge="Day 7 (Production Benchmark)"
                docCode="MM-STD-03"
                title="Studio Production Style Guide &amp; Standards"
                whenToSend="Send on Day 7 alongside the initial prototype preview video."
                whyItMatters="Proves studio benchmarks: Native 4K UHD 60 FPS, dynamic 1.4x UI zoom, -14.0 LUFS audio mastering, and PMP® peer review criteria."
                sopSteps={[
                  "Deliver Module 1 prototype video with this style guide attached.",
                  "Confirm client audio/visual sign-off within 48 hours.",
                  "Proceed with full batch rendering of Modules 2 through 5.",
                ]}
                nextTabId="lms"
                nextTabLabel="6. LMS Architecture Specs"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-SOW-03 · Studio Style Guide &amp; AV Standards
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/studio-style-guide.pdf"
                      download="Studio-Style-Guide-Mercer-Mills.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/studio-style-guide.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 6: LMS Setup Specs */}
          {activeTab === "lms" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 4"
                phaseName="Staging, Go-Live &amp; IP Hand-Off"
                stepNumber={6}
                totalSteps={7}
                dayBadge="Day 10 (Portal Staging)"
                docCode="MM-TECH-04"
                title="Turnkey LMS Architecture &amp; Provisioning Specs"
                whenToSend="Send on Day 10 during the portal staging review."
                whyItMatters="Confirms zero-IT LMS setup (Notion, Skool, Kajabi, Teachable, or custom HLS embeds) and validates team permission hierarchies."
                sopSteps={[
                  "Deploy staged client academy portal in live preview environment.",
                  "Verify responsive video playback, companion PDF checklists, and completion gates.",
                  "Dispatch staging link to client authorized lead for final walkthrough.",
                ]}
                nextTabId="golive"
                nextTabLabel="7. Go-Live &amp; IP Transfer"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-TECH-04 · LMS Architecture &amp; Platform Specs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/portal-setup-specs.pdf"
                      download="Portal-Setup-Specs-Mercer-Mills.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/portal-setup-specs.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 7: Go-Live & IP Transfer */}
          {activeTab === "golive" && (
            <div className="space-y-6">
              <PhaseGuideBanner
                phaseNumber="PHASE 4"
                phaseName="Staging, Go-Live &amp; IP Hand-Off"
                stepNumber={7}
                totalSteps={7}
                dayBadge="Day 14 (Final Hand-Off)"
                docCode="MM-REL-05"
                title="Go-Live Launch Kit &amp; 100% IP Assignment"
                whenToSend="Send on Day 14 upon receipt of the 50% Milestone 2 final balance."
                whyItMatters="Permanently transfers 100% copyright ownership of all video master files, scripts, and portal assets as work-for-hire, with plug-and-play welcome emails for client users."
                sopSteps={[
                  "Confirm settlement of Milestone 2 balance in UBL or Wise account.",
                  "Transfer super-admin credentials of the live academy portal to client.",
                  "Deliver master 4K MP4 vault links and release final SLA sign-off certificate.",
                ]}
                nextTabId="dispatch"
                nextTabLabel="8. Client Dispatch Center"
                onNavigateNext={handleTabChange}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4 no-print shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      MM-SOW-05 · Go-Live, IP Transfer &amp; Launch Kit
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/go-live-launch-kit.pdf"
                      download="Go-Live-Launch-Kit-Mercer-Mills.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      1-Click Download PDF
                    </a>
                    <a
                      href="/downloads/go-live-launch-kit.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HTML View
                    </a>
                  </div>
                </div>

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
          </div>
        )}

          {/* Tab 8: Client Dispatch Center */}
          {activeTab === "dispatch" && (
            <div className="space-y-6 no-print">
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#0F172A] to-slate-900/60 p-5 space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                    MASTER DISPATCH HUB
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    READY FOR IMMEDIATE DISPATCH
                  </span>
                </div>
                <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-blue-400" />
                  Client Communications &amp; Deliverable Dispatch Hub
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use this center to generate pre-filled client URLs or copy the formatted email packet ready for Gmail or Slack. Any team member or backup admin can dispatch the full package in 5 seconds without manual link construction.
                </p>
              </div>

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
                  {DOC_REGISTRY.map((doc) => {
                    const url = `${window.location.origin}${doc.html}`;
                    return (
                      <div
                        key={doc.id}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="font-bold text-white flex items-center justify-between gap-2">
                            <span className="truncate">{doc.title}</span>
                            <span className="text-[10px] text-blue-400 font-mono bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900 flex-shrink-0">
                              {doc.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate font-mono">{url}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={doc.pdf}
                            download={doc.filename}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                            title={`Download ${doc.title} as PDF`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>1-Click PDF</span>
                          </a>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              notifyCopied(`Copied ${doc.label} Link!`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                          >
                            Copy Link
                          </button>
                          <a
                            href={doc.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                            title="Open Interactive HTML"
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
