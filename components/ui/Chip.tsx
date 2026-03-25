import { type ReactNode } from "react";

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning";
}) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border";

  const toneClass =
    tone === "primary"
      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : tone === "warning"
          ? "bg-amber-50 text-amber-800 border-amber-200"
          : "bg-zinc-50 text-zinc-700 border-zinc-200";

  return <span className={base + " " + toneClass}>{children}</span>;
}
