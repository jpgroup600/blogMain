import BlogSection from "@/components/Home/Blogs";
import FeatureBlog from "@/components/Home/FeatureBlog";
import Latest from "@/components/Home/Latest";
import Subscribe from "@/components/Home/Subscribe";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import axios from "axios";
import type { Blog, Blogs, Categories, Tags } from "@/types/payload-types";
import TrendingBlogs from "@/components/Home/TrendingBlogs";

export const getStaticProps = (async () => {
  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=10`,
  );
  const featureBlogsResponse: { data: { featuredBlogs: Blog[] } } =
    await axios.get(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/feature-blogs`,
    );
  const categoriesResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`,
  );
  const tagsResponse: { data: Tags } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=0`,
  );

  return {
    props: {
      blogs: blogsResponse.data,
      featuredBlogs: featureBlogsResponse.data.featuredBlogs,
      categories: categoriesResponse.data,
      tags: tagsResponse.data,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  blogs: Blogs;
  featuredBlogs: Blog[];
  tags: Tags;
  categories: Categories;
}>;

export default function Home({
  blogs,
  featuredBlogs,
  categories,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Tribune Blog</title>
      </Head>
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <FeatureBlog blogs={blogs.docs.slice(0, 2)} />
          <div className="bg-border my-[30px] h-px w-full md:my-[50px]" />
          {/* <BlogSection blogs={blogs.docs.slice(2, blogs.docs.length)} /> */}
          <TrendingBlogs blogs={blogs.docs} />
          <div className="bg-border my-[30px] h-px w-full md:my-[50px]" />
          <Subscribe />
          <div className="bg-border my-[30px] h-px w-full md:my-[50px]" />
          <Latest
            blogs={blogs.docs}
            featureBlogs={featuredBlogs}
            categories={categories}
            tags={tags}
          />
        </div>
      </section>
    </>
  );
}
