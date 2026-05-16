import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SelectedWorks } from "@/components/selected-works";
import { CTASection } from "@/components/cta-section";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Zero Day Development" },
      { name: "description", content: "Selected work: GridMaster industrial SaaS, Specra AR retail, Vectra Flow logistics, SyncBridge middleware." },
      { property: "og:title", content: "Portfolio — Zero Day Development" },
      { property: "og:description", content: "Industrial SaaS, AR commerce, logistics, and middleware projects shipped at scale." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-4 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[300px] hero-glow opacity-60" />
          <p className="relative text-xs tracking-widest text-muted-foreground uppercase">/ Portfolio</p>
          <h1 className="relative font-display text-6xl md:text-7xl mt-4">Shipped, scaled, in production.</h1>
        </section>
        <SelectedWorks />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
