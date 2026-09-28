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
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
        {subtitle}
      </span>
    )}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">{title}</h2>
    {description && <p className="text-slate-400 text-base md:text-lg leading-relaxed">{description}</p>}
  </motion.div>
);

export default SectionHeading;
