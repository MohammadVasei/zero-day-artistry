import { Brain, Code2, Layers, ShieldCheck } from "lucide-react";

const cards = [
  { icon: Brain, title: "Architecture Discovery", body: "Stack audits across legacy and modern systems." },
  { icon: Layers, title: "Full-Stack Engineering", body: "From Valhalla routing engines to Spring Boot APIs." },
  { icon: Code2, title: "Middleware Mastery", body: "Custom orchestration that eliminates manual errors." },
  { icon: ShieldCheck, title: "Global Deployment", body: "EU-localized, resilient, zero-day ready launches." },
];

export function FocusGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
        <div>
          <p className="font-display text-3xl text-foreground/60">Hallå!</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Our focus is on bridging <span className="text-foreground/50">legacy stacks</span> with
            <span className="text-[--neon] [text-shadow:0_0_30px_var(--neon)]"> next-decade infrastructure</span>.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border p-5 hover:bg-secondary transition group">
              <div className="size-9 rounded-full bg-[--neon] flex items-center justify-center group-hover:scale-110 transition">
                <c.icon size={16} />
              </div>
              <h3 className="mt-4 font-medium">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
