import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

export function CTASection() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section className="relative overflow-hidden mt-12">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grain" />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <ScrollReveal>
          <h2 className="text-display text-6xl md:text-8xl">Let's make it happen.</h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Always open to new collaborations, complex middleware puzzles, and global deployment challenges.
            Let's work together to bring your stack into its next decade.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center">
            <a ref={ctaRef} href="/contact" className="pill-accent magnetic">
              Start a Project <ArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
