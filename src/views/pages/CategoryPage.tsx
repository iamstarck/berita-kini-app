import HeadlineCard from "../components/HeadlineCard";
import { Navigate, useParams } from "react-router-dom";
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
import { useMemo, useState } from "react";
import CustomBreadCrumb from "../components/atoms/CustomBreadCrumb";
import SearchBar from "../components/atoms/SearchBar";
import ErrorMessage from "../components/atoms/ErrorMessage";
import NewsGrid from "../components/NewsGrid";
import { useDebounce } from "@/utils/useDebounce";
import { usePagination } from "@/utils/usePagination";
import SectionTitle from "../components/atoms/SectionTitle";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const currentCategory = categorySlug.find((c) => c === category) as
    | CategorySlugType
    | undefined;

  const categoryToUse = currentCategory ?? categorySlug[0];

  const { headline, categoryNews, recommendations, isLoading, isError } =
    useCategoryNews("cnn", categoryToUse);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredNews = useMemo(() => {
    if (!debouncedQuery) return categoryNews;

    return categoryNews.filter((news) =>
      news.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [categoryNews, debouncedQuery]);

  const { page, setPage, totalPages, paginatedData } = usePagination(
    filteredNews,
    8,
  );

  const isValidCategory =
    !category || categorySlug.includes(category as CategorySlugType);

  if (!isValidCategory) return <Navigate to="404" replace />;

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
              <SectionTitle title="Tebaru" />
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {isError && <ErrorMessage />}

            {!isLoading && paginatedData.length === 0 && (
              <p className="text-muted-foreground">
                Tidak ada berita tentang "{debouncedQuery}" ditemukan
              </p>
            )}

            <NewsGrid
              columns="lg:grid-cols-4"
              isLoading={isLoading}
              skeletonCount={5}
              skeletonHeight="h-135 lg:h-95"
              data={paginatedData}
            />

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
            <SectionTitle title="Rekomendasi untuk Anda" />

            {isError && <ErrorMessage />}

            <NewsGrid
              columns="lg:grid-cols-4"
              isLoading={isLoading}
              skeletonCount={3}
              skeletonHeight="h-135 lg:h-95"
              data={recommendations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
