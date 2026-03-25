import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={
        "w-full rounded-xl border bg-white/80 px-4 py-2.5 text-sm outline-none " +
        "focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition " +
        className
      }
      {...props}
    />
  );
});
