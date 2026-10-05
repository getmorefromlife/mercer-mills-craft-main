import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CreditCard, Landmark, ShieldCheck, FileText, FileCheck, ArrowRight, CheckCircle2, Globe, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

export default function FinancialCenter() {
  return (
    <>
      <Helmet>
        <title>Financial Center &amp; Payment Settlement | Mercer &amp; Mills</title>
        <meta
          name="description"
          content="Official payment rails, banking coordinates, and invoice generation for Mercer &amp; Mills Knowledge Operations clients."
        />
      </Helmet>

      <section className="py-24 bg-[#0B0F17] text-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="SETTLEMENT &amp; GOVERNANCE"
            title="Financial Center &amp; Payment Rails"
            description="Transparent, direct B2B settlement channels. We support direct international bank wires, fast digital transfers via Wise or Remitly, and milestone-governed invoicing."
          />

          {/* Quick Action: Invoicing Generator Banner */}
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0F172A] to-blue-900/30 border border-blue-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block">
                CLIENT &amp; PARTNER BILLING
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Mercer &amp; Mills Custom Invoice Engine
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Generate an official, print-ready PDF invoice with itemized sprint deliverables, FBR NTN verification, and direct international wire coordinates in 30 seconds.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                to="/invoice-generator"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
              >
                <FileText className="w-4 h-4" />
                Invoice Engine <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/agreement-generator"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <FileCheck className="w-4 h-4 text-blue-400" />
                Agreement &amp; NDA
              </Link>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Rail 1: Fast Online / Wise / Remitly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-[#0F172A] border border-blue-500/30 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Recommended (Fast &amp; Low Fee)
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Wise / Remitly / Online Transfer
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  For US, UK, and European clients. Pay from your domestic credit card, debit card, or local checking account without expensive international wire charges.
                </p>

                <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Recipient Beneficiary</span>
                    Syed Imon Rizvi
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Receiving Bank</span>
                    United Bank Limited (UBL)
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">IBAN Account</span>
                    <span className="font-mono text-white select-all">PK22UNIL0109000297908151</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Instant settlement with official electronic tax receipt</span>
              </div>
            </motion.div>

            {/* Rail 2: Direct International SWIFT / Wire Transfer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Corporate SWIFT Wire
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Direct Bank-to-Bank SWIFT Wire
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Standard enterprise wire transfer through your corporate banking portal. Ideal for high-value milestone balances and corporate procurement departments.
                </p>

                <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">SWIFT / BIC Code</span>
                    <span className="font-mono text-white">UNILPKKA</span>
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Beneficiary Name</span>
                    Syed Imon Rizvi
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Corporate Tax NTN</span>
                    <span className="font-mono text-white">6622762</span> (FBR IRIS Verified)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Supports USD, EUR, GBP, and PKR international transfers</span>
              </div>
            </motion.div>
          </div>

          {/* Governance & Trust Banner */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">PMP® 50/50 Milestone Protection</span>
                All engagements operate under bilateral milestone governance. You only approve final settlement once deliverables are reviewed and verified on Day 14.
              </div>
            </div>
            <a
              href="https://iris.fbr.gov.pk/#verifications"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold flex-shrink-0"
            >
              Verify FBR NTN: 6622762 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
