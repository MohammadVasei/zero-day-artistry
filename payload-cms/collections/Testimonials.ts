import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show on homepage", position: "sidebar" },
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
