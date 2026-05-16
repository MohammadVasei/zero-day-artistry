import { ArrowUpRight, Sparkle } from "lucide-react";
import logo from "@/assets/zeroday-logo.png";

const LINES = [
  { prompt: "$", text: "ssh root@zeroday.team", delay: 200 },
  { prompt: ">", text: "auth ok · session opened", delay: 900, muted: true },
  { prompt: "$", text: "init --project enterprise-stack", delay: 1500 },
  { prompt: ">", text: "spinning middleware · industrial-saas · ar-commerce", delay: 2300, muted: true },
  { prompt: "$", text: "deploy --from zero --to scale", delay: 3100 },
  { prompt: ">", text: "✓ online · uptime 99.99% · 42ms median", delay: 3900, ok: true },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden scanlines">
      {/* Cyber-blue glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]">
        <div className="hero-glow absolute inset-x-[-10%] top-[-10%] h-[680px] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12">
        {/* top chip */}
        <div className="flex justify-center mb-10">
          <div className="pill bg-background/80 backdrop-blur">
            <Sparkle size={12} className="fill-foreground" />
            Industry & IoT · Automotive · AR & Immersive · PropTech · E-Commerce
          </div>
        </div>

        {/* Headline */}
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
              <span className="inline-block size-2 rounded-full bg-[--neon] animate-pulse" />
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

        {/* Terminal window */}
        <div className="relative mt-16 mx-auto max-w-3xl">
          <div className="terminal">
            {/* title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-[--neon]" />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <img src={logo} alt="" className="size-4 invert" />
                root@zeroday — zsh
              </div>
              <span className="text-[11px] text-white/40">80×24</span>
            </div>

            {/* body */}
            <div className="p-5 md:p-6 text-sm md:text-[15px] leading-relaxed min-h-[260px]">
              {LINES.map((l, i) => (
                <div
                  key={i}
                  className="term-line flex gap-3"
                  style={{ animationDelay: `${l.delay}ms` }}
                >
                  <span className="text-[--neon] select-none">{l.prompt}</span>
                  <span
                    className={
                      l.ok
                        ? "text-[--neon]"
                        : l.muted
                          ? "text-white/55"
                          : "text-white/95"
                    }
                  >
                    {l.text}
                  </span>
                </div>
              ))}
              <div
                className="term-line flex gap-3 mt-2"
                style={{ animationDelay: "4600ms" }}
              >
                <span className="text-[--neon] select-none">$</span>
                <span className="term-caret text-white/95" />
              </div>
            </div>
          </div>

          {/* floating status pills */}
          <div className="absolute -right-3 -top-3 pill bg-background shadow-card">
            <span className="size-1.5 rounded-full bg-[--neon] animate-pulse" /> uptime 99.99%
          </div>
          <div className="absolute -left-3 -bottom-3 pill bg-background shadow-card">
            <span className="size-1.5 rounded-full bg-foreground" /> 42ms median
          </div>
        </div>
      </div>
    </section>
  );
}
