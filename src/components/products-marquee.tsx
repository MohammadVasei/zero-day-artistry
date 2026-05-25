import { Route as RouteIcon, ScanLine, CpuIcon, AudioWaveform, Workflow } from "lucide-react";

const items = [
  { icon: RouteIcon, label: "Vectra Flow" },
  { icon: ScanLine, label: "Specra AR" },
  { icon: CpuIcon, label: "GridMaster" },
  { icon: AudioWaveform, label: "Lumina Voice" },
  { icon: Workflow, label: "SyncBridge" },
];

export function ProductsMarquee() {
  const loop = [...items, ...items, ...items];
  return (
    <section className="relative py-6 border-y border-border/40 overflow-hidden">
      <div className="marquee-track gap-12">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-muted-foreground shrink-0 px-4">
            <it.icon size={16} strokeWidth={1.5} />
            <span className="font-heading font-semibold text-foreground/70 text-sm tracking-wide">
              {it.label}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              in production
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
