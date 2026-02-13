import {
  categorySlug,
  type CategoryNewsResult,
  type CategorySlugType,
} from "@/types/definitions";
import type { News, NewsSource } from "@/types/news";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAggregatedNews } from "./useAggregatedNews";
import { fetchAggregatedNews } from "@/utils/aggregator.service";

const pickRandomCategories = (
  categories: CategorySlugType[],
  current: CategorySlugType,
  count: number,
) => {
  const filtered = categories.filter((c) => c !== current);

  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const useCategoryNews = (
  sources: NewsSource[],
  category: CategorySlugType,
): CategoryNewsResult => {
  const categoryNewsQuery = useAggregatedNews(sources, category);

  const randomCategories = useMemo(
    () => pickRandomCategories(categorySlug, category, 5),
    [category],
  );

  const otherCategoryQueries = useQueries({
    queries: randomCategories.map((c) => ({
      queryKey: ["news", sources, c],
      queryFn: () => fetchAggregatedNews(sources, c),
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

  const headline = categoryNewsRaw.find((n) => n.imageUrl) ?? null;

  const categoryNews: News[] = headline
    ? categoryNewsRaw.filter((n) => n.id !== headline.id)
    : categoryNewsRaw;

  const recommendations: News[] = [];

  otherCategoryQueries.forEach((query) => {
    const items: News[] = query.data ?? [];
    const candidate = items.find((n: News) => n.imageUrl) ?? null;

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
