"use client";
import { useRouter } from "next/navigation";
import { Eye, RotateCcw, History as HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { MOCK_WORKFLOWS } from "@/lib/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";

function formatDuration(sec?: number) {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

export default function HistoryPage() {
  const router = useRouter();
  const past = MOCK_WORKFLOWS.filter((w) => w.status !== "running" && w.status !== "planning");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">History</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Every past research request and its outcome.</p>
      </div>

      {past.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="No history yet" description="Completed and failed workflows will appear here." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface">
              <tr>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Workflow</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Records</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Sources</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Duration</th>
                <th className="px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {past.map((w) => (
                <tr key={w.id} className="border-t border-border transition-colors hover:bg-muted/60">
                  <td className="px-3 py-2.5">
                    <p className="max-w-[240px] truncate font-medium">{w.name}</p>
                    <p className="max-w-[240px] truncate text-[12px] text-muted-foreground">{w.prompt}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="px-3 py-2.5">{formatNumber(w.validRecords)}</td>
                  <td className="px-3 py-2.5">{w.sourcesProcessed}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{formatDuration(w.durationSec)}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{formatDate(w.createdAt)}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex justify-end gap-1.5">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.push(`/dashboard/workflows/${w.id}`)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.push(`/dashboard/research/new?prompt=${encodeURIComponent(w.prompt)}`)}>
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
