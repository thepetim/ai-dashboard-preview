import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  DatabaseZap,
  Inbox,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StateTone = "empty" | "no-data" | "error" | "success";

const toneClasses: Record<StateTone, string> = {
  empty: "bg-[linear-gradient(180deg,#fcfdff_0%,#f7f9fc_100%)]",
  "no-data": "bg-[linear-gradient(180deg,#fcfdff_0%,#f7f9fc_100%)]",
  error: "bg-[linear-gradient(180deg,#fffafa_0%,#fff4f4_100%)]",
  success: "bg-[linear-gradient(180deg,#fbfffd_0%,#f2fbf7_100%)]",
};

const iconMap = {
  empty: Inbox,
  "no-data": DatabaseZap,
  error: AlertTriangle,
  success: CheckCircle2,
} satisfies Record<StateTone, typeof Inbox>;

export function DashboardState({
  tone,
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: {
  tone: StateTone;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  const Icon = iconMap[tone];

  return (
    <div
      className={cn(
        "flex min-h-44 flex-col items-start justify-center rounded-[24px] border border-border/80 p-6",
        toneClasses[tone],
        className
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white shadow-[var(--shadow-sm)]">
        {icon ?? <Icon className="h-5 w-5 text-foreground" />}
      </div>
      <div className="text-lg font-semibold tracking-[-0.02em]">{title}</div>
      <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="subtle" className="mt-5" onClick={onAction}>
          <Sparkles className="h-4 w-4" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState(props: Omit<Parameters<typeof DashboardState>[0], "tone">) {
  return <DashboardState tone="empty" {...props} />;
}

export function NoDataState(props: Omit<Parameters<typeof DashboardState>[0], "tone">) {
  return <DashboardState tone="no-data" {...props} />;
}

export function ErrorState(props: Omit<Parameters<typeof DashboardState>[0], "tone">) {
  return <DashboardState tone="error" {...props} />;
}

export function SuccessState(props: Omit<Parameters<typeof DashboardState>[0], "tone">) {
  return <DashboardState tone="success" {...props} />;
}
