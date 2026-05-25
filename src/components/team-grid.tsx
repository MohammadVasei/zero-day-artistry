import { ScrollReveal } from "@/components/scroll-reveal";

const team = [
  {
    name: "Mohammad Vasei",
    role: "Project Manager",
    bio: "The architect behind every successful delivery. Mohammad orchestrates cross-functional teams across time zones, turning complex technical requirements into actionable sprints. With a sharp eye for risk and a relentless focus on deadlines, he's guided dozens of enterprise projects from concept to production — on time, every time.",
    stacks: ["Agile", "Scrum", "Jira", "Confluence", "CI/CD", "DevOps"],
    avatar: null, // placeholder
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function TeamGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
          / The Team
        </p>
        <h2 className="text-display text-5xl md:text-6xl mt-3">
          The people behind the code.
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <ScrollReveal key={member.name} delay={i * 120} variant="scale">
            <div className="group glass-card rounded-3xl p-8 card-hover scan-line relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-neon/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Avatar */}
              <div className="relative mb-6">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-neon/20 group-hover:border-neon/50 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-neon/10 border-2 border-neon/20 flex items-center justify-center group-hover:border-neon/50 group-hover:bg-neon/20 transition-all duration-500 group-hover:scale-105">
                    <span className="text-2xl font-heading font-bold text-neon">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                {/* Status indicator */}
                <span className="absolute -bottom-1 -right-1 status-dot" />
              </div>

              {/* Info */}
              <h3 className="font-heading text-xl font-bold glitch">{member.name}</h3>
              <p className="text-neon text-sm font-mono mt-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                {member.bio}
              </p>

              {/* Tech stack pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {member.stacks.map((stack) => (
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
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
