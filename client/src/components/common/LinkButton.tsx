import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export function LinkButton({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link className={`btn ${variant}`} to={to}>
      {children}
    </Link>
  );
}
