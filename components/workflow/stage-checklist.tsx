"use client";
import { motion } from "framer-motion";
import { Check, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StageState } from "@/lib/types";

export function StageChecklist({ stages }: { stages: StageState[] }) {
  return (
    <ol className="space-y-0.5">
      {stages.map((s, i) => (
        <li key={s.key} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <StageIcon status={s.status} />
            {i < stages.length - 1 && (
              <span className={cn("mt-0.5 h-6 w-px", s.status === "done" ? "bg-success/40" : "bg-border")} />
            )}
          </div>
          <span
            className={cn(
              "pb-4 text-[13px] leading-[22px] transition-colors",
              s.status === "done" && "text-foreground",
              s.status === "active" && "font-medium text-foreground",
              s.status === "pending" && "text-muted-foreground",
              s.status === "error" && "text-danger"
            )}
          >
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function StageIcon({ status }: { status: StageState["status"] }) {
  if (status === "done") {
    return (
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white"
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </motion.span>
    );
  }
  if (status === "active") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-info-soft text-info">
        <Loader2 className="h-3 w-3 animate-spin" strokeWidth={3} />
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft text-danger">
        <XCircle className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span className="h-5 w-5 rounded-full border-2 border-border" />;
}
