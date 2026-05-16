const quotes = [
  {
    quote:
      "Zero Day rebuilt our entire orchestration layer in 11 weeks. We've eliminated 100% of manual entry errors since launch.",
    name: "Daniel Reed",
    role: "Founder, Novalytix",
  },
  {
    quote:
      "Their middleware now powers every Valhalla route across our EU fleet. Genuinely the best technical partners we've worked with.",
    name: "Sarah Nguyen",
    role: "Product Manager, FleetOps",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="rounded-3xl bg-secondary p-8 relative"
          >
            <span className="font-display text-7xl text-foreground/20 absolute top-4 right-6 leading-none">"</span>
            <blockquote className="text-foreground/90 leading-relaxed">{q.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-foreground to-[--neon]" />
              <div>
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
