import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAYLOAD_URL = process.env.PAYLOAD_URL || "http://localhost:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "moosaalialblooshe@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ZeroDay2024!";

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
    headers: { "Content-Type": "application/json", Authorization: `JWT ${token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) throw new Error(`Failed to create ${collection}: ${res.status} ${await res.text()}`);
  return (await res.json()).doc;
}

async function updateGlobal(token, slug, data) {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `JWT ${token}` },
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
  if (!res.ok) throw new Error(`Failed to upload media: ${res.status} ${await res.text()}`);
  return (await res.json()).doc;
}

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

const TESTIMONIALS = [
  { quote: "Zero Day rebuilt our entire orchestration layer in 11 weeks. We've eliminated 100% of manual entry errors since launch.", name: "Daniel Reed", role: "Founder, Novalytix", featured: true, sortOrder: 1 },
  { quote: "Their middleware now powers every Valhalla route across our EU fleet. Genuinely the best technical partners we've worked with.", name: "Sarah Nguyen", role: "Product Manager, FleetOps", featured: true, sortOrder: 2 },
];

const PROJECTS = [
  { title: "GridMaster", tag: "Industrial SaaS", stack: "React / SaaS / IoT", blurb: "Real-time power plant monitoring dashboard replacing legacy SCADA tracking.", status: "published", sortOrder: 1 },
  { title: "Specra AR", tag: "E-Commerce & Retail", stack: "Swift / Unity / ARKit", blurb: "Try-before-you-buy AR engine that cut product returns by 38%.", status: "published", sortOrder: 2 },
  { title: "Vectra Flow", tag: "Automotive & Logistics", stack: "Valhalla Engine / Kotlin / GIS", blurb: "Millisecond routing engine for last-mile fleet operations across the EU.", status: "published", sortOrder: 3 },
  { title: "SyncBridge", tag: "Enterprise Middleware", stack: "Node.js / API Orchestration / n8n", blurb: "Zero-error invoice-to-fulfillment orchestration for B2B accounting systems.", status: "published", sortOrder: 4 },
];

const CASE_STUDIES = [
  { title: "GridMaster", sector: "Industrial SaaS", stack: "React / SaaS / IoT", challenge: "Managing high-stakes power plant infrastructure and workforce safety in real-time.", success: "We engineered a robust industrial monitoring platform that replaced legacy manual tracking with high-precision data visualization, reducing operational downtime and improving worker safety protocols.", status: "published", sortOrder: 1 },
  { title: "Specra AR", sector: "E-Commerce & Retail", stack: "Swift / Unity / ARKit", challenge: "Overcoming the uncertainty gap in digital retail where customers struggle to visualize products.", success: "By integrating a high-performance Augmented Reality engine into the retail workflow, we created a seamless try-before-you-buy experience that boosted user engagement and measurably decreased product return rates.", status: "published", sortOrder: 2 },
  { title: "Vectra Flow", sector: "Automotive & Logistics", stack: "Valhalla Engine / Kotlin / GIS", challenge: "Optimizing complex urban delivery routes amidst shifting traffic patterns and fleet variables.", success: "Our team developed an intelligent routing engine powered by the Valhalla framework, providing millisecond-precise navigation for large-scale logistics, cutting fuel costs and mastering last-mile delivery.", status: "published", sortOrder: 3 },
  { title: "SyncBridge", sector: "Enterprise Middleware", stack: "Node.js / API Orchestration / n8n", challenge: "Connecting disconnected accounting software with high-volume delivery APIs without data loss.", success: "We built a custom orchestration layer that automates the entire lifecycle from invoice to fulfillment. The middleware eliminates manual entry errors and provides a resilient, scalable bridge for real-time enterprise communication.", status: "published", sortOrder: 4 },
];

const TEAM_MEMBERS = [
  { name: "Erik Lindqvist", role: "Lead Architect", bio: "15 years of infrastructure engineering. Former platform lead at Spotify. Specializes in distributed systems and real-time data pipelines.", status: "published", sortOrder: 1, socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }, { platform: "GitHub", url: "https://github.com" }] },
  { name: "Amira Hassan", role: "Senior Engineer", bio: "Full-stack engineer with deep expertise in AR/VR commerce platforms. Built Specra AR from prototype to production.", status: "published", sortOrder: 2, socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }, { platform: "GitHub", url: "https://github.com" }] },
  { name: "Jonas Weber", role: "DevOps & SRE Lead", bio: "Cloud-native specialist managing zero-downtime deployments across EU infrastructure. Kubernetes certified architect.", status: "published", sortOrder: 3, socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }, { platform: "GitHub", url: "https://github.com" }] },
];

const SITE_SETTINGS = {
  siteName: "Zero Day Team",
  contactEmail: "hello@zerodayteam.site",
  contactLocations: "Stockholm / Berlin / Remote",
  footerTagline: "A specialized engineering collective building the invisible infrastructure that powers modern enterprises.",
  socialLinks: [{ platform: "GitHub", url: "https://github.com/zerodayteam" }, { platform: "LinkedIn", url: "https://linkedin.com/company/zerodayteam" }],
};

async function main() {
  console.log("\n🌱 Zero Day CMS Seed Script\n");
  console.log(`  Payload URL: ${PAYLOAD_URL}`);

  const token = await login();
  const tmpDir = path.join(__dirname, ".seed-tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const projectCount = await getCount(token, "projects");
  if (projectCount > 0) {
    console.log("\n⚠  Database already has data. Skipping seed to avoid duplicates.");
    console.log("   To re-seed, delete all documents in Payload admin first.\n");
    cleanup(tmpDir);
    return;
  }

  console.log("\n📸 Generating product images...");
  const productMediaIds = {};
  for (const project of PROJECTS) {
    const imgPath = path.join(tmpDir, `${project.title.toLowerCase().replace(/\s/g, "-")}.png`);
    await generateProductImage(project.title, imgPath);
    const media = await uploadMedia(token, imgPath, `${project.title} — product image`);
    productMediaIds[project.title] = media.id;
    console.log(`  ✓ ${project.title} image uploaded (id: ${media.id})`);
  }

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

  console.log("\n💬 Seeding testimonials...");
  for (const t of TESTIMONIALS) {
    const doc = await createDoc(token, "testimonials", t);
    console.log(`  ✓ ${t.name} (id: ${doc.id})`);
  }

  console.log("\n🚀 Seeding projects...");
  for (const p of PROJECTS) {
    const doc = await createDoc(token, "projects", { ...p, image: productMediaIds[p.title] });
    console.log(`  ✓ ${p.title} (id: ${doc.id})`);
  }

  console.log("\n📊 Seeding case studies...");
  for (const c of CASE_STUDIES) {
    const doc = await createDoc(token, "case-studies", c);
    console.log(`  ✓ ${c.title} (id: ${doc.id})`);
  }

  console.log("\n👥 Seeding team members...");
  for (const m of TEAM_MEMBERS) {
    const doc = await createDoc(token, "team-members", { ...m, photo: teamMediaIds[m.name] });
    console.log(`  ✓ ${m.name} (id: ${doc.id})`);
  }

  console.log("\n⚙️  Updating site settings...");
  await updateGlobal(token, "site-settings", SITE_SETTINGS);
  console.log("  ✓ Site settings updated");

  cleanup(tmpDir);
  console.log("\n✅ Seed complete! Visit http://localhost:3000/admin to see your content.\n");
}

function cleanup(tmpDir) {
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
}

main().catch((err) => { console.error("\n❌ Seed failed:", err.message); process.exit(1); });
