import { ArrowUpDown, Cpu, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
  DashboardTableToolbar,
} from "@/components/system/data/dashboard-table";
import { AnalyticsBlock } from "@/components/system/analytics/analytics-block";
import { ErrorState, NoDataState, SuccessState } from "@/components/system/states/dashboard-state";
import {
  formatCurrency,
  formatNumber,
  modelColumnLabels,
  type TableColumn,
  type TableRow,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { StatsChip } from "@/components/system/cards/metric-widget";

export function ModelUsageTableWidget({
  rows,
  selectedRows,
  selectedRowId,
  visibleColumns,
  tableTab,
  allRowsSelected,
  sortColumn,
  sortDirection,
  selectedRow,
  onToggleAllRows,
  onToggleRow,
  onSelectRow,
  onSort,
  onVisibleColumnChange,
  onTableTabChange,
}: {
  rows: TableRow[];
  selectedRows: string[];
  selectedRowId: string;
  visibleColumns: Record<TableColumn, boolean>;
  tableTab: string;
  allRowsSelected: boolean;
  sortColumn: TableColumn;
  sortDirection: "asc" | "desc";
  selectedRow: TableRow | null;
  onToggleAllRows: (checked: boolean | "indeterminate") => void;
  onToggleRow: (rowId: string, checked: boolean | "indeterminate") => void;
  onSelectRow: (rowId: string) => void;
  onSort: (column: TableColumn) => void;
  onVisibleColumnChange: (column: TableColumn, value: boolean) => void;
  onTableTabChange: (value: string) => void;
}) {
  return (
    <section className="grid gap-5 2xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.55fr)]">
      <AnalyticsBlock
        title="Model usage statistics"
        description="Production throughput, reliability, and spend across active model tiers."
        className="overflow-hidden"
        contentClassName="p-0"
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="subtle">
                  <Gauge className="h-4 w-4" />
                  Customize columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(Object.keys(modelColumnLabels) as TableColumn[]).map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column}
                    checked={visibleColumns[column]}
                    onCheckedChange={(value) => onVisibleColumnChange(column, Boolean(value))}
                  >
                    {modelColumnLabels[column]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">Export</Button>
          </>
        }
      >
          <Tabs value={tableTab} onValueChange={onTableTabChange} className="gap-0">
            <DashboardTableToolbar>
              <TabsList>
                <TabsTrigger value="models">Models</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
            </DashboardTableToolbar>
            <TabsContent value="models" className="mt-5">
              {rows.length ? (
                <DashboardTable>
                  <DashboardTableHeader>
                    <tr>
                      <DashboardTableHead className="w-14 px-4 py-4">
                          <Checkbox checked={allRowsSelected} onCheckedChange={onToggleAllRows} aria-label="Select all rows" />
                      </DashboardTableHead>
                        {(Object.keys(modelColumnLabels) as TableColumn[])
                          .filter((column) => visibleColumns[column])
                          .map((column) => (
                            <DashboardTableHead key={column}>
                            <button
                              type="button"
                              onClick={() => onSort(column)}
                              className="type-label inline-flex items-center gap-2 rounded-full text-muted-foreground focus-visible:ring-4 focus-visible:ring-ring"
                            >
                                {modelColumnLabels[column]}
                                <ArrowUpDown className={cn("h-3.5 w-3.5", sortColumn === column && "text-foreground")} />
                                {sortColumn === column ? <span className="sr-only">Sorted {sortDirection}</span> : null}
                              </button>
                            </DashboardTableHead>
                          ))}
                    </tr>
                  </DashboardTableHeader>
                  <DashboardTableBody>
                      {rows.map((row) => (
                        <DashboardTableRow
                          key={row.id}
                          className={cn(
                            selectedRowId === row.id && "bg-[#f7f9ff]"
                          )}
                        >
                          <DashboardTableCell className="px-4 py-5">
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={(checked) => onToggleRow(row.id, checked)}
                              aria-label={`Select ${row.model}`}
                            />
                          </DashboardTableCell>
                          {visibleColumns.model ? (
                            <DashboardTableCell>
                              <button
                                type="button"
                                onClick={() => onSelectRow(row.id)}
                                className="flex items-center gap-3 rounded-2xl p-1 text-left focus-visible:ring-4 focus-visible:ring-ring"
                              >
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                  <Cpu className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-[0.9375rem] font-medium tracking-[-0.015em]">{row.model}</div>
                              </button>
                            </DashboardTableCell>
                          ) : null}
                          {visibleColumns.requests ? <DashboardTableCell className="type-body-compact text-muted-foreground">{formatNumber(row.requests)}</DashboardTableCell> : null}
                          {visibleColumns.latencyMs ? <DashboardTableCell className="type-body-compact text-muted-foreground">{row.latencyMs}ms</DashboardTableCell> : null}
                          {visibleColumns.costUsd ? <DashboardTableCell className="type-body-compact text-muted-foreground">{formatCurrency(row.costUsd)}</DashboardTableCell> : null}
                          {visibleColumns.successRate ? (
                            <DashboardTableCell>
                              <Badge variant={row.status === "Watch" ? "warning" : "success"}>{row.successRate}%</Badge>
                            </DashboardTableCell>
                          ) : null}
                        </DashboardTableRow>
                      ))}
                  </DashboardTableBody>
                </DashboardTable>
              ) : (
                <NoDataState
                  className="mx-6 mb-5 min-h-0"
                  title="No model rows match the current filters"
                  description="Try a broader search query or re-enable a hidden column to bring rows back into view."
                />
              )}
            </TabsContent>
            <TabsContent value="teams" className="mt-5">
              <SuccessState
                className="mx-6 mb-5 min-h-0"
                title="Team usage rollups are healthy"
                description="Department-level spend and quality remain within target ranges. The next release can expose drill-down ownership views here."
              />
            </TabsContent>
            <TabsContent value="alerts" className="mt-5">
              <ErrorState
                className="mx-6 mb-5 min-h-0"
                title="Alert stream temporarily unavailable"
                description="Recent anomaly events are still being synchronized. Keep the current view open and retry shortly to restore latency and spend alerts."
              />
            </TabsContent>
          </Tabs>
      </AnalyticsBlock>

      <AnalyticsBlock
        title="Row detail"
        description="Interactive detail panel for the selected model row."
        contentClassName="space-y-4"
      >
          {selectedRow ? (
            <>
              <div className="rounded-[22px] border border-border/80 bg-muted/50 p-4">
                <div className="type-card-title">{selectedRow.model}</div>
                <div className="type-body-compact mt-2 text-muted-foreground">
                  {formatNumber(selectedRow.requests)} requests · {selectedRow.latencyMs}ms median latency
                </div>
              </div>
              <StatsChip label="Spend" value={formatCurrency(selectedRow.costUsd)} />
              <StatsChip label="Success rate" value={`${selectedRow.successRate}%`} />
              <StatsChip label="Status" value={selectedRow.status} />
            </>
          ) : (
            <NoDataState
              className="min-h-0"
              title="No row selected"
              description="Select a model from the table to inspect spend, reliability, and throughput details."
            />
          )}
      </AnalyticsBlock>
    </section>
  );
}
