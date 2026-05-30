import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Headphones, Music, User, Award, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const metadata = [
  { icon: Headphones, label: "Project Type", value: "Audio Production, Cinematic Orchestration & Sonic Branding" },
  { icon: User, label: "Executive Producer / Arranger", value: "Syed Imon Rizvi" },
  { icon: Mic, label: "Core Engineering Tools", value: "Apple Logic Pro X & Suno AI (Hybrid macOS Workflow)" },
  { icon: Award, label: "Heritage & Classical Lineage", value: "Shagird of Ustad Sibti Jafar Shaheed & Ustad Imrat Ali Khan" },
  { icon: Music, label: "Original Composition", value: "Ahmad G. Chagla" },
  { icon: Clock, label: "Anthem Poetry", value: "Abu Al-Asar Hafeez Jalandhari" },
];

const deliverables = [
  "High-Fidelity Stereo Master: Fully optimized master asset engineered for digital streaming platforms, high-end theatrical playback, and national broadcast specifications.",
  "Immersive Title Artwork: A custom-curated historical cinematic title card featuring Quaid-e-Azam Muhammad Ali Jinnah and Allama Iqbal inside a luxury heritage study overlooking the Badshahi Mosque.",
  "Global Multimedia Integration: Full deployment strategy on YouTube, capturing thousands of views from a global audience looking to experience the modern heartbeat of a proud nation.",
];

const QaumiTaranahCinematic = () => {
  return (
    <>
      <Helmet>
        <title>Qaumi Taranah Cinematic | Portfolio | Mercer &amp; Mills</title>
        <meta name="description" content="A cinematic reimagining of Pakistan&apos;s national anthem — full audio production, mixing, and mastering by Mercer &amp; Mills." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="mb-6">
          <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">Audio Production</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">
            The Sound of a Nation Re-Imagined: Engineering the 2026 Epic Cinematic Qaumi Taranah
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-4xl">
            Elevating Historic Masterwork Through Hybrid Orchestration, AI Co-Production, and Classical Vocal Artistry
          </p>
        </motion.div>

        <div className="aspect-video w-full mb-16 rounded-xl overflow-hidden bg-card border border-border">
          <iframe
            src="https://www.youtube.com/embed/6V65Tjc494I"
            title="Qaumi Taranah: Epic Cinematic Edition"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {metadata.map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-lg p-5">
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h4 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</h4>
              <p className="font-serif text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
              The Vision & Historical Context
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Pakistan National Anthem (Qaumi Taranah) carries immense emotional, historical, and spiritual equity. The objective of this milestone project was to break away from traditional, flat state-march arrangements and engineer an epic, widescreen, film-score-inspired interpretation for 2026.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By scaling the intrinsic majesty of the original work, this production layers sweeping symphonic movements with thunderous, modern cinematic percussion—transforming the historic anthem into a breathing, high-fidelity sonic experience that commands attention on modern playback systems and global digital platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8 md:p-12"
          >
            <blockquote className="border-l-2 border-primary pl-6">
              <p className="text-foreground text-lg leading-relaxed mb-4 italic">
                "Elevating a timeless masterpiece like the Qaumi Taranah into an entirely new genre requires far more than automated software or basic AI formulas. While built on modern AI-driven production, a cinematic remake of this scale demands highly complex, custom prompting that can only be guided by an extraordinary capacity for analytical listening and a profound understanding of rhythm, orchestration, and sonic texture. This level of instinct cannot be automated; it is awakened by 25 years of classical performance—from the Paine Music Hall at Harvard University to Voice of America—imbued with the deep musical heritage of legendary Ustads. You can hear that awakened sense in every layer of this track: an enduring, golden heritage finding powerful new expression through modern cinematic innovation."
              </p>
              <footer className="text-primary font-body text-sm font-semibold">— Syed Imon Rizvi</footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
              Technical & Creative Execution Breakdown
            </h2>

            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold mb-3">1. Classical Foundation & Recitation Cadence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Drawing from over two decades of rigorous training under master classical legends Ustad Sibti Jafar Shaheed (Pakistan) and Ustad Imrat Ali Khan (USA), the arrangement meticulously preserves the micro-tonal integrity and raw spiritual power of the original vocals. The vocal timing, phrase weights, and structural cadence are heavily info-mapped by classical Eastern discipline, ensuring that the sheer scale of the epic orchestration never overwhelms the emotional clarity of Hafeez Jalandhari's poetry.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold mb-3">2. Hybrid Orchestration Workflow</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The massive sonic canvas was constructed utilizing a cutting-edge hybrid intelligence workflow:
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Logic Pro X Architecture: Acted as the master multi-track environment for complex tracking, deep MIDI orchestration, spatial positioning, and final precision mixing.",
                    "Suno AI Co-Production: Deployed intentionally to generate rich, evolving orchestral textures and layer a massive, soaring virtual choir.",
                    "Frequency Space Management: Elements were precisely carved out using subtractive EQ and dynamic panning. This prevents frequency masking, allowing the sub-bass impacts, soaring staccato strings, and the wide choral space to breathe seamlessly together.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold mb-3">3. Spatial Imaging & Dynamic Multi-Staging</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unlike hyper-compressed commercial audio, this production is mixed to respect vast dynamic range. The arrangement begins with an intimate, emotionally stirring introduction of the Paak Sar Zameen themes before sequentially building into an explosive, multi-layered cinematic crescendo. High-end room-reverb modeling and stereo-widening tools simulate a massive, live acoustic hall environment.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
              Project Deliverables Checklist
            </h2>
            <ul className="space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 bg-card border border-border rounded-lg p-5">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 pt-12 border-t border-border text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["AUDIO PRODUCTION", "HYBRID ORCHESTRATION", "SONIC BRANDING", "MULTIMEDIA PRODUCTION"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <Link to="/contact">
            <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default QaumiTaranahCinematic;
