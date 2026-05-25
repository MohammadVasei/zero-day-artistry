import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        <ScrollReveal className="flex justify-center mb-10">
          <div className="pill glass">
            <span className="inline-block size-2 rounded-full bg-accent-gold animate-pulse" />
            Available for Q3 partnerships
          </div>
        </ScrollReveal>

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
            className="block text-display text-5xl md:text-7xl lg:text-[6rem] mt-2"
            staggerMs={60}
          >
            from zero to scale.
          </TextReveal>
        </h1>

        <ScrollReveal delay={300}>
          <div className="mt-14 grid md:grid-cols-3 items-center gap-8">
            <div className="flex md:justify-start justify-center">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs tracking-widest uppercase text-accent-gold">
                  Est. 2011
                </span>
              </div>
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

        <ScrollReveal delay={500}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "99.99%", label: "Uptime SLA" },
              { value: "42ms", label: "Median Response" },
              { value: "14+", label: "Years Shipping" },
              { value: "100%", label: "Error Reduction" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center card-hover">
                <div className="text-2xl md:text-3xl font-heading font-bold">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground font-mono tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
