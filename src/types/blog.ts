export interface Blog {
  id: string;
  category: string;
  coverImageUrl: string;
  title: string;
  shortDescription: string;
  content: string;
  authorName: string;
  publishedDate: string;   // YYYY-MM-DD
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogsListData {
  blogs: Blog[];
  pagination: BlogPagination;
}

// ── Admin input types ─────────────────────────────────────────
export interface CreateBlogInput {
  category: string;
  coverImageUrl: string;
  title: string;
  shortDescription: string;
  content: string;
  authorName: string;
  publishedDate?: string;
  readingTimeMinutes: number;
}

export type UpdateBlogInput = Partial<CreateBlogInput>;
