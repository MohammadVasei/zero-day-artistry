import { ArrowUpRight } from "lucide-react";

const works = [
  {
    title: "GridMaster",
    tag: "Industrial SaaS",
    stack: "React • SaaS • IoT",
    blurb: "Real-time power plant monitoring dashboard replacing legacy SCADA tracking.",
    accent: "from-foreground to-foreground/80",
  },
  {
    title: "Specra AR",
    tag: "E-Commerce & Retail",
    stack: "Swift • Unity • ARKit",
    blurb: "Try-before-you-buy AR engine that cut product returns by 38%.",
    accent: "from-[--neon] to-[--neon-soft]",
  },
  {
    title: "Vectra Flow",
    tag: "Automotive & Logistics",
    stack: "Valhalla Engine • Kotlin • GIS",
    blurb: "Millisecond routing engine for last-mile fleet operations across the EU.",
    accent: "from-foreground to-[--neon]",
  },
  {
    title: "SyncBridge",
    tag: "Enterprise Middleware",
    stack: "Node.js • API Orchestration • n8n",
    blurb: "Zero-error invoice-to-fulfillment orchestration for B2B accounting systems.",
    accent: "from-[--neon] to-foreground",
  },
];

export function SelectedWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">/ Selected Works</p>
          <h2 className="font-display text-5xl md:text-6xl mt-3">Shipped at scale.</h2>
        </div>
        <a href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-sm hover:opacity-70">
          View all <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {works.map((w) => (
          <article
            key={w.title}
            className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-card transition-all"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${w.accent} overflow-hidden`}>
              <div className="absolute inset-0 grain opacity-30" />
              <div className="absolute inset-6 rounded-2xl bg-background/10 backdrop-blur-sm border border-background/20 flex flex-col p-6">
                <div className="flex items-center justify-between text-background/80 text-xs font-mono">
                  <span>{w.tag.toLowerCase().replace(/\s/g, "_")}.tsx</span>
                  <span className="flex gap-1">
                    <span className="size-2 rounded-full bg-background/40" />
                    <span className="size-2 rounded-full bg-background/40" />
                    <span className="size-2 rounded-full bg-background/40" />
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-display text-background text-4xl md:text-5xl">{w.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6 flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest">{w.tag}</span>
                  <span className="font-mono text-muted-foreground">{w.stack}</span>
                </div>
                <p className="mt-3 text-foreground/80 text-sm leading-relaxed">{w.blurb}</p>
              </div>
              <ArrowUpRight className="shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
