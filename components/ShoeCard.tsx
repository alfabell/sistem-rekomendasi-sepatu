"use client";

import { ShoeWithSimilarity } from "@/types/shoe";
import { formatRupiah, safeText } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useRouter } from "next/navigation";
import { ShoeImage } from "@/components/ShoeImage";

function similarityTone(similarity: number) {
  if (similarity > 0.85) return { tone: "success" as const, label: "Sangat mirip" };
  if (similarity > 0.7) return { tone: "warning" as const, label: "Cukup mirip" };
  return { tone: "neutral" as const, label: "Kurang mirip" };
}

export function ShoeCard({
  shoe,
  showActions = true,
  showSimilarity = false,
}: {
  shoe: ShoeWithSimilarity;
  showActions?: boolean;
  showSimilarity?: boolean;
}) {
  const router = useRouter();
  const similarity = shoe.similarity ?? 0;
  const sim = similarityTone(similarity);

  const goToDetail = () => {
    router.push(`/shoes/${shoe.id}`);
  };

  return (
    <Card className="p-4 animate-fade-up">
      <div
        role="link"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetail();
          }
        }}
        className={
          "group cursor-pointer rounded-xl -m-1 p-1 transition " +
          "hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        }
        aria-label={`Buka detail ${safeText(shoe.nama_sepatu)}`}
      >
        <ShoeImage
          shoeId={shoe.id}
          alt={safeText(shoe.nama_sepatu)}
          className="h-40 w-full"
        />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-zinc-900 truncate">
            {safeText(shoe.nama_sepatu)}
          </p>
          <p className="text-sm text-zinc-600">Brand: {safeText(shoe.brand)}</p>
          <p className="text-sm text-zinc-700 mt-1">Harga: {formatRupiah(shoe.harga)}</p>
        </div>
        {showSimilarity ? (
          <Chip tone={sim.tone}>
            {sim.label} ({similarity.toFixed(3)})
          </Chip>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {shoe.olahraga ? <Chip tone="primary">{shoe.olahraga}</Chip> : null}
        {shoe.lapangan ? <Chip>{shoe.lapangan}</Chip> : null}
        {shoe.berat ? <Chip>{shoe.berat}</Chip> : null}
        {shoe.material ? <Chip>{shoe.material}</Chip> : null}
      </div>

      {showActions ? (
        <div className="mt-4 flex gap-2">
          <ButtonLink
            href={`/shoes/${shoe.id}`}
            variant="secondary"
            className="flex-1 text-black"
            onClick={(e) => e.stopPropagation()}
          >
            Detail
          </ButtonLink>
          <ButtonLink
            href={`/recommend?id=${shoe.id}`}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            Rekomendasi
          </ButtonLink>
        </div>
      ) : null}

      </div>
    </Card>
  );
}
