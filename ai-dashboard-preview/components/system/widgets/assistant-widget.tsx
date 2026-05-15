import { BrainCircuit, CornerDownRight, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { EmptyState, ErrorState, SuccessState } from "@/components/system/states/dashboard-state";
import { PanelSkeleton } from "@/components/system/states/skeleton";
import { suggestedPrompts } from "@/lib/dashboard-data";

export function AssistantWidget({
  assistantDraft,
  assistantOutput,
  assistantStatus,
  onDraftChange,
  onSend,
}: {
  assistantDraft: string;
  assistantOutput: string;
  assistantStatus: "idle" | "loading" | "success" | "error";
  onDraftChange: (value: string) => void;
  onSend: (prompt: string) => void;
}) {
  return (
    <AnalyticsBlock
      title="AI assistant"
      description="Embedded decision support for the current workspace."
      badge={
        <Badge variant="info">
          <BrainCircuit className="h-3.5 w-3.5" />
          Context aware
        </Badge>
      }
      contentClassName="space-y-5"
    >
        <div className="rounded-[22px] border border-border/80 bg-muted/60 p-4">
          <div className="mb-3 text-sm font-medium">Suggested prompts</div>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onDraftChange(prompt)}
                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm text-muted-foreground shadow-[var(--shadow-sm)] transition hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
              >
                <span>{prompt}</span>
                <CornerDownRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {assistantStatus === "loading" ? (
          <PanelSkeleton lines={4} />
        ) : assistantStatus === "error" ? (
          <ErrorState
            className="min-h-0"
            title="Assistant response interrupted"
            description={assistantOutput}
            actionLabel="Retry generation"
            onAction={() => onSend(assistantDraft || suggestedPrompts[0])}
          />
        ) : assistantStatus === "success" ? (
          <SuccessState
            className="min-h-0"
            title="Latest output"
            description={assistantOutput}
          />
        ) : (
          <EmptyState
            className="min-h-0"
            title="Assistant ready"
            description="Ask the assistant to analyze a workflow, summarize a trend, or prepare a stakeholder update."
          />
        )}

        <form
          className="rounded-[22px] border border-border/80 bg-[#fcfdff] p-3"
          onSubmit={(event) => {
            event.preventDefault();
            onSend(assistantDraft);
          }}
        >
          <div className="flex items-end gap-3">
            <textarea
              value={assistantDraft}
              onChange={(event) => onDraftChange(event.target.value)}
              className="min-h-24 flex-1 resize-none rounded-[18px] border-0 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-4 focus-visible:ring-ring"
              placeholder="Ask AI to analyze a workflow, summarize results, or prepare a response..."
            />
            <Button type="submit" size="icon" className="rounded-2xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
    </AnalyticsBlock>
  );
}
