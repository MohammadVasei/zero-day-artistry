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
import { getTestimonials, getProjects } from "@/lib/payload.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [cmsTestimonials, cmsProjects] = await Promise.all([
      getTestimonials(),
      getProjects(),
    ]);
    return { cmsTestimonials, cmsProjects };
  },
  head: () => ({
    meta: [
      { title: "ZeroDayTeam — Architecting digital resilience" },
      {
        name: "description",
        content:
          "A specialized engineering collective building middleware, industrial SaaS, AR commerce, and logistics platforms for enterprises since 2011.",
      },
      { property: "og:title", content: "ZeroDayTeam" },
      {
        property: "og:description",
        content:
          "From ZeroDayTeam to Scale — middleware, AR retail, industrial SaaS, logistics.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { cmsTestimonials, cmsProjects } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProductsMarquee />
        <FocusGrid />
        <ProcessSteps />
        <Testimonials cmsData={cmsTestimonials} />
        <SelectedWorks cmsData={cmsProjects} />
        <AboutTimeline />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
