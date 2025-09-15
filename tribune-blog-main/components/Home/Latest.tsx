import type { Blog, Categories, Tags } from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "../fallBack/ImageWithFallback";

type Props = {
  featureBlogs: Blog[];
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
};

const Latest: React.FC<Props> = ({ blogs, featureBlogs, categories, tags }) => {
  const filterBlogs = blogs.filter((e) => {
    if (typeof e.category !== "string") {
      return e.category.title === categories.docs[0].title;
    }
    return [];
  });

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[2.2fr_1fr] lg:gap-0">
      {/* Grid Area */}
      <div className="border-border lg:border-r lg:pr-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-7 grid w-full gap-x-[30px] gap-y-[55px] md:gap-y-[74px]">
            {filterBlogs.map((elem, index) => {
       
              if (typeof elem.featuredImage === "string") return null;
              if (typeof elem.category === "string") return null;
         
              return (
                <div key={index} className="flex flex-col">
                  <Link className="hover-3d" href={`/blog/${elem.slug}`}>
                    <ImageWithFallback
                      className="h-[200px] rounded-lg object-cover sm:h-[225px] lg:h-[500px]"
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                      width={1366}
                      height={689}
                      alt={elem.featuredImage.alt}
                    />

                  </Link>
                  <div className="mt-[27px] flex flex-col">
                    <div className="mb-[10px] flex items-center">
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
                      <h2 className="heading-2 mb-5">{elem.title}</h2>
                    </Link>
                    {elem.excerpt ? (
                      <p className="text-paragraph pr-[8%]">{elem.excerpt}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
            <button className="button">See All Posts</button>
          </div>
        </div>
      </div>
      {/* Detail Area */}
      <div className="grid content-start gap-y-[50px] md:gap-y-[70px] lg:sticky lg:top-[120px] lg:pl-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-[30px] leading-[140%] font-medium">Categories</div>
          <div className="flex w-full flex-col">
            <div className="grid w-full gap-y-5">
              {categories.docs.map((elem, index) => {
                return (
                  <Link
                    key={index}
                    className="group data-[active='true']:border-border flex items-center data-[active='true']:rounded-lg data-[active='true']:border data-[active='true']:bg-[#2f2c331f] data-[active='true']:py-2 data-[active='true']:pr-2.5 data-[active='true']:pl-[15px]"
                    href={`/category/${elem.slug}`}
                    data-active={index === 0}
                  >
                    <div className="border-border mr-[15px] h-5 w-5 rounded-full border">
                      <div
                        data-active={index === 0}
                        className={
                          "bg-light h-full w-full scale-0 rounded-full transition-transform group-hover:scale-100 data-[active='true']:scale-100"
                        }
                      ></div>
                    </div>
                    <h5 className="heading-5 mb-0">{elem.title}</h5>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="mb-[30px] text-base font-semibold">Feature</div>
          <div className="grid gap-y-[35px]">
            {featureBlogs.map((elem, index) => {
              let isImageNull = false
              let isTextNull = false
              if (typeof elem.featuredImage === "string") return null;
              if (typeof elem.category === "string") return null;
              if (elem.featuredImage.url!) { isImageNull = true; }
              if (elem.title!) { isTextNull = true; }

              return (
                <div key={index} className="flex">
                  <Link href={`/blog/${elem.slug}`}>
                    <ImageWithFallback
                      className="ease-expo h-[70px] w-[70px] min-w-[70px] rounded-full object-cover transition-transform duration-[400ms] hover:scale-110 sm:h-[80px] sm:w-[80px] sm:min-w-[80px] lg:h-[100px] lg:w-[100px] lg:min-w-[100px]"
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                      alt={elem.featuredImage.alt}
                      height={200}
                      width={200}
                    />
                  </Link>
                  <div className="ml-[15px] flex flex-col gap-1.5 sm:ml-[22px]">
                    <Link
                      href={`/category/${elem.category.slug}`}
                      className="bg-gray text-paragraph w-fit rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
                    >
                      {elem.category.title}
                    </Link>
                    <Link href={`/blog/${elem.slug}`}>
                      <h6 className="heading-6">{elem.title}</h6>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="mb-[30px] text-base font-semibold">Tags</div>
          <div className="flex flex-wrap gap-[7px]">
            {tags.docs.map((elem, index) => {
              return (
                <Link
                  className="border-border hover:bg-light hover:text-dark text-paragraph ease-expo rounded-md border px-[20px] py-[12px] text-[13px] leading-[110%] font-semibold transition-colors duration-[400ms]"
                  key={index}
                  href={`/tags/${elem.slug}`}
                >
                  {elem.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
