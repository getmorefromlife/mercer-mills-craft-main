import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    name: "Syed Zaidi",
    role: "Founder, Istax Consultants",
    quote: "Mercer & Mills transformed our vision into a polished digital product. Syed's project management expertise kept everything on track, and the creative output exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Shabbar Raza",
    role: "Client",
    quote: "The fractional project management engagement saved us months of trial and error. Syed brought enterprise-level governance to our startup without the enterprise price tag.",
    rating: 5,
  },
  {
    name: "Raza Ali",
    role: "Client",
    quote: "From course production to launch in six weeks. The team handled everything — curriculum design, video production, platform setup, and launch copy. I just showed up and recorded.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-24 bg-secondary">
    <div className="container">
      <SectionHeading
        subtitle="Client Stories"
        title="What Our Partners Say"
        description="Real feedback from founders, creators, and organizations we've worked with."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col hover:border-primary/30 transition-colors"
          >
            <Quote className="h-8 w-8 text-primary/30 mb-4 flex-shrink-0" />
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <div>
              <p className="font-serif font-bold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
