import { ScrollReveal } from "@/components/scroll-reveal";
import { Linkedin, Github, Globe } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  stacks?: string[];
  photoUrl?: string;
  socialLinks?: { platform: string; url: string }[];
};

const FALLBACK_MEMBERS: TeamMember[] = [
  {
    name: "Mohammad Vasei",
    role: "Project Manager",
    bio: "The architect behind every successful delivery. Mohammad orchestrates cross-functional teams across time zones, turning complex technical requirements into actionable sprints. With a sharp eye for risk and a relentless focus on deadlines, he's guided dozens of enterprise projects from concept to production — on time, every time.",
    stacks: ["Agile", "Scrum", "Jira", "Confluence", "CI/CD", "DevOps"],
  },
];

const ICON_MAP: Record<string, typeof Globe> = {
  linkedin: Linkedin,
  github: Github,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function resolveMediaUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = (typeof process !== "undefined" && process.env?.VITE_PAYLOAD_API_URL) || "";
  return base ? `${base.replace(/\/$/, "")}${url}` : url;
}

export function TeamGrid({ cmsData }: { cmsData?: any[] }) {
  const members: TeamMember[] =
    cmsData && cmsData.length > 0
      ? cmsData.map((m: any) => ({
          name: m.name,
          role: m.role,
          bio: m.bio || "",
          stacks: m.stacks || [],
          photoUrl: typeof m.photo === "object" ? m.photo?.url : m.photo,
          socialLinks: m.socialLinks,
        }))
      : FALLBACK_MEMBERS;

  return (
    <section className="mx-auto max-w-4xl px-6 py-28">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
          / The People
        </p>
        <h2 className="text-display text-5xl md:text-6xl mt-3">The minds behind the code.</h2>
      </ScrollReveal>

      <div className="flex flex-col gap-6 mt-14">
        {members.map((m, i) => (
          <ScrollReveal key={m.name} delay={i * 120}>
            <div className="glass-card rounded-3xl overflow-hidden card-hover scan-line group">
              <div className="grid md:grid-cols-[200px_1fr] gap-0">
                {/* Avatar / Photo */}
                <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-neon/10 to-neon-soft/10 overflow-hidden">
                  {m.photoUrl ? (
                    <img
                      src={resolveMediaUrl(m.photoUrl)}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center min-h-[200px]">
                      <span className="text-display text-7xl text-neon/20 group-hover:text-neon/40 transition-colors duration-500">
                        {getInitials(m.name)}
                      </span>
                    </div>
                  )}
                  {/* Status dot */}
                  <span className="absolute bottom-3 right-3 status-dot" />
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-2xl font-bold glitch">{m.name}</h3>
                      <p className="text-neon text-sm font-mono mt-1">{m.role}</p>
                    </div>

                    {/* Social links */}
                    {m.socialLinks && m.socialLinks.length > 0 && (
                      <div className="flex items-center gap-3 pt-1">
                        {m.socialLinks.map((link) => {
                          const Icon = ICON_MAP[link.platform.toLowerCase()] || Globe;
                          return (
                            <a
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-neon transition-colors"
                              aria-label={`${m.name} on ${link.platform}`}
                            >
                              <Icon size={16} />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{m.bio}</p>

                  {/* Tech stack pills */}
                  {m.stacks && m.stacks.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {m.stacks.map((stack) => (
                        <span
                          key={stack}
                          className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-mono
                            border border-border bg-secondary text-muted-foreground
                            group-hover:border-neon/30 group-hover:text-foreground transition-all duration-300"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
