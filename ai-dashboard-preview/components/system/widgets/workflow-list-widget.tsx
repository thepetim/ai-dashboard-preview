import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { workflowData } from "@/lib/dashboard-data";

export function WorkflowListWidget({
  workflowTab,
  globalSearch,
  onWorkflowTabChange,
  onOpenWorkflow,
}: {
  workflowTab: string;
  globalSearch: string;
  onWorkflowTabChange: (value: string) => void;
  onOpenWorkflow: (message: string) => void;
}) {
  const normalizedSearch = globalSearch.trim().toLowerCase();
  const filteredWorkflowData = workflowData.filter((workflow) => {
    const matchesTab =
      workflowTab === "active"
        ? workflow.category === "active"
        : workflowTab === "watch"
          ? workflow.category === "watch"
          : workflow.category === "drafts";
    const haystack = `${workflow.name} ${workflow.owner} ${workflow.description}`.toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesTab && matchesSearch;
  });

  return (
    <AnalyticsBlock
      title="Recent workflows"
      description="Highest-impact automations currently running across the organization."
      actions={
        <Tabs value={workflowTab} onValueChange={onWorkflowTabChange} className="gap-0">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="watch">Watchlist</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      }
      contentClassName="space-y-5"
    >
        {filteredWorkflowData.map((workflow) => (
          <button
            key={workflow.id}
            type="button"
            onClick={() => onOpenWorkflow(`${workflow.name} opened from dashboard.`)}
            className="w-full text-left"
          >
            <div className="flex flex-col gap-4 rounded-[22px] border border-border/80 bg-muted/50 p-5 transition hover:border-[#d8e2ff] hover:bg-white md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="font-medium">{workflow.name}</div>
                <div className="text-sm text-muted-foreground">
                  {workflow.owner} team · {workflow.runs}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={workflow.status === "Healthy" ? "success" : workflow.status === "Draft" ? "neutral" : "warning"}>
                  {workflow.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  View details
                </Button>
              </div>
            </div>
          </button>
        ))}
    </AnalyticsBlock>
  );
}
