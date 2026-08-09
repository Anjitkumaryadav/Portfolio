import { cn } from "../../lib/cn";

// Shared window chrome for the coded mockups.
export default function BrowserChrome({ url, children, className }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/20" />
        {url && (
          <div className="ml-3 flex-1 truncate rounded-[3px] border border-line bg-void/60 px-3 py-1 font-mono text-[10px] tracking-meta text-ink-faint">
            {url}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
