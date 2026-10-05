import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Printer,
  Copy,
  Check,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  Landmark,
  ShieldCheck,
  Send,
  Plus,
  Trash2,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const PRESET_PACKAGES = [
  {
    name: "Turnkey Academy Sprint — 50% Milestone 1 Deposit",
    description:
      "Milestone 1 (50% upfront deposit): 14-Day Turnkey Client Academy Sprint. Includes Discovery Intake, curriculum architecture, 4K screen production, interactive checklists, and PMP® daily sprint tracking.",
    amount: 1750,
  },
  {
    name: "Turnkey Academy Sprint — 50% Milestone 2 Delivery",
    description:
      "Milestone 2 (50% final balance): Final delivery, portal deployment (Skool/Notion/custom LMS), automated welcome email templates, and complete IP & source file transfer.",
    amount: 1750,
  },
  {
    name: "Turnkey Academy Sprint — 100% Full Payment",
    description:
      "Complete 14-Day Turnkey Client Academy Sprint paid in full upfront. Includes all deliverables, video production, LMS portal handoff, and 30-day post-launch support.",
    amount: 3500,
  },
  {
    name: "Onboarding Architecture Blueprint Sprint",
    description:
      "3-Day Architecture Sprint: Complete curriculum matrix, workflow friction audit, LMS platform recommendation, and ready-to-record module scripts.",
    amount: 750,
  },
  {
    name: "Academy Care & Knowledge Optimization (Monthly)",
    description:
      "Monthly Knowledge Operations Retainer: Ongoing curriculum updates, learner analytics review, monthly new video module addition, and LMS maintenance.",
    amount: 1500,
  },
];

