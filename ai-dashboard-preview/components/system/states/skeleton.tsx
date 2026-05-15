import { cn } from "@/lib/utils";

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return <div aria-hidden="true" className={cn("state-skeleton rounded-2xl bg-muted/80", className)} />;
}

export function PanelSkeleton({
  lines = 3,
}: {
  lines?: number;
}) {
  return (
    <div className="space-y-3 rounded-[22px] border border-border/80 bg-white p-4">
      <Skeleton className="h-4 w-24 rounded-full" />
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-3.5 rounded-full", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-[26px] border border-border/80 bg-white p-6 shadow-[var(--shadow-sm)]">
      <Skeleton className="h-4 w-28 rounded-full" />
      <Skeleton className="mt-5 h-10 w-32 rounded-2xl" />
      <Skeleton className="mt-6 h-3.5 w-40 rounded-full" />
    </div>
  );
}
