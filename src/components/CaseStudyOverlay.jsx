import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Full-screen case study panel. Focus-trapped, Esc to close, restores focus
 * and scroll lock on exit.
 */
export default function CaseStudyOverlay({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!project) return;
    prevFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop?.();
    // focus close button after mount
    const t = setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start?.();
      prevFocus.current?.focus?.();
    };
  }, [project, onClose]);

  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[300] flex justify-end bg-void/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <motion.div
            ref={panelRef}
            data-lenis-prevent
            className="relative h-full w-full overflow-y-auto overscroll-contain border-l border-line bg-void sm:w-[86%] lg:w-[64%] xl:w-[52%]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-void/85 px-6 py-4 backdrop-blur sm:px-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-meta text-signal">
                  {project.index}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
                  Case study
                </span>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                data-cursor
                aria-label="Close case study"
                className="group flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-meta text-ink-dim transition-colors hover:border-signal hover:text-signal"
              >
                Close <X size={13} strokeWidth={1.75} />
              </button>
            </div>

            <div className="px-6 py-12 sm:px-10 lg:py-16">
              <div className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
                {project.kind}
              </div>
              <h2 className="mt-3 font-display text-5xl font-medium uppercase leading-[0.95] tracking-tightest text-ink sm:text-6xl">
                {project.name}
              </h2>
              <p className="mt-6 max-w-2xl text-pretty font-display text-lg leading-relaxed text-ink-dim">
                {project.blurb}
              </p>

              {/* stack */}
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-meta text-ink-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Block title="The problem">
                <p className="text-pretty font-display text-lg leading-relaxed text-ink">
                  {cs.problem}
                </p>
              </Block>

              <Block title="Architecture">
                <ul className="space-y-4">
                  {cs.architecture.map((a, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-1 font-mono text-[11px] tracking-meta text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-pretty font-display text-base leading-relaxed text-ink-dim">
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="My role">
                <p className="text-pretty font-display text-base leading-relaxed text-ink-dim">
                  {cs.role}
                </p>
              </Block>

              <Block title="Key modules">
                <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                  {cs.modules.map((m) => (
                    <div
                      key={m}
                      className="bg-void px-4 py-3 font-mono text-[12px] tracking-meta text-ink-dim"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </Block>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, children }) {
  return (
    <section className="mt-14 border-t border-line pt-8">
      <h3 className="mb-5 font-mono text-[11px] uppercase tracking-meta text-signal">
        {title}
      </h3>
      {children}
    </section>
  );
}
