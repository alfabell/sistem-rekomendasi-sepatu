"use client";

import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ShoeCard } from "@/components/ShoeCard";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Chip } from "@/components/ui/Chip";
import { fetchJson, type ApiErr, type ApiOk } from "@/lib/api";
import { toLowerSafe } from "@/lib/format";
import { type Shoe } from "@/types/shoe";

type ShoesResponse = ApiOk<{ data: Shoe[] }> | ApiErr;

export default function Home() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [olahraga, setOlahraga] = useState("");
  const [lapangan, setLapangan] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchJson<ShoesResponse>("/api/shoes")
      .then((res) => {
        if (!res.success) {
          setError(res.message ?? "Gagal mengambil data sepatu");
          return;
        }
        setShoes(res.data);
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  const options = useMemo(() => {
    const uniq = (values: Array<string | null>) =>
      Array.from(
        new Set(values.filter((v): v is string => Boolean(v && v.trim())))
      ).sort((a, b) => a.localeCompare(b));

    return {
      brands: uniq(shoes.map((s) => s.brand)),
      olahragas: uniq(shoes.map((s) => s.olahraga)),
      lapangans: uniq(shoes.map((s) => s.lapangan)),
    };
  }, [shoes]);

  const filtered = useMemo(() => {
    const q = toLowerSafe(query);
    const b = toLowerSafe(brand);
    const o = toLowerSafe(olahraga);
    const l = toLowerSafe(lapangan);

    return shoes.filter((s) => {
      if (b && toLowerSafe(s.brand) !== b) return false;
      if (o && toLowerSafe(s.olahraga) !== o) return false;
      if (l && toLowerSafe(s.lapangan) !== l) return false;

      if (!q) return true;
      const hay = [s.nama_sepatu, s.brand, s.olahraga, s.lapangan]
        .map((x) => toLowerSafe(x))
        .join(" ");
      return hay.includes(q);
    });
  }, [shoes, query, brand, olahraga, lapangan]);

  const activeFilterCount =
    (query.trim() ? 1 : 0) + (brand ? 1 : 0) + (olahraga ? 1 : 0) + (lapangan ? 1 : 0);

  return (
    <Container>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <PageHeader
            title="Sistem Rekomendasi Sepatu"
            subtitle="Cari sepatu, filter sesuai kebutuhan, lalu lihat detail dan rekomendasi yang mirip."
            right={
              <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                <Chip tone="primary">Total: {shoes.length}</Chip>
                <Chip tone={activeFilterCount ? "warning" : "neutral"}>
                  Filter aktif: {activeFilterCount}
                </Chip>
              </div>
            }
          />
        </div>

        <Card className="p-4 sm:p-5 animate-fade-up">
          <div className="grid gap-3 text-black sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="text-xs font-semibold text-zinc-600">
                Pencarian
              </label>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama sepatu, brand, olahraga, lapangan..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600">
                Brand
              </label>
              <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Semua</option>
                {options.brands.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600">
                Olahraga
              </label>
              <Select
                value={olahraga}
                onChange={(e) => setOlahraga(e.target.value)}
              >
                <option value="">Semua</option>
                {options.olahragas.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600">
                Lapangan
              </label>
              <Select
                value={lapangan}
                onChange={(e) => setLapangan(e.target.value)}
              >
                <option value="">Semua</option>
                {options.lapangans.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
            <p className="text-sm text-zinc-600">
              Menampilkan <span className="font-semibold">{filtered.length}</span> dari{" "}
              <span className="font-semibold">{shoes.length}</span> sepatu
            </p>
            <button
              type="button"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 hover:underline transition"
              onClick={() => {
                setQuery("");
                setBrand("");
                setOlahraga("");
                setLapangan("");
              }}
            >
              Reset filter
            </button>
          </div>
        </Card>

        {loading ? <p>Loading...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!loading && !error && filtered.length === 0 ? (
          <Card className="p-6 animate-fade-up">
            <p className="font-semibold text-zinc-900">Tidak ada hasil</p>
            <p className="text-sm text-zinc-600 mt-1">
              Coba ubah kata kunci atau filter yang dipilih.
            </p>
          </Card>
        ) : null}

        {!loading && !error && filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
