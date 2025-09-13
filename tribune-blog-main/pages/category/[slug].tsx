import Head from "next/head";

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Blog, Blogs, Categories, Category, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

export const getStaticPaths = (async () => {
  const categoriesResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`,
  );

  const paths = categoriesResponse.data.docs.map((elem) => ({
    params: {
      slug: elem.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;

  // assuming your dynamic page is [slug].tsx
  const categorySlug = params?.slug as string;

  // 1. get category by slug
  const categoryResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories`,
    {
      params: {
        "where[slug][equals]": categorySlug,
      },
    },
  );

  const category = categoryResponse.data?.docs?.[0];

  if (!category) {
    return {
      notFound: true,
    };
  }

  // 2. get blogs for that category by ID
  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=0`,
    {
      params: {
        "where[category][equals]": category.id,
      },
    },
  );

  const categoriesResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`,
  );
  const tagsResponse: { data: Tags } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=0`,
  );

  return {
    props: {
      category,
      blogs: blogsResponse.data?.docs ?? [],
      categories: categoriesResponse.data,
      tags: tagsResponse.data,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  category: Category;
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
}>;

export default function DynacmicCategoryPage({
  blogs,
  category,
  categories,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Tribune Blog - Category - {`${category.title}`}</title>
      </Head>
      <section className="flex flex-col items-center px-[30px] pt-[80px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[85px]">
            <h1 className="m-0 text-center text-[60px] leading-[110%] font-bold">
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
