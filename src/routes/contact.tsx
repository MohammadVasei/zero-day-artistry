import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { submitContactForm } from "@/lib/payload.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zero Day Development" },
      {
        name: "description",
        content:
          "Bring us your hardest middleware, industrial SaaS, AR, and logistics problems. We respond within 24 hours.",
      },
      { property: "og:title", content: "Contact Zero Day Development" },
      {
        property: "og:description",
        content: "Reach the Zero Day collective for partnerships and high-stakes engineering work.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const project = formData.get("project") as string;

    try {
      const result = await submitContactForm({ data: { name, email, project } });
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="relative">
        <div className="absolute inset-x-0 top-0 h-[420px] gradient-mesh" />
        <div className="absolute inset-x-0 top-0 h-[420px] grain" />

        <section className="relative mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-14">
          <ScrollReveal variant="left">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
                / Contact
              </p>
              <h1 className="text-display text-5xl md:text-6xl mt-4">Let's talk infrastructure.</h1>
              <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
                Whether it's a Valhalla rebuild, a middleware migration, or a brand-new AR commerce
                engine — tell us what you're up against.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-neon" /> hello@zerodayteam.site
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-neon" /> Stockholm / Berlin / Remote
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest text-muted-foreground font-mono"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-muted-foreground font-mono"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="project"
                  className="text-xs uppercase tracking-widest text-muted-foreground font-mono"
                >
                  Project
                </label>
                <textarea
                  id="project"
                  name="project"
                  rows={4}
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="pill-dark mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "sent" && <CheckCircle2 size={16} />}
                {status === "idle" || status === "error" ? <ArrowUpRight size={16} /> : null}
                {status === "idle" && "Send message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message sent!"}
                {status === "error" && "Try again"}
              </button>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}
            </form>
          </ScrollReveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
