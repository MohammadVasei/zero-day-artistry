import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden mt-12">
      <div className="absolute inset-x-0 top-0 h-[420px] hero-glow" />
      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <h2 className="font-display text-6xl md:text-8xl tracking-tight">Let's make it happen.</h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Always open to new collaborations, complex middleware puzzles, and global deployment challenges.
          Let's work together to bring your stack into its next decade.
        </p>
        <div className="mt-10 flex justify-center">
          <a href="/contact" className="pill-dark">
            Get in Touch <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
