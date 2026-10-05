import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIGovernance = () => {
  return (
    <>
      <Helmet>
        <title>Enterprise AI Governance & Data Security | Mercer & Mills Knowledge Operations</title>
        <meta
          name="description"
          content="Learn how Mercer & Mills operates under strict PMP-certified governance with zero AI foundation model training, encrypted commercial environments, and mutual NDAs."
        />
      </Helmet>

      <div className="py-24 bg-[#0B0F17] text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Operations
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-6">
            <ShieldCheck className="w-4 h-4" />
            Zero-Data-Training AI Governance
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Enterprise AI Governance & Data Security Disclosure
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            At Mercer & Mills Knowledge Operations, we recognize that your SOPs, internal product documentation, customer interaction recordings, and proprietary workflows represent your core enterprise intellectual property. Here is our unwavering commitment to protecting it.
          </p>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <EyeOff className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">1. Zero Foundation Model Training</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    All AI-assisted summarization, transcript distillation, and curriculum outlining are executed exclusively within dedicated commercial API tiers (OpenAI Enterprise, Anthropic Commercial, and Google Cloud Vertex AI) where customer data training is contractually and permanently disabled. Your data is never used to train, retrain, or improve any public or private large language model.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">2. End-to-End Encryption & Ephemeral Storage</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Client raw screen recordings, transcripts, and internal files reside in encrypted-at-rest (AES-256) and encrypted-in-transit (TLS 1.3) staging repositories. Following the delivery and sign-off of your turnkey Academy on Day 14, client raw upload files are queued for automated purge upon request.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">3. Mutual Non-Disclosure Agreement (NDA) Guarantee</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Before you upload a single document or provide access to internal sandbox environments, Mercer & Mills executes a standard or client-provided bilateral Non-Disclosure Agreement safeguarding all trade secrets, unreleased features, and user metrics.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">4. PMP® Project Governance Audit Trail</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Under the direct leadership of Syed Imon Rizvi, PMP®, PSM II, PAL I, every sprint maintains rigorous access control logs. Access to your production assets is restricted exclusively to vetted team members actively executing your 14-day sprint deliverables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 text-center space-y-4">
            <h4 className="text-lg font-bold text-white">Have specific enterprise compliance questions?</h4>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              We frequently coordinate with enterprise legal and security teams. Contact us directly to review your vendor security questionnaire or custom DPA.
            </p>
            <div>
              <a href="mailto:syedimonrizvipmp@gmail.com">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm">
                  Email Governance Team (syedimonrizvipmp@gmail.com)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIGovernance;
