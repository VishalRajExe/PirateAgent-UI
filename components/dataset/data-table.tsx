"use client";
import { ArrowUpDown, ChevronLeft, ChevronRight, Globe2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DataField, DatasetRow } from "@/lib/types";

export interface SortState {
  key: string | null;
  dir: "asc" | "desc";
}

export function DataTable({
  fields,
  rows,
  page,
  pageSize,
  total,
  selected,
  sort,
  onSort,
  onToggleRow,
  onToggleAll,
  onOpenRow,
  onPageChange,
}: {
  fields: DataField[];
  rows: DatasetRow[];
  page: number;
  pageSize: number;
  total: number;
  selected: Set<string>;
  sort: SortState;
  onSort: (key: string) => void;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  onOpenRow: (row: DatasetRow) => void;
  onPageChange: (page: number) => void;
}) {
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-surface">
            <tr>
              <th className="w-10 px-3 py-2.5">
                <Checkbox checked={allChecked} onCheckedChange={onToggleAll} />
              </th>
              {fields.map((f) => (
                <th key={f.name} className="whitespace-nowrap px-3 py-2.5">
                  <button
                    onClick={() => onSort(f.name)}
                    className="flex items-center gap-1 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {f.name}
                    <ArrowUpDown className={cn("h-3 w-3", sort.key === f.name && "text-primary")} />
                  </button>
                </th>
              ))}
              <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Confidence</th>
              <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Sources</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-t border-border transition-colors hover:bg-muted/60"
                onClick={() => onOpenRow(row)}
              >
                <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={selected.has(row.id)} onCheckedChange={() => onToggleRow(row.id)} />
                </td>
                {fields.map((f) => (
                  <td key={f.name} className="max-w-[200px] truncate px-3 py-2.5">
                    {f.type === "url" ? (
                      <span className="text-primary">{String(row.data[f.name] ?? "—")}</span>
                    ) : (
                      String(row.data[f.name] ?? "—")
                    )}
                  </td>
                ))}
                <td className="px-3 py-2.5">
                  <Badge variant={row.confidence >= 85 ? "success" : row.confidence >= 70 ? "warning" : "danger"}>
                    {row.confidence}%
                  </Badge>
                </td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                    <Globe2 className="h-3 w-3" /> {row.sourceIds.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
        <p className="text-[12px] text-muted-foreground">
          Page {page} of {totalPages} · {total} records
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
