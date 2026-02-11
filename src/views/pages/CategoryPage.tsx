import NewsCard from "../components/NewsCard";
import HeadlineCard from "../components/HeadlineCard";
import { Navigate, useParams } from "react-router-dom";
import { CircleAlertIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCategoryNews } from "@/hooks/useCategoryNews";
import { categorySlug, type CategorySlugType } from "@/types/definitions";
import { toWordCase } from "@/lib/toWordCase";
import { useEffect, useMemo, useState } from "react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import SearchBar from "../components/SearchBar";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const currentCategory = categorySlug.find((c) => c === category) as
    | CategorySlugType
    | undefined;

  const categoryToUse = currentCategory ?? categorySlug[0];

  const { headline, categoryNews, recommendations, isLoading, isError } =
    useCategoryNews("cnn", categoryToUse);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const filteredNews = useMemo(() => {
    if (!debouncedQuery) return categoryNews;

    return categoryNews.filter((news) =>
      news.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [categoryNews, debouncedQuery]);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const paginatedNews = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredNews.slice(start, end);
  }, [filteredNews, page]);

  const isValidCategory =
    !category || categorySlug.includes(category as CategorySlugType);

  if (!isValidCategory) return <Navigate to="404" replace />;

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  return (
    <div key={categoryToUse} className="m-8 space-y-8">
      <CustomBreadCrumb category currentCategory={currentCategory} />

      <h1 className="text-4xl font-medium tracking-wide">
        {toWordCase(currentCategory)}
      </h1>

      <div className="space-y-16">
        <HeadlineCard news={headline} isLoading={isLoading} isError={isError} />

        <div className="justify-between space-y-8 gap-8">
          <div className="space-y-4 w-full">
            <div className="flex max-lg:block space-y-4 justify-between">
              <div className="border-l-4 border-l-primary pl-2">
                <h2 className="text-2xl font-semibold leading-normal tracking-wide">
                  Terbaru
                </h2>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {isError && (
              <p className="inline-flex items-center gap-1 text-destructive">
                <CircleAlertIcon size={14} /> Gagal memuat berita
              </p>
            )}

            {!isLoading && paginatedNews.length === 0 && (
              <p className="text-muted-foreground">
                Tidak ada berita tentang "{debouncedQuery}" ditemukan
              </p>
            )}

            <div className="grid lg:grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-90 lg:h-100 w-full bg-secondary"
                    />
                  ))
                : paginatedNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="justify-end select-none hover:cursor-pointer">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => page > 1 && setPage((p) => p - 1)}
                      className={
                        page === 1
                          ? "hover:cursor-default hover:bg-background hover:text-foreground opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    const isNearCurrent =
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= page - 1 && pageNumber <= page + 1);

                    if (isNearCurrent) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={page === pageNumber}
                            className={
                              page === pageNumber
                                ? "hover:cursor-default bg-accent hover:text-foreground"
                                : ""
                            }
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (
                      (pageNumber === page - 2 && page > 3) ||
                      (pageNumber === page + 2 && page < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => page < totalPages && setPage((p) => p + 1)}
                      className={
                        page === totalPages
                          ? "hover:cursor-default hover:bg-background hover:text-foreground opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <div className="space-y-4 w-full">
            <div className="border-l-4 border-l-primary pl-2">
              <h2 className="text-2xl font-semibold leading-normal tracking-wide">
                Rekomendasi Untuk Anda
              </h2>
            </div>

            {isError && (
              <p className="inline-flex items-center gap-1 text-destructive">
                <CircleAlertIcon size={14} /> Gagal memuat berita
              </p>
            )}

            <div className="grid lg:grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-90 lg:h-100 w-full bg-secondary"
                    />
                  ))
                : recommendations.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
