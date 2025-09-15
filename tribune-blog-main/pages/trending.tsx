import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Blog, Blogs } from "@/types/payload-types";
import axios from "axios";
import TrendingBlogs from "@/components/Home/TrendingBlogs";
import FilterBlogs from "@/components/Common/FilterBlogs";
import { Categories, Tags } from "@/types/payload-types";

export const getStaticProps = (async () => {
  // Get trending blogs
  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?sort=-trendingScore&limit=0`,
  );

  // Get categories and tags for sidebar
  const categoriesResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`,
  );
  const tagsResponse: { data: Tags } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=0`,
  );

  return {
    props: {
      blogs: blogsResponse.data?.docs ?? [],
      categories: categoriesResponse.data,
      tags: tagsResponse.data,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
}>;

export default function TrendingPage({
  blogs,
  categories,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Trending Posts - Tribune Blog</title>
        <meta name="description" content="Discover the most trending blog posts" />
      </Head>
      
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[50px] md:py-[85px]">
            <h1 className="m-0 text-center text-[30px] leading-[110%] font-bold md:text-[60px]">
              Trending Posts
            </h1>
          </div>
          <div className="bg-border mb-[50px] h-px w-full" />
          
          <FilterBlogs
            blogs={blogs}
            tags={tags}
            categories={categories}
          />
        </div>
      </section>
    </>
  );
}
