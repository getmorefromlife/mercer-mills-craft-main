import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const posts = [
  {
    date: "May 25, 2026",
    readTime: "5 min read",
    title: "Why Founders Need a PMP Lead, Not Another Agency",
    excerpt: "Most digital agencies operate on a black-box model: you pay a premium, and hope the work gets done. Here's why a PMP-certified lead with a freelance network is a better model for founders.",
    tags: ["Project Management", "Founder Tips"],
  },
  {
    date: "May 18, 2026",
    readTime: "4 min read",
    title: "The Mercer Method: Agile Governance for Creative Production",
    excerpt: "How we adapted Scrum and PMP governance frameworks for creative workflows — and why it eliminates the chaos most founders experience with creative teams.",
    tags: ["Methodology", "Agile"],
  },
  {
    date: "May 10, 2026",
    readTime: "6 min read",
    title: "From Idea to Launch: A 10-Day Sprint Framework for Digital Products",
    excerpt: "A breakdown of our 10-Day Quickstart Sprint — how we take a raw concept to a launch-ready digital product in two weeks flat.",
    tags: ["Product Launch", "Sprint"],
  },
];

const Insights = () => {
  return (
    <>
      <Helmet>
        <title>Insights | Mercer &amp; Mills | Digital Production Strategy</title>
        <meta name="description" content="Practical insights on digital production, project management, and product strategy from the Mercer & Mills team." />
      </Helmet>
      {/* Hero */}
      <section className="py-28 md:py-36">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.3em] mb-6 block">Insights</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Strategy, Process &amp;{" "}
              <span className="text-gradient-gold">Digital Craft.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Practical advice on digital production, project governance, and building products that ship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold mb-3">{post.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 border border-primary/30 rounded text-[10px] font-body font-semibold text-primary uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-primary text-sm font-body font-semibold hover:underline inline-flex items-center gap-1">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <SectionHeading
              subtitle="Put These Ideas Into Practice"
              title="Let's Build Something"
              description="Strategy is only useful when it ships. Book a free 20-minute call and let's talk about your project."
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="https://calendly.com/getmorefromlife-uju2/20-min-strategy-call-m-m" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
                  Book a 20-Minute Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-10 py-6 text-base hover:bg-primary/10">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Insights;
