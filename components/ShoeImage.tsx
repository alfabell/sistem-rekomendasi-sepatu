"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { shoeImageCandidates } from "@/lib/shoeImage";

export function ShoeImage({
  shoeId,
  alt,
  className = "",
  sizes,
  priority,
}: {
  shoeId: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const candidates = useMemo(() => shoeImageCandidates(shoeId), [shoeId]);
  const [index, setIndex] = useState(0);

  const src = candidates[index] ?? "/shoes/placeholder.svg";

  return (
    <div className={"relative overflow-hidden rounded-xl border bg-white " + className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 640px) 100vw, 33vw"}
        priority={priority}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        onError={() => {
          // try next candidate, then fall back to placeholder
          setIndex((i) => i + 1);
        }}
      />
    </div>
  );
}
