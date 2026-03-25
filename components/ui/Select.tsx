import { forwardRef } from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className = "", children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={
        "w-full rounded-xl border bg-white/80 px-4 py-2.5 text-sm outline-none " +
        "focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition " +
        className
      }
      {...props}
    >
      {children}
    </select>
  );
});
