import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Printer,
  Copy,
  Check,
  FileCheck,
  ShieldCheck,
  Building2,
  Calendar,
  ExternalLink,
  ArrowLeft,
  FileText,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useClientProfile } from "@/hooks/useClientProfile";

export default function AgreementGenerator() {
  const { profile, updateProfile, resetProfile } = useClientProfile();

  const agreementId = profile.agreementId;
  const effectiveDate = profile.effectiveDate;
  const clientName = profile.clientName;
  const clientTitle = profile.clientTitle;
  const clientCompany = profile.clientCompany;
  const clientCountry = profile.clientCountry;
  const packageType = profile.packageType;
  const totalInvestment = profile.totalInvestment;
  const depositAmount = profile.depositAmount;

  const [copied, setCopied] = useState(false);

  const agreementRef = useRef<HTMLDivElement>(null);

  const handlePackageChange = (type: "turnkey" | "blueprint" | "care") => {
    if (type === "turnkey") {
      updateProfile({ packageType: type, totalInvestment: 3500, depositAmount: 1750 });
    } else if (type === "blueprint") {
      updateProfile({ packageType: type, totalInvestment: 750, depositAmount: 750 });
    } else {
      updateProfile({ packageType: type, totalInvestment: 1500, depositAmount: 1500 });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copyAgreementText = () => {
    const text = `
MERCER & MILLS KNOWLEDGE OPERATIONS
MUTUAL NON-DISCLOSURE & 14-DAY SPRINT MASTER SERVICES AGREEMENT
Agreement Ref: ${agreementId}
Effective Date: ${effectiveDate}

PARTIES:
1. PROVIDER: Mercer & Mills Knowledge Operations (Pakistan / Global Remote Operations · FBR NTN: 6622762), led by Syed Imon Rizvi, PMP®.
2. CLIENT: ${clientCompany || "[Client Company]"}, represented by ${clientName || "[Client Representative]"} (${clientTitle}), ${clientCountry}.

ENGAGEMENT SCOPE & DELIVERABLES:
Package: ${packageType === "turnkey" ? "14-Day Turnkey Client Academy Sprint" : packageType === "blueprint" ? "3-Day Architecture Blueprint Sprint" : "Monthly Academy Care Retainer"}
Total Project Investment: $${totalInvestment.toLocaleString()} USD
- Milestone 1 (50% Upfront Deposit): $${depositAmount.toLocaleString()} USD (Due upon execution to lock production calendar)
- Milestone 2 (50% Final Balance): $${(totalInvestment - depositAmount).toLocaleString()} USD (Due on Day 14 upon portal deployment & sign-off)

TERMS & CONDITIONS:
1. PMP® 14-DAY DELIVERY SERVICE LEVEL AGREEMENT (SLA):
Execution is governed under certified Project Management Professional (PMP®) agile standards. Delivery is guaranteed within 14 business days from kickoff, backed by 48-hour milestone review turnarounds.

2. 50/50 MILESTONE PAYMENT STRUCTURE:
Work initiates upon receipt of the 50% Milestone 1 deposit. Final portal staging deployment, admin access, and source file delivery occur upon receipt of the Milestone 2 balance.

3. ENTERPRISE AI DATA PRIVACY & ZERO-DATA RETENTION:
All client documentation, Loom recordings, system architectures, and internal SOPs remain strictly confidential. Provider operates exclusively within zero-data-retention enterprise AI environments; client data is NEVER retained, logged, or utilized to train public or private AI models.

4. 100% INTELLECTUAL PROPERTY TRANSFER:
All video masters (4K), scripts, pedagogical frameworks, LMS portal instances, and action checklists transfer 100% permanently to Client as work-for-hire upon final milestone settlement. Zero recurring platform licensing fees.

AGREED & ACCEPTED:
For Mercer & Mills:
Syed Imon Rizvi, PMP®
Managing Director & Lead Knowledge Architect
Corporate NTN: 6622762 | Email: syedimonrizvipmp@gmail.com

For Client:
Authorized Signature: _______________________
Name: ${clientName || "_______________________"}
Title: ${clientTitle || "_______________________"}
Company: ${clientCompany || "_______________________"}
Date: _______________________
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Helmet>
        <title>Sprint Agreement &amp; Mutual NDA Generator | Mercer &amp; Mills</title>
        <meta
          name="description"
          content="Generate executive 14-Day Sprint Agreements and Mutual NDAs for Mercer &amp; Mills Knowledge Operations clients."
        />
      </Helmet>

      {/* Print-Only CSS to produce a flawless, clean PDF */}
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
          #printable-agreement {
            position: relative !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 12px !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#080C14] text-slate-100 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 no-print">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to="/invoice-generator"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> Go to Invoice Engine
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  to="/financial-center"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Financial Center
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-3">
                <FileCheck className="w-7 h-7 text-blue-500" />
                Agreement &amp; Mutual NDA Generator
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Generate an executive 1-page Sprint Contract and Mutual NDA ready for SignWell, PandaDoc, or direct PDF signing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/downloads/sprint-agreement-nda.pdf"
                download="Mercer-Mills-Sprint-Agreement-NDA.pdf"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
              >
                <Download className="w-4 h-4" />
                1-Click Download Official PDF
              </a>
              <button
                onClick={copyAgreementText}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied Agreement!" : "Copy Agreement Text"}
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-2 transition-all shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Browser Print (Optional)
              </button>
            </div>
          </div>

          {/* Form + Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6 no-print">
              {/* Sprint Selector */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
                <label className="text-xs uppercase font-semibold text-blue-400 tracking-wider block">
                  Select Sprint Scope
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => handlePackageChange("turnkey")}
                    className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                      packageType === "turnkey"
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    14-Day Sprint
                    <span className="block text-[11px] text-blue-400 mt-1 font-mono">$3,500</span>
                  </button>
                  <button
                    onClick={() => handlePackageChange("blueprint")}
                    className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                      packageType === "blueprint"
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Blueprint
                    <span className="block text-[11px] text-blue-400 mt-1 font-mono">$750</span>
                  </button>
                  <button
                    onClick={() => handlePackageChange("care")}
                    className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                      packageType === "care"
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Care Retainer
                    <span className="block text-[11px] text-blue-400 mt-1 font-mono">$1,500/mo</span>
                  </button>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Client &amp; Signer Details
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Synced
                    </span>
                    <button
                      onClick={resetProfile}
                      className="text-[10px] text-slate-400 hover:text-slate-200 underline"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Client Company / Entity</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Health Technologies LLC"
                    value={clientCompany}
                    onChange={(e) => updateProfile({ clientCompany: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Authorized Signer</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={clientName}
                      onChange={(e) => updateProfile({ clientName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Signer Title</label>
                    <input
                      type="text"
                      value={clientTitle}
                      onChange={(e) => updateProfile({ clientTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Jurisdiction / Country</label>
                    <input
                      type="text"
                      value={clientCountry}
                      onChange={(e) => updateProfile({ clientCountry: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Effective Date</label>
                    <input
                      type="date"
                      value={effectiveDate}
                      onChange={(e) => updateProfile({ effectiveDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Direct E-Sign Links */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3 text-xs">
                <span className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  E-Signature Dispatch Shortcuts
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  After saving your PDF above, send it to the client through your preferred platform:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href="https://www.signwell.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Open SignWell (Free) <ExternalLink className="w-3 h-3 text-blue-400" />
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

            {/* Right Live Agreement Sheet (7 cols) - Ready for Print/PDF */}
            <div className="lg:col-span-7">
              <div
                id="printable-agreement"
                ref={agreementRef}
                className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-6 font-sans text-xs leading-relaxed"
              >
                {/* Header */}
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
                    <p className="text-[11px] text-slate-500 font-mono mt-1">Ref: {agreementId}</p>
                    <p className="text-[11px] text-slate-600">Effective Date: {effectiveDate}</p>
                  </div>
                </div>

                {/* Parties */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <p>
                    This Agreement is entered into between <strong>Mercer &amp; Mills Knowledge Operations</strong> (&ldquo;Provider&rdquo;, registered entity in <strong>Pakistan</strong> under FBR NTN 6622762, Global Remote Delivery Hub) and{" "}
                    <strong>{clientCompany || "[Client Company Name]"}</strong> (&ldquo;Client&rdquo;), represented by{" "}
                    <strong>{clientName || "[Signer Name]"}</strong>, {clientTitle} ({clientCountry}).
                  </p>
                </div>

                {/* Sections */}
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
                      Total fixed sprint investment: <strong>${totalInvestment.toLocaleString()} USD</strong>.
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-600">
                      <li>
                        <strong>Milestone 1 (50% Upfront Deposit): ${depositAmount.toLocaleString()} USD</strong> due upon signing to lock production calendar, initiate Discovery Intake, and begin curriculum scoping.
                      </li>
                      <li>
                        <strong>Milestone 2 (50% Final Balance): ${(totalInvestment - depositAmount).toLocaleString()} USD</strong> due on Day 14 upon live portal staging review and prior to final credential transfer.
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

                {/* Signature Blocks */}
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
                      <p><strong>Date:</strong> {effectiveDate}</p>
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
                      <p><strong>Name:</strong> {clientName || "_______________________"}</p>
                      <p><strong>Title:</strong> {clientTitle || "_______________________"}</p>
                      <p><strong>Company:</strong> {clientCompany || "_______________________"}</p>
                      <p><strong>Date:</strong> _______________________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
