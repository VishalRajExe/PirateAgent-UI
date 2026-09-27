"use client";
import Link from "next/link";
import { Play, Globe2, Download, CheckCircle2, Copy, Database, FileOutput, Activity as ActivityIcon } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { MOCK_ACTIVITY } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { ActivityItem } from "@/lib/types";

const ICON_MAP: Record<ActivityItem["icon"], React.ElementType> = {
  start: Play,
  source: Globe2,
  collect: Download,
  validate: CheckCircle2,
  dedupe: Copy,
  dataset: Database,
  export: FileOutput,
};

const TONE_MAP: Record<ActivityItem["icon"], string> = {
  start: "bg-info-soft text-info",
  source: "bg-muted text-muted-foreground",
  collect: "bg-primary-soft text-primary",
  validate: "bg-success-soft text-success",
  dedupe: "bg-warning-soft text-warning",
  dataset: "bg-success-soft text-success",
  export: "bg-primary-soft text-primary",
};

export default function ActivityPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Activity</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">A live feed of everything happening across your workflows.</p>
      </div>

      {MOCK_ACTIVITY.length === 0 ? (
        <EmptyState icon={ActivityIcon} title="No activity yet" description="Actions across your workflows will show up here." />
      ) : (
        <ol className="space-y-0.5">
          {MOCK_ACTIVITY.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            const content = (
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", TONE_MAP[item.icon])}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {i < MOCK_ACTIVITY.length - 1 && <span className="mt-0.5 h-full w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-5">
                  <p className="text-[13px] text-foreground/90">{item.text}</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{formatRelativeTime(item.timestamp)}</p>
                </div>
              </div>
            );
            return (
              <li key={item.id}>
                {item.workflowId ? (
                  <Link href={`/dashboard/workflows/${item.workflowId}`} className="block rounded-md transition-colors hover:bg-muted/60">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
