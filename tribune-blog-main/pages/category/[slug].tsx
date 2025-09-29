import Head from "next/head";

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import { Blog, Blogs, Categories, Category, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

// Removed getStaticPaths - using getServerSideProps instead

export const getServerSideProps = (async (context) => {
  const { params } = context;

  // assuming your dynamic page is [slug].tsx
  const categorySlug = params?.slug as string;

  // 1. get all categories first
  const categoriesResponse: { data: Categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`,
  );

  // 2. find the specific category by slug
  const category = categoriesResponse.data?.docs?.find(cat => cat.slug === categorySlug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  // 3. get blogs for that category by ID (including child categories)
  let blogQuery: Record<string, string> = {
    "where[category][equals]": category.id,
  };

  // If this is a parent category, also include blogs from child categories
  const childCategories = categoriesResponse.data?.docs?.filter(cat => 
    cat.parent && typeof cat.parent === 'object' && cat.parent.id === category.id
  ) || [];

  if (childCategories.length > 0) {
    // Include blogs from parent category OR any child categories
    const categoryIds = [category.id, ...childCategories.map(child => child.id)];
    blogQuery = {
      "where[category][in]": categoryIds.join(','),
    };
  }

  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=0`,
    {
      params: blogQuery,
    },
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
  };
}) satisfies GetServerSideProps<{
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{`Tribune Blog - Category -  ${category.title}`}</title>
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
