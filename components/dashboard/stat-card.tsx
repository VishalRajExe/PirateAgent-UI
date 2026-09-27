import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "default" | "primary" | "success" | "warning";
}) {
  const toneMap = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
  } as const;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-subtle">
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md", toneMap[tone])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold leading-tight">{value}</p>
        <p className="truncate text-[12px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
