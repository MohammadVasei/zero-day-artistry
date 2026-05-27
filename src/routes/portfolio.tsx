import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SelectedWorks } from "@/components/selected-works";
import { CaseStudies } from "@/components/case-studies";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { ThemedImage } from "@/components/themed-image";
import { getCaseStudies, getProjects } from "@/lib/payload.functions";

export const Route = createFileRoute("/portfolio")({
  loader: async () => {
    const [cmsCaseStudies, cmsProjects] = await Promise.all([getCaseStudies(), getProjects()]);
    return { cmsCaseStudies, cmsProjects };
  },
  head: () => ({
    meta: [
      { title: "Portfolio — ZeroDayTeam" },
      {
        name: "description",
        content:
          "Selected work: GridMaster industrial SaaS, Specra AR retail, Vectra Flow logistics, SyncBridge middleware.",
      },
      { property: "og:title", content: "Portfolio — ZeroDayTeam" },
      {
        property: "og:description",
        content:
          "Industrial SaaS, AR commerce, logistics, and middleware projects shipped at scale.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const { cmsCaseStudies, cmsProjects } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-8 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[300px] gradient-mesh" />
          <ThemedImage
            baseName="hero-bg"
            alt=""
            className="absolute inset-x-0 top-0 w-full h-[300px] object-cover opacity-25 mix-blend-screen pointer-events-none"
          />
          <div className="absolute inset-x-0 top-0 h-[300px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">
              / Portfolio
            </p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal className="text-display text-5xl md:text-7xl" staggerMs={50}>
              Shipped, scaled, in production.
            </TextReveal>
          </h1>
        </section>
        <SelectedWorks cmsData={cmsProjects} />
        <CaseStudies cmsData={cmsCaseStudies} />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
