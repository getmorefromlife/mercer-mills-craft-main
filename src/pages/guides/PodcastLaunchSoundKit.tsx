import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Headphones, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  "Select the right microphone and recording setup for your budget and space",
  "Optimize your recording environment to minimize noise and echo",
  "Establish a repeatable recording workflow that saves time",
  "Design audio branding — intro, outro, transitions, and soundmarks",
  "Master export settings for every major distribution platform",
  "Build a sustainable release cadence that grows your audience",
];

export default function PodcastLaunchSoundKit() {
  return (
    <>
      <Helmet>
        <title>Podcast Launch Sound Kit | Mercer & Mills</title>
        <meta name="description" content="Free guide: A 6-step checklist for setting up professional podcast audio — from mic selection to final master." />
      </Helmet>
      <section className="py-28 md:py-36 bg-midnight-gradient">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Free Resource</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              The <span className="text-gradient-gold">Podcast Launch Sound Kit</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              A 6-step checklist for setting up professional podcast audio — from mic selection to final master.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-8 text-center">What's Inside</h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 bg-card border border-border rounded-lg p-5"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-serif text-sm font-bold text-primary">{i + 1}</span>
                  </span>
                  <p className="text-muted-foreground">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <Headphones className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Podcast?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Let's set up your audio chain, design your sound, and go live with professional quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/services/the-sonic-mill">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  Back to The Sonic Mill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
