import { GlobalConfig } from "payload/types";

const FeatureBlogs: GlobalConfig = {
  slug: "feature-blogs",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "featuredBlogs",
      type: "relationship",
      relationTo: "blogs",
      hasMany: true,
    },
  ],
};

export default FeatureBlogs;
