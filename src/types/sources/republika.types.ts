import type { TDateISO } from "@/types/definitions";

export interface RepublikaNewsImage {
  small: string;
}

export interface RepublikaNewsItem {
  creator: string[];
  title: string;
  link: string;
  categories: string[];
  isoDate: TDateISO;
  description: string;
  image: RepublikaNewsImage;
}

export interface RepublikaNewsResponse {
  messages: string;
  total: number;
  data: RepublikaNewsItem[];
}
