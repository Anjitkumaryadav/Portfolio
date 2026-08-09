import { useEffect, useState } from "react";

/**
 * Fixed right rail (lg+). Shows scroll progress as a filling line and the
 * current section index derived from which [data-section] is in view.
 */
export default function Rail({ sections = [] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.target))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const total = String(sections.length).padStart(2, "0");
  const current = String(active + 1).padStart(2, "0");

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      <span className="font-mono text-[11px] tracking-meta text-signal">{current}</span>
      <div className="relative h-40 w-px bg-line">
        <div
          className="absolute left-0 top-0 w-px origin-top bg-signal transition-transform duration-150"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />
      </div>
      <span className="font-mono text-[11px] tracking-meta text-ink-faint">{total}</span>
    </div>
  );
}
