import { type ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm sm:text-base text-zinc-600">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  );
}
