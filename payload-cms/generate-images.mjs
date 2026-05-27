/**
 * Zero Day Team — Programmatic Image Generator
 * Creates premium, on-brand visuals for dark & light modes
 * using SVG rendering + Sharp. No external API needed.
 *
 * Usage:  node generate-images.mjs
 * Output: ./generated-images/
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "generated-images");
const WIDTH = 1600;
const HEIGHT = 900;

// ─── Design Tokens (matched to styles.css oklch values) ──────────────
const DARK = {
  bg: "#0a0f14",
  bgAlt: "#0e1419",
  card: "#141c24",
  cardAlt: "#1a2330",
  neon: "#3deb8d",
  neonSoft: "#48b87a",
  neonDim: "#2a8f5f",
  neonFaint: "#1a5f3f",
  neonGhost: "#0d3322",
  text: "#f0f5f2",
  textMuted: "#7a918a",
  border: "#2a3640",
  borderFaint: "#1e2a32",
  glow: "rgba(61,235,141,0.25)",
  glowSoft: "rgba(61,235,141,0.12)",
  glowFaint: "rgba(61,235,141,0.06)",
};

const LIGHT = {
  bg: "#f5faf7",
  bgAlt: "#eef5f0",
  card: "#ffffff",
  cardAlt: "#f0f7f3",
  neon: "#0e7d4a",
  neonSoft: "#3a9d6a",
  neonDim: "#5ab585",
  neonFaint: "#b8dfc8",
  neonGhost: "#ddf0e5",
  text: "#152025",
  textMuted: "#5a7068",
  border: "#d0ddd6",
  borderFaint: "#e2ede6",
  glow: "rgba(14,125,74,0.15)",
  glowSoft: "rgba(14,125,74,0.08)",
  glowFaint: "rgba(14,125,74,0.04)",
};

// ─── Utility Helpers ─────────────────────────────────────────────────

function grainFilter(id = "grain") {
  return `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter>`;
}

function grainRect(opacity = 0.035, id = "grain") {
  return `<rect width="100%" height="100%" filter="url(#${id})" opacity="${opacity}"/>`;
}

function glowFilter(id = "glow", stdDev = 20, color = DARK.neon) {
  return `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="${stdDev}" result="blur"/>
    <feFlood flood-color="${color}" flood-opacity="0.5" result="color"/>
    <feComposite in="color" in2="blur" operator="in" result="glow"/>
    <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;
}

function gridPattern(color, opacity = 0.07, spacing = 60) {
  return `<pattern id="grid" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse">
    <path d="M ${spacing} 0 L 0 0 0 ${spacing}" fill="none" stroke="${color}" stroke-width="0.5" opacity="${opacity}"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridFade)"/>
  <mask id="gridFade"><radialGradient id="gridFadeGrad" cx="50%" cy="40%" r="55%">
    <stop offset="0%" stop-color="white"/><stop offset="100%" stop-color="black"/>
  </radialGradient><rect width="100%" height="100%" fill="url(#gridFadeGrad)"/></mask>`;
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

// ─── IMAGE: GridMaster (Industrial Dashboard) ────────────────────────

function gridmasterImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;
  const charts = [];

  // Dashboard panels
  const panels = [
    { x: 100, y: 120, w: 420, h: 280 },
    { x: 560, y: 120, w: 500, h: 280 },
    { x: 1100, y: 120, w: 400, h: 280 },
    { x: 100, y: 440, w: 340, h: 340 },
    { x: 480, y: 440, w: 580, h: 340 },
    { x: 1100, y: 440, w: 400, h: 340 },
  ];

  for (const p of panels) {
    charts.push(`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.9"/>`);
    // Header bar
    charts.push(`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="36" rx="12" fill="${t.cardAlt}"/>`);
    charts.push(`<rect x="${p.x}" y="${p.y + 24}" width="${p.w}" height="12" fill="${t.cardAlt}"/>`);
    // Dots
    charts.push(`<circle cx="${p.x + 16}" cy="${p.y + 18}" r="4" fill="#f04040" opacity="0.7"/>
                  <circle cx="${p.x + 30}" cy="${p.y + 18}" r="4" fill="#f0c040" opacity="0.7"/>
                  <circle cx="${p.x + 44}" cy="${p.y + 18}" r="4" fill="${t.neon}" opacity="0.7"/>`);
  }

  // Bar chart in panel 1
  const barColors = [t.neon, t.neonSoft, t.neonDim, t.neon, t.neonSoft, t.neonDim, t.neon, t.neonSoft];
  for (let i = 0; i < 8; i++) {
    const bh = 50 + Math.random() * 160;
    charts.push(`<rect x="${140 + i * 45}" y="${380 - bh}" width="30" height="${bh}" rx="4" fill="${barColors[i]}" opacity="${0.5 + Math.random() * 0.4}"/>`);
  }

  // Line chart in panel 2
  const linePoints = [];
  for (let i = 0; i < 20; i++) {
    linePoints.push(`${580 + i * 24},${200 + Math.sin(i * 0.5) * 60 + Math.random() * 30}`);
  }
  charts.push(`<polyline points="${linePoints.join(" ")}" fill="none" stroke="${t.neon}" stroke-width="2.5" opacity="0.8"/>
    <polyline points="${linePoints.join(" ")}" fill="none" stroke="${t.neon}" stroke-width="8" opacity="0.1" stroke-linejoin="round"/>`);

  // Gauge in panel 3
  charts.push(`<circle cx="1300" cy="280" r="90" fill="none" stroke="${t.border}" stroke-width="8"/>
    <circle cx="1300" cy="280" r="90" fill="none" stroke="${t.neon}" stroke-width="8" stroke-dasharray="400 200" stroke-linecap="round" opacity="0.8" transform="rotate(-90,1300,280)"/>
    <circle cx="1300" cy="280" r="4" fill="${t.neon}"/>`);

  // Heatmap in panel 5
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 16; col++) {
      const op = 0.1 + Math.random() * 0.6;
      charts.push(`<rect x="${500 + col * 34}" y="${480 + row * 35}" width="28" height="28" rx="4" fill="${t.neon}" opacity="${op}"/>`);
    }
  }

  // Pie/donut in panel 4
  charts.push(`<circle cx="270" cy="630" r="80" fill="none" stroke="${t.neonDim}" stroke-width="24" opacity="0.3"/>
    <circle cx="270" cy="630" r="80" fill="none" stroke="${t.neon}" stroke-width="24" stroke-dasharray="280 225" stroke-linecap="round" opacity="0.7" transform="rotate(-90,270,630)"/>
    <circle cx="270" cy="630" r="80" fill="none" stroke="${t.neonSoft}" stroke-width="24" stroke-dasharray="120 385" stroke-linecap="round" opacity="0.6" transform="rotate(110,270,630)"/>`);

  // Status indicators panel 6
  for (let i = 0; i < 6; i++) {
    const sy = 490 + i * 48;
    charts.push(`<rect x="1130" y="${sy}" width="340" height="36" rx="6" fill="${t.cardAlt}" opacity="0.5"/>
      <circle cx="1155" cy="${sy + 18}" r="5" fill="${Math.random() > 0.2 ? t.neon : "#f04040"}" opacity="0.8"/>
      <rect x="1175" y="${sy + 12}" width="${80 + Math.random() * 100}" height="10" rx="3" fill="${t.textMuted}" opacity="0.3"/>
      <rect x="1380" y="${sy + 12}" width="${40 + Math.random() * 60}" height="10" rx="3" fill="${t.neon}" opacity="${0.3 + Math.random() * 0.4}"/>`);
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      ${glowFilter("neonGlow", 40, t.neon)}
      <radialGradient id="bgGrad" cx="30%" cy="40%"><stop offset="0%" stop-color="${t.neonGhost}"/><stop offset="100%" stop-color="${t.bg}"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${gridPattern(t.neon, 0.04)}
    ${charts.join("\n")}
    <circle cx="200" cy="300" r="200" fill="${t.neon}" opacity="0.03" filter="url(#neonGlow)"/>
    <circle cx="1300" cy="600" r="250" fill="${t.neon}" opacity="0.02" filter="url(#neonGlow)"/>
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: Specra AR (Augmented Reality) ────────────────────────────

function specraArImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // AR scanning frame
  const frame = `<rect x="450" y="100" width="700" height="650" rx="20" fill="none" stroke="${t.neon}" stroke-width="2" opacity="0.6" stroke-dasharray="20 10"/>
    <line x1="450" y1="100" x2="510" y2="100" stroke="${t.neon}" stroke-width="4"/>
    <line x1="450" y1="100" x2="450" y2="160" stroke="${t.neon}" stroke-width="4"/>
    <line x1="1150" y1="100" x2="1090" y2="100" stroke="${t.neon}" stroke-width="4"/>
    <line x1="1150" y1="100" x2="1150" y2="160" stroke="${t.neon}" stroke-width="4"/>
    <line x1="450" y1="750" x2="510" y2="750" stroke="${t.neon}" stroke-width="4"/>
    <line x1="450" y1="750" x2="450" y2="690" stroke="${t.neon}" stroke-width="4"/>
    <line x1="1150" y1="750" x2="1090" y2="750" stroke="${t.neon}" stroke-width="4"/>
    <line x1="1150" y1="750" x2="1150" y2="690" stroke="${t.neon}" stroke-width="4"/>`;

  // 3D Furniture wireframe (chair/sofa)
  const furniture = `<g opacity="0.85" transform="translate(650,380)">
    <!-- sofa base -->
    <path d="M-120,80 L-100,-20 L100,-20 L120,80 Z" fill="none" stroke="${t.neon}" stroke-width="1.5"/>
    <path d="M-100,-20 L-80,-100 L80,-100 L100,-20" fill="none" stroke="${t.neon}" stroke-width="1.5"/>
    <!-- depth lines -->
    <path d="M120,80 L180,50 L160,-40 L100,-20" fill="none" stroke="${t.neonSoft}" stroke-width="1" opacity="0.5"/>
    <path d="M100,-20 L160,-40 L140,-110 L80,-100" fill="none" stroke="${t.neonSoft}" stroke-width="1" opacity="0.5"/>
    <!-- cushions -->
    <path d="M-80,-90 L-60,-30 L0,-30 L-20,-90 Z" fill="${t.neon}" opacity="0.08" stroke="${t.neon}" stroke-width="0.5"/>
    <path d="M0,-90 L20,-30 L80,-30 L60,-90 Z" fill="${t.neon}" opacity="0.08" stroke="${t.neon}" stroke-width="0.5"/>
    <!-- legs -->
    <line x1="-110" y1="80" x2="-120" y2="130" stroke="${t.neonSoft}" stroke-width="1.5"/>
    <line x1="110" y1="80" x2="120" y2="130" stroke="${t.neonSoft}" stroke-width="1.5"/>
    <!-- measurement lines -->
    <line x1="-140" y1="-110" x2="-140" y2="130" stroke="${t.neonDim}" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.5"/>
    <line x1="-150" y1="-110" x2="-130" y2="-110" stroke="${t.neonDim}" stroke-width="0.8" opacity="0.5"/>
    <line x1="-150" y1="130" x2="-130" y2="130" stroke="${t.neonDim}" stroke-width="0.8" opacity="0.5"/>
    <!-- bottom measurement -->
    <line x1="-120" y1="150" x2="180" y2="150" stroke="${t.neonDim}" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.5"/>
  </g>`;

  // Scan line animation
  const scanLine = `<rect x="460" y="400" width="680" height="2" fill="${t.neon}" opacity="0.6"/>
    <rect x="460" y="400" width="680" height="16" fill="url(#scanFade)" opacity="0.15"/>`;

  // Data panels floating around
  const panels = `
    <!-- Info card left -->
    <g transform="translate(80,200)">
      <rect width="300" height="160" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.85"/>
      <rect x="16" y="16" width="100" height="8" rx="4" fill="${t.textMuted}" opacity="0.4"/>
      <rect x="16" y="36" width="180" height="10" rx="4" fill="${t.neon}" opacity="0.3"/>
      <rect x="16" y="60" width="260" height="6" rx="3" fill="${t.textMuted}" opacity="0.2"/>
      <rect x="16" y="76" width="220" height="6" rx="3" fill="${t.textMuted}" opacity="0.2"/>
      <rect x="16" y="100" width="60" height="40" rx="8" fill="${t.neon}" opacity="0.15"/>
      <rect x="90" y="100" width="60" height="40" rx="8" fill="${t.neonSoft}" opacity="0.15"/>
      <rect x="164" y="100" width="60" height="40" rx="8" fill="${t.neonDim}" opacity="0.15"/>
    </g>
    <!-- Info card right -->
    <g transform="translate(1220,300)">
      <rect width="280" height="240" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.85"/>
      <rect x="16" y="16" width="80" height="80" rx="8" fill="${t.neon}" opacity="0.1"/>
      <rect x="110" y="20" width="140" height="8" rx="4" fill="${t.textMuted}" opacity="0.4"/>
      <rect x="110" y="40" width="100" height="8" rx="4" fill="${t.textMuted}" opacity="0.25"/>
      <rect x="110" y="60" width="120" height="8" rx="4" fill="${t.neon}" opacity="0.3"/>
      <!-- Color swatches -->
      <circle cx="36" cy="140" r="16" fill="#4a6570" opacity="0.6"/>
      <circle cx="76" cy="140" r="16" fill="#8a6040" opacity="0.6"/>
      <circle cx="116" cy="140" r="16" fill="${t.neon}" opacity="0.4"/>
      <circle cx="156" cy="140" r="16" fill="#606060" opacity="0.6"/>
      <rect x="16" y="180" width="248" height="36" rx="8" fill="${t.neon}" opacity="0.15"/>
    </g>`;

  // Floating particles
  let particles = "";
  for (let i = 0; i < 30; i++) {
    const px = 460 + Math.random() * 680;
    const py = 110 + Math.random() * 630;
    const ps = 1 + Math.random() * 2;
    particles += `<circle cx="${px}" cy="${py}" r="${ps}" fill="${t.neon}" opacity="${0.1 + Math.random() * 0.3}"/>`;
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      ${glowFilter("neonGlow", 30, t.neon)}
      <linearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${t.neon}"/><stop offset="100%" stop-color="transparent"/></linearGradient>
      <radialGradient id="bgGrad" cx="50%" cy="45%"><stop offset="0%" stop-color="${t.neonGhost}"/><stop offset="100%" stop-color="${t.bg}"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${gridPattern(t.neon, 0.03)}
    ${frame}
    ${furniture}
    ${scanLine}
    ${particles}
    ${panels}
    <circle cx="800" cy="420" r="300" fill="${t.neon}" opacity="0.02" filter="url(#neonGlow)"/>
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: Vectra Flow (Routing / GIS) ──────────────────────────────

function vectraFlowImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // Road/route network
  let roads = "";
  const roadPaths = [
    "M0,450 Q400,420 800,400 Q1200,380 1600,350",
    "M0,500 Q300,520 600,480 Q900,440 1200,500 Q1400,520 1600,480",
    "M200,0 Q220,300 250,450 Q280,600 300,900",
    "M700,0 Q680,200 720,400 Q760,600 740,900",
    "M1100,0 Q1120,250 1080,500 Q1040,700 1100,900",
    "M0,300 Q500,280 800,320 Q1100,360 1600,300",
    "M400,0 Q420,400 400,900",
    "M1350,0 Q1330,300 1370,600 Q1390,800 1350,900",
  ];
  for (const rp of roadPaths) {
    roads += `<path d="${rp}" fill="none" stroke="${t.border}" stroke-width="1" opacity="0.4"/>`;
  }

  // Main active routes (glowing)
  const activeRoutes = [
    { path: "M100,600 Q300,500 500,480 Q700,460 900,400 Q1100,340 1300,300", color: t.neon },
    { path: "M200,700 Q500,650 800,500 Q1000,400 1200,420 Q1400,440 1500,350", color: t.neonSoft },
  ];
  let routeSvg = "";
  for (const r of activeRoutes) {
    routeSvg += `<path d="${r.path}" fill="none" stroke="${r.color}" stroke-width="3" opacity="0.8"/>
      <path d="${r.path}" fill="none" stroke="${r.color}" stroke-width="12" opacity="0.1"/>`;
  }

  // Waypoints/nodes
  let nodes = "";
  const waypoints = [
    { x: 100, y: 600, label: "A", active: true },
    { x: 500, y: 480, label: "B", active: true },
    { x: 900, y: 400, label: "C", active: true },
    { x: 1300, y: 300, label: "D", active: true },
    { x: 200, y: 700, label: "E", active: false },
    { x: 800, y: 500, label: "F", active: false },
    { x: 1200, y: 420, label: "G", active: false },
    { x: 1500, y: 350, label: "H", active: false },
  ];
  for (const wp of waypoints) {
    const fillColor = wp.active ? t.neon : t.neonDim;
    nodes += `<circle cx="${wp.x}" cy="${wp.y}" r="8" fill="${t.bg}" stroke="${fillColor}" stroke-width="2.5"/>
      <circle cx="${wp.x}" cy="${wp.y}" r="3" fill="${fillColor}"/>`;
    if (wp.active) {
      nodes += `<circle cx="${wp.x}" cy="${wp.y}" r="18" fill="none" stroke="${fillColor}" stroke-width="1" opacity="0.3"/>`;
    }
  }

  // Vehicle markers
  const vehicles = [
    { x: 350, y: 530 }, { x: 720, y: 470 }, { x: 1100, y: 360 }, { x: 600, y: 600 },
    { x: 1000, y: 430 }, { x: 400, y: 680 },
  ];
  let vehicleSvg = "";
  for (const v of vehicles) {
    vehicleSvg += `<rect x="${v.x - 8}" y="${v.y - 5}" width="16" height="10" rx="3" fill="${t.neon}" opacity="0.7"/>
      <circle cx="${v.x}" cy="${v.y}" r="14" fill="${t.neon}" opacity="0.08"/>`;
  }

  // Stats panel
  const statsPanel = `<g transform="translate(60,60)">
    <rect width="320" height="200" rx="14" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
    <rect x="16" y="16" width="80" height="8" rx="4" fill="${t.textMuted}" opacity="0.4"/>
    <rect x="16" y="40" width="120" height="14" rx="4" fill="${t.neon}" opacity="0.5"/>
    <rect x="16" y="70" width="280" height="1" fill="${t.border}" opacity="0.5"/>
    <rect x="16" y="86" width="60" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
    <rect x="16" y="102" width="200" height="12" rx="4" fill="${t.neonGhost}"/>
    <rect x="16" y="102" width="140" height="12" rx="4" fill="${t.neon}" opacity="0.4"/>
    <rect x="16" y="128" width="60" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
    <rect x="16" y="144" width="200" height="12" rx="4" fill="${t.neonGhost}"/>
    <rect x="16" y="144" width="170" height="12" rx="4" fill="${t.neonSoft}" opacity="0.4"/>
    <rect x="16" y="170" width="60" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
  </g>`;

  // Speed panel
  const speedPanel = `<g transform="translate(1240,60)">
    <rect width="300" height="120" rx="14" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
    <rect x="16" y="16" width="60" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
    <rect x="16" y="34" width="100" height="16" rx="4" fill="${t.neon}" opacity="0.4"/>
    <rect x="16" y="66" width="40" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
    <rect x="16" y="82" width="80" height="16" rx="4" fill="${t.neonSoft}" opacity="0.35"/>
  </g>`;

  // Block pattern for "city" areas
  let blocks = "";
  const blockAreas = [
    { bx: 150, by: 350, cols: 4, rows: 3 },
    { bx: 850, by: 200, cols: 5, rows: 3 },
    { bx: 1200, by: 500, cols: 4, rows: 4 },
  ];
  for (const ba of blockAreas) {
    for (let r = 0; r < ba.rows; r++) {
      for (let c = 0; c < ba.cols; c++) {
        blocks += `<rect x="${ba.bx + c * 35}" y="${ba.by + r * 35}" width="25" height="25" rx="3" fill="${t.textMuted}" opacity="${0.04 + Math.random() * 0.08}"/>`;
      }
    }
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      ${glowFilter("neonGlow", 30, t.neon)}
      <radialGradient id="bgGrad" cx="60%" cy="50%"><stop offset="0%" stop-color="${t.neonGhost}"/><stop offset="100%" stop-color="${t.bg}"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${blocks}
    ${roads}
    ${routeSvg}
    ${vehicleSvg}
    ${nodes}
    ${statsPanel}
    ${speedPanel}
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: SyncBridge (API Middleware) ───────────────────────────────

function syncbridgeImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // API nodes
  const leftNodes = [
    { x: 150, y: 200, label: "Invoice API" },
    { x: 150, y: 380, label: "Auth Service" },
    { x: 150, y: 560, label: "Webhook" },
  ];
  const rightNodes = [
    { x: 1350, y: 200, label: "Fulfillment" },
    { x: 1350, y: 380, label: "Inventory" },
    { x: 1350, y: 560, label: "Analytics" },
  ];

  let nodesSvg = "";

  // Left source nodes
  for (const n of leftNodes) {
    nodesSvg += `<g transform="translate(${n.x},${n.y})">
      <rect x="-100" y="-40" width="200" height="80" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1.5"/>
      <rect x="-84" y="-24" width="12" height="12" rx="3" fill="${t.neon}" opacity="0.4"/>
      <rect x="-64" y="-20" width="100" height="8" rx="4" fill="${t.textMuted}" opacity="0.4"/>
      <rect x="-84" y="0" width="148" height="6" rx="3" fill="${t.textMuted}" opacity="0.2"/>
      <rect x="-84" y="14" width="120" height="6" rx="3" fill="${t.textMuted}" opacity="0.15"/>
    </g>`;
  }

  // Right target nodes
  for (const n of rightNodes) {
    nodesSvg += `<g transform="translate(${n.x},${n.y})">
      <rect x="-100" y="-40" width="200" height="80" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1.5"/>
      <rect x="-84" y="-24" width="12" height="12" rx="3" fill="${t.neonSoft}" opacity="0.4"/>
      <rect x="-64" y="-20" width="100" height="8" rx="4" fill="${t.textMuted}" opacity="0.4"/>
      <rect x="-84" y="0" width="148" height="6" rx="3" fill="${t.textMuted}" opacity="0.2"/>
      <rect x="-84" y="14" width="120" height="6" rx="3" fill="${t.textMuted}" opacity="0.15"/>
    </g>`;
  }

  // Central bridge hub
  nodesSvg += `<g transform="translate(750,380)">
    <rect x="-130" y="-120" width="260" height="240" rx="20" fill="${t.card}" stroke="${t.neon}" stroke-width="2" opacity="0.95"/>
    <!-- Bridge icon -->
    <rect x="-80" y="-80" width="160" height="40" rx="8" fill="${t.neon}" opacity="0.12"/>
    <rect x="-60" y="-70" width="80" height="8" rx="4" fill="${t.neon}" opacity="0.5"/>
    <rect x="-60" y="-52" width="50" height="6" rx="3" fill="${t.neonSoft}" opacity="0.3"/>
    <!-- Flow indicators -->
    <rect x="-80" y="-20" width="160" height="1" fill="${t.border}"/>
    <circle cx="-50" cy="10" r="16" fill="${t.neon}" opacity="0.1"/>
    <circle cx="0" cy="10" r="16" fill="${t.neonSoft}" opacity="0.1"/>
    <circle cx="50" cy="10" r="16" fill="${t.neonDim}" opacity="0.1"/>
    <circle cx="-50" cy="10" r="6" fill="${t.neon}" opacity="0.4"/>
    <circle cx="0" cy="10" r="6" fill="${t.neonSoft}" opacity="0.4"/>
    <circle cx="50" cy="10" r="6" fill="${t.neonDim}" opacity="0.4"/>
    <!-- Status bars -->
    <rect x="-80" y="50" width="160" height="8" rx="4" fill="${t.neonGhost}"/>
    <rect x="-80" y="50" width="130" height="8" rx="4" fill="${t.neon}" opacity="0.35"/>
    <rect x="-80" y="70" width="160" height="8" rx="4" fill="${t.neonGhost}"/>
    <rect x="-80" y="70" width="100" height="8" rx="4" fill="${t.neonSoft}" opacity="0.35"/>
    <rect x="-80" y="90" width="160" height="8" rx="4" fill="${t.neonGhost}"/>
    <rect x="-80" y="90" width="145" height="8" rx="4" fill="${t.neonDim}" opacity="0.35"/>
  </g>`;

  // Connection lines (left to center)
  let connections = "";
  for (const ln of leftNodes) {
    connections += `<path d="M${ln.x + 100},${ln.y} C${ln.x + 300},${ln.y} ${750 - 200},380 ${750 - 130},380" fill="none" stroke="${t.neon}" stroke-width="1.5" opacity="0.4" stroke-dasharray="6 4"/>`;
    // Animated dots
    for (let d = 0; d < 3; d++) {
      const dx = ln.x + 120 + d * 120;
      const dy = ln.y + (380 - ln.y) * (d * 120) / (750 - 130 - ln.x - 100) * 0.5;
      connections += `<circle cx="${dx}" cy="${dy}" r="3" fill="${t.neon}" opacity="${0.3 + d * 0.15}"/>`;
    }
  }

  // Connection lines (center to right)
  for (const rn of rightNodes) {
    connections += `<path d="M${750 + 130},380 C${750 + 200},380 ${rn.x - 300},${rn.y} ${rn.x - 100},${rn.y}" fill="none" stroke="${t.neonSoft}" stroke-width="1.5" opacity="0.4" stroke-dasharray="6 4"/>`;
    for (let d = 0; d < 3; d++) {
      const dx = 750 + 150 + d * 120;
      const dy = 380 + (rn.y - 380) * (d * 120) / (rn.x - 100 - 750 - 130) * 0.5;
      connections += `<circle cx="${dx}" cy="${dy}" r="3" fill="${t.neonSoft}" opacity="${0.3 + d * 0.15}"/>`;
    }
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      ${glowFilter("neonGlow", 40, t.neon)}
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${t.neonGhost}"/><stop offset="100%" stop-color="${t.bg}"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${gridPattern(t.neon, 0.03)}
    ${connections}
    ${nodesSvg}
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: Hero Background ─────────────────────────────────────────

function heroBgImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // Floating geometric shapes
  let shapes = "";
  const geoShapes = [
    { type: "cube", x: 300, y: 300, size: 80, rot: 15 },
    { type: "cube", x: 1200, y: 250, size: 60, rot: -20 },
    { type: "sphere", x: 800, y: 400, size: 100 },
    { type: "cube", x: 500, y: 600, size: 50, rot: 30 },
    { type: "sphere", x: 1100, y: 550, size: 70 },
    { type: "cube", x: 200, y: 700, size: 40, rot: -10 },
    { type: "sphere", x: 1400, y: 400, size: 55 },
    { type: "cube", x: 900, y: 200, size: 45, rot: 25 },
  ];

  for (const s of geoShapes) {
    if (s.type === "cube") {
      const h = s.size * 0.6;
      shapes += `<g transform="translate(${s.x},${s.y}) rotate(${s.rot})">
        <path d="M0,${-s.size / 2} L${s.size / 2},${-s.size / 2 + h / 2} L${s.size / 2},${s.size / 2 + h / 2} L0,${s.size / 2} L${-s.size / 2},${s.size / 2 - h / 2} L${-s.size / 2},${-s.size / 2 - h / 2 + h} Z" fill="none" stroke="${t.neon}" stroke-width="1" opacity="0.25"/>
        <line x1="0" y1="${-s.size / 2}" x2="0" y2="${s.size / 2}" stroke="${t.neon}" stroke-width="0.5" opacity="0.15"/>
        <line x1="${-s.size / 2}" y1="${0}" x2="${s.size / 2}" y2="${0}" stroke="${t.neon}" stroke-width="0.5" opacity="0.15"/>
      </g>`;
    } else {
      shapes += `<circle cx="${s.x}" cy="${s.y}" r="${s.size}" fill="none" stroke="${t.neon}" stroke-width="1" opacity="0.2"/>
        <circle cx="${s.x}" cy="${s.y}" r="${s.size * 0.7}" fill="none" stroke="${t.neonSoft}" stroke-width="0.5" opacity="0.12"/>
        <circle cx="${s.x}" cy="${s.y}" r="${s.size * 0.4}" fill="${t.neon}" opacity="0.04"/>`;
    }
  }

  // Particle trails
  let particles = "";
  for (let i = 0; i < 80; i++) {
    const px = Math.random() * WIDTH;
    const py = Math.random() * HEIGHT;
    const ps = 0.5 + Math.random() * 2;
    particles += `<circle cx="${px}" cy="${py}" r="${ps}" fill="${t.neon}" opacity="${0.05 + Math.random() * 0.2}"/>`;
  }

  // Connection lines between shapes
  let lines = "";
  for (let i = 0; i < geoShapes.length - 1; i++) {
    const a = geoShapes[i];
    const b = geoShapes[i + 1];
    lines += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${t.neon}" stroke-width="0.5" opacity="0.08"/>`;
  }

  // Large glowing orbs
  const orbs = `
    <circle cx="300" cy="350" r="250" fill="${t.neon}" opacity="0.03"/>
    <circle cx="300" cy="350" r="180" fill="${t.neon}" opacity="0.02"/>
    <circle cx="1200" cy="400" r="300" fill="${t.neonSoft}" opacity="0.025"/>
    <circle cx="800" cy="200" r="200" fill="${t.neonDim}" opacity="0.02"/>`;

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      <radialGradient id="bgGrad" cx="40%" cy="40%" r="70%">
        <stop offset="0%" stop-color="${t.neonGhost}"/>
        <stop offset="50%" stop-color="${t.bg}"/>
        <stop offset="100%" stop-color="${t.bgAlt}"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${gridPattern(t.neon, 0.04)}
    ${orbs}
    ${lines}
    ${shapes}
    ${particles}
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: About Background ────────────────────────────────────────

function aboutBgImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // Layered translucent architecture planes
  let layers = "";
  const planes = [
    { x: 200, y: 100, w: 500, h: 700, rot: -5, op: 0.06 },
    { x: 500, y: 50, w: 600, h: 750, rot: 3, op: 0.05 },
    { x: 800, y: 80, w: 550, h: 720, rot: -2, op: 0.04 },
    { x: 1050, y: 120, w: 400, h: 680, rot: 5, op: 0.05 },
  ];

  for (const p of planes) {
    layers += `<g transform="rotate(${p.rot},${p.x + p.w / 2},${p.y + p.h / 2})">
      <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="16" fill="${t.neon}" opacity="${p.op}" stroke="${t.neon}" stroke-width="0.5" stroke-opacity="0.15"/>
    </g>`;
  }

  // Circuit-like patterns
  let circuits = "";
  for (let i = 0; i < 15; i++) {
    const cx = 200 + Math.random() * 1200;
    const cy = 100 + Math.random() * 700;
    const len = 40 + Math.random() * 120;
    const dir = Math.random() > 0.5 ? "h" : "v";
    if (dir === "h") {
      circuits += `<line x1="${cx}" y1="${cy}" x2="${cx + len}" y2="${cy}" stroke="${t.neon}" stroke-width="1" opacity="0.12"/>`;
    } else {
      circuits += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + len}" stroke="${t.neon}" stroke-width="1" opacity="0.12"/>`;
    }
    circuits += `<circle cx="${cx}" cy="${cy}" r="3" fill="${t.neon}" opacity="0.15"/>`;
  }

  // Data flow nodes
  let nodes = "";
  for (let i = 0; i < 20; i++) {
    const nx = 150 + Math.random() * 1300;
    const ny = 80 + Math.random() * 740;
    const ns = 4 + Math.random() * 8;
    nodes += `<rect x="${nx}" y="${ny}" width="${ns}" height="${ns}" rx="2" fill="${t.neon}" opacity="${0.05 + Math.random() * 0.15}" transform="rotate(45,${nx + ns / 2},${ny + ns / 2})"/>`;
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      <radialGradient id="bgGrad" cx="50%" cy="30%" r="65%">
        <stop offset="0%" stop-color="${t.neonGhost}"/>
        <stop offset="100%" stop-color="${t.bg}"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${layers}
    ${circuits}
    ${nodes}
    ${grainRect(0.03)}
  </svg>`;
}

// ─── IMAGE: CTA Background ──────────────────────────────────────────

function ctaBgImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // Converging light rays
  let rays = "";
  const centerX = 800;
  const centerY = 450;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const outerR = 800 + Math.random() * 400;
    const x2 = centerX + Math.cos(angle) * outerR;
    const y2 = centerY + Math.sin(angle) * outerR;
    const op = 0.03 + Math.random() * 0.06;
    rays += `<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" stroke="${t.neon}" stroke-width="${1 + Math.random() * 3}" opacity="${op}"/>`;
  }

  // Central prism shape
  const prism = `<g transform="translate(${centerX},${centerY})">
    <polygon points="0,-80 70,40 -70,40" fill="none" stroke="${t.neon}" stroke-width="2" opacity="0.3"/>
    <polygon points="0,-80 70,40 -70,40" fill="${t.neon}" opacity="0.05"/>
    <polygon points="0,-60 50,30 -50,30" fill="none" stroke="${t.neon}" stroke-width="1" opacity="0.15"/>
    <circle r="120" fill="${t.neon}" opacity="0.04"/>
    <circle r="80" fill="${t.neon}" opacity="0.03"/>
  </g>`;

  // Lens flare dots
  let flares = "";
  for (let i = 0; i < 12; i++) {
    const fx = centerX + (Math.random() - 0.5) * 400;
    const fy = centerY + (Math.random() - 0.5) * 300;
    const fs = 2 + Math.random() * 6;
    flares += `<circle cx="${fx}" cy="${fy}" r="${fs}" fill="${t.neon}" opacity="${0.05 + Math.random() * 0.1}"/>`;
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${t.neonGhost}"/>
        <stop offset="40%" stop-color="${t.bg}"/>
        <stop offset="100%" stop-color="${t.bgAlt}"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${rays}
    ${prism}
    ${flares}
    ${grainRect(0.025)}
  </svg>`;
}

// ─── IMAGE: Team Background ─────────────────────────────────────────

function teamBgImage(theme) {
  const t = theme === "dark" ? DARK : LIGHT;

  // Workspace nodes (representing team members)
  const workspaces = [
    { x: 300, y: 250 },
    { x: 700, y: 180 },
    { x: 1100, y: 280 },
    { x: 500, y: 500 },
    { x: 900, y: 550 },
    { x: 1300, y: 480 },
  ];

  // Connection lines between workspaces
  let connections = "";
  for (let i = 0; i < workspaces.length; i++) {
    for (let j = i + 1; j < workspaces.length; j++) {
      const a = workspaces[i];
      const b = workspaces[j];
      const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
      if (dist < 600) {
        connections += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${t.neon}" stroke-width="1" opacity="${0.06 + (600 - dist) / 600 * 0.1}" stroke-dasharray="4 6"/>`;
        // Mid-point data indicator
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        connections += `<circle cx="${mx}" cy="${my}" r="2" fill="${t.neon}" opacity="0.2"/>`;
      }
    }
  }

  // Workspace cards
  let cards = "";
  for (const ws of workspaces) {
    cards += `<g transform="translate(${ws.x},${ws.y})">
      <rect x="-70" y="-50" width="140" height="100" rx="12" fill="${t.card}" stroke="${t.border}" stroke-width="1" opacity="0.8"/>
      <!-- Avatar circle -->
      <circle cx="0" cy="-15" r="16" fill="${t.neon}" opacity="0.12" stroke="${t.neon}" stroke-width="1" stroke-opacity="0.2"/>
      <circle cx="0" cy="-15" r="6" fill="${t.neon}" opacity="0.3"/>
      <!-- Name placeholder -->
      <rect x="-40" y="12" width="80" height="6" rx="3" fill="${t.textMuted}" opacity="0.3"/>
      <rect x="-30" y="26" width="60" height="4" rx="2" fill="${t.textMuted}" opacity="0.2"/>
    </g>`;
    // Glow around workspace
    cards += `<circle cx="${ws.x}" cy="${ws.y}" r="90" fill="${t.neon}" opacity="0.015"/>`;
  }

  // Floating code/terminal snippets
  let snippets = "";
  const snippetPositions = [
    { x: 100, y: 150 }, { x: 1400, y: 200 }, { x: 150, y: 650 },
    { x: 1350, y: 700 }, { x: 750, y: 750 },
  ];
  for (const sp of snippetPositions) {
    snippets += `<g transform="translate(${sp.x},${sp.y})">
      <rect x="-60" y="-25" width="120" height="50" rx="6" fill="${t.card}" stroke="${t.border}" stroke-width="0.5" opacity="0.5"/>
      <rect x="-48" y="-15" width="40" height="4" rx="2" fill="${t.neon}" opacity="0.2"/>
      <rect x="-48" y="-5" width="80" height="4" rx="2" fill="${t.textMuted}" opacity="0.15"/>
      <rect x="-48" y="5" width="60" height="4" rx="2" fill="${t.textMuted}" opacity="0.12"/>
    </g>`;
  }

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${grainFilter()}
      <radialGradient id="bgGrad" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${t.neonGhost}"/>
        <stop offset="100%" stop-color="${t.bg}"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    ${gridPattern(t.neon, 0.03)}
    ${connections}
    ${cards}
    ${snippets}
    ${grainRect(0.025)}
  </svg>`;
}

// ─── Main Generator ─────────────────────────────────────────────────

const IMAGE_GENERATORS = [
  { name: "gridmaster", fn: gridmasterImage },
  { name: "specra-ar", fn: specraArImage },
  { name: "vectra-flow", fn: vectraFlowImage },
  { name: "syncbridge", fn: syncbridgeImage },
  { name: "hero-bg", fn: heroBgImage },
  { name: "about-bg", fn: aboutBgImage },
  { name: "cta-bg", fn: ctaBgImage },
  { name: "team-bg", fn: teamBgImage },
];

async function renderSvgToPng(svgString, outputPath) {
  const buffer = Buffer.from(svgString);
  await sharp(buffer).png({ quality: 90, compressionLevel: 6 }).toFile(outputPath);
  const stats = fs.statSync(outputPath);
  return stats.size;
}

async function main() {
  console.log("\n🎨 Zero Day Team — Image Generator\n");
  console.log(`  Output:     ${OUTPUT_DIR}`);
  console.log(`  Resolution: ${WIDTH}×${HEIGHT}`);
  console.log(`  Images:     ${IMAGE_GENERATORS.length} × 2 modes = ${IMAGE_GENERATORS.length * 2} total\n`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let totalSize = 0;

  for (const gen of IMAGE_GENERATORS) {
    console.log(`\n📸 ${gen.name}`);

    // Dark mode
    const darkSvg = gen.fn("dark");
    const darkPath = path.join(OUTPUT_DIR, `${gen.name}-dark.png`);
    const darkSize = await renderSvgToPng(darkSvg, darkPath);
    totalSize += darkSize;
    console.log(`  ✓ ${gen.name}-dark.png  (${(darkSize / 1024).toFixed(0)}KB)`);

    // Light mode
    const lightSvg = gen.fn("light");
    const lightPath = path.join(OUTPUT_DIR, `${gen.name}-light.png`);
    const lightSize = await renderSvgToPng(lightSvg, lightPath);
    totalSize += lightSize;
    console.log(`  ✓ ${gen.name}-light.png (${(lightSize / 1024).toFixed(0)}KB)`);
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅ Generated ${IMAGE_GENERATORS.length * 2} images`);
  console.log(`📦 Total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);
}

main().catch((err) => {
  console.error("\n❌ Generator failed:", err.message);
  process.exit(1);
});
