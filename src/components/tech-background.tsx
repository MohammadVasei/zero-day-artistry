import { useMemo, useEffect, useRef } from "react";

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
  "λ",
  "fetch",
  "build",
  "async",
  "void*",
  "Ø",
  ">>",
];

export function TechBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--glow-x", `${e.clientX}px`);
      el.style.setProperty("--glow-y", `${e.clientY}px`);
      el.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        text: SNIPPETS[i % SNIPPETS.length],
        left: Math.random() * 100,
        duration: 22 + Math.random() * 20,
        delay: -Math.random() * 30,
        size: 10 + Math.random() * 3,
        bottom: -10 - Math.random() * 20,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 tech-grid" />

      <div className="absolute inset-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.85 0.25 145 / 0.04), transparent 60%)",
        }}
      />

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
    </div>
  );
}
