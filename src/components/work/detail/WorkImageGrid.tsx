import Image from "next/image";
import type { WorkDetailImage } from "@/types/work";

interface Props {
  images: WorkDetailImage[];
}

export function WorkImageGrid({ images }: Props) {
  if (images.length === 0) return null;

  const [primary, ...secondary] = images;

  if (secondary.length === 0) {
    return (
      <div className="relative my-10 aspect-video w-full overflow-hidden border border-[var(--color-line)]">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="my-10 grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="relative aspect-[3/4] overflow-hidden border border-[var(--color-line)] md:aspect-auto md:row-span-2">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 767px) 100vw, 448px"
        />
      </div>
      {secondary.map((img, i) => (
        <div
          key={i}
          className="relative aspect-video overflow-hidden border border-[var(--color-line)]"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 448px"
          />
        </div>
      ))}
    </div>
  );
}
