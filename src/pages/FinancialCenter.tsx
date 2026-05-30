import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CreditCard, Landmark } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const methods = [
  {
    icon: CreditCard,
    title: "Credit Card",
    description: "Secure payments via Visa, Mastercard, and American Express. Processed through our encrypted payment gateway.",
    status: "finalizing",
  },
  {
    icon: Landmark,
    title: "PayPal",
    description: "Fast, protected payments through PayPal. Send payments to our verified business account for instant confirmation.",
    status: "finalizing",
  },
  {
    icon: Landmark,
    title: "ACH Transfer",
    description: "Direct bank-to-bank transfers with reduced processing fees. Ideal for retainer agreements and milestone payments.",
    status: "available",
  },
];

const FinancialCenter = () => {
  return (
    <>
      <Helmet>
        <title>Financial Center | Mercer &amp; Mills | Secure Payment Portal</title>
        <meta name="description" content="Make secure payments to Mercer &amp; Mills via ACH transfer. Credit card and PayPal options coming soon." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading subtitle="Payments" title="Financial Center" description="Flexible and secure payment options. ACH transfers are available now; credit card and PayPal are coming soon." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:border-primary/40 hover:shadow-gold transition-all duration-300">
                <method.icon className="h-10 w-10 text-primary mb-5" />
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-serif text-2xl font-bold">{method.title}</h3>
                  {method.status === "available" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-body font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Available Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-body font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Being Finalized
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">{method.description}</p>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
    </>
  );
};

export default FinancialCenter;
