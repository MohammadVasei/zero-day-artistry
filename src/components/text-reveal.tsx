import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Splits text into words and animates each on scroll entry.
 * Each word gets a staggered delay for a cinematic reveal.
 *
 * SSR-safe: renders with `revealed` class so content is visible
 * before JavaScript hydrates.
 */
export function TextReveal({
  children,
  className = "",
  staggerMs = 50,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  staggerMs?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const words = children.split(" ");

  return (
    <Tag
      ref={ref as any}
      className={`text-split ${isRevealed ? "revealed" : ""} ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} style={{ transitionDelay: `${i * staggerMs}ms` }}>
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
