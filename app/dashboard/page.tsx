"use client";
import { motion } from "framer-motion";
import { Workflow, Loader2, Database, Globe2 } from "lucide-react";
import { PromptBox } from "@/components/dashboard/prompt-box";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentWorkflows } from "@/components/dashboard/recent-workflows";
import { RecentDatasets } from "@/components/dashboard/recent-datasets";
import { MOCK_WORKFLOWS, MOCK_DATASETS } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function DashboardPage() {
  const running = MOCK_WORKFLOWS.filter((w) => w.status === "running" || w.status === "planning").length;
  const totalRecords = MOCK_DATASETS.reduce((sum, d) => sum + d.recordCount, 0);
  const totalSources = MOCK_DATASETS.reduce((sum, d) => sum + d.sourceCount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <PromptBox />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Workflow} label="Total workflows" value={formatNumber(MOCK_WORKFLOWS.length)} tone="primary" />
        <StatCard icon={Loader2} label="Running now" value={formatNumber(running)} tone="warning" />
        <StatCard icon={Database} label="Records collected" value={formatNumber(totalRecords)} tone="success" />
        <StatCard icon={Globe2} label="Sources used" value={formatNumber(totalSources)} />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentWorkflows workflows={MOCK_WORKFLOWS.slice(0, 4)} />
        <RecentDatasets datasets={MOCK_DATASETS} />
      </motion.div>
    </motion.div>
  );
}
