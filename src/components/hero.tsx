import { ArrowUpRight, Sparkle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Green glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]">
        <div className="hero-glow absolute inset-x-[-10%] top-[-10%] h-[680px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12">
        {/* top chip */}
        <div className="flex justify-center mb-10">
          <div className="pill bg-background/80 backdrop-blur">
            <Sparkle size={12} className="fill-foreground" />
            Featured · Logistics · Middleware · Industrial SaaS · E-Commerce
          </div>
        </div>

        {/* Headline drops in letter by letter */}
        <h1 className="text-center font-medium tracking-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl">
            {"We architect".split("").map((c, i) => (
              <span key={i} className="inline-block drop-in" style={{ animationDelay: `${i * 40}ms` }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span className="block font-display text-6xl md:text-8xl lg:text-9xl mt-2">
            {"From Zero Day to Scale.".split("").map((c, i) => (
              <span key={i} className="inline-block drop-in" style={{ animationDelay: `${400 + i * 35}ms` }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid md:grid-cols-3 items-center gap-6">
          <div className="flex md:justify-start justify-center">
            <span className="pill bg-background">
              <span className="inline-block size-2 rounded-full bg-[--neon]" />
              Available for Q3 partnerships
            </span>
          </div>

          <p className="text-center text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            A collective engineering team building the invisible middleware,
            industrial SaaS, and AR commerce layers that move enterprises forward.
          </p>

          <div className="flex md:justify-end justify-center">
            <a href="/contact" className="pill-dark">
              Get in Touch
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Floating "system" object instead of portrait */}
        <div className="relative mt-16 flex justify-center">
          <div className="float-slow relative">
            <div className="size-64 md:size-80 rounded-full bg-gradient-to-br from-foreground via-foreground to-[--neon] shadow-[var(--shadow-glow)]">
              <div className="absolute inset-3 rounded-full border border-background/20" />
              <div className="absolute inset-8 rounded-full border border-background/10" />
              <div className="absolute inset-14 rounded-full bg-background/10 backdrop-blur-xl flex items-center justify-center">
                <span className="font-display text-background text-5xl">Ø</span>
              </div>
            </div>
            <div className="absolute -right-6 -top-2 pill bg-background shadow-card">
              <span className="size-1.5 rounded-full bg-[--neon]" /> uptime 99.99%
            </div>
            <div className="absolute -left-10 bottom-4 pill bg-background shadow-card">
              <span className="size-1.5 rounded-full bg-foreground" /> 42ms median
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
