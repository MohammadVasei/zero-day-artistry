import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { ProductsMarquee } from "@/components/products-marquee";
import { FocusGrid } from "@/components/focus-grid";
import { ProcessSteps } from "@/components/process-steps";
import { Testimonials } from "@/components/testimonials";
import { SelectedWorks } from "@/components/selected-works";
import { AboutTimeline } from "@/components/about-timeline";
import { CTASection } from "@/components/cta-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zero Day Development — Architecting digital resilience" },
      {
        name: "description",
        content:
          "A specialized engineering collective building middleware, industrial SaaS, AR commerce, and logistics platforms for enterprises since 2011.",
      },
      { property: "og:title", content: "Zero Day Development" },
      { property: "og:description", content: "From Zero Day to Scale — middleware, AR retail, industrial SaaS, logistics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <ProductsMarquee />
        <FocusGrid />
        <ProcessSteps />
        <Testimonials />
        <SelectedWorks />
        <AboutTimeline />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
