import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly, such as your name, email address, organization name, and message when you submit our contact form. We also collect standard web analytics data including page views, browser type, and referring URLs to improve our website experience.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to respond to your inquiries, provide our services, improve our website, and send occasional communications relevant to our services. We do not sell personal information to third parties.",
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your personal information. However, no method of electronic storage or transmission is 100% secure. By using our services, you acknowledge this inherent risk.",
  },
  {
    title: "Third-Party Services",
    content: "Our website may use third-party services for analytics, form processing, and hosting. These providers have their own privacy policies governing the use of your data. We recommend reviewing their policies for complete understanding.",
  },
  {
    title: "Cookies",
    content: "Our website may use essential cookies for functionality and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.",
  },
  {
    title: "Your Rights",
    content: 'You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights, please contact us at <a href="mailto:syedimonrizvipmp@gmail.com" class="text-blue-400 hover:underline">syedimonrizvipmp@gmail.com</a>. We will respond to your request within applicable legal timeframes.',
  },
  {
    title: "Changes to This Policy",
    content: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    content: 'For questions about this privacy policy or our data practices, please contact us at <a href="mailto:syedimonrizvipmp@gmail.com" class="text-blue-400 hover:underline">syedimonrizvipmp@gmail.com</a> or through our onboarding audit diagnostic.',
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Mercer &amp; Mills</title>
        <meta name="description" content="Mercer &amp; Mills privacy policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <section className="py-24">
      <div className="container max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <SectionHeading align="left" title="Privacy Policy" description="Last updated: May 2026" />

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default PrivacyPolicy;
