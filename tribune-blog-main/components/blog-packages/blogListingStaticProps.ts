import axios from "axios";
import type { GetStaticProps } from "next";
import type { Blog, Blogs, Categories, Tags } from "./types/payload-types";

export type BlogListingProps = {
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
};

type Options = {
  limit?: number;
  revalidate?: number;
  payloadUrl?: string;
};

export function createBlogListingGetStaticProps(
  options: Options = {},
) {
  const {
    limit = 30,
    revalidate = 60,
    payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL,
  } = options;

  return (async () => {
    if (!payloadUrl) {
      throw new Error(
        "createBlogListingGetStaticProps: NEXT_PUBLIC_PAYLOAD_URL is not defined.",
      );
    }

    const blogsResponse: { data: Blogs } = await axios.get(
      `${payloadUrl}/api/blogs`,
      {
        params: {
          limit,
        },
      },
    );

    const categoriesResponse: { data: Categories } = await axios.get(
      `${payloadUrl}/api/categories?limit=0`,
    );
    const tagsResponse: { data: Tags } = await axios.get(
      `${payloadUrl}/api/tags?limit=0`,
    );

    return {
      props: {
        blogs: blogsResponse.data.docs,
        categories: categoriesResponse.data,
        tags: tagsResponse.data,
      },
      revalidate,
    };
  }) satisfies GetStaticProps<BlogListingProps>;
}

