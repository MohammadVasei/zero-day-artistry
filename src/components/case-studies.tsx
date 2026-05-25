import { Activity, Boxes, Cpu, Map } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

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
    n: "01", title: "GridMaster", sector: "Industrial SaaS", stack: "React / SaaS / IoT",
    challenge: "Managing high-stakes power plant infrastructure and workforce safety in real-time.",
    success: "We engineered a robust industrial monitoring platform that replaced legacy manual tracking with high-precision data visualization, reducing operational downtime and improving worker safety protocols.",
    icon: Cpu, accent: "from-foreground/95 to-foreground/70",
  },
  {
    n: "02", title: "Specra AR", sector: "E-Commerce & Retail", stack: "Swift / Unity / ARKit",
    challenge: "Overcoming the uncertainty gap in digital retail where customers struggle to visualize products.",
    success: "By integrating a high-performance Augmented Reality engine into the retail workflow, we created a seamless try-before-you-buy experience that boosted user engagement and measurably decreased product return rates.",
    icon: Boxes, accent: "from-accent-gold to-accent-gold-soft",
  },
  {
    n: "03", title: "Vectra Flow", sector: "Automotive & Logistics", stack: "Valhalla Engine / Kotlin / GIS",
    challenge: "Optimizing complex urban delivery routes amidst shifting traffic patterns and fleet variables.",
    success: "Our team developed an intelligent routing engine powered by the Valhalla framework, providing millisecond-precise navigation for large-scale logistics, cutting fuel costs and mastering last-mile delivery.",
    icon: Map, accent: "from-foreground/90 to-accent-gold",
  },
  {
    n: "04", title: "SyncBridge", sector: "Enterprise Middleware", stack: "Node.js / API Orchestration / n8n",
    challenge: "Connecting disconnected accounting software with high-volume delivery APIs without data loss.",
    success: "We built a custom orchestration layer that automates the entire lifecycle from invoice to fulfillment. The middleware eliminates manual entry errors and provides a resilient, scalable bridge for real-time enterprise communication.",
    icon: Activity, accent: "from-accent-gold to-foreground/90",
  },
];

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-14">
        <ScrollReveal>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Case Studies</p>
            <h2 className="text-display text-5xl md:text-6xl mt-3">Challenges, met head-on.</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <span className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground font-mono">
            4 / 4 in production
          </span>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        {studies.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 100}>
            <article className="group relative rounded-3xl border border-border bg-card overflow-hidden card-hover">
              <div className="grid md:grid-cols-[260px_1fr] gap-0">
                <div className={`relative bg-gradient-to-br ${s.accent} p-8 flex flex-col justify-between min-h-[220px]`}>
                  <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
                  <div className="relative flex items-center justify-between text-background/70 text-xs font-mono">
                    <span>{s.title.toLowerCase().replace(/\s/g, "_")}.mdx</span>
                    <span className="opacity-70">{s.n}</span>
                  </div>
                  <div className="relative">
                    <s.icon className="text-background mb-3" size={22} />
                    <h3 className="font-heading text-background text-4xl md:text-5xl font-bold leading-none">{s.title}</h3>
                    <p className="text-background/70 text-xs mt-3 font-mono">{s.sector}</p>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest font-heading">{s.sector}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.stack}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-accent-gold">The Challenge</p>
                      <p className="mt-2 text-foreground/80 leading-relaxed text-sm">{s.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-foreground">The Success</p>
                      <p className="mt-2 text-foreground/80 leading-relaxed text-sm">{s.success}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
