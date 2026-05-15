import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("space-y-6", className)}>{children}</section>;
}

export function ContentGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("grid gap-6", className)}>{children}</div>;
}
