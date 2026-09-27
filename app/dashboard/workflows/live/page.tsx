"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { WorkflowRunView } from "@/components/workflow/workflow-run-view";
import { useWorkflowSimulation } from "@/hooks/use-workflow-simulation";
import { pickDatasetForEntity } from "@/lib/mock-data";
import type { DataContract } from "@/lib/types";

interface StoredRequest {
  prompt: string;
  name: string;
  contract: DataContract;
}

export default function LiveWorkflowPage() {
  const router = useRouter();
  const [request, setRequest] = useState<StoredRequest | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("pirateagent:new-workflow");
    if (!raw) {
      router.replace("/dashboard/research/new");
      return;
    }
    setRequest(JSON.parse(raw));
    setReady(true);
  }, [router]);

  const sim = useWorkflowSimulation(request?.contract.targetCount ?? 100);

  if (!ready || !request) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const datasetId = pickDatasetForEntity(request.contract.entity);

  return (
    <WorkflowRunView
      name={request.name}
      prompt={request.prompt}
      status={sim.status === "completed" ? "completed" : sim.status === "paused" ? "paused" : "running"}
      progress={sim.progress}
      stages={sim.stages}
      recordsFound={sim.recordsFound}
      validRecords={sim.validRecords}
      duplicates={sim.duplicates}
      sourcesProcessed={sim.sourcesProcessed}
      sourcesTotal={sim.sourcesTotal}
      log={sim.log}
      datasetId={sim.status === "completed" ? datasetId : undefined}
      isLive
      onPause={sim.pause}
      onResume={sim.resume}
    />
  );
}
