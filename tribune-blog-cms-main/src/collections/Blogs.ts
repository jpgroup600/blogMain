import { CollectionConfig } from "payload/types";
import { generateSlug } from "../utilities/generateSlug";



const Blogs: CollectionConfig = {
  slug: "blogs",
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      // Allow public updates for view tracking (simplified for now)
      return true;
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "viewCount", "trendingScore", "category", "createdAt"],
    listSearchableFields: ["title", "excerpt"],
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
      name: "structuredData",
      label: "Structured Data (JSON-LD)",
      type: "textarea",
      admin: {
        description:
          "Paste the JSON body you want to output inside <script type=\"application/ld+json\">. No script tags needed.",
        rows: 10,
      },
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
    {
      name: "relatedBlogs",
      type: "relationship",
      relationTo: "blogs",
      hasMany: true,
    },
    {
      name: "viewCount",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Total number of views",
        readOnly: true,
      },
    },
    {
      name: "trendingScore",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Calculated trending score based on views and recency",
        readOnly: true,
      },
    },
    {
      name: "lastViewedAt",
      type: "date",
      admin: {
        description: "Last time this blog was viewed",
        readOnly: true,
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
    // Temporarily disable the afterChange hook to avoid potential issues
    // afterChange: [
    //   async ({ doc, operation, req }) => {
    //     // Only update trending score for existing blogs (not new ones)
    //     if (operation === 'update' && doc.viewCount > 0) {
    //       const now = new Date();
    //       const createdAt = new Date(doc.createdAt);
    //       const daysSinceCreation = Math.max(1, (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
          
    //       // Calculate trending score: viewCount / daysSinceCreation
    //       const trendingScore = Math.round((doc.viewCount / daysSinceCreation) * 100) / 100;
          
    //       // Update the document with new trending score
    //       await req.payload.update({
    //         collection: 'blogs',
    //         id: doc.id,
    //         data: {
    //           trendingScore: trendingScore,
    //         },
    //       });
    //     }
    //   },
    // ],
  },
};

export default Blogs;