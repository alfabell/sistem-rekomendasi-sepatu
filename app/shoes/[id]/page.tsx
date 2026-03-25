"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShoeImage } from "@/components/ShoeImage";
import { formatRupiah, safeText } from "@/lib/format";
import { fetchJson, type ApiErr, type ApiOk } from "@/lib/api";
import { type Shoe } from "@/types/shoe";

type ShoesResponse = ApiOk<{ data: Shoe[] }> | ApiErr;

export default function ShoeDetailPage() {
  const params = useParams<{ id: string }>();
  const [shoes, setShoes] = useState<Shoe[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchJson<ShoesResponse>("/api/shoes")
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setError(res.message ?? "Gagal mengambil data sepatu");
          return;
        }
        setShoes(res.data);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Network error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const id = useMemo(() => {
    const parsed = Number(params?.id);
    return Number.isFinite(parsed) ? parsed : null;
  }, [params?.id]);

  const shoe = useMemo(() => {
    if (!shoes || id == null) return null;
    return shoes.find((s) => s.id === id) ?? null;
  }, [shoes, id]);

  return (
    <Container>
      <div className="mb-4 text-sm text-zinc-600">
        <Link href="/" className="hover:underline">
          ← Kembali
        </Link>
      </div>

      <PageHeader
        title="Detail Sepatu"
        subtitle="Lihat informasi lengkap sepatu dan dapatkan rekomendasi."
        right={
          id != null ? (
            <ButtonLink href={`/recommend?id=${id}`}>Lihat Rekomendasi</ButtonLink>
          ) : null
        }
      />

      {id == null ? <p className="mt-6 text-red-600">ID tidak valid</p> : null}
      {error ? <p className="mt-6 text-red-600">{error}</p> : null}
      {!error && !shoes ? <p className="mt-6">Loading...</p> : null}
      {!error && shoes && !shoe ? <p className="mt-6">Sepatu tidak ditemukan.</p> : null}

      {shoe ? (
        <Card className="mt-6 p-6 animate-fade-up">
          <ShoeImage
            shoeId={shoe.id}
            alt={safeText(shoe.nama_sepatu)}
            className="h-64 w-full"
            sizes="(max-width: 640px) 100vw, 800px"
            priority
          />

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold text-zinc-900">
              {safeText(shoe.nama_sepatu)}
            </p>
            <p className="text-zinc-700">Brand: {safeText(shoe.brand)}</p>
            <p className="text-zinc-700">Harga: {formatRupiah(shoe.harga)}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip tone="primary">Olahraga: {safeText(shoe.olahraga)}</Chip>
            <Chip>Lapangan: {safeText(shoe.lapangan)}</Chip>
            <Chip>Berat: {safeText(shoe.berat)}</Chip>
            <Chip>Material: {safeText(shoe.material)}</Chip>
          </div>

          <div className="mt-6">
            <ButtonLink href={`/recommend?id=${shoe.id}`}>Cari Rekomendasi</ButtonLink>
          </div>
        </Card>
      ) : null}
    </Container>
  );
}
