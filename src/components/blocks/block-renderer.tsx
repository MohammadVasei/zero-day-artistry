import { ArrowUpRight } from "lucide-react";

/**
 * Block renderer — maps Payload `blockType` strings to React components.
 * To add a new widget: define its block in payload-cms/payload.config.ts
 * with a matching slug, then add a case below.
 */

type Block = Record<string, any> & { blockType: string; id?: string };

export function BlockRenderer({ blocks }: { blocks?: Block[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <>
      {blocks.map((b, i) => (
        <RenderBlock key={b.id ?? i} block={b} />
      ))}
    </>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.blockType) {
    case "hero":
      return <HeroBlock {...block} />;
    case "terminal":
      return <TerminalBlock {...block} />;
    case "richText":
      return <RichTextBlock {...block} />;
    case "image":
      return <ImageBlock {...block} />;
    case "processSteps":
      return <ProcessStepsBlock {...block} />;
    case "marquee":
      return <MarqueeBlock {...block} />;
    case "selectedWorks":
      return <SelectedWorksBlock {...block} />;
    case "cta":
      return <CtaBlock {...block} />;
    case "spacer":
      return <SpacerBlock {...block} />;
    case "html":
      return <HtmlBlock {...block} />;
    default:
      return (
        <div className="mx-auto max-w-3xl px-6 py-4 text-sm text-muted-foreground">
          Unknown widget: <code>{block.blockType}</code>
        </div>
      );
  }
}

/* ─── Block components ─────────────────────────────────────────── */

function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: Block) {
  return (
    <section className="relative overflow-hidden scanlines">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]">
        <div className="hero-glow absolute inset-x-[-10%] top-[-10%] h-[680px] opacity-70" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
        {eyebrow && (
          <div className="pill bg-background/80 backdrop-blur inline-flex mb-8">{eyebrow}</div>
        )}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">{subheadline}</p>
        )}
        {(primaryCtaLabel || secondaryCtaLabel) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {primaryCtaLabel && (
              <a
                href={primaryCtaHref || "#"}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {primaryCtaLabel} <ArrowUpRight size={16} />
              </a>
            )}
            {secondaryCtaLabel && (
              <a
                href={secondaryCtaHref || "#"}
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TerminalBlock({ title = "root@zeroday — zsh", lines = [] }: Block) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="terminal">
        <div className="terminal-titlebar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">{title}</span>
        </div>
        <div className="terminal-body font-mono text-sm">
          {lines.map((l: any, i: number) => (
            <div
              key={i}
              className="term-line"
              style={{ animationDelay: `${l.delayMs ?? i * 400}ms` }}
            >
              <span className="text-primary mr-2">{l.prompt}</span>
              <span
                className={
                  l.tone === "muted"
                    ? "text-muted-foreground"
                    : l.tone === "ok"
                      ? "text-primary"
                      : l.tone === "warn"
                        ? "text-yellow-400"
                        : l.tone === "error"
                          ? "text-red-400"
                          : ""
                }
              >
                {l.text}
              </span>
            </div>
          ))}
          <div className="term-caret">▍</div>
        </div>
      </div>
    </section>
  );
}

function RichTextBlock({ content, maxWidth = "prose" }: Block) {
  const width =
    maxWidth === "narrow"
      ? "max-w-2xl"
      : maxWidth === "wide"
        ? "max-w-5xl"
        : maxWidth === "full"
          ? "max-w-none"
          : "max-w-3xl";
  return (
    <section className={`mx-auto ${width} px-6 py-10`}>
      <div className="prose prose-invert max-w-none">{serializeLexical(content)}</div>
    </section>
  );
}

function ImageBlock({ image, caption, aspect = "auto" }: Block) {
  const src = typeof image === "string" ? image : image?.url;
  const alt = (typeof image === "object" && image?.alt) || caption || "";
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
        ? "aspect-video"
        : aspect === "wide"
          ? "aspect-[21/9]"
          : "";
  if (!src) return null;
  return (
    <figure className="mx-auto max-w-5xl px-6 py-10">
      <img
        src={resolveMediaUrl(src)}
        alt={alt}
        className={`w-full rounded-lg object-cover ${aspectClass}`}
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ProcessStepsBlock({ title, steps = [] }: Block) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {title && <h2 className="font-display text-3xl md:text-5xl mb-10">{title}</h2>}
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((s: any, i: number) => (
          <li key={i} className="rounded-lg border border-border p-6 bg-card/40">
            <div className="text-xs font-mono text-primary mb-2">
              {s.number ?? String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-lg font-medium">{s.title}</h3>
            {s.description && <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function MarqueeBlock({ items = [], speed = "normal" }: Block) {
  const dur = speed === "slow" ? "60s" : speed === "fast" ? "20s" : "40s";
  return (
    <section className="overflow-hidden border-y border-border py-6 my-10">
      <div className="marquee" style={{ animationDuration: dur }}>
        {[...items, ...items].map((it: any, i: number) => (
          <span key={i} className="mx-8 font-mono text-sm text-muted-foreground whitespace-nowrap">
            · {it.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function SelectedWorksBlock({ title, projects = [] }: Block) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {title && <h2 className="font-display text-3xl md:text-5xl mb-10">{title}</h2>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p: any, i: number) => {
          const img = typeof p.image === "string" ? p.image : p.image?.url;
          return (
            <a
              key={i}
              href={p.href || "#"}
              className="group block rounded-lg border border-border overflow-hidden bg-card/40 hover:border-primary/50 transition"
            >
              {img && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={resolveMediaUrl(img)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-5">
                {p.tag && <div className="text-xs font-mono text-primary mb-2">{p.tag}</div>}
                <h3 className="text-lg font-medium">{p.title}</h3>
                {p.subtitle && <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function CtaBlock({ headline, body, ctaLabel, ctaHref }: Block) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h2 className="font-display text-4xl md:text-6xl">{headline}</h2>
      {body && <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">{body}</p>}
      {ctaLabel && (
        <a
          href={ctaHref || "#"}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {ctaLabel} <ArrowUpRight size={16} />
        </a>
      )}
    </section>
  );
}

function SpacerBlock({ size = "md" }: Block) {
  const h = size === "sm" ? "h-8" : size === "lg" ? "h-32" : size === "xl" ? "h-48" : "h-16";
  return <div className={h} aria-hidden />;
}

function HtmlBlock({ html }: Block) {
  return (
    <section
      className="mx-auto max-w-5xl px-6 py-10"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

/* ─── Helpers ─────────────────────────────────────────────────── */

function resolveMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  // relative URL from Payload — prefix the CMS origin if set client-side
  const base = (import.meta as any).env?.VITE_PAYLOAD_API_URL || "";
  return base ? `${base.replace(/\/$/, "")}${url}` : url;
}

/**
 * Minimal Lexical → React serializer. Handles paragraphs, headings, lists,
 * links, bold/italic/underline. Extend as needed.
 */
function serializeLexical(node: any, key: any = 0): any {
  if (!node) return null;
  if (node.root) return node.root.children?.map((c: any, i: number) => serializeLexical(c, i));
  if (Array.isArray(node)) return node.map((c, i) => serializeLexical(c, i));

  const children = node.children?.map((c: any, i: number) => serializeLexical(c, i));

  switch (node.type) {
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading": {
      const Tag = (node.tag || "h2") as any;
      return <Tag key={key}>{children}</Tag>;
    }
    case "list":
      return node.tag === "ol" ? <ol key={key}>{children}</ol> : <ul key={key}>{children}</ul>;
    case "listitem":
      return <li key={key}>{children}</li>;
    case "link":
      return (
        <a key={key} href={node.fields?.url || "#"}>
          {children}
        </a>
      );
    case "linebreak":
      return <br key={key} />;
    case "text": {
      let el: any = node.text;
      if (node.format & 1) el = <strong>{el}</strong>;
      if (node.format & 2) el = <em>{el}</em>;
      if (node.format & 8) el = <u>{el}</u>;
      if (node.format & 16) el = <code>{el}</code>;
      return <span key={key}>{el}</span>;
    }
    default:
      return children ? <div key={key}>{children}</div> : null;
  }
}
