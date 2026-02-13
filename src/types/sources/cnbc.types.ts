import type { TDateISO } from "@/types/definitions";

export interface CnbcNewsImage {
  small: string;
  large: string;
}

export interface CnbcNewsItem {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: TDateISO;
  image: CnbcNewsImage;
}

export interface CnbcNewsResponse {
  messages: string;
  total: number;
  data: CnbcNewsItem[];
}
