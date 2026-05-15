import { useEffect, useMemo, useState, type KeyboardEvent, type RefObject } from "react";
import { ArrowRight, Clock3, Command, CornerDownRight, FolderKanban, Search, Settings2, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NoDataState } from "@/components/system/states/dashboard-state";
import type { PageKey } from "@/lib/dashboard-data";

export type CommandResult = {
  id: string;
  type: "page" | "workflow" | "action" | "project" | "event" | "setting";
  action: "navigate" | "run-ai" | "switch-project";
  section:
    | "smart suggestions"
    | "navigation"
    | "projects"
    | "ai actions"
    | "contextual actions"
    | "recent workflows"
    | "quick settings"
    | "recent activity";
  label: string;
  description?: string;
  shortcut?: string;
  key?: PageKey;
  payload?: string;
  badge?: string;
};

export function CommandBar({
  query,
  inputRef,
  results,
  selectedProject,
  currentPageLabel,
  onQueryChange,
  onSelect,
  onClose,
}: {
  query: string;
  inputRef: RefObject<HTMLInputElement | null>;
  results: CommandResult[];
  selectedProject: string;
  currentPageLabel: string;
  onQueryChange: (value: string) => void;
  onSelect: (result: CommandResult) => void;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupedResults = useMemo(
    () =>
      [
        { key: "smart suggestions", title: "Smart suggestions" },
        { key: "navigation", title: "Navigation" },
        { key: "projects", title: "Projects" },
        { key: "ai actions", title: "AI actions" },
        { key: "contextual actions", title: "Contextual actions" },
        { key: "recent workflows", title: "Recent workflows" },
        { key: "quick settings", title: "Quick settings" },
        { key: "recent activity", title: "Recent activity" },
      ].map((group) => ({
        ...group,
        items: results.filter((result) => result.section === group.key),
      })),
    [results]
  );
  const activeResult = results[activeIndex] ?? results[0] ?? null;
  const activeSectionTitle =
    groupedResults.find((group) => group.key === activeResult?.section)?.title ?? "Command";

  useEffect(() => {
    setActiveIndex(0);
  }, [query, results.length]);

  useEffect(() => {
    const activeElement = document.querySelector<HTMLElement>(`[data-command-index="${activeIndex}"]`);
    activeElement?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      onSelect(results[activeIndex] ?? results[0]);
    }
  }

  function renderSection(title: string, items: CommandResult[]) {
    if (!items.length) return null;
    return (
      <div className="space-y-2.5">
        <div className="type-label px-2 pt-1 text-muted-foreground">{title}</div>
        {items.map((result) => {
          const resultIndex = results.findIndex((item) => item.id === result.id);
          const isActive = resultIndex === activeIndex;
          const badgeVariant: "info" | "success" | "warning" | "neutral" =
            result.section === "ai actions" || result.section === "smart suggestions"
              ? "info"
              : result.section === "recent workflows"
                ? "success"
                : result.section === "quick settings"
                  ? "neutral"
                  : result.section === "recent activity"
                    ? "warning"
                    : "neutral";
          return (
            <button
              key={result.id}
              id={result.id}
              type="button"
              onClick={() => onSelect(result)}
              onMouseEnter={() => setActiveIndex(resultIndex)}
              data-command-index={resultIndex}
              role="option"
              aria-selected={isActive}
              className={`flex w-full items-start justify-between rounded-[20px] border px-4 py-3.5 text-left text-sm transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out focus-visible:ring-4 focus-visible:ring-ring ${
                isActive
                  ? "border-[#dbe3f8] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8ff_100%)] shadow-[var(--shadow-sm)]"
                  : "border-transparent bg-white hover:border-border/80 hover:bg-[#fdfefe] hover:shadow-[var(--shadow-sm)]"
              }`}
            >
              <div className="pr-4">
                <div className="text-[0.9375rem] font-medium tracking-[-0.015em] text-foreground">{result.label}</div>
                {result.description ? (
                  <div className="type-body-compact mt-1 text-muted-foreground">{result.description}</div>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {result.shortcut ? (
                  <div className="rounded-full border border-border/80 bg-white px-2 py-1 text-[11px] font-medium text-muted-foreground">
                    {result.shortcut}
                  </div>
                ) : null}
                <Badge variant={badgeVariant}>
                  {result.badge ?? (result.section === "ai actions" ? "AI" : result.type === "page" ? "Page" : result.type === "project" ? "Project" : result.type === "setting" ? "Setting" : result.type === "event" ? "Event" : "Workflow")}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <DialogContent className="max-w-[1040px] gap-0 overflow-hidden rounded-[30px] border border-white/70 p-0">
      <DialogHeader className="border-b border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)]">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-[18px] border border-border/80 bg-white shadow-[var(--shadow-sm)]">
              <Command className="h-4 w-4 text-foreground" />
            </div>
            <div>
              <DialogTitle>Command center</DialogTitle>
              <DialogDescription>
                Search globally, switch projects, launch workflows, and trigger AI actions without leaving context.
              </DialogDescription>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Badge variant="neutral">{selectedProject}</Badge>
            <Badge variant="info">{currentPageLabel}</Badge>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search pages, workflows, projects, settings, or ask AI..."
              className="h-[52px] pl-11 pr-28"
              aria-label="Command palette search"
              aria-controls="command-results-list"
              aria-expanded="true"
              aria-activedescendant={activeResult ? activeResult.id : undefined}
            />
            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <span className="rounded-full border border-border/80 bg-white px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                Esc
              </span>
              <span className="rounded-full border border-border/80 bg-white px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                ↵
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5 p-6">
          <div
            id="command-results-list"
            role="listbox"
            className="max-h-[460px] space-y-3 overflow-y-auto rounded-[24px] border border-border/80 bg-muted/35 p-3.5"
          >
            {results.length ? (
              <>
                {groupedResults.map((group) => renderSection(group.title, group.items))}
              </>
            ) : (
              <NoDataState
                className="min-h-0 border-none bg-white p-5"
                title="No matching commands"
                description={`No results found for "${query}". Try a page name, workflow, or AI action.`}
              />
            )}
          </div>
        </div>

        <aside className="space-y-4 border-t border-border/70 bg-[linear-gradient(180deg,#fcfdff_0%,#f7f9fc_100%)] p-6 md:border-l md:border-t-0">
          <div className="rounded-[24px] border border-border/80 bg-white p-5 shadow-[var(--shadow-sm)]">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              {activeResult?.section === "projects" ? (
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              ) : activeResult?.section === "quick settings" ? (
                <Settings2 className="h-4 w-4 text-muted-foreground" />
              ) : activeResult?.section === "recent workflows" ? (
                <Workflow className="h-4 w-4 text-muted-foreground" />
              ) : activeResult?.section === "recent activity" ? (
                <Clock3 className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              )}
              Selected command
            </div>
            {activeResult ? (
              <>
                <div className="text-[1rem] font-semibold tracking-[-0.02em] text-foreground">{activeResult.label}</div>
                <p className="type-body-compact mt-2 text-muted-foreground">
                  {activeResult.description ?? "Fast access to the selected command."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeResult.shortcut ? <Badge variant="neutral">{activeResult.shortcut}</Badge> : null}
                  <Badge variant="info">{activeSectionTitle}</Badge>
                  {activeResult.badge ? <Badge variant="neutral">{activeResult.badge}</Badge> : null}
                </div>
                <div className="mt-5 rounded-[18px] bg-muted/40 p-4">
                  <div className="type-label text-muted-foreground">What happens next</div>
                  <div className="type-body-compact mt-2 text-muted-foreground">
                    {activeResult.action === "switch-project"
                      ? "This will switch the active workspace context and keep the palette aligned to the new project."
                      : activeResult.action === "run-ai"
                        ? "This will route directly into an AI-assisted workflow and prepare the next best action for you."
                        : "This will navigate instantly while preserving the command flow and current workspace state."}
                  </div>
                </div>
                <Button className="mt-5 w-full justify-between" onClick={() => onSelect(activeResult)}>
                  Run command
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : null}
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em]">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Quick AI actions
            </div>
            <div className="space-y-2">
              {["Summarize workspace", "Draft leadership update", "Open AI Workspace"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onQueryChange(item)}
                  className="flex w-full items-center justify-between rounded-[18px] bg-muted/50 px-3 py-3 text-left text-sm text-muted-foreground transition hover:bg-white hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <span className="type-body-compact">{item}</span>
                  <CornerDownRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-border/80 bg-white p-5">
            <div className="mb-4 text-[0.8125rem] font-medium tracking-[-0.01em]">Keyboard hints</div>
            <div className="space-y-2">
              {[
                ["Navigate results", "↑ ↓"],
                ["Open selection", "Enter"],
                ["Close palette", "Esc"],
                ["Quick search", "/"],
                ["Project settings", "G ,"],
              ].map(([label, keys]) => (
                <div key={label} className="flex items-center justify-between gap-3 rounded-[16px] bg-muted/40 px-3 py-2 text-sm">
                  <span className="type-body-compact text-muted-foreground">{label}</span>
                  <span className="rounded-full border border-border/80 bg-white px-2 py-1 text-[11px] font-medium text-foreground">
                    {keys}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose} className="m-6 mt-0">
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
