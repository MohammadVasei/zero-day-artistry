import { Brain, Code2, Layers, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const cards = [
  { icon: Brain, title: "Architecture Discovery", body: "Stack audits across legacy and modern systems to map every bridge needed." },
  { icon: Layers, title: "Full-Stack Engineering", body: "From Valhalla routing engines to Spring Boot APIs — end-to-end delivery." },
  { icon: Code2, title: "Middleware Mastery", body: "Custom orchestration layers that eliminate manual errors at scale." },
  { icon: ShieldCheck, title: "Global Deployment", body: "EU-localized, resilient, zero-downtime launches across all regions." },
];

export function FocusGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <ScrollReveal>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ What We Do</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              Bridging legacy stacks with next-decade infrastructure.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <div className="glass-card rounded-2xl p-6 card-hover group">
                <div className="size-10 rounded-xl bg-foreground flex items-center justify-center
                  group-hover:bg-accent-gold transition-colors duration-300">
                  <c.icon size={18} className="text-background" />
                </div>
                <h3 className="mt-5 font-heading font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
