import ImageWithFallback from "./fallBack/ImageWithFallback";
import { formatIsoDate } from "./utils/formatDate";
import type { Blog } from "./types/payload-types";
import Link from "next/link";

type Props = {
  blog: Blog;
};

const BlogGalleryCard: React.FC<Props> = ({ blog }) => {
  if (typeof blog.featuredImage === "string") return null;
  if (typeof blog.category === "string") return null;

  return (
    <article className="group flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/15">
      <Link href={`/blog/${blog.slug}`} className="mb-4 overflow-hidden rounded-xl">
        <ImageWithFallback
          className="h-56 w-full rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`}
          alt={blog.featuredImage.alt}
          width={640}
          height={360}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-paragraph">
          <Link href={`/category/${blog.category.slug}`} className="text-primary transition-colors hover:text-primary/80">
            {blog.category.title}
          </Link>
          <span>{formatIsoDate(blog.createdAt)}</span>
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-lg font-semibold leading-snug">{blog.title}</h3>
        </Link>
        {blog.excerpt ? <p className="text-sm text-paragraph">{blog.excerpt}</p> : null}
      </div>
    </article>
  );
};

export default BlogGalleryCard;

