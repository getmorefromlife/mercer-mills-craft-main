import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ subtitle, title, description, align = "center" }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-16`}
  >
    {subtitle && (
      <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
        {subtitle}
      </span>
    )}
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{title}</h2>
    {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
  </motion.div>
);

export default SectionHeading;
