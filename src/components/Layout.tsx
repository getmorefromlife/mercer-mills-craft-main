import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import CookieConsent from "./CookieConsent";
import AuditBookingModal from "./AuditBookingModal";
import { Button } from "./ui/button";

const navAnchorLinks = [
  { href: "#problem", label: "The Problem" },
  { href: "#sprint", label: "The 14-Day Sprint" },
  { href: "#pricing", label: "Pricing" },
  { href: "#governance", label: "Security & Governance" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("mm_ref", ref);
    }
  }, [location.search]);

  // Handle smooth scroll on home or navigate with hash
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname === "/") {
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F17]/85 backdrop-blur-xl border-b border-slate-800/80 print:hidden">
        <div className="container flex items-center justify-between h-20">
          {/* Logo + Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Mercer & Mills Logo"
              className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Mercer <span className="text-blue-500">&</span> Mills
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25 w-fit">
                Knowledge Operations
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navAnchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/contact"
              className="text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Header CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => setIsAuditModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              Book an Onboarding Audit
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-200 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0F172A] border-b border-slate-800 overflow-hidden"
            >
              <nav className="container py-6 flex flex-col gap-4">
                {navAnchorLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
                >
                  Contact &amp; Inquiries
                </Link>
                <div className="pt-3 border-t border-slate-800">
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      setIsAuditModalOpen(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-3"
                  >
                    Book an Onboarding Audit
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Section 8: Footer */}
      <footer className="bg-[#080C14] border-t border-slate-800/80 text-slate-300 print:hidden">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Col 1: Brand & Positioning */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <img
                  src={logo}
                  alt="Mercer & Mills"
                  className="h-8 w-auto group-hover:scale-105 transition-transform"
                />
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg font-bold text-white">
                    Mercer <span className="text-blue-500">&</span> Mills
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                    Knowledge Operations
                  </span>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Turn your complex software, product notes, and messy SOPs into a studio-grade client academy in 14 business days—under certified PMP® sprint governance.
              </p>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p className="font-medium text-slate-300">
                  <span className="text-blue-400 font-semibold">Leadership:</span> Syed Imon Rizvi, PMP®, PSM II, PAL I — Lead Knowledge Architect
                </p>
                <p className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a
                    href="mailto:syedimonrizvipmp@gmail.com"
                    className="text-slate-300 hover:text-blue-400 transition-colors underline"
                  >
                    syedimonrizvipmp@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Col 2: Navigation & Sections */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {navAnchorLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="hover:text-blue-400 transition-colors">
                    Contact &amp; Inquiries
                  </Link>
                </li>
                <li>
                  <Link to="/our-team" className="hover:text-blue-400 transition-colors">
                    Our Leadership &amp; Team
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsAuditModalOpen(true)}
                    className="hover:text-blue-400 text-blue-400/90 font-medium transition-colors"
                  >
                    Book 15-Min Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Standards & Governance */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Governance &amp; Standards
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {["PMP® Certified", "PSM II", "PAL I", "SOC2-Aligned"].map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Enterprise zero-data-retention AI protocols. Your proprietary workflow IP is never trained on public models.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <p>
                  <span className="text-slate-300 font-medium">Commercial Entity:</span> FBR NTN 6622762
                </p>
                <a
                  href="https://iris.fbr.gov.pk/#verifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 text-[11px]"
                >
                  Verify Official FBR Registration ↗
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="text-center md:text-left">
              Remote Global Delivery Hub · Registered Commercial Entity (NTN: 6622762) | Copyright © {new Date().getFullYear()} Mercer &amp; Mills. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/ai-governance" className="hover:text-slate-300 transition-colors">
                Enterprise AI Governance Disclosure
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <CookieConsent />
    </div>
  );
};

export default Layout;
