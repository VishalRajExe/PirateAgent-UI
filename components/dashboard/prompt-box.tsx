"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EXAMPLE_PROMPTS } from "@/lib/mock-data";

export function PromptBox() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function run(promptOverride?: string) {
    const prompt = promptOverride ?? value;
    if (!prompt.trim()) return;
    router.push(`/dashboard/research/new?prompt=${encodeURIComponent(prompt)}`);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-subtle md:p-8">
      <div className="mb-1 flex items-center gap-2 text-primary">
        <Wand2 className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">New request</span>
      </div>
      <h2 className="text-xl font-semibold md:text-2xl">Tell us what data you need</h2>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
        Describe it in plain English — we&apos;ll plan and run the collection for you.
      </p>

      <div className="mt-5">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Find 200 AI startups in India with founder, website, funding and LinkedIn"
          rows={3}
          className="text-[14px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) run();
          }}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.slice(0, 2).map((p) => (
              <button
                key={p}
                onClick={() => setValue(p)}
                className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p.length > 48 ? p.slice(0, 48) + "…" : p}
              </button>
            ))}
          </div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button onClick={() => run()} size="default">
              Run Research <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
