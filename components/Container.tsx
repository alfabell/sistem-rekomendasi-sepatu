import { type ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 via-white to-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
