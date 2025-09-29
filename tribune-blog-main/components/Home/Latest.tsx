import type { Blog, Categories, Tags } from "@/types/payload-types";
import {getBlogDate } from "@/utils/formatDate";
import Link from "next/link";
import ImageWithFallback from "@/components/fallBack/ImageWithFallback";
// import TrendingBlogs from "@/components/Home/TrendingBlogs";
import { useState } from "react";
import axios from "axios";

type Props = {
  featureBlogs: Blog[];
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
};

const Latest: React.FC<Props> = ({ blogs: initialBlogs, /*featureBlogs,*/ categories, tags }) => {
  const [displayedBlogs, setDisplayedBlogs] = useState(initialBlogs.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // Initialize with all parent categories expanded by default
    const parentCategories = categories.docs.filter(cat => !cat.parent || typeof cat.parent === 'string');
    return new Set(parentCategories.map(cat => cat.id));
  });
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

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
      {/* Mobile Categories - Dropdown style */}
      <div className="md:hidden mb-6 sticky top-4 z-10">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <button
            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
          >
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Categories</span>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileCategoriesOpen && (
            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="pt-4 space-y-2">
                {categories.docs
                  .filter(cat => !cat.parent || typeof cat.parent === 'string')
                  .map((parentCategory) => {
                    const hasChildren = categories.docs.some(cat => cat.parent && typeof cat.parent === 'object' && cat.parent.id === parentCategory.id);
                    const isExpanded = expandedCategories.has(parentCategory.id);

                    return (
                      <div key={parentCategory.id} className="space-y-1">
                        {/* Parent Category */}
                        <div className="flex items-center">
                          {hasChildren && (
                            <button
                              onClick={() => toggleCategory(parentCategory.id)}
                              className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                            >
                              <svg
                                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                          <Link
                            className="flex-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                            href={`/category/${parentCategory.slug}`}
                            onClick={() => setMobileCategoriesOpen(false)}
                          >
                            {parentCategory.title}
                          </Link>
                        </div>

                        {/* Child Categories */}
                        {isExpanded && hasChildren && (
                          <div className="ml-6 space-y-1">
                            {categories.docs
                              .filter(cat => cat.parent && typeof cat.parent === 'object' && cat.parent.id === parentCategory.id)
                              .map((childCategory) => (
                                <Link
                                  key={childCategory.id}
                                  className="block bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                                  href={`/category/${childCategory.slug}`}
                                  onClick={() => setMobileCategoriesOpen(false)}
                                >
                                  {childCategory.title}
                                </Link>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

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
                        {getBlogDate(elem)}
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
      {/* Detail Area - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block sticky top-[100px] h-fit grid content-start gap-y-[50px] md:gap-y-[70px] md:pl-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-[30px] leading-[140%] font-medium">Categories</div>
          <div className="flex w-full flex-col">
            <div className="grid w-full gap-y-5">
              {categories.docs
                .filter(cat => !cat.parent || typeof cat.parent === 'string') // Only show parent categories
                .map((parentCategory) => {
                  const hasChildren = categories.docs.some(cat => typeof cat.parent === 'object' && cat.parent?.id === parentCategory.id);
                  const isExpanded = expandedCategories.has(parentCategory.id);

                  return (
                    <div key={parentCategory.id} className="space-y-2"
                      // onMouseEnter={() => toggleCategory(parentCategory.id)}
                      // onMouseLeave={() => toggleCategory(parentCategory.id)}
                    >
                      {/* Parent Category */}
                      <div className="flex items-center">
                        {hasChildren && (
                          <button
                            onClick={() => toggleCategory(parentCategory.id)}
                            className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            {isExpanded ? '▼' : '▶'}
                          </button>
                        )}
                        <Link
                          className="group data-[active='true']:border-border flex items-center data-[active='true']:rounded-lg data-[active='true']:border data-[active='true']:bg-[#2f2c331f] data-[active='true']:py-2 data-[active='true']:pr-2.5 data-[active='true']:pl-[15px]"
                          href={`/category/${parentCategory.slug}`}
                        >
                          <div className="border-border mr-[15px] h-5 w-5 rounded-full border">
                            <div className="bg-dark dark:bg-light h-full w-full scale-0 rounded-full transition-transform group-hover:scale-75 dark:group-hover:scale-100"></div>
                          </div>
                          <h5 className="heading-5 mb-0">{parentCategory.title}</h5>
                        </Link>
                      </div>

                      {/* Child Categories */}
                      {isExpanded && categories.docs 
                        .filter(cat => typeof cat?.parent === 'object' && cat?.parent?.id === parentCategory.id)
                        .map((childCategory) => (
                          <Link
                            key={childCategory.id}
                            className={`group ml-8 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg py-1 px-2 
                              ${isExpanded ? 'opacity-100 max-h-screen translate-y-0' : 'opacity-0 transition-all duration-500 ease-out'}`}
                            href={`/category/${childCategory.slug}`}
                          >
                            <div className="border-border mr-[15px] h-4 w-4 rounded-full border">
                              <div className="bg-gray-400 dark:bg-gray-500 h-full w-full scale-0 rounded-full transition-transform group-hover:scale-75"></div>
                            </div>
                            <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">{childCategory.title}</h6>
                          </Link>
                        ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* <div className="flex w-full flex-col">
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
        </div> */}
        <div className="flex w-full flex-col">
          <div className="mb-[30px] mt-10 text-base font-semibold">Tags</div>
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
