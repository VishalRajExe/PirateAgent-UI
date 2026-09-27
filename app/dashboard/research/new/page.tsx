"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlanPreview } from "@/components/research/plan-preview";
import { deriveContractFromPrompt } from "@/lib/mock-data";
import type { DataContract } from "@/lib/types";

type Stage = "input" | "analyzing" | "review";

function NewResearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") ?? "";

  const [prompt, setPrompt] = useState(initialPrompt);
  const [stage, setStage] = useState<Stage>(initialPrompt ? "analyzing" : "input");
  const [name, setName] = useState("");
  const [contract, setContract] = useState<DataContract | null>(null);

  useEffect(() => {
    if (stage !== "analyzing") return;
    const t = setTimeout(() => {
      const result = deriveContractFromPrompt(prompt);
      setName(result.name);
      setContract(result.contract);
      setStage("review");
    }, 1400);
    return () => clearTimeout(t);
  }, [stage, prompt]);

  function analyze() {
    if (!prompt.trim()) return;
    setStage("analyzing");
  }

  function startCollection() {
    if (!contract) return;
    sessionStorage.setItem(
      "pirateagent:new-workflow",
      JSON.stringify({ prompt, name, contract, startedAt: new Date().toISOString() })
    );
    router.push("/dashboard/workflows/live");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </button>

      <AnimatePresence mode="wait">
        {stage === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-xl font-semibold">New research request</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Describe the data you need in plain English.</p>
            <Textarea
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find 200 AI startups in India with founder, website, funding and LinkedIn"
              rows={4}
              className="mt-4 text-[14px]"
            />
            <Button className="mt-4" onClick={analyze}>
              Analyze request <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        )}

        {stage === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center rounded-xl border border-border bg-card py-16 text-center shadow-subtle"
          >
            <div className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary-soft" />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                <Sparkles className="h-4.5 w-4.5 text-primary" />
              </span>
            </div>
            <p className="mt-4 text-[14px] font-medium">Understanding your requirement</p>
            <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">
              Identifying the entity, fields, filters and best sources to collect from.
            </p>
          </motion.div>
        )}

        {stage === "review" && contract && (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-border bg-surface p-3.5">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Your request</p>
                <p className="mt-0.5 text-[13.5px] leading-snug">{prompt}</p>
              </div>
              <button
                onClick={() => setStage("input")}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            <PlanPreview contract={contract} onChange={setContract} />

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setStage("input")}>
                Edit prompt
              </Button>
              <Button onClick={startCollection}>
                Create workflow <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NewResearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <NewResearchInner />
    </Suspense>
  );
}
