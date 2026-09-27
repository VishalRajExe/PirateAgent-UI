import { notFound } from "next/navigation";
import { getWorkflow, MOCK_ACTIVITY } from "@/lib/mock-data";
import { WorkflowRunView } from "@/components/workflow/workflow-run-view";

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const workflow = getWorkflow(params.id);
  if (!workflow) notFound();

  const log = MOCK_ACTIVITY.filter((a) => a.workflowId === workflow.id).map((a) => ({
    id: a.id,
    text: a.text,
    timestamp: a.timestamp,
  }));

  return (
    <WorkflowRunView
      name={workflow.name}
      prompt={workflow.prompt}
      status={workflow.status}
      progress={workflow.progress}
      stages={workflow.stages}
      recordsFound={workflow.recordsFound}
      validRecords={workflow.validRecords}
      duplicates={workflow.duplicates}
      sourcesProcessed={workflow.sourcesProcessed}
      sourcesTotal={workflow.sourcesTotal}
      log={log.length ? log : [{ id: "l0", text: "Workflow created", timestamp: workflow.createdAt }]}
      datasetId={workflow.datasetId}
    />
  );
}
