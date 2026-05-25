import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Testimonials as TestimonialsCollection } from "./collections/Testimonials";
import { CaseStudies as CaseStudiesCollection } from "./collections/CaseStudies";
import { Projects as ProjectsCollection } from "./collections/Projects";
import { SiteSettings } from "./globals/SiteSettings";
import { TeamMembers as TeamMembersCollection } from "./collections/TeamMembers";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── BLOCK DEFINITIONS ─────────────────────────────────────────────
// Each block here becomes a widget the editor can drop onto any page.
// To add a new widget: define it here, then register a React component
// for the same `slug` in the frontend block-renderer.

const HeroBlock = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "headline", type: "text", required: true },
    { name: "subheadline", type: "text" },
    { name: "primaryCtaLabel", type: "text" },
    { name: "primaryCtaHref", type: "text" },
    { name: "secondaryCtaLabel", type: "text" },
    { name: "secondaryCtaHref", type: "text" },
  ],
};

const TerminalBlock = {
  slug: "terminal",
  labels: { singular: "Terminal", plural: "Terminals" },
  fields: [
    { name: "title", type: "text", defaultValue: "root@zeroday — zsh" },
    {
      name: "lines",
      type: "array",
      required: true,
      fields: [
        { name: "prompt", type: "select", defaultValue: "$", options: ["$", ">", "#"] },
        { name: "text", type: "text", required: true },
        {
          name: "tone",
          type: "select",
          defaultValue: "default",
          options: ["default", "muted", "ok", "warn", "error"],
        },
        { name: "delayMs", type: "number", defaultValue: 400 },
      ],
    },
  ],
};

const RichTextBlock = {
  slug: "richText",
  labels: { singular: "Rich text", plural: "Rich text" },
  fields: [
    {
      name: "maxWidth",
      type: "select",
      defaultValue: "prose",
      options: ["prose", "narrow", "wide", "full"],
    },
    { name: "content", type: "richText", required: true },
  ],
};

const ImageBlock = {
  slug: "image",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "caption", type: "text" },
    {
      name: "aspect",
      type: "select",
      defaultValue: "auto",
      options: ["auto", "square", "video", "wide"],
    },
  ],
};

const ProcessStepsBlock = {
  slug: "processSteps",
  labels: { singular: "Process steps", plural: "Process steps" },
  fields: [
    { name: "title", type: "text" },
    {
      name: "steps",
      type: "array",
      required: true,
      fields: [
        { name: "number", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};

const MarqueeBlock = {
  slug: "marquee",
  labels: { singular: "Marquee", plural: "Marquees" },
  fields: [
    { name: "speed", type: "select", defaultValue: "normal", options: ["slow", "normal", "fast"] },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
};

const SelectedWorksBlock = {
  slug: "selectedWorks",
  labels: { singular: "Selected works", plural: "Selected works" },
  fields: [
    { name: "title", type: "text" },
    {
      name: "projects",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text" },
        { name: "tag", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "href", type: "text" },
      ],
    },
  ],
};

const CtaBlock = {
  slug: "cta",
  labels: { singular: "CTA", plural: "CTAs" },
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};

const SpacerBlock = {
  slug: "spacer",
  labels: { singular: "Spacer", plural: "Spacers" },
  fields: [{ name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg", "xl"] }],
};

const HtmlBlock = {
  slug: "html",
  labels: { singular: "Custom HTML", plural: "Custom HTML" },
  fields: [{ name: "html", type: "code", admin: { language: "html" }, required: true }],
};

const ALL_BLOCKS = [
  HeroBlock,
  TerminalBlock,
  RichTextBlock,
  ImageBlock,
  ProcessStepsBlock,
  MarqueeBlock,
  SelectedWorksBlock,
  CtaBlock,
  SpacerBlock,
  HtmlBlock,
];

// ─── COLLECTIONS ───────────────────────────────────────────────────

const Users = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [{ name: "name", type: "text" }],
};

const Media = {
  slug: "media",
  upload: true,
  access: { read: () => true },
  fields: [{ name: "alt", type: "text" }],
};

const Pages = {
  slug: "pages",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "status", "updatedAt"] },
  access: {
    read: ({ req }) => {
      // Public can only see published pages; authed users see everything
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL path, e.g. 'about' or 'pricing'. Use 'home' for the homepage." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "blocks",
      type: "blocks",
      label: "Page widgets",
      blocks: ALL_BLOCKS,
    },
  ],
};

// ─── CONFIG ────────────────────────────────────────────────────────

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: { user: Users.slug },
  collections: [
    Users,
    Media,
    Pages,
    ContactSubmissions,
    TestimonialsCollection,
    CaseStudiesCollection,
    ProjectsCollection,
    TeamMembersCollection,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  cors: [process.env.PAYLOAD_PUBLIC_FRONTEND_URL || "*"].filter(Boolean),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
