import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm " + className
      }
    >
      {children}
    </div>
  );
}
