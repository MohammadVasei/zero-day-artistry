import { Activity, Boxes, Cpu, Map } from "lucide-react";

type Study = {
  n: string;
  title: string;
  sector: string;
  stack: string;
  challenge: string;
  success: string;
  icon: typeof Activity;
  accent: string;
};

const studies: Study[] = [
  {
    n: "01",
    title: "GridMaster",
    sector: "Industrial SaaS",
    stack: "React • SaaS • IoT",
    challenge:
      "Managing high-stakes power plant infrastructure and workforce safety in real-time.",
    success:
      "We engineered a robust industrial monitoring platform that replaced legacy manual tracking with high-precision data visualization. The platform gives site managers mission-critical insights, significantly reducing operational downtime and improving worker safety protocols.",
    icon: Cpu,
    accent: "from-foreground/95 to-foreground/70",
  },
  {
    n: "02",
    title: "Specra AR",
    sector: "E-Commerce & Retail",
    stack: "Swift • Unity • ARKit",
    challenge:
      "Overcoming the “uncertainty gap” in digital retail where customers struggle to visualize products.",
    success:
      "By integrating a high-performance Augmented Reality engine into the retail workflow, we created a seamless try-before-you-buy experience. The innovation boosted user engagement metrics and directly contributed to a measurable decrease in product return rates for our partners.",
    icon: Boxes,
    accent: "from-[--neon] to-[--neon-soft]",
  },
  {
    n: "03",
    title: "Vectra Flow",
    sector: "Automotive & Logistics",
    stack: "Valhalla Engine • Kotlin • GIS",
    challenge:
      "Optimizing complex urban delivery routes amidst shifting traffic patterns and fleet variables.",
    success:
      "Our team developed an intelligent routing engine powered by the Valhalla framework, providing millisecond-precise navigation for large-scale logistics. The platform synchronizes live traffic data with fleet telemetry, allowing providers to cut fuel costs and master the challenges of last-mile delivery.",
    icon: Map,
    accent: "from-foreground/90 to-[--neon]",
  },
  {
    n: "04",
    title: "SyncBridge",
    sector: "Enterprise Middleware",
    stack: "Node.js • API Orchestration • n8n",
    challenge:
      "Connecting disconnected accounting software with high-volume delivery APIs without data loss.",
    success:
      "We built a custom orchestration layer that automates the entire lifecycle of an order from invoice to fulfillment. The middleware eliminates manual entry errors and provides a resilient, scalable bridge that lets enterprise systems communicate in real-time.",
    icon: Activity,
    accent: "from-[--neon] to-foreground/90",
  },
];

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            / Case Studies
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-3">
            Challenges, met head-on.
          </h2>
        </div>
        <span className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground font-mono">
          4 / 4 in production
        </span>
      </div>

      <div className="space-y-6">
        {studies.map((s) => (
          <article
            key={s.title}
            className="group relative rounded-3xl border border-border bg-card/70 backdrop-blur overflow-hidden hover:shadow-card transition-all"
          >
            <div className="grid md:grid-cols-[260px_1fr] gap-0">
              {/* Visual rail */}
              <div
                className={`relative bg-gradient-to-br ${s.accent} p-8 flex flex-col justify-between min-h-[220px]`}
              >
                <div className="absolute inset-0 grain opacity-30" />
                <div className="relative flex items-center justify-between text-background/80 text-xs font-mono">
                  <span>{s.title.toLowerCase().replace(/\s/g, "_")}.mdx</span>
                  <span className="opacity-70">{s.n}</span>
                </div>
                <div className="relative">
                  <s.icon className="text-background mb-3" size={22} />
                  <h3 className="font-display text-background text-4xl md:text-5xl leading-none">
                    {s.title}
                  </h3>
                  <p className="text-background/80 text-xs mt-3 font-mono">
                    {s.sector}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest">
                    {s.sector}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.stack}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[--neon]">
                      The Challenge
                    </p>
                    <p className="mt-2 text-foreground/85 leading-relaxed text-sm">
                      {s.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-foreground">
                      The Success
                    </p>
                    <p className="mt-2 text-foreground/85 leading-relaxed text-sm">
                      {s.success}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
