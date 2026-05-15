import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricWidget({
  title,
  value,
  change,
  tone,
  note,
  selected,
  onSelect,
  index,
}: {
  title: string;
  value: string;
  change: string;
  tone: "info" | "success" | "warning" | "neutral";
  note: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={onSelect}
      className="text-left"
    >
      <Card
        className={cn(
          "h-full rounded-[26px] border border-border/80 transition duration-200 hover:-translate-y-0.5 hover:border-[#dbe3f8] hover:shadow-[var(--shadow-md)]",
          selected && "border-[#cfdcff] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] ring-2 ring-[#d7e1ff]"
        )}
      >
        <CardHeader className="gap-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <CardDescription className="type-body-compact">{title}</CardDescription>
            <Badge variant={tone}>{change}</Badge>
          </div>
          <div className="type-metric">{value}</div>
        </CardHeader>
        <CardContent className="type-body-compact text-muted-foreground">{note}</CardContent>
      </Card>
    </motion.button>
  );
}

export function StatsChip({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="rounded-[20px] border border-transparent bg-muted/70 p-4 text-left transition hover:border-border/80 hover:bg-white hover:shadow-[var(--shadow-sm)] focus-visible:ring-4 focus-visible:ring-ring"
    >
      <div className="type-body-compact text-muted-foreground">{label}</div>
      <div className="mt-3 text-[1.25rem] font-semibold tracking-[-0.025em]">{value}</div>
    </button>
  );
}
