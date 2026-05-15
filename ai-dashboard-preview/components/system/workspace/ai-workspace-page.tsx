import { Bot, Clock3, Files, Paperclip, Play, Settings2, Sparkles, WandSparkles, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityFeed } from "@/components/system/activity/activity-feed";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { ContentGrid, SectionShell } from "@/components/system/primitives/section-shell";
import { SuccessState } from "@/components/system/states/dashboard-state";
import {
  workspaceAiActions,
  workspaceContextSuggestions,
  workspaceGenerationHistory,
  workspaceLiveActivity,
  workspaceModelOptions,
  workspaceQuickPrompts,
  workspaceResponses,
  workspaceSavedPrompts,
  workspaceTokenStats,
  workspaceToolSections,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

function WorkspaceStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[20px] border border-border/80 bg-white p-4">
      <div className="type-body-compact text-muted-foreground">{label}</div>
      <div className="mt-3 text-[1.5rem] font-semibold tracking-[-0.03em]">{value}</div>
      <div className="type-label mt-2 text-muted-foreground/90 normal-case tracking-[0.01em]">{note}</div>
    </div>
  );
}

function SettingPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-border/80 bg-white p-3">
      <div className="type-label text-muted-foreground">{label}</div>
      <div className="mt-2 text-[0.9375rem] font-medium tracking-[-0.015em] text-foreground">{value}</div>
    </div>
  );
}

