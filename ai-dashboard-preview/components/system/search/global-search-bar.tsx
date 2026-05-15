import type { RefObject } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchShortcut } from "@/components/system/search/search-shortcut";

export function GlobalSearchBar({
  value,
  inputRef,
  placeholder = "Search dashboards, workflows, or ask AI...",
  onChange,
  onOpenCommandPalette,
}: {
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder?: string;
  onChange: (value: string) => void;
  onOpenCommandPalette: () => void;
}) {
  return (
    <div className="relative hidden min-w-[320px] flex-1 md:block">
      <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-11 pr-14"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <SearchShortcut onClick={onOpenCommandPalette} />
    </div>
  );
}
