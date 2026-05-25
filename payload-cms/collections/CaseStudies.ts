import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sector", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "sector", type: "text", required: true },
    { name: "stack", type: "text" },
    { name: "challenge", type: "textarea", required: true },
    { name: "success", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
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
