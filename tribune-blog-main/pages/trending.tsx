import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Blog, Blogs, Categories, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

export const getServerSideProps: GetServerSideProps<{
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
}> = async () => {
  try {
    // Server-side ke liye private env use karo
    const payloadUrl = process.env.PAYLOAD_URL ;

    const blogsResponse: { data: Blogs } = await axios.get(
      `${payloadUrl}/api/blogs?sort=-trendingScore&limit=0`
    );
    const categoriesResponse: { data: Categories } = await axios.get(
      `${payloadUrl}/api/categories?limit=0`
    );
    const tagsResponse: { data: Tags } = await axios.get(
      `${payloadUrl}/api/tags?limit=0`
    );

    return {
      props: {
        blogs: blogsResponse.data?.docs ?? [],
        categories: categoriesResponse.data,
        tags: tagsResponse.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Provide full empty structures to satisfy type requirements
    const emptyCategories: Categories = {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 0,
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      pagingCounter: 0,
      nextPage: null,
      prevPage: null,
    };
    const emptyTags: Tags = {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 0,
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      pagingCounter: 0,
      nextPage: null,
      prevPage: null,
    };
    return {
      props: {
        blogs: [],
        categories: emptyCategories,
        tags: emptyTags,
      },
    };
  }
};

export default function TrendingPage({
  blogs,
  categories,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

          <FilterBlogs blogs={blogs} tags={tags} categories={categories} />
        </div>
      </section>
    </>
  );
}
