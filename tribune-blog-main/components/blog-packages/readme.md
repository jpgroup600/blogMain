## Blog Packages (Manual Copy Guide)

This directory contains ready-to-copy blog UI + data helpers. To reuse them in another Next.js project:

### 1. Copy the files

Copy the entire `components/packages` folder (preserving subfolders like `components/`, `pages/`, `hooks/`, `utils/`, `data/`, `types/`, `fallBack/`). This ensures imports stay relative.

### 2. Install dependencies

Your target project must already have:
- `next`, `react`, `react-dom`
- `axios`
- Tailwind classes used in the components (copy the relevant CSS/tokens if needed).

### 3. Blog listing page usage

```tsx
import Head from "next/head";
import BlogListingSection from "@/components/packages/BlogListingSection";
import { createBlogListingGetStaticProps } from "@/components/packages/blogListingStaticProps";
import type { Blog, Categories, Tags } from "@/types/payload-types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps = createBlogListingGetStaticProps({
  limit: 30,
  revalidate: 60,
}) satisfies GetStaticProps<{
  blogs: Blog[];
  categories: Categories;
  tags: Tags;
}>;

export default function BlogListingPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <>
      <Head>
        <title>Blog Gallery | Tribune</title>
      </Head>
      <BlogListingSection
        {...props}
        eyebrow="Browse"
        title="Editorial Gallery"
      />
    </>
  );
}
```

### 4. Blog detail page usage

```tsx
import BlogDetailPage, {
    createBlogDetailGetStaticPaths,
    createBlogDetailGetStaticProps,
  } from "@/app/blog-packages/page/BlogDetailPage";
  
  export const getStaticPaths = createBlogDetailGetStaticPaths();
  export const getStaticProps = createBlogDetailGetStaticProps();
  
  export default BlogDetailPage;
```

### 5. Helpers inside the package

- `components/` – Gallery cards, filters, pagination, blog section, etc.
- `pages/` – `BlogListingSection`, `BlogDetailPage`.
- `data/` – Static props helpers (listing/detail).
- `hooks/` – `useViewTracker`.
- `utils/` – `renderRichText`, `formatDate`.
- `types/` – Payload CMS types.

Copying the entire folder keeps everything in sync so you can edit locally just like shadcn-style components.