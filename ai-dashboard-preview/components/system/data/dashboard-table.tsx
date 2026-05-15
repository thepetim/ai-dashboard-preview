import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DashboardTable({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[24px] border border-border/80", className)}>
      <table className="w-full text-left">{children}</table>
    </div>
  );
}

export function DashboardTableToolbar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-wrap items-center justify-between gap-3 px-6 pb-5", className)}>{children}</div>;
}

export function DashboardTableHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <thead className={cn("bg-muted/70 text-sm text-muted-foreground", className)}>{children}</thead>;
}

export function DashboardTableBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tbody className={className}>{children}</tbody>;
}

export function DashboardTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={cn("border-t border-border/80 bg-white transition hover:bg-[#fbfcfd]", className)}>{children}</tr>;
}

export function DashboardTableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={cn("px-6 py-4 font-medium", className)}>{children}</th>;
}

export function DashboardTableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={cn("px-6 py-5", className)}>{children}</td>;
}
