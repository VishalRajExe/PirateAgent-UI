"use client";
import { FileText, CheckCircle2, Copy, Globe2 } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { formatNumber } from "@/lib/utils";

export function LiveStats({
  recordsFound,
  validRecords,
  duplicates,
  sourcesProcessed,
  sourcesTotal,
}: {
  recordsFound: number;
  validRecords: number;
  duplicates: number;
  sourcesProcessed: number;
  sourcesTotal: number;
}) {
  const tiles = [
    { icon: FileText, label: "Records found", value: useCountUp(recordsFound), tone: "text-foreground" },
    { icon: CheckCircle2, label: "Valid records", value: useCountUp(validRecords), tone: "text-success" },
    { icon: Copy, label: "Duplicates removed", value: useCountUp(duplicates), tone: "text-warning" },
    { icon: Globe2, label: "Sources processed", value: useCountUp(sourcesProcessed), tone: "text-info", suffix: `/${sourcesTotal}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-lg border border-border bg-surface p-3.5">
          <t.icon className={`h-3.5 w-3.5 ${t.tone}`} />
          <p className={`mt-2 text-lg font-semibold leading-none ${t.tone}`}>
            {formatNumber(t.value)}
            {t.suffix ?? ""}
          </p>
          <p className="mt-1 text-[11.5px] text-muted-foreground">{t.label}</p>
        </div>
      ))}
    </div>
  );
}
