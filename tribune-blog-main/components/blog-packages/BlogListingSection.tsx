import BlogGallery from "./blogGallery";
import type { Blog, Categories, Tags } from "./types/payload-types";

type Props = {
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const BlogListingSection: React.FC<Props> = ({
  blogs,
  categories,
  tags,
  eyebrow = "Browse",
  title = "Editorial Gallery",
  description,
}) => {
  return (
    <section className="flex flex-col items-center px-[15px] pt-[80px] md:px-[30px]">
      <div className="max-w-custom-container mx-auto flex w-full flex-col gap-10">
        <div>
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.25em] text-paragraph">
              {eyebrow}
            </p>
          ) : null}
          {title ? <h1 className="heading-2">{title}</h1> : null}
          {description ? (
            <p className="mt-2 max-w-2xl text-paragraph/80">{description}</p>
          ) : null}
        </div>
        <BlogGallery blogs={blogs} categories={categories} tags={tags} />
      </div>
    </section>
  );
};

export default BlogListingSection;

