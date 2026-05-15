import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { StatsChip } from "@/components/system/cards/metric-widget";
import { chartSeries } from "@/lib/dashboard-data";

export function PerformanceChartWidget({
  chartRange,
  onChartRangeChange,
}: {
  chartRange: keyof typeof chartSeries;
  onChartRangeChange: (value: keyof typeof chartSeries) => void;
}) {
  return (
    <AnalyticsBlock
      title="System performance"
      description="Token throughput, workflow completion, and confidence trends over time."
      actions={
        <Tabs value={chartRange} onValueChange={(value) => onChartRangeChange(value as keyof typeof chartSeries)} className="gap-0">
          <TabsList>
            <TabsTrigger value="30d">30 days</TabsTrigger>
            <TabsTrigger value="12w">12 weeks</TabsTrigger>
            <TabsTrigger value="ytd">YTD</TabsTrigger>
          </TabsList>
        </Tabs>
      }
      contentClassName="space-y-6"
    >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <StatsChip label="Requests" value="12.8M" />
          <StatsChip label="Median latency" value="820ms" />
          <StatsChip label="Success rate" value="98.9%" />
        </div>
        <div className="rounded-[24px] border border-border/80 bg-[linear-gradient(180deg,#fbfcfd_0%,#f4f7fb_100%)] p-5">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Usage trend</div>
              <div className="mt-2 text-2xl font-semibold">Stable growth with lower cost volatility</div>
            </div>
            <Badge variant="success">+14.6% QoQ</Badge>
          </div>
          <div className="flex h-64 items-end gap-3">
            {chartSeries[chartRange].map((bar, index) => (
              <button
                key={`${chartRange}-${index}`}
                type="button"
                className="group flex h-full flex-1 items-end rounded-[18px] focus-visible:ring-4 focus-visible:ring-ring"
              >
                <div
                  className="w-full rounded-[18px] bg-gradient-to-t from-[#141926] via-[#8ea0d9] to-[#e9efff] transition duration-200 group-hover:brightness-110"
                  style={{ height: `${bar}%` }}
                />
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-6 gap-3 text-xs text-muted-foreground">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <div key={month}>{month}</div>
            ))}
          </div>
        </div>
    </AnalyticsBlock>
  );
}
