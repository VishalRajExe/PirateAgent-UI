"use client";
import { useState } from "react";
import { Search, Globe2, ExternalLink, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/common/empty-state";
import { MOCK_SOURCES, MOCK_DATASET_ROWS } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import type { SourceRecord } from "@/lib/types";

const RELIABILITY_ICON = { high: ShieldCheck, medium: ShieldAlert, low: ShieldX } as const;
const RELIABILITY_TONE = { high: "text-success", medium: "text-warning", low: "text-danger" } as const;

export default function SourcesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<SourceRecord | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = MOCK_SOURCES.filter(
    (s) => s.domain.toLowerCase().includes(query.toLowerCase()) || s.title.toLowerCase().includes(query.toLowerCase())
  );

  function openSource(s: SourceRecord) {
    setActive(s);
    setOpen(true);
  }

  const relatedRows = active ? MOCK_DATASET_ROWS.filter((r) => r.sourceIds.includes(active.id)) : [];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Sources</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Every page workflows have visited, and what they contributed.</p>
      </div>

      <div className="relative w-full max-w-[260px]">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sources…" className="h-8 pl-8 text-[13px]" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Globe2} title="No sources found" description="Try a different search term." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface">
              <tr>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Source</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Records</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Reliability</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Last visited</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const RelIcon = RELIABILITY_ICON[s.reliability];
                return (
                  <tr key={s.id} onClick={() => openSource(s)} className="cursor-pointer border-t border-border transition-colors hover:bg-muted/60">
                    <td className="px-3 py-2.5">
                      <p className="max-w-[260px] truncate font-medium">{s.title}</p>
                      <p className="max-w-[260px] truncate text-[12px] text-muted-foreground">{s.domain}</p>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{s.type}</td>
                    <td className="px-3 py-2.5">{s.recordsContributed}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={s.status === "accepted" ? "success" : "default"}>{s.status === "accepted" ? "Accepted" : "Skipped"}</Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <RelIcon className={`h-4 w-4 ${RELIABILITY_TONE[s.reliability]}`} />
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{formatRelativeTime(s.retrievedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        {active && (
          <SheetContent>
            <div className="p-6">
              <SheetTitle>{active.title}</SheetTitle>
              <a
                href={`https://${active.domain}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center gap-1.5 text-[13px] text-primary hover:underline"
              >
                {active.url} <ExternalLink className="h-3 w-3" />
              </a>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant={active.status === "accepted" ? "success" : "default"}>{active.status === "accepted" ? "Accepted" : "Skipped"}</Badge>
                <Badge variant="outline">{active.type}</Badge>
                <Badge variant="outline" className="capitalize">
                  {active.reliability} reliability
                </Badge>
              </div>

              {active.status === "skipped" && active.reason && (
                <div className="mt-4 rounded-lg bg-warning-soft p-3 text-[12.5px] text-warning">{active.reason}</div>
              )}

              <Separator className="my-5" />

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Page summary</p>
              <p className="text-[13px] text-foreground/85">{active.snippet}</p>

              {relatedRows.length > 0 && (
                <>
                  <Separator className="my-5" />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Records from this source ({relatedRows.length})
                  </p>
                  <div className="space-y-2">
                    {relatedRows.map((r) => (
                      <div key={r.id} className="rounded-md border border-border px-3 py-2 text-[13px]">
                        {String(Object.values(r.data)[0])}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}
