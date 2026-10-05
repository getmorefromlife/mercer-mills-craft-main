import { useState, useEffect, ReactNode } from "react";
import { ShieldCheck, Lock, ArrowRight, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminGateProps {
  children: ReactNode;
}

const REQUIRED_PIN = "Square786++";
const STORAGE_KEY = "mm_admin_auth";

export default function AdminGate({ children }: AdminGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      sessionStorage.getItem(STORAGE_KEY) === "true" ||
      localStorage.getItem(STORAGE_KEY) === "true"
    );
  });

  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === REQUIRED_PIN) {
      setError(false);
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, "true");
      }
    } else {
      setError(true);
      setPinInput("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#0F172A] border border-blue-500/30 shadow-2xl shadow-blue-950/40 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full inline-block">
            Restricted Admin Area
          </span>
          <h2 className="text-xl font-bold font-heading text-white">
            Mercer &amp; Mills Operations Desk
          </h2>
          <p className="text-xs text-slate-400">
            Enter the authorized security PIN to access the Agreement &amp; Invoicing engines.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="text-left space-y-1">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter PIN..."
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white font-mono text-sm tracking-wider focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500/80 focus:ring-red-500/30"
                    : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
            {error && (
              <p className="text-red-400 text-[11px] pt-1 font-medium">
                Incorrect security PIN. Access denied.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
              />
              <span>Remember on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
          >
            Unlock Operations <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>FBR NTN: 6622762 · Internal Governance</span>
        </div>
      </div>
    </div>
  );
}
