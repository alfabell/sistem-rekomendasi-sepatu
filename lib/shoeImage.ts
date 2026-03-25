// Tempat template link foto sepatu.
// Kamu bisa ubah mapping ini kapan saja tanpa perlu edit komponen UI.
//
// Cara pakai (opsi A): simpan gambar di public/shoes/
// - by pattern: {id}.jpg / {id}.png / {id}.webp / {id}.svg
// - atau mapping khusus: set shoeImageMap[id] = "/shoes/nama-file.jpg"

export const shoeImageMap: Record<number, string> = {
  // Template mapping (opsional). Isi hanya jika kamu ingin override path tertentu.
  // Contoh:
  // 1: "/shoes/nike-phantom.jpg",
  // 12: "/shoes/custom/sepatu-12.png",
};

export function shoeImageCandidates(shoeId: number) {
  const mapped = shoeImageMap[shoeId];
  const byPattern = [
    `/shoes/${shoeId}.jpg`,
    `/shoes/${shoeId}.jpeg`,
    `/shoes/${shoeId}.png`,
    `/shoes/${shoeId}.webp`,
    `/shoes/${shoeId}.jfif`,
    `/shoes/${shoeId}.svg`,
  ];

  // Default: prefer file by pattern.
  // If mapped is provided, try it first as an override.
  return mapped ? [mapped, ...byPattern] : byPattern;
}
