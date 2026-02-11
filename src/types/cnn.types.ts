import type { TDateISO } from "@/types/definitions";

export interface CnnNewsImage {
  small: string;
  large: string;
}

export interface CnnNewsItem {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: TDateISO;
  image: CnnNewsImage;
}

export interface CnnNewsResponse {
  messages: string;
  total: number;
  data: CnnNewsItem[];
}
