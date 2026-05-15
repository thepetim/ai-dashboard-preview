import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { ActivityFeed } from "@/components/system/activity/activity-feed";
import { timeline } from "@/lib/dashboard-data";

export function ActivityFeedWidget() {
  return (
    <AnalyticsBlock
      title="Activity timeline"
      description="Human and AI actions across your workspace."
      contentClassName="space-y-5"
    >
      <ActivityFeed
        items={timeline.map((item, index) => ({
          id: `${item.title}-${index}`,
          title: item.title,
          time: item.time,
          tone: item.tone,
        }))}
      />
    </AnalyticsBlock>
  );
}

export function RightRail({
  selectedNotification,
  onNotificationSelect,
  onOpenTeamPage,
}: {
  selectedNotification: string;
  onNotificationSelect: (value: string) => void;
  onOpenTeamPage: () => void;
}) {
  return (
    <aside className="hidden min-h-[calc(100vh-3rem)] border-l border-border/70 bg-[#fbfcfd]/90 px-5 py-6 2xl:block">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="type-body-compact font-medium text-muted-foreground">Workspace pulse</div>
          <div className="mt-1 text-[1.25rem] font-semibold tracking-[-0.025em]">Today at a glance</div>
        </div>
        <Badge variant="neutral">12 alerts</Badge>
      </div>

      <div className="space-y-5">
        <Card className="rounded-[24px] bg-gradient-to-b from-[#fbfdff] to-[#f3f7ff]">
          <CardContent className="space-y-4 p-5">
            <Badge variant="info" className="w-fit">
              Copilot summary
            </Badge>
            <p className="type-body-compact text-muted-foreground">
              Revenue ops is outperforming forecast. Support risk needs attention after today’s
              routing update. Legal automation remains stable.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[24px]">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {[
              "Two workflows need human approval",
              "Spend anomaly detected in GPT-5.4 tier",
              "Quarterly analytics pack is ready",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onNotificationSelect(item)}
                className={`type-body-compact w-full rounded-[18px] p-4 text-left transition focus-visible:ring-4 focus-visible:ring-ring ${
                  selectedNotification === item
                    ? "bg-[var(--info-soft)] text-[var(--info)]"
                    : "bg-muted/60 text-muted-foreground hover:bg-white hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[24px]">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Team activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {[
              ["MK", "Updated workflow threshold"],
              ["JR", "Reviewed model spend report"],
              ["AL", "Published support prompt pack"],
            ].map(([initials, note]) => (
              <button
                type="button"
                key={note}
                onClick={onOpenTeamPage}
                className="flex w-full items-center gap-3 rounded-[18px] p-2 text-left transition hover:bg-white focus-visible:ring-4 focus-visible:ring-ring"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  {initials}
                </div>
                <div className="type-body-compact text-muted-foreground">{note}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="my-6 h-px w-full bg-border" />

      <div className="rounded-[24px] border border-border/80 bg-white p-5">
        <div className="type-body-compact mb-2 font-medium">Selected notification</div>
        <p className="type-body-compact text-muted-foreground">{selectedNotification}</p>
      </div>
    </aside>
  );
}
