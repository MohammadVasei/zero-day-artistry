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
  blocks?: Array<Record<string, unknown> & { blockType: string; id?: string }>;
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
