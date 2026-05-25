import { createServerFn } from "@tanstack/react-start";

export type PayloadPage = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  seo?: {
    title?: string;
    description?: string;
    ogImage?: { url?: string; alt?: string } | string;
  };
  // Loose typing — block shape is dynamic, validated by the renderer at runtime
  blocks?: Array<{ blockType: string; id?: string; [key: string]: any }>;
};

/**
 * Fetch a page from the external Payload CMS by slug.
 * Requires PAYLOAD_API_URL env var (e.g. https://cms.zeroday.team).
 * Returns null if the page doesn't exist or the CMS is unreachable.
 */
export const getPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<PayloadPage | null> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) {
      console.warn("[payload] PAYLOAD_API_URL is not set — returning null");
      return null;
    }

    const url = `${base.replace(/\/$/, "")}/api/pages?where[slug][equals]=${encodeURIComponent(
      data.slug,
    )}&where[status][equals]=published&depth=2&limit=1`;

    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) {
        console.error(`[payload] fetch failed: ${res.status} ${res.statusText}`);
        return null;
      }
      const json = (await res.json()) as { docs?: PayloadPage[] };
      return json.docs?.[0] ?? null;
    } catch (err) {
      console.error("[payload] fetch error:", err);
      return null;
    }
  });

/**
 * Submit a contact form entry to the Payload CMS.
 * Creates a new document in the contact-submissions collection.
 */
export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; project: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean; error?: string }> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) {
      console.warn("[payload] PAYLOAD_API_URL is not set — contact form disabled");
      return { success: false, error: "Contact form is not configured." };
    }

    const url = `${base.replace(/\/$/, "")}/api/contact-submissions`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          project: data.project,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`[payload] contact submit failed: ${res.status}`, body);
        return { success: false, error: "Failed to send message. Please try again." };
      }

      return { success: true };
    } catch (err) {
      console.error("[payload] contact submit error:", err);
      return { success: false, error: "Something went wrong. Please try again." };
    }
  });

/**
 * Fetch all featured testimonials from Payload CMS.
 */
export const getTestimonials = createServerFn({ method: "GET" })
  .handler(async (): Promise<any[]> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) return [];
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/testimonials?where[featured][equals]=true&sort=sortOrder&limit=20`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return [];
      const json = await res.json();
      return json.docs ?? [];
    } catch { return []; }
  });

/**
 * Fetch published case studies from Payload CMS.
 */
export const getCaseStudies = createServerFn({ method: "GET" })
  .handler(async (): Promise<any[]> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) return [];
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/case-studies?where[status][equals]=published&sort=sortOrder&limit=20`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return [];
      const json = await res.json();
      return json.docs ?? [];
    } catch { return []; }
  });

/**
 * Fetch published projects from Payload CMS.
 */
export const getProjects = createServerFn({ method: "GET" })
  .handler(async (): Promise<any[]> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) return [];
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/projects?where[status][equals]=published&sort=sortOrder&limit=20`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return [];
      const json = await res.json();
      return json.docs ?? [];
    } catch { return []; }
  });

/**
 * Fetch global site settings from Payload CMS.
 */
export const getSiteSettings = createServerFn({ method: "GET" })
  .handler(async (): Promise<any | null> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) return null;
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/globals/site-settings`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  });

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
