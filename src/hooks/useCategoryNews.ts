import {
  categorySlug,
  type CategoryNewsResult,
  type CategorySlugType,
} from "@/types/definitions";
import type { News, NewsSource } from "@/types/news";
import { useNews } from "./useNews";
import { useQueries } from "@tanstack/react-query";
import { fetchNews } from "@/api/fetchNews";

export const useCategoryNews = (
  source: NewsSource,
  category: CategorySlugType,
): CategoryNewsResult => {
  const categoryNewsQuery = useNews(source, category);

  const otherCategories = categorySlug.filter((c) => c !== category);

  const otherCategoryQueries = useQueries({
    queries: otherCategories.map((c) => ({
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

  if (isLoading || isError) {
    return {
      headline: null,
      categoryNews: [],
      recommendations: [],
      isLoading,
      isError,
      error,
    };
  }

  const categoryNews: News[] = categoryNewsQuery.data ?? [];

  const headline =
    categoryNews
      .filter((n: News) => Boolean(n.imageUrl))
      .sort(
        (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
      )[0] ?? null;

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
