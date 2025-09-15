import type { Blog, Categories, Tags } from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Link from "next/link";
import ImageWithFallback from "@/components/fallBack/ImageWithFallback";
import TrendingBlogs from "@/components/Home/TrendingBlogs";
import { useState } from "react";
import axios from "axios";

type Props = {
  featureBlogs: Blog[];
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
};

const Latest: React.FC<Props> = ({ blogs: initialBlogs, featureBlogs, categories, tags }) => {
  const [displayedBlogs, setDisplayedBlogs] = useState(initialBlogs.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreBlogs = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = currentPage + 1;
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=5&page=${nextPage}`
      );
      
      const newBlogs = response.data?.docs ?? [];
      
      if (newBlogs.length > 0) {
        setDisplayedBlogs(prev => [...prev, ...newBlogs]);
        setCurrentPage(nextPage);
        // If we got less than 5 blogs, we've reached the end
        setHasMore(newBlogs.length === 5);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more blogs:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-[2.2fr_1fr]">
      {/* Grid Area */}
      <div className="border-border self-stretch border-r md:pr-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-7 grid w-full gap-x-[30px] gap-y-[55px] md:gap-y-[74px]">
            {displayedBlogs.map((elem, index) => {
              if (typeof elem.featuredImage === "string") return null;
              if (typeof elem.category === "string") return null;

              return (
                <div key={index} className="flex flex-col">
                  <Link className="hover-3d" href={`/blog/${elem.slug}`}>
                    <ImageWithFallback
                      className="h-[225px] rounded-lg object-cover md:h-[500px]"
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
                        className="bg-gray text-light dark:text-paragraph rounded-sm px-2.5 py-1.5 text-[11px] leading-[110%] font-medium uppercase"
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
            {hasMore && (
              <button
                style={{
                  transition:
                    "color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                className="button"
                onClick={loadMoreBlogs}
                disabled={loading}
              >
                {loading ? "Loading..." : "See More Posts"}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Detail Area */}
      <div className="sticky top-[100px] h-fit grid content-start gap-y-[50px] md:gap-y-[70px] md:pl-[50px]">
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
                    // data-active={index === 0}
                  >
                    <div className="border-border mr-[15px] h-5 w-5 rounded-full border">
                      <div
                        // data-active={index === 0}
                        className={
                          "bg-dark dark:bg-light h-full w-full scale-0 rounded-full transition-transform group-hover:scale-75 data-[active='true']:scale-75 dark:group-hover:scale-100 dark:data-[active='true']:scale-100"
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
                  if (typeof elem.featuredImage === "string") return null;
                  if (typeof elem.category === "string") return null;

                  return (
                    <div key={index} className="flex">
                      <Link href={`/blog/${elem.slug}`}>
                        <ImageWithFallback
                          className="ease-expo h-[80px] w-[80px] min-w-[80px] rounded-full object-cover transition-transform duration-[400ms] hover:scale-110 md:h-[100px] md:w-[100px] md:min-w-[100px]"
                          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                          alt={elem.featuredImage.alt}
                          height={200}
                          width={200}
                        />
                      </Link>
                      <div className="ml-[22px] flex flex-col gap-1.5">
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
                  className="border-border hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark text-dark dark:text-paragraph ease-expo rounded-md border px-[20px] py-[12px] text-[13px] leading-[110%] font-semibold transition-colors duration-[400ms]"
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
