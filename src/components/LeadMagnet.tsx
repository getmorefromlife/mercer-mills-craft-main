import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Download, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

interface LeadMagnetProps {
  title?: string;
  subtitle?: string;
}

const LeadMagnet = ({
  title = "Get the Free 10-Day Sprint Blueprint",
  subtitle = "A step-by-step framework to go from raw concept to launch-ready digital product in two weeks. Used by founders and agencies worldwide.",
}: LeadMagnetProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    emailjs
      .send(
        "service_s7renj5",
        "template_xa53n4r",
        {
          from_name: name,
          from_email: email,
          subject: "Lead Magnet: 10-Day Sprint Blueprint",
          message: `${name} (${email}) requested the 10-Day Sprint Blueprint.`,
        },
        "PtqOQs6UI94KMGudX",
      )
      .then(() => {
        setSubmitted(true);
        setTimeout(() => navigate("/sprint-blueprint"), 1500);
      })
      .catch(() => {
        setError("Something went wrong. Try again or email us directly.");
      });
  };

  if (submitted) {
    return (
      <div className="bg-card border border-primary/30 rounded-xl p-8 text-center">
        <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
        <h3 className="font-serif text-xl font-bold mb-2">Check Your Inbox!</h3>
        <p className="text-muted-foreground text-sm">
          We sent the Sprint Blueprint link to <strong className="text-foreground">{email}</strong>. Redirecting you now…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-primary/20 rounded-xl p-8 md:p-10">
      <div className="flex items-start gap-3 mb-4">
        <Download className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-serif text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{subtitle}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <Button type="submit" size="lg" className="bg-gold-gradient text-primary-foreground font-body font-semibold whitespace-nowrap">
          Get the Blueprint <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </form>
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
    </div>
  );
};

export default LeadMagnet;
