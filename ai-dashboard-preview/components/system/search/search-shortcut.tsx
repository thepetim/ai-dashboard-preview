export function SearchShortcut({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-white px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
    >
      ⌘K
    </button>
  );
}
