import { motion } from "motion/react";
import {
  Puzzle,
  Crosshair,
  Download,
  ListChecks,
  Layers,
  Play,
  CheckCircle2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

// Small reusable window frame for stage visuals
function Frame({ label, children }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-[6px] border border-line bg-surface shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2 font-mono text-[9px] uppercase tracking-meta text-ink-faint">
        <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
        {label}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export const StageIcons = [Puzzle, Crosshair, Download, ListChecks, Layers, Play];

// 1 — Chrome Extension capturing on a page
export function ExtensionVisual({ active }) {
  return (
    <Frame label="any-web-app.com">
      <div className="relative">
        <div className="space-y-2">
          <div className="h-6 w-24 rounded-[3px] border border-line bg-void/50" />
          <div className="h-8 w-full rounded-[3px] border border-line bg-void/50" />
          <motion.div
            className="relative h-8 w-full rounded-[3px] border bg-void/50"
            animate={{
              borderColor: active ? "#D2A15E" : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="absolute inset-0 rounded-[3px] bg-signal-dim"
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <div className="h-8 w-20 rounded-[3px] bg-line" />
        </div>
        {/* extension chip */}
        <motion.div
          className="absolute -right-3 -top-3 flex items-center gap-1.5 rounded-[3px] border border-signal/50 bg-void px-2 py-1 font-mono text-[9px] uppercase tracking-meta text-signal"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: active ? 1 : 0.4, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Puzzle size={11} strokeWidth={1.75} /> Test Mind
        </motion.div>
      </div>
    </Frame>
  );
}

// 2 — Crosshair capturing XPath
export function CaptureVisual({ active }) {
  return (
    <Frame label="capture · element">
      <div className="relative flex h-28 items-center justify-center">
        <div className="h-10 w-40 rounded-[3px] border border-signal bg-signal-dim" />
        <motion.div
          className="absolute"
          initial={{ x: 60, y: -30, opacity: 0 }}
          animate={active ? { x: 0, y: 0, opacity: 1 } : { x: 60, y: -30, opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Crosshair size={26} strokeWidth={1.25} className="text-signal" />
        </motion.div>
      </div>
      <motion.div
        className="mt-1 truncate rounded-[3px] bg-void px-2 py-1.5 font-mono text-[10px] text-data"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {'//div[@id="login"]'}
      </motion.div>
    </Frame>
  );
}

// 3 — Import rows landing in dashboard
export function ImportVisual({ active }) {
  const rows = ['//input[@id="email"]', '//input[@id="pass"]', '//button[submit]'];
  return (
    <Frame label="testmind.app · elements">
      <div className="flex items-center gap-2 pb-2 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
        <Download size={12} strokeWidth={1.75} className="text-signal" /> Imported
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-[3px] border border-line bg-void/40 px-2 py-1.5"
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 30 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
          >
            <span className="font-mono text-[9px] text-ink-faint">EL{i + 1}</span>
            <span className="truncate font-mono text-[9px] text-data">{r}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 4 — Test case assembling
export function CaseVisual({ active }) {
  const steps = ["Open page", "Type email", "Type password", "Click submit"];
  return (
    <Frame label="test case · login">
      <div className="flex items-center gap-2 pb-2 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
        <ListChecks size={12} strokeWidth={1.75} className="text-signal" /> Steps
      </div>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-[3px] border border-line bg-void/40 px-2 py-1.5 font-mono text-[10px] text-ink"
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 10 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
          >
            <span className="text-ink-faint">{i + 1}</span>
            {s}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 5 — Suite stacking cases
export function SuiteVisual({ active }) {
  const cases = ["Login", "Signup", "Reset password", "Checkout"];
  return (
    <Frame label="suite · auth-flow">
      <div className="flex items-center gap-2 pb-2 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
        <Layers size={12} strokeWidth={1.75} className="text-signal" /> Test cases
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {cases.map((c, i) => (
          <motion.div
            key={i}
            className="rounded-[3px] border border-line bg-void/40 px-2 py-2 font-mono text-[10px] text-ink"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.9 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
          >
            {c}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 6 — Execution ticking green
export function ExecuteVisual({ active }) {
  const results = ["Login", "Signup", "Reset password", "Checkout"];
  return (
    <Frame label="run · results">
      <div className="flex items-center justify-between pb-2">
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-meta text-ink-dim">
          <Play size={12} strokeWidth={1.75} className="text-signal" /> Executing
        </span>
        <motion.span
          className="font-mono text-[10px] uppercase tracking-meta text-signal"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.2 }}
          transition={{ delay: 0.8 }}
        >
          4 / 4 passed
        </motion.span>
      </div>
      <div className="space-y-1.5">
        {results.map((r, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between rounded-[3px] border border-line bg-void/40 px-2 py-1.5 font-mono text-[10px] text-ink"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: active ? 1 : 0.2 }}
            transition={{ duration: 0.3, delay: i * 0.18 }}
          >
            {r}
            <motion.span
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.18, ease: EASE }}
            >
              <CheckCircle2 size={13} strokeWidth={1.75} className="text-signal" />
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export const STAGE_VISUALS = [
  ExtensionVisual,
  CaptureVisual,
  ImportVisual,
  CaseVisual,
  SuiteVisual,
  ExecuteVisual,
];
