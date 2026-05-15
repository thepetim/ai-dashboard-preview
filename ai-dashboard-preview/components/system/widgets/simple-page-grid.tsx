import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/system/states/dashboard-state";
import { simplePageCards, type PageKey } from "@/lib/dashboard-data";

export function SimplePageGrid({
  page,
  onCardSelect,
}: {
  page: Exclude<PageKey, "command">;
  onCardSelect: (message: string) => void;
}) {
  const config = simplePageCards[page];

  return (
    <section className="space-y-6">
      <Card className="rounded-[28px]">
        <CardHeader>
          <CardTitle className="text-[1.35rem]">{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {config.cards.length ? (
            config.cards.map((card) => (
              <button
                key={card.title}
                type="button"
                className="text-left focus-visible:ring-4 focus-visible:ring-ring"
                onClick={() => onCardSelect(`${card.title} opened.`)}
              >
                <div className="h-full rounded-[24px] border border-border/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#dbe3f8] hover:shadow-[var(--shadow-md)]">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="text-lg font-medium">{card.title}</div>
                    {card.badge ? <Badge variant={card.tone ?? "neutral"}>{card.badge}</Badge> : null}
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{card.body}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="md:col-span-2 xl:col-span-3">
              <EmptyState
                title="No content configured yet"
                description="This workspace section is ready for content, but no panels have been added yet."
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
