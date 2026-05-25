import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type RevealVariant = "up" | "left" | "scale";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  left: "reveal-left",
  scale: "reveal-scale",
};

export function ScrollReveal({
  children,
  variant = "up",
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <Tag
      ref={ref as any}
      className={`${variantClass[variant]} ${isRevealed ? "revealed" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
