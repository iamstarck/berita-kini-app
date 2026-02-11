import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsCard from "../components/NewsCard";
import HeadlineCard from "../components/HeadlineCard";
import { CircleAlertIcon } from "lucide-react";
import { useHomeNews } from "@/hooks/useHomeNews";
import { Skeleton } from "@/components/ui/skeleton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

const HomePage = () => {
  const { headline, popular, recommendations, isLoading, isError } =
    useHomeNews("cnn");

  return (
    <div className="m-8 space-y-8">
      <CustomBreadCrumb />

      <div className="space-y-16">
        <HeadlineCard news={headline} isLoading={isLoading} isError={isError} />

        <div className="lg:flex justify-between space-y-8 gap-8">
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

            <div className="grid lg:grid-cols-2 gap-4">
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

          <Card className="w-full lg:max-w-lg h-fit lg:sticky top-4">
            <CardHeader>
              <CardTitle className="border-l-4 border-l-primary">
                <span className="text-2xl font-semibold leading-normal tracking-wide pl-2">
                  Berita Populer
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ol className="flex flex-col gap-6">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 bg-secondary" />
                    ))
                  : popular.map((news) => (
                      <li
                        key={news.id}
                        className="relative pl-10 before:content-[counter(list-item)] before:counter-increment:list-item before:absolute before:left-0 before:top-0 before:bg-destructive before:text-background before:w-7 before:h-7 before:flex before:items-center before:justify-center before:rounded-full"
                      >
                        <a href={news.url} target="_blank">
                          {news.title}
                        </a>
                      </li>
                    ))}

                {isError && (
                  <p className="inline-flex items-center gap-1 text-destructive">
                    <CircleAlertIcon size={14} /> Gagal memuat berita
                  </p>
                )}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
