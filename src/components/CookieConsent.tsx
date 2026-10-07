import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GA_ID = "G-75CB5TQHJ4";

const loadGA4 = () => {
  const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: unknown[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mm_cookie_consent");
    if (consent === "accepted") {
      loadGA4();
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("mm_cookie_consent", "accepted");
    loadGA4();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("mm_cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  We use cookies to analyze traffic and provide live chat support. 
                  Accept to enable analytics and chat, or decline to continue without them.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={decline}
                  className="px-4 py-2 text-xs font-body font-semibold text-muted-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="px-4 py-2 text-xs font-body font-semibold text-primary-foreground bg-gold-gradient rounded-lg hover:opacity-90 transition-opacity"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
