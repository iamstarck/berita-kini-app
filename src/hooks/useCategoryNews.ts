import {
  categorySlug,
  type CategoryNewsResult,
  type CategorySlugType,
} from "@/types/definitions";
import type { News, NewsSource } from "@/types/news";
import { useNews } from "./useNews";
import { useQueries } from "@tanstack/react-query";
import { fetchNews } from "@/api/fetchNews";
import { useMemo } from "react";

const pickRandomCategories = (
  categories: CategorySlugType[],
  current: CategorySlugType,
  count: number,
) => {
  const filtered = categories.filter((c) => c !== current);

  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const useCategoryNews = (
  source: NewsSource,
  category: CategorySlugType,
): CategoryNewsResult => {
  const categoryNewsQuery = useNews(source, category);

  const randomCategories = useMemo(
    () => pickRandomCategories(categorySlug, category, 5),
    [category],
  );

  const otherCategoryQueries = useQueries({
    queries: randomCategories.map((c) => ({
      queryKey: ["news", source, c],
      queryFn: () => fetchNews(source, c),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isLoading =
    categoryNewsQuery.isLoading ||
    otherCategoryQueries.some((q) => q.isLoading);

  const isError =
    categoryNewsQuery.isError || otherCategoryQueries.some((q) => q.isError);

  const error =
    categoryNewsQuery.error || otherCategoryQueries.find((q) => q.error)?.error;

  if (isLoading) {
    return {
      headline: null,
      categoryNews: [],
      recommendations: [],
      isLoading: true,
      isError: false,
      error: null,
    };
  }

  if (isError) {
    return {
      headline: null,
      categoryNews: [],
      recommendations: [],
      isLoading: false,
      isError: true,
      error,
    };
  }

  const categoryNewsRaw: News[] = categoryNewsQuery.data ?? [];

  const headline = categoryNewsRaw.reduce(
    (latest, current) => {
      if (!current.imageUrl) return latest;
      if (!latest) return current;

      return Date.parse(current.publishedAt) > Date.parse(latest.publishedAt)
        ? current
        : latest;
    },
    null as News | null,
  );

  const categoryNews: News[] = categoryNewsRaw.filter((n) => n !== headline);

  const recommendations: News[] = [];

  otherCategoryQueries.forEach((query) => {
    const items: News[] = query.data ?? [];
    const candidate = items.find((n: News) => Boolean(n.imageUrl));

    if (candidate) recommendations.push(candidate);
  });

  return {
    headline,
    categoryNews,
    recommendations,
    isLoading,
    isError,
    error,
  };
};
