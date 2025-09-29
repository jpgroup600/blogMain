import type { Blog } from "@/types/payload-types";
import { formatIsoDate, getBlogDate } from "@/utils/formatDate";
import Link from "next/link";
import ImageWithFallback from "@/components/fallBack/ImageWithFallback";

type Props = {
  blogs: Blog[];
};

const FeatureBlog: React.FC<Props> = ({ blogs }) => {
  console.log(`blogs`, blogs);
  return (
    <section className="grid w-full gap-[15px] md:grid-cols-2 md:gap-[30px]">
      {blogs.map((elem, index) => {
        if (typeof elem.featuredImage === "string") return null;
        
        return (
          <div key={index} className="w-full">
            <Link
              href={`/blog/${elem.slug}`}
              className="hover-3d group relative flex h-[300px] w-full items-end overflow-hidden rounded-lg md:h-[680px]"
            >
              <ImageWithFallback
                className="absolute inset-0 h-full w-full object-cover"
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                width={1366}
                height={689}
                alt={elem.featuredImage.alt}
              />
              <div className="ease-expo relative z-10 flex flex-col bg-gradient-to-b from-transparent p-6 transition-transform duration-500 group-hover:scale-105 md:px-[7%] md:pt-[16%] md:pb-[7%]">
                <div className="mb-[7px] flex">
                  <div className="bg-dark text-light rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {typeof elem.category === "string" ? "Category" : elem.category.title}
                  </div>
                  <div className="text-light px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {formatIsoDate(getBlogDate(elem))}
                  </div>
                </div>
                <h3 className="heading-3 text-light">{elem.title}</h3>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default FeatureBlog;
