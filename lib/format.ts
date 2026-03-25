export function formatRupiah(value: number | null | undefined) {
  if (typeof value !== "number") return "-";
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function safeText(value: string | null | undefined) {
  return value?.trim() ? value : "-";
}

export function toLowerSafe(value: string | null | undefined) {
  return (value ?? "").toString().trim().toLowerCase();
}
