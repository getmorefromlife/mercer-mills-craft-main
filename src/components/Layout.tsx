import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import CookieConsent from "./CookieConsent";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/our-team", label: "Our Team" },
  { to: "/services", label: "Services" },
  { to: "/the-mills", label: "The Five Mills" },
  { to: "/the-mercer-method", label: "The Mercer Method" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/insights", label: "Insights" },
  { to: "/financial-center", label: "Financial Center" },
  { to: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("mm_ref", ref);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Mercer & Mills Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
            <div className="font-serif text-2xl font-bold tracking-wide">
              <span className="text-foreground">Mercer</span>
              <span className="text-primary"> & </span>
              <span className="text-foreground">Mills</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-body font-medium tracking-wide uppercase transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <nav className="container py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-body font-medium tracking-wide uppercase transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-20">{children}</main>

      <footer className="bg-secondary border-t border-border">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <img src={logo} alt="Mercer & Mills Logo" className="h-8 w-auto group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-serif text-xl font-bold">
                  <span className="text-foreground">Mercer</span>
                  <span className="text-primary"> & </span>
                  <span className="text-foreground">Mills</span>
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                International remote digital production agency. Leveraging innovation and PMP-certified precision.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 text-primary">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 text-primary">Certifications</h4>
              <div className="flex gap-4 flex-wrap">
                {["PMP", "PSM II", "PAL I"].map((cert) => (
                  <span key={cert} className="px-3 py-1.5 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left leading-relaxed">
              © {new Date().getFullYear()} Mercer & Mills. All rights reserved. Mercer & Mills operates as an international remote company.
            </p>
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
};

export default Layout;
