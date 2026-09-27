import Link from "next/link";
import { ArrowRight, Workflow as WorkflowIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { formatRelativeTime, formatNumber } from "@/lib/utils";
import type { Workflow } from "@/lib/types";

export function RecentWorkflows({ workflows }: { workflows: Workflow[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent workflows</CardTitle>
        <Link href="/dashboard/workflows" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {workflows.length === 0 ? (
          <EmptyState icon={WorkflowIcon} title="No workflows yet" description="Start a new research request to see it here." />
        ) : (
          workflows.map((w) => (
            <Link
              key={w.id}
              href={`/dashboard/workflows/${w.id}`}
              className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{w.name}</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  {formatNumber(w.validRecords)} records · {formatRelativeTime(w.updatedAt)}
                </p>
              </div>
              <StatusBadge status={w.status} />
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
