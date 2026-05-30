import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Mercer &amp; Mills</title>
        <meta name="description" content="The page you are looking for does not exist. Let Mercer &amp; Mills help you find what you need." />
      </Helmet>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-midnight-gradient" />
      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          <h1 className="font-serif text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</h1>
          <p className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-8 py-6 text-base hover:opacity-90 transition-opacity">
                <Home className="mr-2 h-5 w-5" /> Return Home
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-8 py-6 text-base hover:bg-primary/10">
                <Briefcase className="mr-2 h-5 w-5" /> Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-8 py-6 text-base hover:bg-primary/10">
                <Mail className="mr-2 h-5 w-5" /> Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default NotFound;
