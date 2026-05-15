import { Bot, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  description,
  insightLabel = "Run insight",
  primaryLabel = "New AI workflow",
  onInsight,
  onPrimary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  insightLabel?: string;
  primaryLabel?: string;
  onInsight: () => void;
  onPrimary: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <Badge variant="neutral" className="mb-4 w-fit">
          {eyebrow}
        </Badge>
        <h1 className="type-page-title md:text-[2.5rem]">{title}</h1>
        <p className="type-body mt-3 max-w-2xl text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="subtle" onClick={onInsight}>
          <Zap className="h-4 w-4" />
          {insightLabel}
        </Button>
        <Button onClick={onPrimary}>
          <Bot className="h-4 w-4" />
          {primaryLabel}
        </Button>
      </div>
    </section>
  );
}
