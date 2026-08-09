import { profile, links } from "../data/site";
import { scrollToId } from "../lib/useLenis";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="frame border-t border-line py-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <button
            onClick={() => scrollToId("home")}
            data-cursor
            className="text-left font-display text-3xl font-medium uppercase tracking-tightest text-ink transition-colors hover:text-signal sm:text-4xl"
          >
            {profile.name}
          </button>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-ink-dim">
            {profile.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { label: "GitHub", href: links.github },
            { label: "LinkedIn", href: links.linkedin },
            { label: "Email", href: links.email },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor
              className="group font-mono text-[12px] uppercase tracking-meta text-ink-dim transition-colors hover:text-signal"
            >
              {l.label}
              <span className="text-ink-faint transition-colors group-hover:text-signal"> ↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
        <span className="font-mono text-[11px] uppercase tracking-meta text-ink-faint">
          © 2026 — Built from scratch
        </span>
        <button
          onClick={() => scrollToId("home")}
          data-cursor
          className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-meta text-ink-dim transition-colors hover:text-signal"
        >
          Back to top
          <ArrowUp
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-expo group-hover:-translate-y-1"
          />
        </button>
      </div>
    </footer>
  );
}
