import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

import istaxDesign from "@/assets/istax-design.png";
import istaxIdentity from "@/assets/istax-identity.png";
import qaumiTaranah from "@/assets/Paak Sar Zameen.jpeg";

const projects = [
  { title: "Syedello — Logo Design", category: "Graphic Design", type: "Brand Identity", image: "/Syedello Logo.png", to: "/portfolio/syedello-logo" },
  { title: "Syedello — Free PM App", category: "Web Application", type: "Kanban Board & Calendar", image: "/Syedello Card.png", to: "/portfolio/syedello" },
  { title: "ISTAX Market Disruption", category: "Brand Design", type: "Digital Project", image: istaxDesign, to: "/portfolio/istax-brand-disruption" },
  { title: "Qaumi Taranah: Epic Cinematic Edition", category: "Audio Production", type: "Digital Production & Orchestration", image: qaumiTaranah, to: "/portfolio/qaumi-taranah-cinematic" },
  { title: "The ISTAX Architecture", category: "Brand Identity", type: "Strategic Framework", image: istaxIdentity, to: "/portfolio/istax-brand-architecture" },
];

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | Mercer &amp; Mills | Digital Production Case Studies</title>
        <meta name="description" content="Browse our portfolio of digital production projects including brand strategy, video production, web development, and cinematic content." />
      </Helmet>
      <section className="py-24">
      <div className="container">
        <SectionHeading subtitle="Selected Work" title="Our Portfolio" description="A curated selection of projects that showcase the depth and breadth of our craft." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            const card = (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-gold transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-square bg-midnight-gradient relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">{project.category}</span>
                    <h3 className="font-serif text-xl font-bold mt-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.type}</p>
                  </div>
                </div>
              </motion.div>
            );

            return project.to ? <Link key={project.title} to={project.to}>{card}</Link> : card;
          })}
        </div>
      </div>
    </section>
    </>
  );
};

export default Portfolio;
