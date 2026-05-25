import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

const LINES = [
  { prompt: "$", text: "ssh root@zeroday.team", delay: 200 },
  { prompt: ">", text: "auth ok · session opened", delay: 900, muted: true },
  { prompt: "$", text: "init --project enterprise-stack", delay: 1500 },
  {
    prompt: ">",
    text: "spinning middleware · industrial-saas · ar-commerce",
    delay: 2300,
    muted: true,
  },
  { prompt: "$", text: "deploy --from zero --to scale", delay: 3100 },
  {
    prompt: ">",
    text: "✓ online · uptime 99.99% · 42ms median",
    delay: 3900,
    ok: true,
  },
];

export function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        {/* Eyebrow */}
        <ScrollReveal className="flex justify-center mb-10">
          <div className="pill glass">
            <span className="status-dot" />
            Available for Q3 partnerships
          </div>
        </ScrollReveal>

        {/* Headline */}
        <h1 className="text-center">
          <TextReveal
            as="span"
            className="block text-display text-5xl md:text-7xl lg:text-[6rem]"
            staggerMs={60}
          >
            We architect systems
          </TextReveal>
          <TextReveal
            as="span"
            className="block text-display text-5xl md:text-7xl lg:text-[6rem] mt-2 text-neon"
            staggerMs={60}
          >
            from zero to scale.
          </TextReveal>
        </h1>

        {/* Sub-content */}
        <ScrollReveal delay={300}>
          <div className="mt-14 grid md:grid-cols-3 items-center gap-8">
            <div className="flex md:justify-start justify-center">
              <span className="font-mono text-xs tracking-widest uppercase text-neon-soft">
                Est. 2011
              </span>
            </div>

            <p className="text-center text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              A collective engineering team building the invisible middleware, industrial SaaS, and
              AR commerce layers that move enterprises forward.
            </p>

            <div className="flex md:justify-end justify-center">
              <a ref={ctaRef} href="/contact" className="pill-accent magnetic">
                Start a Project
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Terminal */}
        <ScrollReveal delay={500}>
          <div className="relative mt-16 mx-auto max-w-3xl">
            <div className="terminal">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-neon" />
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  root@zeroday — zsh
                </span>
                <span className="text-[11px] text-muted-foreground/70">80×24</span>
              </div>
              <div className="p-5 md:p-6 text-sm md:text-[15px] leading-relaxed min-h-[220px]">
                {LINES.map((l, i) => (
                  <div
                    key={i}
                    className="term-line flex gap-3"
                    style={{ animationDelay: `${l.delay}ms` }}
                  >
                    <span className="text-neon select-none">{l.prompt}</span>
                    <span
                      className={
                        l.ok
                          ? "text-neon-soft"
                          : l.muted
                            ? "text-muted-foreground"
                            : "text-foreground"
                      }
                    >
                      {l.text}
                    </span>
                  </div>
                ))}
                <div className="term-line flex gap-3 mt-2" style={{ animationDelay: "4600ms" }}>
                  <span className="text-neon select-none">$</span>
                  <span className="term-caret text-foreground" />
                </div>
              </div>
            </div>

            {/* Floating status pills */}
            <div className="absolute -right-3 -top-3 pill shadow-card pulse-ring rounded-full">
              <span className="status-dot" /> uptime 99.99%
            </div>
            <div className="absolute -left-3 -bottom-3 pill shadow-card rounded-full">
              <span className="inline-block size-1.5 rounded-full bg-foreground" /> 42ms median
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
