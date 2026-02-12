export type NewsSource = "cnn" | "republika";

export interface News {
  id: string;
  title: string;
  summary: string;
  url: string;
  author?: string[];
  publishedAt: string;
  imageUrl?: string;
  source: NewsSource;
}
