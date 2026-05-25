import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPageBySlug } from "@/lib/payload.functions";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const page = await getPageBySlug({ data: { slug: params.slug } });
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) return { meta: [{ title: "Not found" }] };
    const title = page.seo?.title || `${page.title} — Zero Day`;
    const description = page.seo?.description || "";
    const ogImage =
      typeof page.seo?.ogImage === "object" ? page.seo?.ogImage?.url : page.seo?.ogImage;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      ],
    };
  },
  component: DynamicPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Page not found</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-display mb-2">Couldn't load this page</h1>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function DynamicPage() {
  const { page } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <BlockRenderer blocks={page.blocks} />
      </main>
      <SiteFooter />
    </div>
  );
}
