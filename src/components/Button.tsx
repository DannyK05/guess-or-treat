import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
};
export default function Button({ className, children }: ButtonProps) {
  return (
    <button
      role="button"
      className={twMerge(
        className,
        "text-white text-lg h-20 w-40 font-medium border border-orange-500 active:bg-orange-500 lg:text-xl"
      )}
    >
      {children}
    </button>
  );
}
