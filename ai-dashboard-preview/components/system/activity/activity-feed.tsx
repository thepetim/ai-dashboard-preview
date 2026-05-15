import { cn } from "@/lib/utils";

export type ActivityFeedItem = {
  id: string;
  title: string;
  time: string;
  tone: "success" | "warning" | "info" | "neutral";
};

export function ActivityFeed({
  items,
  onItemSelect,
  className,
}: {
  items: ActivityFeedItem[];
  onItemSelect?: (item: ActivityFeedItem) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const interactive = Boolean(onItemSelect);
        const itemClasses = cn(
          "flex w-full gap-4 rounded-[20px] p-2 text-left transition",
          interactive && "hover:bg-muted/40 focus-visible:ring-4 focus-visible:ring-ring"
        );
        const content = (
          <>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "mt-1 h-3 w-3 rounded-full",
                  item.tone === "success" && "bg-[var(--success)]",
                  item.tone === "warning" && "bg-[var(--warning)]",
                  item.tone === "info" && "bg-[var(--info)]",
                  item.tone === "neutral" && "bg-[#9aa3b2]"
                )}
              />
              {index !== items.length - 1 ? <div className="mt-2 h-12 w-px bg-border" /> : null}
            </div>
            <div className="pb-6">
              <div className="font-medium">{item.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.time}</div>
            </div>
          </>
        );

        return interactive ? (
          <button key={item.id} type="button" onClick={() => onItemSelect?.(item)} className={itemClasses}>
            {content}
          </button>
        ) : (
          <div key={item.id} className={itemClasses}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
