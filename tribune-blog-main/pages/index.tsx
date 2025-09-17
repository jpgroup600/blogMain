import FeatureBlog from "@/components/Home/FeatureBlog";
import Latest from "@/components/Home/Latest";
import Subscribe from "@/components/Home/Subscribe";
import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import type { Blog, Blogs, Categories, Tags } from "@/types/payload-types";
import TrendingBlogs from "@/components/Home/TrendingBlogs";

export const getServerSideProps: GetServerSideProps<{
  blogs: Blogs;
  featuredBlogs: Blog[];
  categories: Categories;
  tags: Tags;
}> = async () => {
  try {
   const payloadUrl = process.env.PAYLOAD_URL ;  // Fallback for local dev
    
    const blogsResponse: { data: Blogs } = await axios.get(
      `${payloadUrl}/api/blogs?limit=10`
    );
    const featureBlogsResponse: { data: { featuredBlogs: Blog[] } } = await axios.get(
      `${payloadUrl}/api/globals/feature-blogs`
    );
    const categoriesResponse: { data: Categories } = await axios.get(
      `${payloadUrl}/api/categories?limit=0`
    );
    const tagsResponse: { data: Tags } = await axios.get(
      `${payloadUrl}/api/tags?limit=0`
    );

    return {
      props: {
        blogs: blogsResponse.data,
        featuredBlogs: featureBlogsResponse.data.featuredBlogs,
        categories: categoriesResponse.data,
        tags: tagsResponse.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        blogs: { docs: [] } as unknown as Blogs,
        featuredBlogs: [],
        categories: { docs: [] } as unknown as Categories,
        tags: { docs: [] } as unknown as Tags,
      },
    };
  }
};

export default function Home({
  blogs,
  featuredBlogs,
  categories,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Tribune Blog</title>
      </Head>
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <FeatureBlog blogs={blogs.docs.slice(0, 2)} />
          <div className="bg-border my-[30px] h-px w-full md:my-[50px]" />
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
