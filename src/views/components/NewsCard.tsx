import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatLocalDate } from "@/lib/date";
import type { News } from "@/types/news";
import { CalendarIcon } from "lucide-react";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <a href={news.url} target="_blank" className="group">
      <Card className="flex overflow-hidden py-0 w-full gap-2">
        <div className="w-full overflow-hidden">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <img
              src={news.imageUrl}
              alt="News cover"
              className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
            />
          </AspectRatio>
        </div>

        <CardContent className="flex flex-col justify-between w-full gap-4 py-4">
          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-lg transition-colors duration-300 group-hover:text-accent-foreground">
              {news.title}
            </CardTitle>
            <CardDescription className="text-sm lg:text-base line-clamp-2">
              {news.summary}
            </CardDescription>

            <time className="flex items-center gap-1 text-destructive/80 font-medium">
              <CalendarIcon size={16} />{" "}
              {news?.publishedAt && formatLocalDate(news.publishedAt)}
            </time>
          </CardHeader>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;
