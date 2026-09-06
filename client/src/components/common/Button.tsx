import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({
  children,
  ...p
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn primary" {...p}>
      {children}
    </button>
  );
}
