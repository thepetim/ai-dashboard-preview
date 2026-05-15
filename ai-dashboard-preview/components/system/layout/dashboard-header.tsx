import { Bell, ChevronDown, Menu } from "lucide-react";
import type { RefObject } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearchBar } from "@/components/system/search/global-search-bar";

export function DashboardHeader({
  globalSearch,
  searchInputRef,
  onSearchChange,
  onOpenCommandPalette,
  onOpenSidebar,
  onNotificationSelect,
  onOpenSettings,
}: {
  globalSearch: string;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onOpenCommandPalette: () => void;
  onOpenSidebar: () => void;
  onNotificationSelect: (value: string) => void;
  onOpenSettings: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border/70 bg-white/75 px-[var(--space-page-x)] py-4 backdrop-blur">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button variant="subtle" size="icon" className="rounded-2xl xl:hidden" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
        <GlobalSearchBar
          inputRef={searchInputRef}
          value={globalSearch}
          onChange={onSearchChange}
          onOpenCommandPalette={onOpenCommandPalette}
        />
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              "Two workflows need human approval",
              "Spend anomaly detected in GPT-5.4 tier",
              "Quarterly analytics pack is ready",
            ].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => onNotificationSelect(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="subtle" className="rounded-2xl px-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline">Anita Noor</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuItem onSelect={onOpenSettings}>Workspace settings</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onOpenCommandPalette}>Open command palette</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
