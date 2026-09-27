import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { formatRelativeTime, formatNumber } from "@/lib/utils";
import type { Dataset } from "@/lib/types";

export function RecentDatasets({ datasets }: { datasets: Dataset[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent datasets</CardTitle>
        <Link href="/dashboard/datasets" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {datasets.length === 0 ? (
          <EmptyState icon={Database} title="No datasets yet" description="Datasets appear here once a workflow completes." />
        ) : (
          datasets.map((d) => (
            <Link
              key={d.id}
              href={`/dashboard/datasets/${d.id}`}
              className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{d.name}</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  {formatNumber(d.recordCount)} records · {d.sourceCount} sources
                </p>
              </div>
              <span className="shrink-0 text-[12px] text-muted-foreground">{formatRelativeTime(d.updatedAt)}</span>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
