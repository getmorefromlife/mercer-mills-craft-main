import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Mercer & Mills Knowledge Operations</title>
        <meta
          name="description"
          content="Terms of Service for Mercer & Mills Knowledge Operations productized B2B onboarding academy sprints."
        />
      </Helmet>

      <div className="py-24 bg-[#0B0F17] text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Operations
          </Link>

          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Productized Services Agreement & Terms
          </h1>
          <p className="text-slate-400 text-sm mb-12">Last updated: September 2026</p>

          <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
            <section className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <h2 className="text-xl font-bold text-white font-heading">1. Scope of Productized Sprints</h2>
              <p>
                Mercer & Mills Knowledge Operations delivers turnkey digital onboarding academies, SOP systems, and educational architecture for B2B SaaS and service firms. Sprints are governed under fixed scopes, explicit deliverables, and guaranteed timelines:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li><strong className="text-white">The Architecture Blueprint ($750):</strong> 72-hour delivery SLA covering friction audit, 5-7 module curriculum map, and 1 produced prototype. 100% credited if upgrading to the full sprint.</li>
                <li><strong className="text-white">The 14-Day Turnkey Academy ($3,500):</strong> 14 business day delivery SLA covering up to 7 studio-grade modules, PDF checklists, turnkey portal integration, and customer welcome email sequences.</li>
                <li><strong className="text-white">Knowledge Operations Care Plan ($1,500/mo):</strong> Recurring continuity covering up to 2 new/updated modules/month, portal administration, and monthly completion metrics.</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <h2 className="text-xl font-bold text-white font-heading">2. Payment Milestones & Predictable Pricing</h2>
              <p>
                All billing is flat and milestone-based—zero hourly tracking or hidden administrative fees.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Turnkey Academy sprints require a 50% initiation deposit to lock your sprint start date, and 50% upon final delivery sign-off on Day 14.</li>
                <li>Blueprint audits are billed 100% upfront.</li>
                <li>Care plans are billed monthly in advance and can be adjusted with 14 business days notice.</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <h2 className="text-xl font-bold text-white font-heading">3. Intellectual Property Ownership</h2>
              <p>
                Upon final payment, the client retains 100% exclusive, worldwide copyright and ownership of all deliverables, scripts, recorded screen captures, voice tracks, and portal setups. Mercer & Mills retains no ongoing claim or licensing fees over your academy content.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <h2 className="text-xl font-bold text-white font-heading">4. Corporate Entity &amp; Commercial Registration</h2>
              <p>
                Mercer &amp; Mills is a legally registered commercial entity with the Federal Board of Revenue (FBR), Pakistan (National Tax Number / NTN: <strong className="text-white">6622762</strong>). Official registration status is publicly verifiable through the government IRIS portal at{" "}
                <a
                  href="https://iris.fbr.gov.pk/#verifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  iris.fbr.gov.pk/#verifications
                </a>
                .
              </p>
              <p className="text-slate-400">
                All client relationships are governed under international remote services agreements with mutual confidentiality (NDA) and full intellectual property assignment upon completion.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <h2 className="text-xl font-bold text-white font-heading">5. Contact &amp; Inquiries</h2>
              <p>
                For questions regarding terms, billing, or master service agreements (MSAs), please contact:
              </p>
              <p className="font-semibold text-blue-400">
                syedimonrizvipmp@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
