type PaginatedDocs<T = any> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: null | number | undefined;
  page?: number;
  pagingCounter: number;
  prevPage?: null | number | undefined;
  totalDocs: number;
  totalPages: number;
};

export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

export type Categories = PaginatedDocs<Category>;

export interface Tag {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

export type Tags = PaginatedDocs<Tag>;

export interface Blog {
  id: string;
  featuredImage: string | Media;
  title: string;
  excerpt?: string | null;
  slug: string;
  content: {
    [k: string]: unknown;
  }[];
  category: string | Category;
  tags?: (string | Tag)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
}

export type Blogs = PaginatedDocs<Blog>;
