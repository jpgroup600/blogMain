import { generateSlug } from "../utilities/generateSlug";
import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
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
