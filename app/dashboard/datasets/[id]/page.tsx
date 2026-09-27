"use client";
import { useMemo, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Search, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExportMenu } from "@/components/dataset/export-menu";
import { DataTable, type SortState } from "@/components/dataset/data-table";
import { SourceDrawer } from "@/components/dataset/source-drawer";
import { EmptyState } from "@/components/common/empty-state";
import { getDataset, getSourcesFor } from "@/lib/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";
import type { DatasetRow } from "@/lib/types";

const PAGE_SIZE = 5;

export default function DatasetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const dataset = getDataset(params.id);
  if (!dataset) notFound();

  const [query, setQuery] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortState>({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);
  const [activeRow, setActiveRow] = useState<DatasetRow | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let rows = dataset.rows.filter((r) =>
      query ? Object.values(r.data).some((v) => String(v).toLowerCase().includes(query.toLowerCase())) : true
    );
    if (confidenceFilter === "high") rows = rows.filter((r) => r.confidence >= 85);
    if (confidenceFilter === "medium") rows = rows.filter((r) => r.confidence >= 70 && r.confidence < 85);
    if (confidenceFilter === "low") rows = rows.filter((r) => r.confidence < 70);

    if (sort.key) {
      rows = [...rows].sort((a, b) => {
        const av = String(a.data[sort.key as string] ?? "");
        const bv = String(b.data[sort.key as string] ?? "");
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }, [dataset.rows, query, confidenceFilter, sort]);

  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelected((prev) => {
      const allSelected = pageRows.every((r) => prev.has(r.id));
      const next = new Set(prev);
      pageRows.forEach((r) => (allSelected ? next.delete(r.id) : next.add(r.id)));
      return next;
    });
  }
  function handleSort(key: string) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }
  function openRow(row: DatasetRow) {
    setActiveRow(row);
    setDrawerOpen(true);
  }

  const selectedRows = dataset.rows.filter((r) => selected.has(r.id));
  const exportRows = selectedRows.length > 0 ? selectedRows : filtered;

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/dashboard/datasets")}
        className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All datasets
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold">{dataset.name}</h1>
            <Badge variant={dataset.status === "ready" ? "success" : "warning"}>{dataset.status === "ready" ? "Ready" : "Partial"}</Badge>
          </div>
          <p className="mt-1 max-w-xl text-[13px] text-muted-foreground">{dataset.description}</p>
        </div>
        <ExportMenu rows={exportRows} name={dataset.name} count={selectedRows.length} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3.5">
            <p className="text-lg font-semibold leading-none">{formatNumber(dataset.recordCount)}</p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3.5">
            <p className="text-lg font-semibold leading-none">{dataset.sourceCount}</p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">Sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3.5">
            <p className="text-lg font-semibold leading-none">{formatDate(dataset.updatedAt)}</p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">Last updated</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative w-full max-w-[240px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search records…"
            className="h-8 pl-8 text-[13px]"
          />
        </div>
        <select
          value={confidenceFilter}
          onChange={(e) => {
            setConfidenceFilter(e.target.value as typeof confidenceFilter);
            setPage(1);
          }}
          className="h-8 rounded-md border border-input bg-card px-2.5 text-[13px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All confidence</option>
          <option value="high">High (85%+)</option>
          <option value="medium">Medium (70–84%)</option>
          <option value="low">Low (&lt;70%)</option>
        </select>
      </div>

      {dataset.rows.length === 0 ? (
        <EmptyState icon={Database} title="No records yet" description="This dataset hasn't finished collecting records." />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Search} title="No matching records" description="Try a different search term or filter." />
      ) : (
        <DataTable
          fields={dataset.fields}
          rows={pageRows}
          page={page}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          selected={selected}
          sort={sort}
          onSort={handleSort}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          onOpenRow={openRow}
          onPageChange={setPage}
        />
      )}

      <SourceDrawer
        row={activeRow}
        sources={activeRow ? getSourcesFor(activeRow.sourceIds) : []}
        fields={dataset.fields}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
