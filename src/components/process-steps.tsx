import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const steps = [
  { n: "01", title: "Discover", body: "We audit your stack — from Valhalla routing to Spring Boot — to map every legacy bridge needed." },
  { n: "02", title: "Design", body: "Architecture diagrams, middleware contracts, and UI flows shipped before a single line of code." },
  { n: "03", title: "Deliver", body: "Production rollout with zero-downtime migration, observability, and 24/7 SRE handover." },
];

function Counter({ target }: { target: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const end = parseInt(target, 10);
          let cur = 0;
          const id = setInterval(() => {
            cur += Math.max(1, Math.round(end / 24));
            if (cur >= end) { setVal(end); clearInterval(id); }
            else setVal(cur);
          }, 40);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toString().padStart(2, "0")}</span>;
}

export function ProcessSteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal className="text-center mb-16">
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Process</p>
        <h2 className="text-display text-5xl md:text-6xl mt-3">Here's how it works.</h2>
      </ScrollReveal>

      <div className="relative grid md:grid-cols-3 gap-6">
        <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-border" />

        {steps.map((s, i) => (
          <ScrollReveal key={s.n} delay={i * 150}>
            <div
              className="relative glass-card rounded-3xl p-8 card-hover"
              style={{ marginTop: i === 1 ? "2rem" : 0 }}
            >
              <div className="text-display text-7xl text-foreground/10">
                <Counter target={s.n} />
              </div>
              <h3 className="font-heading text-2xl font-bold mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.body}</p>
              <span className="absolute top-6 right-6 size-2 rounded-full bg-accent-gold" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
