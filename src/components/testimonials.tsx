import { ScrollReveal } from "@/components/scroll-reveal";

const quotes = [
  {
    quote:
      "Zero Day rebuilt our entire orchestration layer in 11 weeks. We've eliminated 100% of manual entry errors since launch.",
    name: "Daniel Reed",
    role: "Founder, Novalytix",
  },
  {
    quote:
      "Their middleware now powers every Valhalla route across our EU fleet. Genuinely the best technical partners we've worked with.",
    name: "Sarah Nguyen",
    role: "Product Manager, FleetOps",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((q, i) => (
          <ScrollReveal key={q.name} delay={i * 120}>
            <figure className="glass-card rounded-3xl p-8 relative h-full">
              <span className="text-display text-8xl text-foreground/[0.05] absolute top-4 right-6 leading-none select-none">
                &ldquo;
              </span>
              <blockquote className="text-foreground/85 leading-relaxed relative z-10">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-foreground to-accent-gold" />
                <div>
                  <div className="text-sm font-heading font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
