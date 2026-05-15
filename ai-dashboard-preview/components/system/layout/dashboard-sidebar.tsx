import { Command, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageKey } from "@/lib/dashboard-data";
import { navGroups } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function DashboardSidebar({
  activePage,
  onNavigate,
  onOpenCommandPalette,
}: {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
  onOpenCommandPalette: () => void;
}) {
  return (
    <aside className="flex min-h-[calc(100vh-3rem)] flex-col border-r border-border/70 bg-white/78 px-5 py-6 backdrop-blur">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-sm)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[15px] font-semibold">Northstar AI</div>
          <div className="text-sm text-muted-foreground">Enterprise Command</div>
        </div>
      </div>

      <nav className="space-y-7" aria-label="Sidebar">
        {navGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-2.5 px-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePage === item.key;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-all focus-visible:ring-4 focus-visible:ring-ring",
                      isActive
                        ? "bg-white text-foreground shadow-[var(--shadow-sm)]"
                        : "text-muted-foreground hover:bg-white/70 hover:text-foreground active:scale-[0.99]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Card className="rounded-[24px] bg-gradient-to-b from-[#fcfdff] to-[#f4f8ff]">
          <CardHeader className="pb-3">
            <Badge variant="info" className="w-fit">
              AI Copilot
            </Badge>
            <CardTitle className="text-base">Ask the workspace</CardTitle>
            <CardDescription>
              Summaries, anomaly checks, workflow suggestions, and instant answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="subtle" className="w-full justify-between rounded-2xl" onClick={onOpenCommandPalette}>
              Open command palette
              <Command className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
