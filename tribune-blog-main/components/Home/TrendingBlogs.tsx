import type { Blog } from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Link from "next/link";
import ImageWithFallback from "@/components/fallBack/ImageWithFallback";

type Props = {
  blogs: Blog[];
  title?: string;
  limit?: number;
};

const TrendingBlogs: React.FC<Props> = ({ 
  blogs, 
  title = "Trending Posts",
  limit = 6 
}) => {
  const trendingBlogs = blogs
    .filter(blog => typeof blog.featuredImage !== "string" && typeof blog.category !== "string")
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
    .slice(0, limit);

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[30px] text-2xl font-bold text-dark dark:text-light  pb-2 inline-block">
        {title}
      </div>
      <section className="grid gap-x-[30px] gap-y-[40px] md:grid-cols-3 md:gap-y-[57px]">
        {trendingBlogs.map((blog, index) => {
          if (typeof blog.featuredImage === "string") return null;
          if (typeof blog.category === "string") return null;

          return (
            <div className="flex flex-col" key={blog.id}>
              <Link
                className="ease-expo transition-transform duration-[400ms] hover:scale-105"
                href={`/blog/${blog.slug}`}
              >
                <ImageWithFallback
                  className="mb-[17px] h-[230px] rounded-lg object-cover"
                  src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`}
                  alt={blog.featuredImage.alt}
                  width={1366}
                  height={689}
                />
              </Link>
              <div className="flex flex-col">
                <div className="mb-[10px] flex justify-between items-center">
                  <div className="flex">
                    <Link
                      href={`/category/${blog.category.slug}`}
                      className="bg-gray text-light dark:text-paragraph rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
                    >
                      {blog.category.title}
                    </Link>
                    <div className="text-paragraph px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                      {formatIsoDate(blog.createdAt)}
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {blog.viewCount || 0} views
                  </div>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h5 className="heading-5">{blog.title}</h5>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TrendingBlogs;
