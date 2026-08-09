import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MousePointerClick, CheckCircle2, Play } from "lucide-react";
import BrowserChrome from "./BrowserChrome";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  { id: "S1", label: "Open login page", sel: '//input[@id="email"]' },
  { id: "S2", label: "Type credentials", sel: '//input[@id="password"]' },
  { id: "S3", label: "Click submit", sel: '//button[@type="submit"]' },
  { id: "S4", label: "Assert dashboard", sel: '//h1[text()="Home"]' },
];

export default function TestMindMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref}>
      <BrowserChrome url="testmind.app / suite / auth-flow">
        <div className="grid grid-cols-[1fr_150px] text-ink">
          {/* Test case builder */}
          <div className="min-w-0 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-meta text-ink-dim">
                <MousePointerClick size={12} strokeWidth={1.75} className="text-signal" />
                Test case · Login
              </div>
              <div className="flex items-center gap-1 rounded-[3px] bg-signal px-2 py-1 font-mono text-[9px] uppercase tracking-meta text-void">
                <Play size={9} strokeWidth={2} /> Run
              </div>
            </div>

            <div className="space-y-1.5">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="flex items-center gap-2 rounded-[3px] border border-line bg-void/40 px-2.5 py-2"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.1 }}
                >
                  <span className="font-mono text-[9px] tracking-meta text-ink-faint">
                    {s.id}
                  </span>
                  <span className="w-24 flex-none truncate font-mono text-[10px] text-ink">
                    {s.label}
                  </span>
                  <span className="min-w-0 flex-1 truncate rounded-[2px] bg-void px-1.5 py-0.5 font-mono text-[9px] text-data">
                    {s.sel}
                  </span>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.5 + i * 0.15 }}
                  >
                    <CheckCircle2 size={13} strokeWidth={1.75} className="text-signal" />
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* run status */}
            <motion.div
              className="mt-3 flex items-center justify-between rounded-[3px] border border-signal/30 bg-signal-dim px-3 py-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-meta text-signal">
                4 / 4 passed
              </span>
              <span className="font-mono text-[9px] tracking-meta text-ink-dim">1.8s</span>
            </motion.div>
          </div>

          {/* Suite sidebar */}
          <div className="border-l border-line p-3">
            <div className="font-mono text-[9px] uppercase tracking-meta text-ink-dim">
              Suite
            </div>
            <div className="mt-2 space-y-1">
              {["Login", "Signup", "Reset PW", "Checkout"].map((t, i) => (
                <motion.div
                  key={t}
                  className={`flex items-center gap-1.5 rounded-[2px] px-1.5 py-1 font-mono text-[9px] tracking-meta ${
                    i === 0 ? "bg-signal-dim text-signal" : "text-ink-dim"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      i === 0 ? "bg-signal" : "bg-ink-faint"
                    }`}
                  />
                  {t}
                </motion.div>
              ))}
            </div>
            <div className="mt-3 border-t border-line pt-2 font-mono text-[9px] tracking-meta text-ink-faint">
              Scriptless + scripted
            </div>
          </div>
        </div>
      </BrowserChrome>
    </div>
  );
}
