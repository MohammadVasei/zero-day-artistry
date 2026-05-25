import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const FALLBACK_WORKS = [
  {
    title: "GridMaster",
    tag: "Industrial SaaS",
    stack: "React / SaaS / IoT",
    blurb: "Real-time power plant monitoring dashboard replacing legacy SCADA tracking.",
    accent: "from-foreground to-foreground/70",
  },
  {
    title: "Specra AR",
    tag: "E-Commerce & Retail",
    stack: "Swift / Unity / ARKit",
    blurb: "Try-before-you-buy AR engine that cut product returns by 38%.",
    accent: "from-accent-gold to-accent-gold-soft",
  },
  {
    title: "Vectra Flow",
    tag: "Automotive & Logistics",
    stack: "Valhalla Engine / Kotlin / GIS",
    blurb: "Millisecond routing engine for last-mile fleet operations across the EU.",
    accent: "from-foreground to-accent-gold",
  },
  {
    title: "SyncBridge",
    tag: "Enterprise Middleware",
    stack: "Node.js / API Orchestration / n8n",
    blurb: "Zero-error invoice-to-fulfillment orchestration for B2B accounting systems.",
    accent: "from-accent-gold to-foreground",
  },
];

const ACCENT_CYCLE = [
  "from-foreground to-foreground/70",
  "from-accent-gold to-accent-gold-soft",
  "from-foreground to-accent-gold",
  "from-accent-gold to-foreground",
];

export function SelectedWorks({ cmsData }: { cmsData?: any[] }) {
  const works =
    cmsData && cmsData.length > 0
      ? cmsData.map((p: any, i: number) => ({
          title: p.title,
          tag: p.tag || "",
          stack: p.stack || "",
          blurb: p.blurb || "",
          accent: ACCENT_CYCLE[i % ACCENT_CYCLE.length],
        }))
      : FALLBACK_WORKS;

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-12">
        <ScrollReveal>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
              / Selected Works
            </p>
            <h2 className="text-display text-5xl md:text-6xl mt-3">Shipped at scale.</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <a
            href="/portfolio"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-accent-gold transition-colors"
          >
            View all <ArrowUpRight size={16} />
          </a>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {works.map((w, i) => (
          <ScrollReveal key={w.title} variant="scale" delay={i * 100}>
            <article className="group relative rounded-3xl border border-border overflow-hidden card-hover bg-card">
              <div
                className={`relative aspect-[16/10] bg-gradient-to-br ${w.accent} overflow-hidden`}
              >
                <div className="absolute inset-0 grain opacity-20" />
                <div className="absolute inset-6 rounded-2xl glass flex flex-col p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between text-background/70 text-xs font-mono">
                    <span>{w.tag.toLowerCase().replace(/\s/g, "_")}.tsx</span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-heading text-background text-4xl md:text-5xl font-bold">
                      {w.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6 flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest font-heading">
                      {w.tag}
                    </span>
                    <span className="font-mono text-muted-foreground">{w.stack}</span>
                  </div>
                  <p className="mt-3 text-foreground/80 text-sm leading-relaxed">{w.blurb}</p>
                </div>
                <ArrowUpRight className="shrink-0 mt-1 text-muted-foreground group-hover:text-accent-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
