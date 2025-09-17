import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Blog, Blogs, Categories, Category, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

export const getServerSideProps: GetServerSideProps<{
  category: Category;
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
}> = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    // Server-side ke liye private env use karo
    const payloadUrl = process.env.PAYLOAD_URL;

    // 1. Get category by slug
    const categoryRes: { data: Categories } = await axios.get(
      `${payloadUrl}/api/categories`,
      {
        params: { "where[slug][equals]": slug },
      }
    );

    const category = categoryRes.data?.docs?.[0];
    if (!category) {
      return { notFound: true };
    }

    // 2. Get blogs for that category
    const blogsRes: { data: Blogs } = await axios.get(
      `${payloadUrl}/api/blogs?limit=0`,
      {
        params: { "where[category][equals]": category.id },
      }
    );

    // 3. Get all categories and tags
    const categoriesRes: { data: Categories } = await axios.get(
      `${payloadUrl}/api/categories?limit=0`
    );
    const tagsRes: { data: Tags } = await axios.get(
      `${payloadUrl}/api/tags?limit=0`
    );

    return {
      props: {
        category,
        blogs: blogsRes.data?.docs ?? [],
        categories: categoriesRes.data,
        tags: tagsRes.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
};

export default function DynamicCategoryPage({
  blogs,
  category,
  categories,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{`Tribune Blog - Category - ${category.title}`}</title>
      </Head>
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[50px] md:py-[85px]">
            <h1 className="m-0 text-center text-[30px] leading-[110%] font-bold md:text-[60px]">
              {category.title}
            </h1>
          </div>
          <div className="bg-border mb-[50px] h-px w-full" />
          <FilterBlogs
            blogs={blogs}
            tags={tags}
            categories={categories}
            category={category}
          />
        </div>
      </section>
    </>
  );
}