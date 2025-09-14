import { Blog } from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blogs: (string | Blog)[];
};

const Blogs: React.FC<Props> = ({ blogs }) => {
  return (
    <section className="grid gap-x-[30px] gap-y-[40px] md:grid-cols-3 md:gap-y-[57px]">
      {blogs.map((elem, index) => {
        if (typeof elem === "string") return null;
        if (typeof elem.featuredImage === "string") return null;
        if (typeof elem.category === "string") return null;

        return (
          <div className="flex flex-col" key={index}>
            <Link
              className="ease-expo transition-transform duration-[400ms] hover:scale-105"
              href={`/blog/${elem.slug}`}
            >
              <Image
                className="mb-[17px] h-[230px] rounded-lg object-cover"
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                alt={elem.featuredImage.alt}
                width={1366}
                height={689}
              />
            </Link>
            <div className="flex flex-col">
              <div className="mb-[10px] flex">
                <Link
                  href={`/category/${elem.category.slug}`}
                  className="bg-gray text-paragraph rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
                >
                  {elem.category.title}
                </Link>
                <div className="text-paragraph px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase">
                  {formatIsoDate(elem.createdAt)}
                </div>
              </div>
              <Link href={`/blog/${elem.slug}`}>
                <h5 className="heading-5">{elem.title}</h5>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Blogs;
