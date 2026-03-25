import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ mapping
const olahragaMap = {
  sepakbola: 1,
  futsal: 2,
};

const brandMap = {
  nike: 1,
  adidas: 2,
  puma: 3,
  mizuno: 4,
};

const lapanganMap = {
  rumput: 1,
  indoor: 2,
};

const beratMap = {
  ringan: 1,
  sedang: 2,
  berat: 3,
};

const materialMap = {
  synthetic: 1,
  knit: 2,
};

// clean function (hapus spasi & samakan format)
function clean(value) {
  return value.toString().trim().toLowerCase();
}

// ubah data jadi vector angka
function toVector(shoe) {
  const olahraga = clean(shoe.olahraga);
  const brand = clean(shoe.brand);
  const lapangan = clean(shoe.lapangan);
  const berat = clean(shoe.berat);
  const material = clean(shoe.material);

  return [
    // ✅ olahraga (one-hot)
    olahraga === "sepakbola" ? 1 : 0,
    olahraga === "futsal" ? 1 : 0,

    // ✅ brand (one-hot)
    brand === "nike" ? 1 : 0,
    brand === "adidas" ? 1 : 0,
    brand === "puma" ? 1 : 0,
    brand === "mizuno" ? 1 : 0,

    // ✅ lapangan (one-hot)
    lapangan === "rumput" ? 1 : 0,
    lapangan === "indoor" ? 1 : 0,

    // ✅ berat (one-hot)
    berat === "ringan" ? 1 : 0,
    berat === "sedang" ? 1 : 0,
    berat === "berat" ? 1 : 0,

    // ✅ material (one-hot)
    material === "synthetic" ? 1 : 0,
    material === "knit" ? 1 : 0,

    // ✅ harga (tetap numeric + normalisasi)
    (Number(shoe.harga) || 0) / 2000000,
  ];
}

// cosine similarity
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magA === 0 || magB === 0) return 0;

  return dot / (magA * magB);
}

// API utama
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    // ambil semua data sepatu
    const shoes = await prisma.shoes.findMany();

    // cari sepatu target
    const target = shoes.find((s) => s.id === id);

    if (!target) {
      return Response.json({
        success: false,
        message: "Sepatu tidak ditemukan",
      });
    }

    const targetVector = toVector(target);

    // hitung similarity
    const recommendations = shoes
      .filter((s) => s.id !== id)
      .map((shoe) => {
        const similarity = cosineSimilarity(
          targetVector,
          toVector(shoe)
        );

        return {
          ...shoe,
          similarity,
        };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    return Response.json({
      success: true,
      target,
      recommendations,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}