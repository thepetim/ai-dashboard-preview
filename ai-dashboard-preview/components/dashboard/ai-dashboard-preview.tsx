"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CommandBar } from "@/components/system/command/command-bar";
import { CommandCenterPage } from "@/components/system/command/command-center-page";
import { ContentGrid, SectionShell } from "@/components/system/primitives/section-shell";
import { DashboardSidebar } from "@/components/system/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/system/layout/dashboard-header";
import { PageHero } from "@/components/system/layout/page-hero";
import { MetricWidget } from "@/components/system/cards/metric-widget";
import { RightRail } from "@/components/system/widgets/activity-feed-widget";
import { SimplePageGrid } from "@/components/system/widgets/simple-page-grid";
import { AiWorkspacePage } from "@/components/system/workspace/ai-workspace-page";
import { MetricCardSkeleton } from "@/components/system/states/skeleton";
import {
  commandProjects,
  commandQuickActions,
  commandRecentActivity,
  metrics,
  navGroups,
  notificationItems,
  pageMeta,
  type PageKey,
  workflowData,
} from "@/lib/dashboard-data";

export function AiDashboardPreview() {
  const [activePage, setActivePage] = useState<PageKey>("command");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [commandQuery, setCommandQuery] = useState("");
  const [selectedMetric, setSelectedMetric] = useState(metrics[0].id);
  const [selectedNotification, setSelectedNotification] = useState(notificationItems[0]);
  const [selectedProject, setSelectedProject] = useState("Northstar AI Core");
  const [workspacePrompt, setWorkspacePrompt] = useState(
    "Analyze the current support escalation data, uploaded workspace documents, and recent workflow outputs. Draft a concise executive-ready brief with risks, recommendations, and the next best actions."
  );
  const [workspaceModel, setWorkspaceModel] = useState("GPT-5.4");
  const [workspaceResponseStatus, setWorkspaceResponseStatus] = useState<"idle" | "loading" | "success" | "error">("success");
  const [workspaceResponse, setWorkspaceResponse] = useState(
    "Support escalation risk is elevated but controlled. The current workflow configuration is protecting response quality, yet the latest routing change increased reviewer workload by 11%. Recommended action is to restore the previous threshold, rerun quality evaluation on medium-complexity cases, and share a leadership summary with CX and trust owners today."
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen(true);
      }
      if (event.key === "/") {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          event.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (isCommandOpen) {
      setCommandQuery(globalSearch);
      setTimeout(() => commandInputRef.current?.focus(), 0);
    }
  }, [globalSearch, isCommandOpen]);

  const commandResults = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    const matches = (...values: Array<string | undefined>) =>
      !query || values.some((value) => value?.toLowerCase().includes(query));

    const pageResults = navGroups.flatMap((group) =>
      group.items
        .filter((item) => matches(item.label, pageMeta[item.key].description, group.title))
        .map((item) => ({
          id: `page-${item.key}`,
          type: "page" as const,
          action: "navigate" as const,
          section: "navigation" as const,
          label: item.label,
          description: pageMeta[item.key].description,
          key: item.key,
          badge: group.title,
        }))
    );

    const projectResults = commandProjects
      .filter((project) => matches(project.name, project.description))
      .map((project) => ({
        id: `project-${project.id}`,
        type: "project" as const,
        action: "switch-project" as const,
        section: "projects" as const,
        label: project.name,
        description: project.description,
        payload: project.name,
        badge: project.badge ?? "Project",
      }));

    const workflowResults = workflowData
      .filter((item) => matches(item.name, item.owner, item.description))
      .slice(0, query ? 6 : 4)
      .map((item) => ({
        id: `workflow-${item.id}`,
        type: "workflow" as const,
        action: "navigate" as const,
        section: "recent workflows" as const,
        label: item.name,
        description: `${item.owner} team · ${item.runs} · ${item.description}`,
        shortcut: "↵",
        key: "workflows" as PageKey,
        badge: item.status,
      }));

    const aiActionResults = commandQuickActions
      .filter((item) => matches(item.label, item.description))
      .map((item) => ({
        id: item.id,
        type: "action" as const,
        action: "run-ai" as const,
        section: "ai actions" as const,
        label: item.label,
        description: item.description,
        shortcut: item.shortcut,
        key: item.label === "Inspect model spend" ? ("models" as PageKey) : ("workspace" as PageKey),
        badge: "AI",
      }));

    const contextualActions = [
      {
        id: "context-1",
        type: "action" as const,
        action: "run-ai" as const,
        section: "smart suggestions" as const,
        label: activePage === "workspace" ? "Generate from current workspace draft" : "Open AI Workspace and prepare a draft",
        description:
          activePage === "workspace"
            ? "Use the current prompt, files, and workspace context to generate a polished next draft."
            : `Move from ${pageMeta[activePage].title.toLowerCase()} into the AI Workspace with current context preserved.`,
        payload:
          activePage === "workspace"
            ? workspacePrompt
            : `Prepare a concise AI brief from the current ${pageMeta[activePage].title.toLowerCase()} context.`,
        shortcut: "⌘↵",
        badge: "Suggested",
      },
      {
        id: "context-2",
        type: "action" as const,
        action: "run-ai" as const,
        section: "contextual actions" as const,
        label: activePage === "models" ? "Summarize model spend anomaly" : "Draft leadership update",
        description:
          activePage === "models"
            ? "Generate a concise explanation of current model cost posture, latency shifts, and next actions."
            : `Create a polished operating update based on the latest signals in ${selectedProject}.`,
        payload:
          activePage === "models"
            ? "Summarize current model spend, latency variance, and optimization actions for leadership."
            : "Draft a leadership-ready update with blockers, trends, and recommended next steps.",
        shortcut: "G S",
        badge: "Context",
      },
      {
        id: "context-3",
        type: "setting" as const,
        action: "navigate" as const,
        section: "quick settings" as const,
        label: "Open workspace settings",
        description: `Jump directly to settings for ${selectedProject}, including AI defaults, access, and billing posture.`,
        key: "settings" as PageKey,
        shortcut: "G ,",
        badge: "Settings",
      },
    ].filter((item) => matches(item.label, item.description, item.payload));

    const recentActivityResults = commandRecentActivity
      .filter((item) => matches(item.title, item.time))
      .map((item) => ({
        id: item.id,
        type: "event" as const,
        action: "navigate" as const,
        section: "recent activity" as const,
        label: item.title,
        description: `${item.time} · Review in team activity`,
        key: "team" as PageKey,
        badge: "Recent",
      }));

    return [
      ...contextualActions,
      ...pageResults,
      ...projectResults,
      ...aiActionResults,
      ...workflowResults,
      ...recentActivityResults,
    ];
  }, [activePage, commandQuery, selectedProject, workspacePrompt]);

  function runWorkspacePrompt(prompt: string) {
    if (!prompt.trim()) return;
    setWorkspaceResponseStatus("loading");
    window.setTimeout(() => {
      setWorkspaceResponseStatus("success");
      setWorkspaceResponse(
        `Using ${workspaceModel}, the workspace prepared a structured draft from the current prompt: "${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}". The output prioritizes stakeholder-ready synthesis, explicit blockers, and recommended workflow actions.`
      );
    }, 820);
  }

  function runCommandAction(label: string) {
    if (/model spend/i.test(label)) {
      setActivePage("models");
      setGlobalSearch("spend");
      return;
    }

    setActivePage("workspace");
    setWorkspacePrompt(label);
    runWorkspacePrompt(label);
  }

  return (
    <div className="min-h-screen p-5 text-foreground md:p-6">
      <Dialog open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <DialogContent
          showCloseButton={false}
          className="left-0 top-0 h-screen w-[min(340px,100vw)] translate-x-0 translate-y-0 rounded-none rounded-r-[28px] border-l-0 p-0"
        >
          <DashboardSidebar
            activePage={activePage}
            onNavigate={(page) => {
              setActivePage(page);
              setIsSidebarOpen(false);
            }}
            onOpenCommandPalette={() => {
              setIsSidebarOpen(false);
              setIsCommandOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandBar
          query={commandQuery}
          inputRef={commandInputRef}
          results={commandResults}
          selectedProject={selectedProject}
          currentPageLabel={pageMeta[activePage].title}
          onQueryChange={setCommandQuery}
          onSelect={(result) => {
            if (result.action === "switch-project" && result.payload) {
              setSelectedProject(result.payload);
              setGlobalSearch(result.payload);
            } else if (result.action === "run-ai") {
              runCommandAction(result.payload ?? result.label);
            } else if (result.key) {
              setActivePage(result.key);
              setGlobalSearch(result.payload ?? result.label);
            }
            setIsCommandOpen(false);
          }}
          onClose={() => setIsCommandOpen(false)}
        />
      </Dialog>

      <div className="dashboard-grid panel-surface overflow-hidden rounded-[32px] border border-white/70">
        <div className="hidden xl:block">
          <DashboardSidebar
            activePage={activePage}
            onNavigate={setActivePage}
            onOpenCommandPalette={() => setIsCommandOpen(true)}
          />
        </div>

        <main className="min-w-0 bg-white/70">
          <DashboardHeader
            globalSearch={globalSearch}
            searchInputRef={searchInputRef}
            onSearchChange={setGlobalSearch}
            onOpenCommandPalette={() => setIsCommandOpen(true)}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onNotificationSelect={setSelectedNotification}
            onOpenSettings={() => setActivePage("settings")}
          />

          <div className="thin-scrollbar relative z-0 space-y-8 overflow-x-hidden overflow-y-auto px-5 py-6 md:px-8 md:py-8">
            <PageHero
              eyebrow={pageMeta[activePage].eyebrow}
              title={pageMeta[activePage].title}
              description={pageMeta[activePage].description}
              insightLabel={activePage === "workspace" ? "Use template" : "Run insight"}
              primaryLabel={activePage === "workspace" ? "Generate draft" : "New AI workflow"}
              onInsight={() => {
                if (activePage === "workspace") {
                  setWorkspacePrompt("Create a stakeholder-ready draft from the current workspace context, emphasizing operational risk, cost efficiency, and next actions.");
                  return;
                }
                setIsCommandOpen(true);
              }}
              onPrimary={() => {
                if (activePage === "workspace") {
                  runWorkspacePrompt(workspacePrompt);
                  return;
                }
                runCommandAction("Create AI workflow");
              }}
            />

            {activePage === "command" ? (
              <CommandCenterPage
                searchValue={globalSearch}
                selectedProject={selectedProject}
                onSearchChange={setGlobalSearch}
                onOpenCommandPalette={() => setIsCommandOpen(true)}
                onNavigate={setActivePage}
                onSelectProject={setSelectedProject}
                onRunAiAction={runCommandAction}
              />
            ) : activePage === "workspace" ? (
              <AiWorkspacePage
                prompt={workspacePrompt}
                response={workspaceResponse}
                model={workspaceModel}
                responseStatus={workspaceResponseStatus}
                onPromptChange={setWorkspacePrompt}
                onRunPrompt={runWorkspacePrompt}
                onModelChange={setWorkspaceModel}
                onSelectQuickPrompt={setWorkspacePrompt}
              />
            ) : (
              <>
                <SectionShell>
                  <ContentGrid className="xl:grid-cols-4">
                    {metrics.length ? (
                      metrics.map((metric, index) => (
                        <MetricWidget
                          key={metric.id}
                          index={index}
                          title={metric.title}
                          value={metric.value}
                          change={metric.change}
                          tone={metric.tone}
                          note={metric.note}
                          selected={selectedMetric === metric.id}
                          onSelect={() => setSelectedMetric(metric.id)}
                        />
                      ))
                    ) : (
                      <>
                        <MetricCardSkeleton />
                        <MetricCardSkeleton />
                        <MetricCardSkeleton />
                        <MetricCardSkeleton />
                      </>
                    )}
                  </ContentGrid>
                </SectionShell>
                <SimplePageGrid
                  page={activePage}
                  onCardSelect={(message) => setSelectedNotification(message)}
                />
              </>
            )}
          </div>
        </main>

        <RightRail
          selectedNotification={selectedNotification}
          onNotificationSelect={setSelectedNotification}
          onOpenTeamPage={() => setActivePage("team")}
        />
      </div>
    </div>
  );
}
