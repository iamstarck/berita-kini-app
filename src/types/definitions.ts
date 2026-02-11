import type { News } from "@/types/news";

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

export type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

export const CATEGORIES = [
  { label: "Nasional", slug: "nasional" },
  { label: "Internasional", slug: "internasional" },
  { label: "Ekonomi", slug: "ekonomi" },
  { label: "Olahraga", slug: "olahraga" },
  { label: "Teknologi", slug: "teknologi" },
  { label: "Hiburan", slug: "hiburan" },
  { label: "Gaya Hidup", slug: "gaya-hidup" },
] as const;

export type CategorySlugType = (typeof CATEGORIES)[number]["slug"];

export const categorySlug = CATEGORIES.map((c) => c.slug) as CategorySlugType[];

export type HomeNewsResult = {
  headline: News | null;
  popular: News[];
  recommendations: News[];

  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export type CategoryNewsResult = {
  headline: News | null;
  categoryNews: News[];
  recommendations: News[];

  isLoading: boolean;
  isError: boolean;
  error: unknown;
};
