import { generateSlug } from "../utilities/generateSlug";
import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "parent", "slug", "updatedAt"],
    listSearchableFields: ["title", "slug"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      admin: {
        description: "Select parent category (leave empty for main category)",
        position: "sidebar",
      },
      filterOptions: () => {
        return {
          parent: {
            exists: false, // Only show main categories (no parent) as options
          },
        };
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = generateSlug(data.title);
        }
        return data;
      },
    ],
  },
};

export default Categories;
