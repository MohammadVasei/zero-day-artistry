import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeamGrid } from "@/components/team-grid";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — ZeroDayTeam" },
      {
        name: "description",
        content:
          "Meet the engineers, designers, and strategists behind ZeroDayTeam — a collective shipping enterprise middleware, industrial SaaS, and AR commerce.",
      },
      { property: "og:title", content: "Team — ZeroDayTeam" },
      {
        property: "og:description",
        content:
          "The people behind the invisible infrastructure that powers modern enterprises.",
      },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-8 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] gradient-mesh" />
          <div className="absolute inset-x-0 top-0 h-[400px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">
              / Team
            </p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal
              className="text-display text-5xl md:text-7xl lg:text-8xl"
              staggerMs={50}
            >
              Meet the collective.
            </TextReveal>
          </h1>
          <ScrollReveal delay={400}>
            <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A tight-knit team of engineers, architects, and strategists who
              thrive in the invisible layers of technology.
            </p>
          </ScrollReveal>
        </section>
        <TeamGrid />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
