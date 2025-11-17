import BlogGalleryCard from "./BlogGalleryCard";
import CategoryFilterPills from "./CategoryFilterPills";
import PaginationBar from "./PaginationBar";
import type { Blog, Categories, Tags } from "./types/payload-types";
import { useEffect, useMemo, useState } from "react";

type Props = {
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
};

const BlogGallery: React.FC<Props> = ({ blogs, categories, tags }) => {
  const [categorySlug, setCategorySlug] = useState<string>("all");
  const [tagSlug, setTagSlug] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 9;

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogs.filter((blog) => {
      if (typeof blog.category === "string") return false;
      if (typeof blog.featuredImage === "string") return false;

      const matchesCategory =
        categorySlug === "all" || blog.category.slug === categorySlug;

      const matchesTag =
        tagSlug === "all" ||
        (Array.isArray(blog.tags) &&
          blog.tags.some(
            (tag) => typeof tag !== "string" && tag.slug === tagSlug,
          ));

      const matchesQuery =
        normalizedQuery.length === 0 ||
        blog.title.toLowerCase().includes(normalizedQuery) ||
        (blog.excerpt?.toLowerCase().includes(normalizedQuery) ?? false);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [blogs, categorySlug, tagSlug, query]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [categorySlug, tagSlug, query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedBlogs = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, safePage]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          className="border-border/60 bg-transparent placeholder:text-paragraph/70 w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 md:max-w-xs"
          placeholder="Search stories..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <CategoryFilterPills
          categories={categories}
          activeSlug={categorySlug}
          onChange={setCategorySlug}
        />
      </div>

    

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.map((blog) => (
          <BlogGalleryCard key={blog.id} blog={blog} />
        ))}
      </section>
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-sm text-paragraph/80">
          No stories match your filters yet.
        </p>
      ) : (
        <PaginationBar
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredBlogs.length}
          pageSize={PAGE_SIZE}
          onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        />
      )}
    </div>
  );
};

export default BlogGallery;