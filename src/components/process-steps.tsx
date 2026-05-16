import { useEffect, useRef, useState } from "react";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We audit your stack—from Valhalla routing to Spring Boot—to map every legacy bridge needed.",
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture diagrams, middleware contracts, and UI flows shipped before a single line of code.",
  },
  {
    n: "03",
    title: "Deliver",
    body: "Production rollout with zero-downtime migration, observability, and 24/7 SRE handover.",
  },
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
            if (cur >= end) {
              setVal(end);
              clearInterval(id);
            } else setVal(cur);
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
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">/ Our Process Explained</p>
        <h2 className="font-display text-5xl md:text-6xl mt-3">Here's how it works.</h2>
      </div>

      <div className="relative grid md:grid-cols-3 gap-6">
        {/* dotted path */}
        <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px dotted-path opacity-40" />

        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative rounded-3xl border border-border bg-card/60 backdrop-blur p-8 hover:-translate-y-1 hover:shadow-card transition-all"
            style={{ marginTop: i === 1 ? "2rem" : 0 }}
          >
            <div className="font-display text-7xl text-foreground/90">
              <Counter target={s.n} />
            </div>
            <h3 className="font-display text-3xl mt-6">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.body}</p>
            <span className="absolute top-6 right-6 size-2 rounded-full bg-[--neon] shadow-[0_0_12px_var(--neon)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
