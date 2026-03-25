"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ShoeCard } from "@/components/ShoeCard";
import { Card } from "@/components/ui/Card";
import { fetchJson, type ApiErr, type ApiOk } from "@/lib/api";
import { type Shoe, type ShoeWithSimilarity } from "@/types/shoe";

type RecommendResponse =
  | (ApiOk<{ target: Shoe; recommendations: ShoeWithSimilarity[] }> & {
      success: true;
    })
  | ApiErr;

export function RecommendClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<{
    target: Shoe;
    recommendations: ShoeWithSimilarity[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setData(null);
    setError(null);

    fetchJson<RecommendResponse>(`/api/recommend?id=${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.success) {
          setError(res.message ?? "Gagal mengambil rekomendasi");
          return;
        }
        setData({ target: res.target, recommendations: res.recommendations });
      })
      .catch(() => setError("Network error"));
  }, [id]);

  if (!id) {
    return (
      <Container>
        <Card className="p-6 animate-fade-up">
          <p className="font-semibold text-zinc-900">Pilih sepatu dulu</p>
          <p className="text-sm text-zinc-600 mt-1">
            Kembali ke beranda untuk memilih sepatu.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm font-semibold text-indigo-700 hover:underline"
            >
              ← Ke Beranda
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card className="p-6 animate-fade-up">
          <p className="font-semibold text-zinc-900">Terjadi kesalahan</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm font-semibold text-indigo-700 hover:underline"
            >
              ← Ke Beranda
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <Card className="p-6 animate-fade-up">
          <p className="font-semibold text-zinc-900">Loading...</p>
          <p className="text-sm text-zinc-600 mt-1">
            Sedang memproses rekomendasi.
          </p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-4 text-sm text-zinc-600">
        <Link href="/" className="hover:underline">
          ← Kembali
        </Link>
      </div>

      <PageHeader
        title="Rekomendasi Sepatu"
        subtitle="Hasil rekomendasi berdasarkan kemiripan fitur."
      />

      <div className="mt-6 space-y-6">
        <div className="animate-fade-in">
          <p className="text-sm font-semibold text-zinc-700 mb-2">Sepatu target</p>
          <ShoeCard shoe={data.target} showActions={true} showSimilarity={false} />
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700 mb-2">Rekomendasi</p>
          {data.recommendations.length === 0 ? (
            <Card className="p-6 animate-fade-up">
              <p className="font-semibold text-zinc-900">Belum ada rekomendasi</p>
              <p className="text-sm text-zinc-600 mt-1">Coba pilih sepatu lain.</p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.recommendations.map((item) => (
                <ShoeCard
                  key={item.id}
                  shoe={item}
                  showActions={true}
                  showSimilarity={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
