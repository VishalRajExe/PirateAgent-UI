"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Workflow as WorkflowIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { Progress } from "@/components/ui/progress";
import { MOCK_WORKFLOWS } from "@/lib/mock-data";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import type { WorkflowStatus } from "@/lib/types";
import { useRouter } from "next/navigation";

const FILTERS: { key: "all" | WorkflowStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "running", label: "Running" },
  { key: "completed", label: "Completed" },
  { key: "failed", label: "Failed" },
];

export default function WorkflowsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | WorkflowStatus>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return MOCK_WORKFLOWS.filter((w) => {
      const matchesFilter = filter === "all" || w.status === filter;
      const matchesQuery = w.name.toLowerCase().includes(query.toLowerCase()) || w.prompt.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Workflows</h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">Collection tasks you&apos;ve created and their live status.</p>
        </div>
        <Button size="sm" onClick={() => router.push("/dashboard/research/new")}>
          <Plus className="h-3.5 w-3.5" /> New research
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            {FILTERS.map((f) => (
              <TabsTrigger key={f.key} value={f.key}>
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full max-w-[220px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workflows…" className="h-8 pl-8 text-[13px]" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={WorkflowIcon} title="No workflows found" description="Try a different filter or start a new research request." />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link href={w.status === "running" ? "/dashboard/workflows/live" : `/dashboard/workflows/${w.id}`}>
                <Card className="h-full transition-shadow hover:shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13.5px] font-medium leading-snug">{w.name}</p>
                      <StatusBadge status={w.status} />
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[12.5px] text-muted-foreground">{w.prompt}</p>
                    <div className="mt-3">
                      <Progress value={w.progress} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[12px] text-muted-foreground">
                      <span>{formatNumber(w.validRecords)} valid records</span>
                      <span>{formatRelativeTime(w.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
