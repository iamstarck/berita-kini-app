import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

const NewsCard = () => {
  return (
    <a href="" target="_blank" className="group">
      <Card className="flex overflow-hidden py-0 w-full gap-2">
        <div className="w-full overflow-hidden">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <img
              src="https://akcdn.detik.net.id/visual/2026/02/08/bank-mandiri-1770551964196_169.jpeg?w=360&q=100"
              alt="Event cover"
              className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
            />
          </AspectRatio>
        </div>

        <CardContent className="flex flex-col justify-between w-full gap-4 py-4">
          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-lg transition-colors duration-300 group-hover:text-accent-foreground">
              Mandiri Sahabatku 2026, Bank Mandiri Perkuat Ekosistem PMI dan
              Diaspora
            </CardTitle>
            <CardDescription className="text-sm lg:text-base line-clamp-2">
              Bank Mandiri menggelar Apresiasi dan Kick Off Program Mandiri
              Sahabatku 2026 di Hong Kong sebagai bagian dari penguatan
              kapasitas dan kemandirian ekonomi.
            </CardDescription>

            <p className="flex items-center gap-1 text-destructive/80 font-medium">
              <CalendarIcon size={16} /> 1 Januari 2026
            </p>
          </CardHeader>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;
