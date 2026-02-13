import { useState } from "react";
import fallbackImage from "@/assets/placeholder-image.png";
import { cn } from "@/lib/utils";

type CardImageProps = {
  title?: string;
  imageUrl?: string;
  enableHover?: boolean;
};

const CardImage = ({ title, imageUrl, enableHover }: CardImageProps) => {
  const resolvedSrc =
    imageUrl && imageUrl.trim() !== "" ? imageUrl : fallbackImage;

  const [hasError, setHasError] = useState(false);
  const imgSrc = hasError ? fallbackImage : resolvedSrc;

  const isFallback = imgSrc === fallbackImage;

  return (
    <img
      src={imgSrc}
      alt={title}
      onError={() => setHasError(true)}
      className={cn(
        "w-full h-full object-cover",
        enableHover &&
          !isFallback &&
          "transition-transform duration-300 group-hover:scale-105",
      )}
    />
  );
};

export default CardImage;
