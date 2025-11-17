import Head from "next/head";
import BlogListingSection from "@/components/blog-packages/BlogListingSection";
import { createBlogListingGetStaticProps } from "@/components/blog-packages/blogListingStaticProps";
import type { Blog, Categories, Tags } from "@/types/payload-types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps = createBlogListingGetStaticProps({
  limit: 30,
  revalidate: 60,
}) satisfies GetStaticProps<{
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
}>;

export default function BlogListingPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <>
      <Head>
        <title>Blog Gallery | Tribune</title>
      </Head>
      <BlogListingSection {...props} eyebrow="Browse" title="Editorial Gallery" />
    </>
  );
}