# Seed Script + Team Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a seed script that populates Payload CMS with all frontend content (testimonials, case studies, projects with placeholder images, team members, site settings), add a TeamMembers collection, a new `/team` route, and update navigation.

**Architecture:** A standalone Node.js script (`payload-cms/seed.mjs`) that authenticates with the Payload REST API, generates placeholder images via the `sharp` library (already installed), uploads them to the Media collection, then creates documents in all collections. A new `team-members` collection stores team data. A new `/team` frontend route fetches and displays team members with scroll animations.

**Tech Stack:** Node.js script using `sharp` for image generation, Payload REST API for data insertion. Frontend: TanStack Start (React 19), Tailwind CSS 4.

---

## File Structure Overview

### New Files
- `payload-cms/seed.mjs` — Seed script that populates all collections via REST API
- `payload-cms/collections/TeamMembers.ts` — New Payload collection for team members
- `src/routes/team.tsx` — New frontend route for the team page
- `src/components/team-grid.tsx` — Team member card grid component

### Modified Files
- `payload-cms/payload.config.ts` — Register TeamMembers collection
- `payload-cms/package.json` — Add `"seed"` script
- `src/lib/payload.functions.ts` — Add `getTeamMembers` server function
- `src/components/site-header.tsx` — Add "Team" nav link
- `src/components/site-footer.tsx` — Add "Team" nav link

---

## Task 1: Create TeamMembers Payload Collection

**Files:**
- Create: `payload-cms/collections/TeamMembers.ts`
- Modify: `payload-cms/payload.config.ts` (add import + register)

- [ ] **Step 1: Create `payload-cms/collections/TeamMembers.ts`**

```ts
import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
```

- [ ] **Step 2: Register TeamMembers in `payload-cms/payload.config.ts`**

Add import at the top of the file (after the SiteSettings import on line 10):

```ts
import { TeamMembers as TeamMembersCollection } from "./collections/TeamMembers";
```

Then add `TeamMembersCollection` to the `collections` array in `buildConfig()`. Find the line:

```ts
    ProjectsCollection,
```

And add after it:

```ts
    TeamMembersCollection,
```

