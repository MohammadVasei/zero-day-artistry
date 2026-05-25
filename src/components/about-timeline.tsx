import { ScrollReveal } from "@/components/scroll-reveal";

const rows = [
  { role: "Industrial SaaS", company: "GridMaster / Power Sector", years: "2021 - Now" },
  { role: "AR Commerce", company: "Specra / Retail Tech", years: "2019 - 2024" },
  { role: "Logistics Engine", company: "Vectra Flow / Automotive", years: "2017 - 2023" },
  { role: "Middleware Lead", company: "SyncBridge / Enterprise", years: "2014 - 2021" },
  { role: "Founding Engineers", company: "ZeroDayTeam / Collective", years: "2011 - 2014" },
];

export function AboutTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
          / Who We Are
        </p>
        <h2 className="text-display text-5xl md:text-7xl mt-3 max-w-3xl">
          Pushing boundaries <span className="text-muted-foreground">since 2011.</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <ScrollReveal variant="left">
          <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none" />
            <p className="relative text-lg leading-relaxed">
              At <span className="font-heading font-bold text-neon">ZeroDayTeam</span>, we don't
              just build apps — we architect digital resilience. What started in 2011 as a small
              collective of specialized freelancers has evolved into a powerhouse for high-stakes
              engineering.
            </p>
            <p className="relative text-sm text-background/70 mt-6 leading-relaxed">
              We thrive in the invisible layers of technology — the middleware that keeps
              enterprises running, the AR engines that transform retail, and the industrial SaaS
              platforms that monitor the power grid.
            </p>
          </div>
        </ScrollReveal>

        <div>
          <ul className="divide-y divide-border">
            {rows.map((r, i) => (
              <ScrollReveal key={r.role} delay={i * 80} as="li">
                <div className="grid grid-cols-3 gap-4 py-5 items-baseline">
                  <span className="font-heading text-lg font-semibold col-span-1">{r.role}</span>
                  <span className="text-sm text-muted-foreground col-span-1">{r.company}</span>
                  <span className="text-sm font-mono text-right col-span-1">{r.years}</span>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
