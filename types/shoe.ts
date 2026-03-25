export type Shoe = {
  id: number;
  nama_sepatu: string | null;
  brand: string | null;
  olahraga: string | null;
  lapangan: string | null;
  harga: number | null;
  berat: string | null;
  material: string | null;
};

export type ShoeWithSimilarity = Shoe & {
  similarity?: number;
};
