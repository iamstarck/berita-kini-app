import type { TDateISO } from "@/lib/definitions";

export type NewsSource = "cnn" | "republika";

export interface News {
  id: string;
  title: string;
  summary: string;
  url: string;
  author?: string[];
  publishedAt: TDateISO;
  imageUrl?: string;
  source: NewsSource;
}
