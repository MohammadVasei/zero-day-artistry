import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "tag", type: "text" },
    { name: "stack", type: "text" },
    { name: "blurb", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "href", type: "text" },
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
