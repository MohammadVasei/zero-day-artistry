import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutTimeline } from "@/components/about-timeline";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { ThemedImage } from "@/components/themed-image";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ZeroDayTeam" },
      {
        name: "description",
        content:
          "A collective of high-stakes engineers building the invisible layers of modern enterprise tech since 2011.",
      },
      { property: "og:title", content: "About ZeroDayTeam" },
      {
        property: "og:description",
        content: "From a freelance collective to a high-stakes engineering powerhouse.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="pt-12">
        <section className="mx-auto max-w-5xl px-6 py-20 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] gradient-mesh" />
          <ThemedImage
            baseName="about-bg"
            alt=""
            className="absolute inset-x-0 top-0 w-full h-[400px] object-cover opacity-40 mix-blend-screen pointer-events-none"
          />
          <div className="absolute inset-x-0 top-0 h-[400px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">
              / About
            </p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal className="text-display text-5xl md:text-7xl lg:text-8xl" staggerMs={50}>
              Architects of the invisible.
            </TextReveal>
          </h1>
          <ScrollReveal delay={400}>
            <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We build the middleware, orchestration, and infrastructure most teams never see — the
              kind that quietly carries millions of transactions, routes, and packets every day.
            </p>
          </ScrollReveal>
        </section>
        <AboutTimeline />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
