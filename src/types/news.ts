import type { TDateISO } from "@/lib/definitions";

export interface News {
  id: string;
  title: string;
  summary: string;
  url: string;
  author?: string[];
  publishedAt: TDateISO;
  imageUrl?: string;
  source: "cnn" | "republika";
}
