import Reveal from "./Reveal";
import { cn } from "../lib/cn";

/**
 * Consistent section label: "[ 03 ] — EXPERIENCE" with a hairline.
 */
export default function SectionHeader({ index, label, className }) {
  return (
    <Reveal className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-[11px] tracking-meta text-signal">
        [ {index} ]
      </span>
      <span className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </Reveal>
  );
}