- [ ] **Step 3: Restart Payload CMS to pick up the new collection**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry/payload-cms && pkill -f "next dev"; sleep 2; rm -rf .next && npm run dev &`

Wait 15 seconds, then verify:

```bash
curl -s http://localhost:3000/api/team-members | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'TeamMembers: {d[\"totalDocs\"]} docs')"
```

Expected: `TeamMembers: 0 docs`

- [ ] **Step 4: Commit**

```bash
git add payload-cms/collections/TeamMembers.ts payload-cms/payload.config.ts
git commit -m "feat: add TeamMembers collection to Payload CMS"
```

---

## Task 2: Create Seed Script

**Files:**
- Create: `payload-cms/seed.mjs`
- Modify: `payload-cms/package.json` (add script)

- [ ] **Step 1: Add seed script to `payload-cms/package.json`**

In the `"scripts"` section, add:

```json
"seed": "node seed.mjs"
```

- [ ] **Step 2: Create `payload-cms/seed.mjs`**

```js
/**
 * Seed script — populates Payload CMS with all frontend content.
 *
 * Usage: cd payload-cms && npm run seed
 *
 * Prerequisites: Payload CMS must be running at PAYLOAD_URL (default http://localhost:3000)
 * and the admin user must exist (email/password below).
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────
const PAYLOAD_URL = process.env.PAYLOAD_URL || "http://localhost:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "moosaalialblooshe@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ZeroDay2024!";

// ─── Helpers ──────────────────────────────────────────────────────

async function login() {
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  console.log("✓ Logged in as", ADMIN_EMAIL);
  return data.token;
}

async function getCount(token, collection) {
  const res = await fetch(`${PAYLOAD_URL}/api/${collection}?limit=0`, {
    headers: { Authorization: `JWT ${token}` },
  });
  const data = await res.json();
  return data.totalDocs || 0;
}

async function createDoc(token, collection, doc) {
  const res = await fetch(`${PAYLOAD_URL}/api/${collection}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(doc),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to create ${collection}: ${res.status} ${body}`);
  }
  return (await res.json()).doc;
}

async function updateGlobal(token, slug, data) {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update ${slug}: ${res.status}`);
  return await res.json();
}

async function uploadMedia(token, filePath, alt) {
  const form = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/png" });
  form.append("file", blob, path.basename(filePath));
  form.append("alt", alt);

  const res = await fetch(`${PAYLOAD_URL}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${token}` },
    body: form,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to upload media: ${res.status} ${body}`);
  }
  return (await res.json()).doc;
}

// ─── Image Generation ─────────────────────────────────────────────

const PRODUCT_COLORS = {
  GridMaster: { bg: "#1e293b", accent: "#ca8a04", text: "#f8fafc" },
  "Specra AR": { bg: "#ca8a04", accent: "#1e293b", text: "#f8fafc" },
  "Vectra Flow": { bg: "#0f172a", accent: "#ca8a04", text: "#f8fafc" },
  SyncBridge: { bg: "#ca8a04", accent: "#0f172a", text: "#fafaf9" },
};

const AVATAR_COLORS = [
  { bg: "#1e293b", text: "#ca8a04" },
  { bg: "#ca8a04", text: "#1e293b" },
  { bg: "#334155", text: "#fafaf9" },
];

async function generateProductImage(name, outputPath) {
  const colors = PRODUCT_COLORS[name] || { bg: "#1e293b", accent: "#ca8a04", text: "#f8fafc" };
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase();

  const svg = `<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="500" fill="${colors.bg}"/>
    <rect x="30" y="30" width="740" height="440" rx="16" fill="${colors.bg}" stroke="${colors.accent}" stroke-width="2" opacity="0.6"/>
    <circle cx="400" cy="200" r="60" fill="${colors.accent}" opacity="0.15"/>
    <text x="400" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" font-weight="700" fill="${colors.accent}">${initials}</text>
    <text x="400" y="340" text-anchor="middle" font-family="system-ui,sans-serif" font-size="36" font-weight="800" fill="${colors.text}" letter-spacing="-1">${name}</text>
    <text x="400" y="380" text-anchor="middle" font-family="monospace" font-size="14" fill="${colors.text}" opacity="0.5">ZERO DAY DEVELOPMENT</text>
    <line x1="150" y1="420" x2="650" y2="420" stroke="${colors.accent}" stroke-width="1" opacity="0.3"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

async function generateAvatarImage(name, index, outputPath) {
  const colors = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase();

  const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="${colors.bg}" rx="200"/>
    <text x="200" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="120" font-weight="700" fill="${colors.text}">${initials}</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

// ─── Seed Data ────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "Zero Day rebuilt our entire orchestration layer in 11 weeks. We've eliminated 100% of manual entry errors since launch.",
    name: "Daniel Reed",
    role: "Founder, Novalytix",
    featured: true,
    sortOrder: 1,
  },
  {
    quote: "Their middleware now powers every Valhalla route across our EU fleet. Genuinely the best technical partners we've worked with.",
    name: "Sarah Nguyen",
    role: "Product Manager, FleetOps",
    featured: true,
    sortOrder: 2,
  },
];

const PROJECTS = [
  {
    title: "GridMaster",
    tag: "Industrial SaaS",
    stack: "React / SaaS / IoT",
    blurb: "Real-time power plant monitoring dashboard replacing legacy SCADA tracking.",
    status: "published",
    sortOrder: 1,
  },
  {
    title: "Specra AR",
    tag: "E-Commerce & Retail",
    stack: "Swift / Unity / ARKit",
    blurb: "Try-before-you-buy AR engine that cut product returns by 38%.",
    status: "published",
    sortOrder: 2,
  },
  {
    title: "Vectra Flow",
    tag: "Automotive & Logistics",
    stack: "Valhalla Engine / Kotlin / GIS",
    blurb: "Millisecond routing engine for last-mile fleet operations across the EU.",
    status: "published",
    sortOrder: 3,
  },
  {
    title: "SyncBridge",
    tag: "Enterprise Middleware",
    stack: "Node.js / API Orchestration / n8n",
    blurb: "Zero-error invoice-to-fulfillment orchestration for B2B accounting systems.",
    status: "published",
    sortOrder: 4,
  },
];

const CASE_STUDIES = [
  {
    title: "GridMaster",
    sector: "Industrial SaaS",
    stack: "React / SaaS / IoT",
    challenge: "Managing high-stakes power plant infrastructure and workforce safety in real-time.",
    success: "We engineered a robust industrial monitoring platform that replaced legacy manual tracking with high-precision data visualization, reducing operational downtime and improving worker safety protocols.",
    status: "published",
    sortOrder: 1,
  },
  {
    title: "Specra AR",
    sector: "E-Commerce & Retail",
    stack: "Swift / Unity / ARKit",
    challenge: "Overcoming the uncertainty gap in digital retail where customers struggle to visualize products.",
    success: "By integrating a high-performance Augmented Reality engine into the retail workflow, we created a seamless try-before-you-buy experience that boosted user engagement and measurably decreased product return rates.",
    status: "published",
    sortOrder: 2,
  },
  {
    title: "Vectra Flow",
    sector: "Automotive & Logistics",
    stack: "Valhalla Engine / Kotlin / GIS",
    challenge: "Optimizing complex urban delivery routes amidst shifting traffic patterns and fleet variables.",
    success: "Our team developed an intelligent routing engine powered by the Valhalla framework, providing millisecond-precise navigation for large-scale logistics, cutting fuel costs and mastering last-mile delivery.",
    status: "published",
    sortOrder: 3,
  },
  {
    title: "SyncBridge",
    sector: "Enterprise Middleware",
    stack: "Node.js / API Orchestration / n8n",
    challenge: "Connecting disconnected accounting software with high-volume delivery APIs without data loss.",
    success: "We built a custom orchestration layer that automates the entire lifecycle from invoice to fulfillment. The middleware eliminates manual entry errors and provides a resilient, scalable bridge for real-time enterprise communication.",
    status: "published",
    sortOrder: 4,
  },
];

const TEAM_MEMBERS = [
  {
    name: "Erik Lindqvist",
    role: "Lead Architect",
    bio: "15 years of infrastructure engineering. Former platform lead at Spotify. Specializes in distributed systems and real-time data pipelines.",
    status: "published",
    sortOrder: 1,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
  {
    name: "Amira Hassan",
    role: "Senior Engineer",
    bio: "Full-stack engineer with deep expertise in AR/VR commerce platforms. Built Specra AR from prototype to production.",
    status: "published",
    sortOrder: 2,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
  {
    name: "Jonas Weber",
    role: "DevOps & SRE Lead",
    bio: "Cloud-native specialist managing zero-downtime deployments across EU infrastructure. Kubernetes certified architect.",
    status: "published",
    sortOrder: 3,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
];

const SITE_SETTINGS = {
  siteName: "Zero Day Team",
  contactEmail: "hello@zerodayteam.site",
  contactLocations: "Stockholm / Berlin / Remote",
  footerTagline: "A specialized engineering collective building the invisible infrastructure that powers modern enterprises.",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/zerodayteam" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/zerodayteam" },
  ],
};

// ─── Main ─────────────────────────────────────────────────────────

async function main() {
  console.log("\n🌱 Zero Day CMS Seed Script\n");
  console.log(`  Payload URL: ${PAYLOAD_URL}`);

  const token = await login();
  const tmpDir = path.join(__dirname, ".seed-tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  // Check if already seeded
  const projectCount = await getCount(token, "projects");
  if (projectCount > 0) {
    console.log("\n⚠  Database already has data. Skipping seed to avoid duplicates.");
    console.log("   To re-seed, delete all documents in Payload admin first.\n");
    cleanup(tmpDir);
    return;
  }

  // 1. Generate and upload product images
  console.log("\n📸 Generating product images...");
  const productMediaIds = {};
  for (const project of PROJECTS) {
    const imgPath = path.join(tmpDir, `${project.title.toLowerCase().replace(/\s/g, "-")}.png`);
    await generateProductImage(project.title, imgPath);
    const media = await uploadMedia(token, imgPath, `${project.title} — product image`);
    productMediaIds[project.title] = media.id;
    console.log(`  ✓ ${project.title} image uploaded (id: ${media.id})`);
  }

  // 2. Generate and upload team avatars
  console.log("\n👤 Generating team avatars...");
  const teamMediaIds = {};
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    const member = TEAM_MEMBERS[i];
    const imgPath = path.join(tmpDir, `avatar-${member.name.toLowerCase().replace(/\s/g, "-")}.png`);
    await generateAvatarImage(member.name, i, imgPath);
    const media = await uploadMedia(token, imgPath, `${member.name} — team photo`);
    teamMediaIds[member.name] = media.id;
    console.log(`  ✓ ${member.name} avatar uploaded (id: ${media.id})`);
  }

  // 3. Seed Testimonials
  console.log("\n💬 Seeding testimonials...");
  for (const t of TESTIMONIALS) {
    const doc = await createDoc(token, "testimonials", t);
    console.log(`  ✓ ${t.name} (id: ${doc.id})`);
  }

  // 4. Seed Projects (with images)
  console.log("\n🚀 Seeding projects...");
  for (const p of PROJECTS) {
    const doc = await createDoc(token, "projects", {
      ...p,
      image: productMediaIds[p.title],
    });
    console.log(`  ✓ ${p.title} (id: ${doc.id})`);
  }

  // 5. Seed Case Studies
  console.log("\n📊 Seeding case studies...");
  for (const c of CASE_STUDIES) {
    const doc = await createDoc(token, "case-studies", c);
    console.log(`  ✓ ${c.title} (id: ${doc.id})`);
  }

  // 6. Seed Team Members (with avatars)
  console.log("\n👥 Seeding team members...");
  for (const m of TEAM_MEMBERS) {
    const doc = await createDoc(token, "team-members", {
      ...m,
      photo: teamMediaIds[m.name],
    });
    console.log(`  ✓ ${m.name} (id: ${doc.id})`);
  }

  // 7. Update Site Settings
  console.log("\n⚙️  Updating site settings...");
  await updateGlobal(token, "site-settings", SITE_SETTINGS);
  console.log("  ✓ Site settings updated");

  cleanup(tmpDir);
  console.log("\n✅ Seed complete! Visit http://localhost:3000/admin to see your content.\n");
}

function cleanup(tmpDir) {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
```

- [ ] **Step 3: Verify Payload CMS is running and run the seed**

```bash
cd ~/Desktop/ZeroDayTeam/zero-day-artistry/payload-cms && npm run seed
```

Expected output: All items created with IDs printed, ending with "Seed complete!"

- [ ] **Step 4: Verify seed data via API**

```bash
curl -s http://localhost:3000/api/testimonials | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Testimonials: {d[\"totalDocs\"]}')"
curl -s http://localhost:3000/api/projects | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Projects: {d[\"totalDocs\"]}')"
curl -s http://localhost:3000/api/case-studies | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Case Studies: {d[\"totalDocs\"]}')"
curl -s http://localhost:3000/api/team-members | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Team Members: {d[\"totalDocs\"]}')"
```

Expected: `Testimonials: 2`, `Projects: 4`, `Case Studies: 4`, `Team Members: 3`

- [ ] **Step 5: Commit**

```bash
git add payload-cms/seed.mjs payload-cms/package.json
git commit -m "feat: add seed script with placeholder images for all CMS content"
```

---

## Task 3: Add Team Page Frontend

**Files:**
- Create: `src/components/team-grid.tsx`
- Create: `src/routes/team.tsx`
- Modify: `src/lib/payload.functions.ts` (append `getTeamMembers`)
- Modify: `src/components/site-header.tsx` (add Team nav link)
- Modify: `src/components/site-footer.tsx` (add Team nav link)

- [ ] **Step 1: Append `getTeamMembers` to `src/lib/payload.functions.ts`**

Add at the end of the file:

```ts
/**
 * Fetch published team members from Payload CMS.
 */
