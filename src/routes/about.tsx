import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutTimeline } from "@/components/about-timeline";
import { CTASection } from "@/components/cta-section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zero Day Development" },
      { name: "description", content: "A collective of high-stakes engineers building the invisible layers of modern enterprise tech since 2011." },
      { property: "og:title", content: "About Zero Day Development" },
      { property: "og:description", content: "From a freelance collective to a high-stakes engineering powerhouse." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-12">
        <section className="mx-auto max-w-5xl px-6 py-16 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] hero-glow opacity-70" />
          <p className="relative text-xs tracking-widest text-muted-foreground uppercase">/ About</p>
          <h1 className="relative font-display text-6xl md:text-8xl mt-4">Architects of the invisible.</h1>
          <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto">
            We build the middleware, orchestration, and infrastructure most teams never see — the kind that
            quietly carries millions of transactions, routes, and packets every day.
          </p>
        </section>
        <AboutTimeline />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
