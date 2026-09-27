import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, XCircle, PauseCircle, Circle } from "lucide-react";
import type { WorkflowStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const CONFIG: Record<WorkflowStatus, { label: string; variant: "success" | "info" | "danger" | "warning" | "default"; icon: React.ElementType; spin?: boolean }> = {
  completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
  running: { label: "Running", variant: "info", icon: Loader2, spin: true },
  planning: { label: "Planning", variant: "info", icon: Loader2, spin: true },
  failed: { label: "Failed", variant: "danger", icon: XCircle },
  paused: { label: "Paused", variant: "warning", icon: PauseCircle },
};

export function StatusBadge({ status, className }: { status: WorkflowStatus; className?: string }) {
  const c = CONFIG[status] ?? { label: status, variant: "default" as const, icon: Circle };
  const Icon = c.icon;
  return (
    <Badge variant={c.variant} className={cn(className)}>
      <Icon className={cn("h-3 w-3", c.spin && "animate-spin")} />
      {c.label}
    </Badge>
  );
}
