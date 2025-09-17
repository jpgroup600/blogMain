import path from "path";
import type { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: path.resolve(process.cwd(), "media"),
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export default Media;
