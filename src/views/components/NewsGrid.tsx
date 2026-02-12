import { Skeleton } from "@/components/ui/skeleton";
import type { News } from "@/types/news";
import NewsCard from "./NewsCard";
import { cn } from "@/lib/utils";

type NewsGridProps = {
  data: News[];
  isLoading: boolean;
  columns?: "lg:grid-cols-4" | "lg:grid-cols-2";
  skeletonCount?: number;
  skeletonHeight: string;
};

const NewsGrid = ({
  data,
  isLoading,
  columns,
  skeletonCount = 5,
  skeletonHeight,
}: NewsGridProps) => {
  return (
    <div className={cn("grid gap-4", columns)}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn("w-full bg-secondary", skeletonHeight)}
            />
          ))
        : data.map((news) => <NewsCard key={news.id} news={news} />)}
    </div>
  );
};

export default NewsGrid;
