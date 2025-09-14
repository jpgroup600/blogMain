import Head from "next/head";

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Blog, Blogs, Categories, Tag, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

export const getStaticPaths = (async () => {
  const tagsResponse: { data: Tags } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=0`,
  );

  const paths = tagsResponse.data.docs.map((elem) => ({
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
  const tagSlug = params?.slug as string;

  // 1. get category by slug
  const TagsResponse: { data: Tags } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags`,
    {
      params: {
        "where[slug][equals]": tagSlug,
      },
    },
  );

  const tag = TagsResponse.data?.docs?.[0];

  if (!tag) {
    return {
      notFound: true,
    };
  }

  // 2. get blogs for that category by ID
  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs`,
    {
      params: {
        "where[tags][in]": tag.id,
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
      tag,
      blogs: blogsResponse.data?.docs ?? [],
      categories: categoriesResponse.data,
      tags: tagsResponse.data,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  tag: Tag;
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
}>;

export default function DynacmicTagsPage({
  blogs,
  tag,
  categories,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`Tribune Blog - Tag - ${tag.title}`}</title>
      </Head>
      <section className="flex flex-col items-center px-[30px] pt-[80px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[85px]">
            <h1 className="m-0 text-center text-[60px] leading-[110%] font-bold">
              {tag.title}
            </h1>
          </div>
          <div className="bg-border mb-[50px] h-px w-full" />
          <FilterBlogs
            blogs={blogs}
            tags={tags}
            categories={categories}
            tag={tag}
          />
        </div>
      </section>
    </>
  );
}
