import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code2, Globe, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const metadata = [
  { icon: Code2, label: "Project Type", value: "Web Application" },
  { icon: Clock, label: "Build Time", value: "2 Weeks From Concept" },
  { icon: Globe, label: "Platform", value: "Vercel Deployment" },
  { icon: Layout, label: "Core Features", value: "Kanban Board + Calendar" },
];

const deliverables = [
  "Drag-and-Drop Kanban Board: Fully functional To Do / In Progress / Done workflow with real-time state persistence to localStorage for zero data loss.",
  "Dual-View Interface: Seamless toggle between Board view for task management and Calendar view for deadline tracking — all data synchronized across both views.",
  "Offline-First Architecture: Every interaction saves automatically to the device, eliminating the need for server-side databases while maintaining full CRUD functionality.",
];

const Syedello = () => {
  return (
    <>
      <Helmet>
        <title>Syedello — Free Project Management App | Portfolio | Mercer &amp; Mills</title>
        <meta name="description" content="Syedello — a free, offline-first Trello-like project management app built by Mercer &amp; Mills for PMs, Scrum Masters, and Agile Coaches." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "headline": "Syedello — A Free, Offline-First Kanban Project Management App for Agile Teams",
          "description": "A lightweight, drag-and-drop kanban board with calendar view, built by Mercer & Mills for project managers and agile coaches.",
          "author": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "about": "Web Application Development",
          "keywords": "project management, kanban, agile, scrum, task management, web app, React",
          "url": "https://mercerandmills.com/portfolio/syedello",
          "datePublished": "2026-06-01"
        })}</script>
      </Helmet>
      <section className="py-24">
      <div className="container">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="mb-6">
          <span className="text-primary font-body text-xs font-semibold uppercase tracking-[0.2em]">Web Application</span>
        </div>

        <SectionHeading
          align="left"
          subtitle="Case Study"
          title="Syedello: A Free, Offline-First Project Management App for Agile Teams"
          description="Building a lightweight kanban board with calendar view — deployed on Vercel in under two weeks"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
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
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">01</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Discovery — Why We Built It</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Problem with Existing PM Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every project manager knows the pain. Jira is too heavy for small teams. Trello is simple but requires a paid subscription for power features. Notion is flexible but demands setup time. Asana, Monday.com, ClickUp — each adds another monthly bill and another login to manage. For freelancers, solo founders, and small agile teams, the overhead of these tools often outweighs their benefit. We saw an opportunity to build something radically simple: a project management app that works immediately, saves to your device, costs nothing, and never asks you to create an account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8 md:p-12"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">02</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Building the Core</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">The Offline-First Kanban Engine</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The core requirement was zero friction. No sign-up, no onboarding, no API keys. Open the app and start managing tasks. We built the kanban engine around a drag-and-drop interface powered by React state management with localStorage persistence. Every card move, every edit, every new list — saved automatically. The architecture is intentionally serverless: the entire application state lives in the browser, making it instant, private, and completely free to operate at any scale.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
              "By eliminating the server, we eliminated the sign-up, the password reset, the subscription tier, and the loading spinner. Syedello works the moment the page loads."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">03</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Sprints — Expanding the Experience</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">Board + Calendar: Two Views, One Truth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold mb-3">Kanban Board View</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The default view presents a clean three-column layout: To Do, In Progress, Done. Cards display task titles with priority labels. Drag a card between columns to update its status. Add new cards inline. Every change persists instantly to localStorage. The interface is deliberately minimalist — no toolbar clutter, no sidebar, no settings panel.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold mb-3">Calendar View</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The calendar view renders all tasks with due dates on a monthly grid, giving PMs a timeline perspective on their workload. Tasks created in the board view automatically appear on the calendar. The two views share the same data store — update a task in either view and it reflects everywhere. No sync, no conflict, no confusion.
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
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-primary">04</span>
              </span>
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">Launch — Open Source & Deployment</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">Built With React, Deployed on Vercel</h2>
            <ul className="space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 bg-card border border-border rounded-lg p-5">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://syedello.vercel.app" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-8 py-5 text-sm hover:bg-primary/10">
                  <Globe className="mr-2 h-4 w-4" /> Visit Syedello
                </Button>
              </a>
              <a href="https://github.com/getmorefromlife/Syedello" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-primary/40 text-primary font-body font-semibold tracking-wide px-8 py-5 text-sm hover:bg-primary/10">
                  <Code2 className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-4">Need a custom web application for your team or workflow? Let's build it.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["REACT", "TYPESCRIPT", "LOCALSTORAGE", "VERCEL"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 border border-primary/30 rounded text-xs font-body font-semibold text-primary tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <Link to="/contact">
            <Button size="lg" className="mt-8 bg-gold-gradient text-primary-foreground font-body font-semibold tracking-wide px-10 py-6 text-base hover:opacity-90 transition-opacity">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Syedello;
