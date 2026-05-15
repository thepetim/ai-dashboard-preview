import { Bot, Command, FolderKanban, Search, Settings2, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { ActivityFeed } from "@/components/system/activity/activity-feed";
import { ContentGrid, SectionShell } from "@/components/system/primitives/section-shell";
import {
  commandProjects,
  commandQuickActions,
  commandRecentActivity,
  commandShortcuts,
  navGroups,
  workflowData,
  type PageKey,
} from "@/lib/dashboard-data";

export function CommandCenterPage({
  searchValue,
  selectedProject,
  onSearchChange,
  onOpenCommandPalette,
  onNavigate,
  onSelectProject,
  onRunAiAction,
}: {
  searchValue: string;
  selectedProject: string;
  onSearchChange: (value: string) => void;
  onOpenCommandPalette: () => void;
  onNavigate: (page: PageKey) => void;
  onSelectProject: (projectName: string) => void;
  onRunAiAction: (label: string) => void;
}) {
  return (
    <SectionShell>
      <ContentGrid className="2xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <AnalyticsBlock
          title="Global search"
          description="Search across pages, workflows, AI operations, and recent workspace context with keyboard-first speed."
          badge={<Badge variant="info">⌘K ready</Badge>}
          actions={
            <Button onClick={onOpenCommandPalette}>
              <Command className="h-4 w-4" />
              Open command palette
            </Button>
          }
          contentClassName="space-y-6"
        >
          <div className="rounded-[24px] border border-border/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[var(--shadow-sm)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-sm)]">
                <Search className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[1rem] font-semibold tracking-[-0.02em]">Search anything or ask AI</div>
                <div className="type-body-compact mt-1 text-muted-foreground">
                  Navigate instantly, launch workflows, or trigger assistant actions from one surface.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Input
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search pages, workflows, commands, or AI actions..."
                className="flex-1"
              />
              <Button variant="subtle" onClick={onOpenCommandPalette}>
                <Command className="h-4 w-4" />
                Open palette
              </Button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {commandQuickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onRunAiAction(action.label)}
                className="rounded-[22px] border border-border/80 bg-white p-5 text-left transition hover:border-[#dbe3f8] hover:shadow-[var(--shadow-sm)] focus-visible:ring-4 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant={action.tone}>{action.shortcut}</Badge>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-5 text-[1rem] font-semibold tracking-[-0.02em]">{action.label}</div>
                <div className="type-body-compact mt-2 text-muted-foreground">{action.description}</div>
              </button>
            ))}
          </div>
        </AnalyticsBlock>

        <AnalyticsBlock
          title="Projects and shortcuts"
          description="Switch workspace context and keep the most-used keyboard paths visible."
          contentClassName="space-y-6"
        >
          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
              Project switching
            </div>
            <div className="space-y-2">
              {commandProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onSelectProject(project.name)}
                  className={`w-full rounded-[18px] px-4 py-3 text-left transition focus-visible:ring-4 focus-visible:ring-ring ${
                    selectedProject === project.name
                      ? "border border-[#d7e1ff] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] shadow-[var(--shadow-sm)]"
                      : "border border-border/80 bg-muted/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{project.name}</div>
                      <div className="type-body-compact mt-1 text-muted-foreground">{project.description}</div>
                    </div>
                    {project.badge ? <Badge variant="info">{project.badge}</Badge> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 text-[0.8125rem] font-medium tracking-[-0.01em]">Keyboard shortcuts</div>
            <div className="space-y-2">
              {commandShortcuts.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-[16px] bg-muted/40 px-3 py-2 text-sm">
                  <span className="type-body-compact text-muted-foreground">{item.label}</span>
                  <span className="rounded-full border border-border/80 bg-white px-2 py-1 text-[11px] font-medium text-foreground">
                    {item.keys}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnalyticsBlock>
      </ContentGrid>

      <ContentGrid className="2xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <AnalyticsBlock
          title="Recent workflows"
          description="Continue high-value automations, resume drafts, or jump directly into AI-assisted operations."
          contentClassName="space-y-5"
        >
          {workflowData.map((workflow) => (
            <button
              key={workflow.id}
              type="button"
              onClick={() => onNavigate("workflows")}
              className="flex w-full flex-col gap-4 rounded-[22px] border border-border/80 bg-white p-5 text-left transition hover:border-[#dbe3f8] hover:shadow-[var(--shadow-sm)] focus-visible:ring-4 focus-visible:ring-ring md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{workflow.name}</div>
                <div className="type-body-compact mt-1 text-muted-foreground">
                  {workflow.owner} team · {workflow.runs} · {workflow.description}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={workflow.status === "Healthy" ? "success" : workflow.status === "Draft" ? "neutral" : "warning"}>
                  {workflow.status}
                </Badge>
                <div className="rounded-full border border-border/80 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Open
                </div>
              </div>
            </button>
          ))}
        </AnalyticsBlock>

        <AnalyticsBlock
          title="Navigation and AI assistant commands"
          description="Use the command center to move between product areas and trigger assistant-led actions without losing context."
          contentClassName="space-y-6"
        >
          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Bot className="h-4 w-4 text-muted-foreground" />
              Assistant commands
            </div>
            <div className="space-y-2">
              {[
                "Summarize the current workspace",
                "Draft an executive update",
                "Turn this search into an AI workflow",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onRunAiAction(item)}
                  className="flex w-full items-center justify-between rounded-[18px] bg-muted/40 px-3 py-3 text-left text-sm text-muted-foreground transition hover:bg-white hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <span>{item}</span>
                  <Sparkles className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              Navigation actions
            </div>
            <div className="grid gap-2">
              {navGroups.flatMap((group) => group.items).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onNavigate(item.key)}
                  className="flex items-center justify-between rounded-[18px] bg-muted/40 px-3 py-3 text-left text-sm text-muted-foreground transition hover:bg-white hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <Workflow className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </AnalyticsBlock>
      </ContentGrid>

      <AnalyticsBlock
        title="Recent activity"
        description="Latest command-relevant workspace events that can be resumed, reviewed, or handed off to AI."
        contentClassName="space-y-4"
      >
        <ActivityFeed items={commandRecentActivity} />
      </AnalyticsBlock>
    </SectionShell>
  );
}