export function AiWorkspacePage({
  prompt,
  response,
  model,
  responseStatus,
  onPromptChange,
  onRunPrompt,
  onModelChange,
  onSelectQuickPrompt,
}: {
  prompt: string;
  response: string;
  model: string;
  responseStatus: "idle" | "loading" | "success" | "error";
  onPromptChange: (value: string) => void;
  onRunPrompt: (value: string) => void;
  onModelChange: (value: string) => void;
  onSelectQuickPrompt: (value: string) => void;
}) {
  const activeModel =
    workspaceModelOptions.find((option) => option.name === model) ?? workspaceModelOptions[0];

  return (
    <SectionShell>
      <ContentGrid className="2xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]">
        <AnalyticsBlock
          title="Prompt editor"
          description="Compose structured prompts with context, uploads, and model controls in one calm workspace."
          badge={<Badge variant="info">Context aware</Badge>}
          actions={
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="subtle">{activeModel.name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Model selector</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {workspaceModelOptions.map((option) => (
                    <DropdownMenuItem key={option.id} onSelect={() => onModelChange(option.name)}>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => onRunPrompt(prompt)}>
                <Play className="h-4 w-4" />
                Generate
              </Button>
            </>
          }
          contentClassName="space-y-6"
        >
          <div className="rounded-[24px] border border-border/80 bg-[linear-gradient(180deg,#fdfdff_0%,#f8fbff_100%)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="type-body-compact font-medium">Current draft</div>
              <Badge variant="neutral">Workspace prompt</Badge>
            </div>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              className="min-h-[220px] w-full resize-none rounded-[20px] border border-border/70 bg-white px-4 py-4 text-sm leading-7 text-foreground outline-none transition focus-visible:ring-4 focus-visible:ring-ring"
              placeholder="Ask AI to synthesize, transform, or operationalize a high-value workflow outcome..."
            />

            <div className="mt-5 flex flex-wrap gap-2.5">
              {workspaceContextSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() =>
                    onPromptChange(`${prompt.trim()}${prompt.trim() ? "\n" : ""}${suggestion}.`)
                  }
                  className="rounded-full border border-border/80 bg-white px-3 py-2 text-sm text-muted-foreground transition hover:border-[#dbe3f8] hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-[22px] border border-dashed border-border bg-white p-5">
              <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                File upload area
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Drag source documents, transcripts, or CSV exports here to ground the current generation.
              </p>
              <Button variant="subtle" className="mt-4">
                <Files className="h-4 w-4" />
                Attach source file
              </Button>
            </div>

            <div className="rounded-[22px] border border-border/80 bg-white p-5">
              <div className="mb-4 text-[0.8125rem] font-medium tracking-[-0.01em]">Quick prompts</div>
              <div className="space-y-2">
                {workspaceQuickPrompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onSelectQuickPrompt(item)}
                    className="flex w-full items-start rounded-[18px] border border-transparent bg-muted/60 px-3 py-3 text-left text-sm text-muted-foreground transition hover:border-border/80 hover:bg-white hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnalyticsBlock>

        <AnalyticsBlock
          title="Assistant panel"
          description="Context-aware assistance, generation settings, and operational controls for the current session."
          contentClassName="space-y-6"
        >
          <div className="rounded-[22px] border border-border/80 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
                <Bot className="h-4 w-4 text-muted-foreground" />
                Assistant context
              </div>
              <Badge variant="info">Live</Badge>
            </div>
            <div className="text-[1rem] font-semibold tracking-[-0.02em]">Workspace copilot is aligned to this draft</div>
            <p className="type-body-compact mt-2 text-muted-foreground">
              The assistant is using current workspace analytics, uploaded source material, and recent workflow outputs to shape recommendations and final wording.
            </p>
            <div className="mt-5 space-y-2.5">
              {[
                "Summarize blockers before generation",
                "Surface executive risks in the first paragraph",
                "Compare spend posture before suggesting rollout",
              ].map((item) => (
                <div key={item} className="type-body-compact rounded-[16px] bg-white px-3 py-3 text-muted-foreground shadow-[var(--shadow-sm)]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              Generation settings
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <SettingPill label="Model" value={activeModel.name} />
              <SettingPill label="Reasoning" value="High" />
              <SettingPill label="Output mode" value="Structured brief" />
              <SettingPill label="Citations" value="Required" />
            </div>
            <div className="type-body-compact mt-5 rounded-[18px] bg-muted/40 p-4 text-muted-foreground">
              Tuned for concise executive synthesis with approval-ready formatting and cost-aware recommendations.
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 text-[0.8125rem] font-medium tracking-[-0.01em]">AI actions</div>
            <div className="grid gap-2">
              {workspaceAiActions.map((action) => (
                <Button key={action} variant="subtle" className="justify-start" onClick={() => onRunPrompt(`${action}: ${prompt}`)}>
                  <WandSparkles className="h-4 w-4" />
                  {action}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-muted/40 p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              Workflow controls
            </div>
            <div className="flex flex-wrap gap-2">
              {["Approval required", "Share to reviewers", "Track token spend", "Archive outputs"].map((item) => (
                <div key={item} className="rounded-full border border-border/80 bg-white px-3 py-2 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              Live AI activity
            </div>
            <ActivityFeed items={workspaceLiveActivity} className="space-y-3" />
          </div>
        </AnalyticsBlock>
      </ContentGrid>

      <ContentGrid className="2xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <AnalyticsBlock
          title="Assistant responses"
          description="Recent structured outputs generated in the current workspace."
          contentClassName="space-y-5"
        >
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest">Latest output</TabsTrigger>
              <TabsTrigger value="saved">Saved outputs</TabsTrigger>
              <TabsTrigger value="assistant">Assistant notes</TabsTrigger>
            </TabsList>
            <TabsContent value="latest" className="space-y-4">
              <SuccessState
                className={cn("min-h-0", responseStatus === "loading" && "opacity-70")}
                title="Assistant response"
                description={response}
              />
              <div className="grid gap-5 md:grid-cols-2">
                {workspaceResponses.map((item) => (
                  <div key={item.id} className="rounded-[22px] border border-border/80 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="text-[1rem] font-semibold tracking-[-0.02em]">{item.title}</div>
                      <Badge variant={item.tone}>{item.badge}</Badge>
                    </div>
                    <p className="type-body-compact text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="saved" className="space-y-3">
              {workspaceGenerationHistory.map((item) => (
                <div key={item.id} className="rounded-[20px] border border-border/80 bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{item.title}</div>
                      <div className="type-body-compact mt-1 text-muted-foreground">
                        {item.model} · {item.time}
                      </div>
                    </div>
                    <Badge variant={item.status === "Review" ? "warning" : item.status === "Approved" ? "success" : "info"}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="assistant" className="space-y-4">
              <div className="rounded-[22px] border border-border/80 bg-white p-5">
                <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  Assistant guidance
                </div>
                <div className="space-y-3">
                  {[
                    "The current draft is strongest when framed as a leadership brief rather than a generic summary.",
                    "Model selection is appropriate for this level of reasoning, but initial exploration could be done on GPT-5.4 Mini to reduce cost.",
                    "Uploaded files suggest legal review should happen before this output is shared externally.",
                  ].map((item) => (
                    <div key={item} className="type-body-compact rounded-[18px] bg-muted/40 px-4 py-3 text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </AnalyticsBlock>

        <AnalyticsBlock
          title="Generation history and analytics"
          description="Model activity, token posture, and workspace recommendations."
          contentClassName="space-y-6"
        >
          <div className="space-y-3.5">
            {workspaceGenerationHistory.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full rounded-[20px] border border-border/80 bg-white p-5 text-left transition hover:border-[#dbe3f8] hover:shadow-[var(--shadow-sm)] focus-visible:ring-4 focus-visible:ring-ring"
                onClick={() => onSelectQuickPrompt(`Continue refining ${item.title.toLowerCase()}.`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{item.title}</div>
                    <div className="type-body-compact mt-1 text-muted-foreground">
                      {item.model} · {item.time}
                    </div>
                  </div>
                  <Badge variant={item.status === "Review" ? "warning" : item.status === "Approved" ? "success" : "info"}>
                    {item.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          <div className="grid gap-3.5">
            {workspaceTokenStats.map((item) => (
              <WorkspaceStat key={item.label} label={item.label} value={item.value} note={item.note} />
            ))}
          </div>

          <div className="rounded-[22px] border border-border/80 bg-muted/40 p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Contextual suggestions
            </div>
            <div className="space-y-2">
              {[
                "Reduce output length by 15% before sharing with leadership.",
                "Route the next draft through legal review because uploaded files include customer terms.",
                "Use GPT-5.4 Mini for exploratory drafting, then promote final synthesis to GPT-5.4.",
              ].map((item) => (
                <div key={item} className="type-body-compact rounded-[18px] bg-white px-4 py-3 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnalyticsBlock>
      </ContentGrid>

      <ContentGrid className="2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <AnalyticsBlock
          title="Saved prompts"
          description="High-value prompt patterns your team reuses for recurring executive, operational, and client-facing work."
          contentClassName="space-y-4"
        >
          {workspaceSavedPrompts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectQuickPrompt(item.body)}
              className="w-full rounded-[22px] border border-border/80 bg-white p-5 text-left transition hover:border-[#dbe3f8] hover:shadow-[var(--shadow-sm)] focus-visible:ring-4 focus-visible:ring-ring"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[1rem] font-semibold tracking-[-0.02em]">{item.title}</div>
                <Badge variant={item.tone}>{item.badge}</Badge>
              </div>
              <p className="type-body-compact text-muted-foreground">{item.body}</p>
            </button>
          ))}
        </AnalyticsBlock>

        <AnalyticsBlock
          title="AI tools"
          description="Purpose-built tools that turn one-off prompting into reliable, scalable product workflows."
          contentClassName="grid gap-4 md:grid-cols-3"
        >
          {workspaceToolSections.map((item) => (
            <div key={item.id} className="rounded-[22px] border border-border/80 bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted/50">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </div>
                <Badge variant={item.tone}>{item.badge}</Badge>
              </div>
              <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{item.title}</div>
              <p className="type-body-compact mt-3 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </AnalyticsBlock>
      </ContentGrid>
    </SectionShell>
  );
}
