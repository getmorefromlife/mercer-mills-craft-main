import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { postsBySlug } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsBySlug[slug] : undefined;

  if (!post) {
    return (
      <section className="py-24">
        <div className="container text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">This blog post doesn't exist or may have been removed.</p>
          <Link to="/insights">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Mercer &amp; Mills</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mercerandmills.com/insights/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content="https://mercerandmills.com/og-image.png" />
        <meta property="og:image:alt" content={`${post.title} — Mercer & Mills`} />
        <meta property="og:site_name" content="Mercer & Mills" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://mercerandmills.com/insights/${post.slug}`} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content="https://mercerandmills.com/og-image.png" />
        <meta name="twitter:image:alt" content={`${post.title} — Mercer & Mills`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": "https://mercerandmills.com/og-image.png",
          "author": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "publisher": { "@type": "Organization", "name": "Mercer & Mills", "url": "https://mercerandmills.com" },
          "url": `https://mercerandmills.com/insights/${post.slug}`,
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://mercerandmills.com/insights/${post.slug}` },
          "datePublished": new Date(post.date).toISOString().split("T")[0],
          "keywords": post.tags.join(", ")
        })}</script>
      </Helmet>
      <section className="py-28 md:py-36">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link to="/insights" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-body">
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 border border-primary/30 rounded text-[10px] font-body font-semibold text-primary uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="bg-midnight-gradient border border-border rounded-2xl p-12 md:p-20 text-center shadow-gold-lg max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Let's Build Something</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Strategy is only useful when it ships. Book a free 20-minute call and let's talk about your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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

export default BlogPost;
