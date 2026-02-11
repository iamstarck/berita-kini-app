import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLocalDate } from "@/lib/date";
import type { News } from "@/types/news";
import { CalendarIcon, CircleAlertIcon } from "lucide-react";

interface HeadlineCardProps {
  news: News | null;
  isLoading: boolean;
  isError: boolean;
}

const HeadlineCard = ({ news, isLoading, isError }: HeadlineCardProps) => {
  return isError ? (
    <p className="inline-flex items-center gap-1 text-destructive">
      <CircleAlertIcon size={14} /> Gagal memuat berita
    </p>
  ) : (
    <Card className="flex lg:flex-row mx-auto overflow-hidden py-0">
      <div className="relative w-full max-w-2xl">
        {isLoading ? (
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="w-full h-full bg-secondary" />
          </AspectRatio>
        ) : (
          <img
            src={news?.imageUrl}
            alt="Headline cover"
            className="w-full h-full"
          />
        )}

        <Badge
          variant="destructive"
          className="absolute top-5 left-5 px-3 py-1 font-semibold -tracking-tighter"
        >
          HEADLINE
        </Badge>
      </div>

      <CardContent className="flex flex-col justify-between w-full gap-4 py-4 lg:py-8">
        <CardHeader className="p-0 space-y-4">
          {isLoading ? (
            <div className="space-y-1">
              <Skeleton className="w-full h-8 rounded-none bg-secondary " />
              <Skeleton className="w-md h-8 rounded-none bg-secondary " />
            </div>
          ) : (
            <CardTitle className="text-2xl lg:text-3xl">
              {news?.title}
            </CardTitle>
          )}

          {isLoading ? (
            <div className="space-y-1">
              <Skeleton className="w-full h-4 rounded-none bg-secondary " />
              <Skeleton className="w-xl h-4 rounded-none bg-secondary " />
            </div>
          ) : (
            <CardDescription className="text-sm lg:text-base">
              {news?.summary}
            </CardDescription>
          )}

          {isLoading ? (
            <Skeleton className="w-35 h-5 rounded-none bg-secondary " />
          ) : (
            <time className="flex items-center gap-1 text-destructive font-medium">
              <CalendarIcon size={20} />
              {news?.publishedAt && formatLocalDate(news.publishedAt)}
            </time>
          )}
        </CardHeader>

        <CardFooter className="w-full p-0">
          <CardAction>
            {isLoading ? (
              <Skeleton className="w-40 h-7 rounded-none bg-secondary " />
            ) : (
              <Button asChild>
                <a href={news?.url} target="_blank">
                  Baca Selengkapnya
                </a>
              </Button>
            )}
          </CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
