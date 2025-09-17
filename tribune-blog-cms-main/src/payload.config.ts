import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import seoPlugin from "@payloadcms/plugin-seo";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Media from "./collections/Media";
import Blogs from "./collections/Blogs";
import Categories from "./collections/Categories";
import Tags from "./collections/Tags";
import FeatureBlogs from "./globals/FeatureBlogs";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({
    admin: {
      elements: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "link",
        "ul",
        "upload",
      ],
    },
  }),
  collections: [Users, Media, Blogs, Categories, Tags],
  globals: [FeatureBlogs],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: [
    process.env.FRONTEND_URI || 'http://localhost:3000'
  ],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    seoPlugin({
      collections: ["blogs"],
      uploadsCollection: "media",
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
