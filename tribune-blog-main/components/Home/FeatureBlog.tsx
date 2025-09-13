import type { Blog } from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blogs: Blog[];
};

const FeatureBlog: React.FC<Props> = ({ blogs }) => {
  return (
    <section className="grid w-full grid-cols-2 gap-[30px]">
      {blogs.map((elem, index) => {
        if (typeof elem.featuredImage === "string") return null;
        if (typeof elem.category === "string") return null;

        return (
          <div key={index} className="w-full">
            <Link
              href={`/blog/${elem.slug}`}
              className="hover-3d group relative flex h-[680px] w-full items-end overflow-hidden rounded-lg"
            >
              <Image
                className="absolute inset-0 h-full w-full object-cover"
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                width={1366}
                height={689}
                alt={elem.featuredImage.alt}
              />
              <div className="ease-expo relative z-10 flex flex-col bg-gradient-to-b from-transparent px-[7%] pt-[16%] pb-[7%] transition-transform duration-500 group-hover:scale-105">
                <div className="mb-[7px] flex">
                  <div className="bg-dark rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {elem.category.title}
                  </div>
                  <div className="px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                    {formatIsoDate(elem.createdAt)}
                  </div>
                </div>
                <h3 className="heading-3">{elem.title}</h3>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default FeatureBlog;
