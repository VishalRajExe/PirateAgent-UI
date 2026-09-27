"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Target, ListChecks, Filter, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { STAGE_TEMPLATE } from "@/lib/mock-data";
import type { DataContract } from "@/lib/types";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" as const } }),
};

export function PlanPreview({
  contract,
  onChange,
}: {
  contract: DataContract;
  onChange: (c: DataContract) => void;
}) {
  const [fieldDraft, setFieldDraft] = useState("");

  function removeField(name: string) {
    onChange({ ...contract, fields: contract.fields.filter((f) => f.name !== name) });
  }
  function addField() {
    const name = fieldDraft.trim();
    if (!name) return;
    onChange({ ...contract, fields: [...contract.fields, { name, type: "text", required: false }] });
    setFieldDraft("");
  }
  function removeFilter(f: string) {
    onChange({ ...contract, filters: contract.filters.filter((x) => x !== f) });
  }

  return (
    <div className="space-y-4">
      <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
        <Card>
          <CardContent className="p-5">
            <SectionLabel icon={Target} text="Detected objective" />
            <p className="mt-2 text-[14px] font-medium">
              Collect a dataset of <span className="text-primary">{contract.entity}</span> records
              {contract.targetCount ? <> — target of <span className="text-primary">{contract.targetCount}</span></> : null}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
        <Card>
          <CardContent className="p-5">
            <SectionLabel icon={ListChecks} text="Fields to collect" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {contract.fields.map((f) => (
                <span
                  key={f.name}
                  className="group flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[12.5px]"
                >
                  {f.name}
                  <button onClick={() => removeField(f.name)} className="text-muted-foreground/60 hover:text-danger transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-1">
                <Input
                  value={fieldDraft}
                  onChange={(e) => setFieldDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addField()}
                  placeholder="add field"
                  className="h-7 w-24 rounded-full px-2.5 text-[12.5px]"
                />
                <button onClick={addField} className="rounded-full bg-muted p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show">
        <Card>
          <CardContent className="p-5">
            <SectionLabel icon={Filter} text="Filters & constraints" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {contract.filters.length === 0 && <p className="text-[13px] text-muted-foreground">No specific filters detected.</p>}
              {contract.filters.map((f) => (
                <span key={f} className="flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[12.5px] text-accent-foreground">
                  {f}
                  <button onClick={() => removeFilter(f)} className="text-accent-foreground/50 hover:text-danger transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show">
        <Card>
          <CardContent className="p-5">
            <SectionLabel icon={Globe2} text="Source types" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {contract.sourceTypes.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show">
        <Card>
          <CardContent className="p-5">
            <SectionLabel icon={ListChecks} text="Workflow steps" />
            <ol className="mt-3 space-y-2">
              {STAGE_TEMPLATE.map((s, i) => (
                <li key={s.key} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-medium")}>
                    {i + 1}
                  </span>
                  {s.label}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function SectionLabel({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-xs font-semibold uppercase tracking-wide">{text}</span>
    </div>
  );
}
