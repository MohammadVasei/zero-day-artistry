import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zero Day Development" },
      { name: "description", content: "Bring us your hardest middleware, industrial SaaS, AR, and logistics problems. We respond within 24 hours." },
      { property: "og:title", content: "Contact Zero Day Development" },
      { property: "og:description", content: "Reach the Zero Day collective for partnerships and high-stakes engineering work." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="relative">
        <div className="absolute inset-x-0 top-0 h-[420px] hero-glow opacity-70" />
        <section className="relative mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">/ Contact</p>
            <h1 className="font-display text-6xl md:text-7xl mt-4">Let's talk infrastructure.</h1>
            <p className="mt-6 text-muted-foreground max-w-md">
              Whether it's a Valhalla rebuild, a middleware migration, or a brand-new AR commerce engine — tell us
              what you're up against.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3"><Mail size={16} /> hello@zerodayteam.site</div>
              <div className="flex items-center gap-3"><MapPin size={16} /> Stockholm · Berlin · Remote</div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl bg-card border border-border p-8 shadow-card space-y-4"
          >
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input required className="mt-1 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--neon] focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input type="email" required className="mt-1 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--neon] focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Project</label>
              <textarea rows={4} required className="mt-1 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--neon] focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 resize-none" />
            </div>
            <button type="submit" className="pill-dark mt-4">
              {sent ? "Thanks — we'll be in touch" : "Send message"}
              <ArrowUpRight size={16} />
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
