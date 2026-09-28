import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, CheckCircle2, ArrowRight, Calendar, Sparkles, Clock, Globe } from "lucide-react";

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export const CALENDLY_URL = "https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m";

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
}) => {
  const [step, setStep] = useState<"qualify" | "calendar">("qualify");
  const [companyUrl, setCompanyUrl] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [timeframe, setTimeframe] = useState("Next 14 days");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQualificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store qualification context locally for the audit session
      const auditPayload = {
        companyUrl,
        bottleneck,
        timeframe,
        email,
        package: defaultPackage || "General Audit",
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("mm_audit_qualification", JSON.stringify(auditPayload));
    } catch {
      // safe fallback if storage disabled
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("calendar");
    }, 400);
  };

  const handleReset = () => {
    setStep("qualify");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-[620px] bg-[#0F172A] border border-slate-800 text-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              15-Minute Onboarding Diagnostic
            </span>
            {defaultPackage && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {defaultPackage}
              </span>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white font-heading">
            {step === "qualify"
              ? "Book Your 15-Minute Onboarding Audit"
              : "Select Your Time with Syed Imon Rizvi, PMP®"}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            {step === "qualify"
              ? "Share 3 quick details so we can review your current product notes and come to our call with a customized 14-day sprint roadmap."
              : "We've recorded your qualification details. Choose an available slot on the calendar below."}
          </DialogDescription>
        </DialogHeader>

        {step === "qualify" ? (
          <form onSubmit={handleQualificationSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="companyUrl" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                1. Company Website or App URL *
              </Label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <Input
                  id="companyUrl"
                  required
                  placeholder="https://yourcompany.com"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  className="pl-9 bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bottleneck" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                2. What is your biggest onboarding bottleneck right now? *
              </Label>
              <Textarea
                id="bottleneck"
                required
                rows={3}
                placeholder="e.g., Customers sign up but fail to activate; our CS team repeats the same 1-on-1 Zoom demos; our 40-page Google Doc SOP is completely ignored."
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500 resize-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                3. Desired Launch Timeframe *
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "14days", label: "Next 14 Business Days", desc: "Urgent churn / new release" },
                  { id: "30days", label: "Next 30 Days", desc: "Planned quarterly initiative" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setTimeframe(item.label)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      timeframe === item.label
                        ? "border-blue-500 bg-blue-500/10 text-white"
                        : "border-slate-800 bg-[#0B0F17]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-sm font-semibold flex items-center justify-between">
                      {item.label}
                      {timeframe === item.label && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                Work Email (Optional for invite pre-fill)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0B0F17] border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Preparing Diagnostic Session..."
                ) : (
                  <>
                    Continue to Calendar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Zero Data Training
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                15-Min Rapid Scoping
              </span>
              <span>·</span>
              <span>PMP® Direct Governance</span>
            </div>
          </form>
        ) : (
          <div className="space-y-5 mt-3">
            <div className="p-4 rounded-lg bg-[#0B0F17] border border-slate-800 text-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-blue-400">Target Timeframe:</span>
                <span>{timeframe}</span>
              </div>
              <div className="text-xs text-slate-300 truncate">
                <span className="text-slate-500">Website: </span>
                {companyUrl || "Not provided"}
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0B0F17]">
              <iframe
                src={`${CALENDLY_URL}?embed_domain=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "mercerandmills.com"
                )}&embed_type=Inline`}
                width="100%"
                height="450"
                title="Schedule 15-Minute Onboarding Audit with Syed Imon Rizvi"
                className="border-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("qualify")}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                ← Edit qualification details
              </button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                Open scheduler in new tab <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuditBookingModal;
