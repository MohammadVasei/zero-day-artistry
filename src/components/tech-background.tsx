import { useMemo } from "react";

const SNIPPETS = [
  "0x4F",
  "</>",
  "{0}",
  "0xFF",
  "init()",
  "deploy",
  "scale++",
  "sync",
  "0101",
  "1010",
  "λ",
  "Σ",
  "fetch",
  "build",
  "0day",
  "async",
  "void*",
  "Ø",
  ">>",
  "::fn",
];

export function TechBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        text: SNIPPETS[i % SNIPPETS.length],
        left: Math.random() * 100,
        duration: 20 + Math.random() * 25,
        delay: -Math.random() * 30,
        size: 10 + Math.random() * 4,
        bottom: -10 - Math.random() * 20,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 tech-grid" />
      {/* Floating code particles */}
      <div className="absolute inset-0 float-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 hero-glow opacity-40" />
    </div>
  );
}
