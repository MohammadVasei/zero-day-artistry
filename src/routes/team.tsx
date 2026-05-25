import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeamGrid } from "@/components/team-grid";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { getTeamMembers } from "@/lib/payload.functions";

export const Route = createFileRoute("/team")({
  loader: async () => {
    const cmsTeamMembers = await getTeamMembers();
    return { cmsTeamMembers };
  },
  head: () => ({
    meta: [
      { title: "Our Team — Zero Day Development" },
      { name: "description", content: "Meet the engineers behind Zero Day Development — specialists in middleware, AR commerce, industrial SaaS, and infrastructure." },
      { property: "og:title", content: "Our Team — Zero Day Development" },
      { property: "og:description", content: "The engineering collective behind enterprise-grade infrastructure." },
    ],
  }),
  component: Team,
});

function Team() {
  const { cmsTeamMembers } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="pt-12">
        <section className="mx-auto max-w-5xl px-6 py-20 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] gradient-mesh" />
          <div className="absolute inset-x-0 top-0 h-[400px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Our Team</p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal className="text-display text-5xl md:text-7xl lg:text-8xl" staggerMs={50}>
              Built by engineers, for engineers.
            </TextReveal>
          </h1>
          <ScrollReveal delay={400}>
            <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're a tight-knit collective of specialists — each with deep expertise in the systems that keep enterprises running at scale.
            </p>
          </ScrollReveal>
        </section>
        <TeamGrid cmsData={cmsTeamMembers} />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
