import { CollectionConfig } from "payload/types";
import { generateSlug } from "../utilities/generateSlug";

const Blogs: CollectionConfig = {
  slug: "blogs",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "excerpt",
      type: "text",
      label: "Short Description",
      admin: {
        description: "A short summary for previews and listings",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
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

export default Blogs;
