import Image from "next/image";
import { cn } from "@neamat/ui/lib/utils";

type MarketCardProps = {
  image: { src: string; alt: string };
  label: string;
  className?: string;
};

/** Global Presence city photo tile (Saudi Arabia, Bangladesh …). */
export function MarketCard({ image, label, className }: MarketCardProps) {
  return (
    <figure className={cn("relative aspect-[4/3] overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 240px, 50vw"
        className="object-cover"
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
