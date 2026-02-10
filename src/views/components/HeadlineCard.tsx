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
import { CalendarIcon } from "lucide-react";

const HeadlineCard = () => {
  return (
    <Card className="flex lg:flex-row mx-auto overflow-hidden py-0">
      <div className="relative w-full max-w-2xl">
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://akcdn.detik.net.id/visual/2026/02/08/bank-mandiri-1770551964196_169.jpeg?w=360&q=100"
            alt="Event cover"
            className="w-full h-full"
          />
        </AspectRatio>
        <Badge
          variant="destructive"
          className="absolute top-5 left-5 px-3 py-1 font-semibold -tracking-tighter"
        >
          HEADLINE
        </Badge>
      </div>

      <CardContent className="flex flex-col justify-between w-full gap-4 py-4 lg:py-8">
        <CardHeader className="p-0 space-y-4">
          <CardTitle className="text-2xl lg:text-3xl">
            Mandiri Sahabatku 2026, Bank Mandiri Perkuat Ekosistem PMI dan
            Diaspora
          </CardTitle>
          <CardDescription className="text-sm lg:text-base">
            Bank Mandiri menggelar Apresiasi dan Kick Off Program Mandiri
            Sahabatku 2026 di Hong Kong sebagai bagian dari penguatan kapasitas
            dan kemandirian ekonomi.
          </CardDescription>

          <p className="flex items-center gap-1 text-destructive font-medium">
            <CalendarIcon size={20} /> 1 Januari 2026
          </p>
        </CardHeader>

        <CardFooter className="w-full p-0">
          <CardAction>
            <Button asChild>
              <a href="https://google.com" target="_blank">
                Baca Selengkapnya
              </a>
            </Button>
          </CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