export default function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState(
    () => `MM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });

  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCountry, setClientCountry] = useState("United States");
  const [currency] = useState("USD ($)");

  const [items, setItems] = useState<LineItem[]>([
    {
      id: "1",
      description: PRESET_PACKAGES[0].description,
      quantity: 1,
      rate: PRESET_PACKAGES[0].amount,
    },
  ]);

  const [includePayoneerSlot, setIncludePayoneerSlot] = useState(false);
  const [payoneerUrl, setPayoneerUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.rate, 0);

  const handlePresetSelect = (preset: (typeof PRESET_PACKAGES)[0]) => {
    setItems([
      {
        id: Date.now().toString(),
        description: preset.description,
        quantity: 1,
        rate: preset.amount,
      },
    ]);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: "Custom Knowledge Operations Sprint Service",
        quantity: 1,
        rate: 500,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, val: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const copyInvoiceText = () => {
    const text = `
=========================================
INVOICE: ${invoiceNumber}
MERCER & MILLS KNOWLEDGE OPERATIONS
FBR NTN: 6622762 (IRIS Verified)
Date: ${issueDate} | Due Date: ${dueDate}
=========================================
BILLED TO:
Client: ${clientName || "Valued Client"}
Company: ${clientCompany || "Client Organization"}
Email: ${clientEmail || "billing@client.com"}
Country: ${clientCountry}

ITEMS:
${items.map((it, i) => `${i + 1}. ${it.description} | Qty: ${it.quantity} | $${it.rate.toLocaleString()} USD`).join("\n")}

TOTAL DUE: $${subtotal.toLocaleString()} USD

PAYMENT INSTRUCTIONS (Direct Bank Deposit):
Beneficiary Name: Syed Imon Rizvi
Bank: United Bank Limited (UBL)
IBAN: PK22UNIL0109000297908151
SWIFT/BIC Code: UNILPKKA
Country: Pakistan

FAST INTERNATIONAL TRANSFER (Wise / Remitly / WorldRemit):
1. Send to: Syed Imon Rizvi
2. Select Bank: United Bank Limited (UBL)
3. Enter IBAN: PK22UNIL0109000297908151
Instant settlement with zero wire fees.

Corporate Contact:
Email: syedimonrizvipmp@gmail.com
Direct Desk: +1 (530) 423-5158 | +92 330 365 8220
=========================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Helmet>
        <title>Invoice Generator | Mercer &amp; Mills Knowledge Operations</title>
        <meta
          name="description"
          content="Generate and print executive B2B client invoices with direct banking and international payment settlement."
        />
      </Helmet>

      {/* Print-Only CSS to produce a flawless, clean PDF */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#080C14] text-slate-100 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back & Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 no-print">
            <div>
              <Link
                to="/financial-center"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Financial Center
              </Link>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-3">
                <FileText className="w-7 h-7 text-blue-500" />
                Executive Invoice Engine
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Generate, customize, and print official client invoices with FBR NTN registration and direct bank wire instructions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyInvoiceText}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied Text!" : "Copy Invoice Details"}
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* 2-Column Layout: Controls (Left) and Live A4 Invoice Sheet (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6 no-print">
              {/* Presets */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
                <label className="text-xs uppercase font-semibold text-blue-400 tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Quick Sprint Presets
                </label>
                <div className="space-y-2">
                  {PRESET_PACKAGES.map((pkg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(pkg)}
                      className="w-full text-left p-3 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all flex items-center justify-between text-xs group"
                    >
                      <span className="font-medium text-slate-300 group-hover:text-white">
                        {pkg.name}
                      </span>
                      <span className="font-bold text-blue-400 font-mono ml-2">
                        ${pkg.amount.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Invoice Meta */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                  Invoice Metadata
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Invoice #</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Currency</label>
                    <input
                      type="text"
                      disabled
                      value={currency}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 font-mono cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Issue Date</label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3 text-xs">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                  Client Details
                </h3>
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Client Organization / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Health Technologies"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Email</label>
                    <input
                      type="email"
                      placeholder="alex@acme.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium mb-1 block">Country / Region</label>
                    <input
                      type="text"
                      placeholder="United States"
                      value={clientCountry}
                      onChange={(e) => setClientCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items Manager */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                    Line Items
                  </h3>
                  <button
                    onClick={addItem}
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-400">Item #{index + 1}</span>
                        {items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
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
                              updateItem(item.id, "quantity", parseInt(e.target.value) || 1)
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
                              updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payoneer Link Slot (Optional) */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Payoneer Payment Link (Optional)
                  </label>
                  <input
                    type="checkbox"
                    checked={includePayoneerSlot}
                    onChange={(e) => setIncludePayoneerSlot(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
                {includePayoneerSlot && (
                  <div className="pt-2">
                    <label className="text-slate-400 mb-1 block">Payment URL / Checkout Link</label>
                    <input
                      type="url"
                      placeholder="https://payoneer.com/pay/your-link"
                      value={payoneerUrl}
                      onChange={(e) => setPayoneerUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      When your Payoneer Business Account is active, paste your payment request URL here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Live Invoice Sheet (7 cols) - Ready for Print/PDF */}
            <div className="lg:col-span-7">
              <div
                id="printable-invoice"
                ref={invoiceRef}
                className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-8 font-sans"
              >
                {/* Invoice Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-serif font-black tracking-tight text-slate-900">
                        Mercer <span className="text-blue-600">&amp;</span> Mills
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mt-1">
                      Knowledge Operations &amp; Learning Architecture
                    </p>

                    <div className="mt-4 text-xs text-slate-600 space-y-0.5 leading-relaxed">
                      <p className="font-semibold text-slate-800">
                        Managing Director: Syed Imon Rizvi, PMP®
                      </p>
                      <p>
                        Corporate NTN:{" "}
                        <span className="font-mono font-semibold text-slate-800">6622762</span>{" "}
                        (FBR IRIS Verified)
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
                        <span className="font-mono font-bold text-slate-900">{invoiceNumber}</span>
                      </p>
                      <p>
                        <span className="text-slate-400">Date Issued: </span>
                        <span className="font-medium text-slate-900">{issueDate}</span>
                      </p>
                      <p>
                        <span className="text-slate-400">Due Date: </span>
                        <span className="font-bold text-blue-700">{dueDate}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Billed To Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                      Billed To
                    </span>
                    <p className="font-bold text-slate-900 text-sm">
                      {clientName || "Client Representative"}
                    </p>
                    <p className="text-xs font-semibold text-slate-700">
                      {clientCompany || "Client Organization"}
                    </p>
                    {clientEmail && (
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{clientEmail}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-0.5">{clientCountry}</p>
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

                {/* Line Items Table */}
                <div className="overflow-x-auto">
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
                      {items.map((it) => (
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
                </div>

                {/* Subtotal & Total */}
                <div className="border-t-2 border-slate-200 pt-4 flex flex-col items-end">
                  <div className="w-full sm:w-64 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-mono font-medium">${subtotal.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Export Tax / VAT:</span>
                      <span className="font-mono">0.00% (Exempt)</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-2">
                      <span>Total Amount Due:</span>
                      <span className="font-mono text-blue-700">
                        ${subtotal.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Official Bank Coordinates & Payment Rails */}
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    Payment Settlement Instructions (Direct Deposit)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Rail 1: Direct SWIFT / International Bank Wire */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                        <span>Method 1: International Bank Wire</span>
                        <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          SWIFT / Wire
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 space-y-1 pt-1 font-sans">
                        <p>
                          <strong className="text-slate-800">Beneficiary:</strong> Syed Imon Rizvi
                        </p>
                        <p>
                          <strong className="text-slate-800">Bank:</strong> United Bank Limited (UBL)
                        </p>
                        <p>
                          <strong className="text-slate-800">IBAN:</strong>{" "}
                          <span className="font-mono font-bold text-slate-900 select-all">
                            PK22UNIL0109000297908151
                          </span>
                        </p>
                        <p>
                          <strong className="text-slate-800">SWIFT / BIC:</strong>{" "}
                          <span className="font-mono font-semibold text-slate-900">UNILPKKA</span>
                        </p>
                        <p>
                          <strong className="text-slate-800">Country:</strong> Pakistan
                        </p>
                      </div>
                    </div>

                    {/* Rail 2: Wise / Remitly Direct Card or ACH */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                        <span>Method 2: Wise / Remitly / Online</span>
                        <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 font-semibold">
                          Recommended (Instant)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                        <p className="leading-snug">
                          Pay instantly via Credit Card, Debit Card, or domestic US ACH using <strong>Wise.com</strong> or <strong>Remitly</strong>:
                        </p>
                        <p>
                          1. Recipient: <strong>Syed Imon Rizvi</strong>
                        </p>
                        <p>
                          2. Bank: <strong>United Bank Limited (UBL)</strong>
                        </p>
                        <p>
                          3. IBAN:{" "}
                          <span className="font-mono font-bold text-slate-900 select-all">
                            PK22UNIL0109000297908151
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-500 pt-0.5">
                          Direct bank deposit with zero international wire surcharges.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Optional Payoneer Link */}
                  {includePayoneerSlot && payoneerUrl && (
                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-bold text-blue-900">Direct Online Checkout (Payoneer)</p>
                        <p className="text-[11px] text-blue-700">
                          Click to pay directly via credit card or international bank transfer.
                        </p>
                      </div>
                      <a
                        href={payoneerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                      >
                        Pay Online <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Notes & Legal */}
                <div className="border-t border-slate-200 pt-6 text-[10px] text-slate-500 space-y-1.5 leading-relaxed">
                  <p>
                    <strong>Terms &amp; Milestone Policy:</strong> Work initiates upon confirmation of the 50% Milestone 1 deposit. Final portal assets and turnkey IP rights transfer upon payment of the final balance.
                  </p>
                  <p>
                    <strong>Tax &amp; Regulatory Note:</strong> Services rendered are cross-border Knowledge Operations &amp; IT-enabled consulting. Registered under Federal Board of Revenue (FBR) Pakistan NTN: 6622762.
                  </p>
                  <p className="text-slate-400">
                    Thank you for your business. For any billing questions, contact{" "}
                    <span className="font-mono text-slate-600">syedimonrizvipmp@gmail.com</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