export const getTeamMembers = createServerFn({ method: "GET" })
  .handler(async (): Promise<any[]> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) return [];
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/team-members?where[status][equals]=published&sort=sortOrder&limit=50`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return [];
      const json = await res.json();
      return json.docs ?? [];
    } catch { return []; }
  });
```

- [ ] **Step 2: Create `src/components/team-grid.tsx`**

```tsx
import { ScrollReveal } from "@/components/scroll-reveal";
import { Linkedin, Github, Globe } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  socialLinks?: { platform: string; url: string }[];
};

const FALLBACK_MEMBERS: TeamMember[] = [
  {
    name: "Erik Lindqvist",
    role: "Lead Architect",
    bio: "15 years of infrastructure engineering. Former platform lead at Spotify. Specializes in distributed systems and real-time data pipelines.",
  },
  {
    name: "Amira Hassan",
    role: "Senior Engineer",
    bio: "Full-stack engineer with deep expertise in AR/VR commerce platforms. Built Specra AR from prototype to production.",
  },
  {
    name: "Jonas Weber",
    role: "DevOps & SRE Lead",
    bio: "Cloud-native specialist managing zero-downtime deployments across EU infrastructure. Kubernetes certified architect.",
  },
];

const ICON_MAP: Record<string, typeof Globe> = {
  linkedin: Linkedin,
  github: Github,
};

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
          photoUrl: typeof m.photo === "object" ? m.photo?.url : m.photo,
          socialLinks: m.socialLinks,
        }))
      : FALLBACK_MEMBERS;

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">
          / The People
        </p>
        <h2 className="text-display text-5xl md:text-6xl mt-3">
          The minds behind the code.
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {members.map((m, i) => (
          <ScrollReveal key={m.name} delay={i * 100}>
            <div className="glass-card rounded-3xl overflow-hidden card-hover group">
              {/* Photo */}
              <div className="aspect-[4/3] bg-gradient-to-br from-foreground/10 to-accent-gold/10 relative overflow-hidden">
                {m.photoUrl ? (
                  <img
                    src={resolveMediaUrl(m.photoUrl)}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-display text-6xl text-foreground/10">
                      {m.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold">{m.name}</h3>
                <p className="text-sm text-accent-gold font-mono mt-1">{m.role}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {m.bio}
                </p>

                {m.socialLinks && m.socialLinks.length > 0 && (
                  <div className="flex items-center gap-3 mt-4">
                    {m.socialLinks.map((link) => {
                      const Icon =
                        ICON_MAP[link.platform.toLowerCase()] || Globe;
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent-gold transition-colors"
                          aria-label={`${m.name} on ${link.platform}`}
                        >
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/routes/team.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeamGrid } from "@/components/team-grid";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { getTeamMembers } from "@/lib/payload.functions";

export const Route = createFileRoute("/team")({
  loader: async () => {
    const cmsTeamMembers = await getTeamMembers();
    return { cmsTeamMembers };
  },
  head: () => ({
    meta: [
      { title: "Our Team — Zero Day Development" },
      {
        name: "description",
        content:
          "Meet the engineers behind Zero Day Development — specialists in middleware, AR commerce, industrial SaaS, and infrastructure.",
      },
      { property: "og:title", content: "Our Team — Zero Day Development" },
      {
        property: "og:description",
        content: "The engineering collective behind enterprise-grade infrastructure.",
      },
    ],
  }),
  component: Team,
});

function Team() {
  const { cmsTeamMembers } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="pt-12">
        <section className="mx-auto max-w-5xl px-6 py-20 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] gradient-mesh" />
          <div className="absolute inset-x-0 top-0 h-[400px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">
              / Our Team
            </p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal
              className="text-display text-5xl md:text-7xl lg:text-8xl"
              staggerMs={50}
            >
              Built by engineers, for engineers.
            </TextReveal>
          </h1>
          <ScrollReveal delay={400}>
            <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're a tight-knit collective of specialists — each with deep
              expertise in the systems that keep enterprises running at scale.
            </p>
          </ScrollReveal>
        </section>
        <TeamGrid cmsData={cmsTeamMembers} />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 4: Add "Team" to header navigation**

In `src/components/site-header.tsx`, find the `NAV_LINKS` array and add a Team entry between About and Portfolio:

```ts
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 5: Add "Team" to footer navigation**

In `src/components/site-footer.tsx`, find the `LINKS` array and add a Team entry between About and Portfolio:

```ts
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 6: Verify the build**

```bash
cd ~/Desktop/ZeroDayTeam/zero-day-artistry && npx vite build 2>&1 | grep -E "✓|error|ERROR"
```

Expected: Two `✓ built` lines with no errors.

- [ ] **Step 7: Verify the team page loads**

Restart dev server if needed, then:

```bash
curl -s http://localhost:8080/team | grep -c "team"
```

Expected: Non-zero count (page loads with team content)

- [ ] **Step 8: Commit**

```bash
git add src/components/team-grid.tsx src/routes/team.tsx src/lib/payload.functions.ts src/components/site-header.tsx src/components/site-footer.tsx
git commit -m "feat: add Team page with CMS-driven member grid

New /team route with glass card grid, social links, scroll animations.
TeamMembers collection fetched from Payload CMS with fallback data.
Added Team link to header and footer navigation."
```
