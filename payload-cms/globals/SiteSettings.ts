import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    description: "Global site settings — header, footer, contact info.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Zero Day Team",
    },
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "hello@zerodayteam.site",
    },
    {
      name: "contactLocations",
      type: "text",
      defaultValue: "Stockholm / Berlin / Remote",
    },
    {
      name: "footerTagline",
      type: "textarea",
      defaultValue:
        "A specialized engineering collective building the invisible infrastructure that powers modern enterprises.",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
