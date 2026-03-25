import Link from "next/link";
import { type ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-200";

  const variantClass =
    variant === "secondary"
      ? "border bg-white/70 hover:bg-white"
      : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={base + " " + variantClass + " " + className}
    >
      {children}
    </Link>
  );
}
