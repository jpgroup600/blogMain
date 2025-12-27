import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Blog, Blogs, Categories, Tag, Tags } from "@/types/payload-types";
import axios from "axios";
import FilterBlogs from "@/components/Common/FilterBlogs";

export const getServerSideProps: GetServerSideProps<{
  tag: Tag;
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
}> = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    // 1. Get tag by slug
    const payloadUrl = process.env.PAYLOAD_URL ;

    // 1. Get tag by slug
    const tagsRes: { data: Tags } = await axios.get(
      `${payloadUrl}/api/tags`,
      {
        params: { "where[slug][equals]": slug },
      }
    );

    const tag = tagsRes.data?.docs?.[0];
    if (!tag) {
      return { notFound: true };
    }

    // 2. Blogs for that tag
    const blogsRes: { data: Blogs } = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs`,
      {
        params: { "where[tags][in]": tag.id },
      }
    );

    // 3. Categories and all tags
    const categoriesRes: { data: Categories } = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=0`
    );
    const allTagsRes: { data: Tags } = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=0`
    );

    return {
      props: {
        tag,
        blogs: blogsRes.data?.docs ?? [],
        categories: categoriesRes.data,
        tags: allTagsRes.data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function DynamicTagsPage({
  blogs,
  tag,
  categories,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{`Tribune Blog - Tag - ${tag.title}`}</title>
      </Head>
      <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center px-[10%] py-[50px] md:py-[85px]">
            <h1 className="m-0 text-center text-[30px] leading-[110%] font-bold md:text-[60px]">
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
