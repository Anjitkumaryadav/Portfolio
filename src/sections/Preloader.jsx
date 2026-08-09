import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = [
  "initializing",
  "resolving modules",
  "compiling systems",
  "ready",
];

const EASE = [0.16, 1, 0.3, 1];

/**
 * Build-log preloader. Runs once per session (sessionStorage), skipped on
 * reduced motion. Calls onDone when it lifts.
 */
export default function Preloader({ onDone }) {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count 0 -> 100
    const countTimer = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(countTimer);
          return 100;
        }
        return Math.min(100, c + Math.round(Math.random() * 9 + 3));
      });
    }, 90);

    return () => clearInterval(countTimer);
  }, []);

  useEffect(() => {
    if (count >= 100) return;
    const idx = Math.min(STEPS.length - 1, Math.floor((count / 100) * STEPS.length));
    setStep(idx);
  }, [count]);

  useEffect(() => {
    if (count >= 100) {
      setStep(STEPS.length - 1);
      const t = setTimeout(onDone, 520);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[10000] flex flex-col justify-between bg-void px-6 py-6 sm:px-10 sm:py-8"
        initial={{ opacity: 1 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-meta text-ink-dim">
          <span>Anjit Kumar Yadav</span>
          <span>Software Engineer</span>
        </div>

        <div className="flex flex-col items-start gap-3">
          <div className="h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={step}
                className="block font-mono text-[12px] uppercase tracking-meta text-ink"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {STEPS[step]}
                <span className="text-signal"> _</span>
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="relative h-px w-full bg-line">
            <motion.div
              className="absolute left-0 top-0 h-px bg-signal"
              animate={{ width: `${count}%` }}
              transition={{ ease: EASE }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="font-mono text-[11px] tracking-meta text-ink-dim">
            build
          </span>
          <span className="font-display text-[18vw] leading-none tracking-tightest text-ink sm:text-[12vw]">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
