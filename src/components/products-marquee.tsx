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
    <section className="relative py-8 border-y border-border/60 overflow-hidden">
      <div className="marquee flex gap-16 whitespace-nowrap w-max">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-muted-foreground">
            <it.icon size={18} />
            <span className="font-medium text-foreground/80">{it.label}</span>
            <span className="text-xs opacity-50">· in production</span>
          </div>
        ))}
      </div>
    </section>
  );
}
