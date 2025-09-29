import type {
  Blog,
  Categories,
  Category,
  Tag,
  Tags,
} from "@/types/payload-types";
import { formatIsoDate } from "@/utils/formatDate";
import Link from "next/link";
import ImageWithFallback from "@/components/fallBack/ImageWithFallback";
import { useState } from "react";

type Props = {
  blogs: Blog[];
  tags: Tags;
  categories: Categories;
  category?: Category;
  tag?: Tag;
};

const FilterBlogs: React.FC<Props> = ({
  blogs,
  categories,
  tags,
  category,
  tag,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
  return (
    <section className="grid md:grid-cols-[2.2fr_1fr]">
      {/* Grid Area */}
      <div className="border-border self-stretch border-r md:pr-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-7 grid w-full gap-x-[30px] gap-y-[74px]">
            {blogs.map((elem, index) => {
              if (typeof elem.featuredImage === "string") return null;
              if (typeof elem.category === "string") return null;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-10 md:flex-row"
                >
                  <Link className="hover-3d" href={`/blog/${elem.slug}`}>
                    <ImageWithFallback
                      className="min-h-[230px] max-w-[326px] rounded-lg object-cover"
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${elem.featuredImage.url}`}
                      width={1366}
                      height={689}
                      alt={elem.featuredImage.alt}
                    />
                  </Link>
                  <div className="flex flex-col">
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
                      <h5 className="heading-5 mb-5">{elem.title}</h5>
                    </Link>
                    {elem.excerpt ? (
                      <p className="text-paragraph pr-[8%]">{elem.excerpt}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Detail Area */}
      <div className="sticky top-[100px] h-fit grid content-start gap-y-[70px] md:pl-[50px]">
        <div className="flex w-full flex-col">
          <div className="mb-[30px] leading-[140%] font-medium">Categories</div>
          <div className="flex w-full flex-col">
            <div className="grid w-full gap-y-5">
              {categories.docs
                .filter(cat => !cat?.parent || typeof cat.parent === 'string') // Only show parent categories
                .map((parentCategory) => {
                  const hasChildren = categories.docs.some(cat => typeof cat.parent === 'object' && cat.parent?.id === parentCategory.id);
                  const isExpanded = expandedCategories.has(parentCategory.id);
                  
                  return (
                    <div key={parentCategory.id} className="space-y-2">
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
                          data-active={parentCategory.slug === category?.slug}
                        >
                          <div className="border-border mr-[15px] h-5 w-5 rounded-full border">
                            <div
                              data-active={parentCategory.slug === category?.slug}
                              className="bg-dark dark:bg-light h-full w-full scale-0 rounded-full transition-transform group-hover:scale-75 data-[active='true']:scale-75 dark:group-hover:scale-100 dark:data-[active='true']:scale-100"
                            ></div>
                          </div>
                          <h5 className="heading-5 mb-0">{parentCategory.title}</h5>
                        </Link>
                      </div>
                      
                      {/* Child Categories */}
                      {isExpanded && categories.docs
                        .filter(cat => typeof cat.parent === 'object' && cat.parent?.id === parentCategory.id)
                        .map((childCategory) => (
                          <Link
                            key={childCategory.id}
                            className="group ml-8 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg py-1 px-2"
                            href={`/category/${childCategory.slug}`}
                            data-active={childCategory.slug === category?.slug}
                          >
                            <div className="border-border mr-[15px] h-4 w-4 rounded-full border">
                              <div
                                data-active={childCategory.slug === category?.slug}
                                className="bg-gray-400 dark:bg-gray-500 h-full w-full scale-0 rounded-full transition-transform group-hover:scale-75 data-[active='true']:scale-75 dark:data-[active='true']:scale-100"
                              ></div>
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
        <div className="flex w-full flex-col">
          <div className="mb-[30px] text-base font-semibold">Tags</div>
          <div className="flex flex-wrap gap-[7px]">
            {tags.docs.map((elem, index) => {
              return (
                <Link
                  className="border-border hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark data-[active='true']:text-light dark:data-[active='true']:text-dark data-[active='true']:bg-dark dark:data-[active='true']:bg-light text-dark dark:text-paragraph ease-expo rounded-md border px-[20px] py-[12px] text-[13px] leading-[110%] font-semibold transition-colors duration-[400ms]"
                  key={index}
                  href={`/tags/${elem.slug}`}
                  data-active={elem.slug === tag?.slug}
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

export default FilterBlogs;
