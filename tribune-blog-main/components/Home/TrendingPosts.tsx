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
  limit = 5 
}) => {
  const trendingBlogs = blogs
    .filter(blog => typeof blog.featuredImage !== "string" && typeof blog.category !== "string")
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
    .slice(0, limit);

  console.log(trendingBlogs);

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[30px] text-base font-semibold">{title}</div>
      <div className="grid gap-y-[35px]">
        {trendingBlogs.map((blog, index) => {
          if (typeof blog.featuredImage === "string") return null;
          if (typeof blog.category === "string") return null;

          return (
            <div key={blog.id} className="flex">
              <Link href={`/blog/${blog.slug}`}>
                <ImageWithFallback
                  className="ease-expo h-[80px] w-[80px] min-w-[80px] rounded-full object-cover transition-transform duration-[400ms] hover:scale-110 md:h-[100px] md:w-[100px] md:min-w-[100px]"
                  src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`}
                  alt={blog.featuredImage.alt}
                  height={200}
                  width={200}
                />
              </Link>
              <div className="ml-[22px] flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/category/${blog.category.slug}`}
                    className="bg-gray text-paragraph w-fit rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
                  >
                    {blog.category.title}
                  </Link>
                  <span className="text-xs text-gray-500">
                    {blog.viewCount || 0} views
                  </span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h6 className="heading-6">{blog.title}</h6>
                </Link>
                <div className="text-xs text-gray-500">
                  {formatIsoDate(blog.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingBlogs;
