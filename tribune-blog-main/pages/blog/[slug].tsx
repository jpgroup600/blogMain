import Head from "next/head";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Blog, Blogs } from "@/types/payload-types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { formatIsoDate } from "@/utils/formatDate";
import { renderRichText, SlateNode } from "@/lib/renderRichText";
import BlogSection from "@/components/Home/Blogs";

export const getStaticPaths = (async () => {
  const blogsResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=0`,
  );

  const paths = blogsResponse.data.docs.map((blog) => ({
    params: {
      slug: blog.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;
  const blogSlug = params?.slug as string;

  // 1. fetch the blog by slug
  const blogResponse: { data: Blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs`,
    {
      params: {
        "where[slug][equals]": blogSlug,
      },
    },
  );

  const blog = blogResponse.data?.docs?.[0];

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  blog: Blog;
}>;

export default function DynamicBlogPage({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (typeof blog.featuredImage === "string") return null;
  if (typeof blog.category === "string") return null;
  if (typeof blog.meta?.image === "string") return null;

  console.log(blog.relatedBlogs);

  return (
    <>
      <Head>
        <title>{`${blog.meta?.title ? blog.meta?.title : blog.title}`}</title>
        {blog.meta?.description && (
          <meta name="description" content={blog.meta?.description} />
        )}

        {blog.meta?.image && (
          <>
            {/* Open Graph for social sharing */}
            <meta
              property="og:image"
              content={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.meta.image.url}`}
            />
            <meta property="og:type" content="article" />
            <meta
              property="og:title"
              content={blog.meta?.title || blog.title}
            />
            <meta
              property="og:description"
              content={blog.meta?.description || ""}
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.meta.image.url}`}
            />
            <meta
              name="twitter:title"
              content={blog.meta?.title || blog.title}
            />
            <meta
              name="twitter:description"
              content={blog.meta?.description || ""}
            />
          </>
        )}
      </Head>
      <section className="flex flex-col items-center px-[30px] pt-[60px]">
        <Image
          className="h-[80vh] w-full rounded-lg object-cover"
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`}
          width={1920}
          height={1080}
          alt={blog.featuredImage.alt}
        />
        <div className="max-w-custom-container mx-auto flex w-full flex-col items-center">
          <div className="flex w-full max-w-[780px] flex-col">
            <div className="mx-auto mt-[70px] mb-[30px] flex w-full flex-col">
              <div className="flex flex-col">
                <div className="mb-[10px] flex">
                  <Link
                    href={`/category/${blog.category.slug}`}
                    className="bg-gray text-paragraph rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
                  >
                    {blog.category.title}
                  </Link>
                  <div className="text-paragraph px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {formatIsoDate(blog.createdAt)}
                  </div>
                </div>
                <h1 className="text-[60px] leading-[110%] font-bold">
                  {blog.title}
                </h1>
              </div>
            </div>
            <div>{renderRichText(blog.content as SlateNode[])}</div>
            <div className="mt-5 mb-[7px] flex flex-wrap gap-[7px]">
              {blog.tags
                ? blog.tags.map((elem, index) => {
                    if (typeof elem === "string") return null;
                    return (
                      <Link
                        className="border-border hover:bg-light hover:text-dark text-paragraph ease-expo rounded-md border px-[20px] py-[12px] text-[13px] leading-[110%] font-semibold transition-colors duration-[400ms]"
                        key={index}
                        href={`/tags/${elem.slug}`}
                      >
                        {elem.title}
                      </Link>
                    );
                  })
                : null}
            </div>
          </div>
          {blog.relatedBlogs ? (
            <>
              <div className="bg-border my-[50px] h-px w-full" />
              <BlogSection blogs={blog.relatedBlogs} />
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
