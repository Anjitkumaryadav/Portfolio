import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { nav, links, profile } from "../data/site";
import { scrollToId } from "../lib/useLenis";
import { openMail } from "../lib/openMail";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [talkLabel, setTalkLabel] = useState("Let's talk →");

  const onTalk = () => {
    openMail({ subject: "Let's talk" });
    setTalkLabel(`Copied ${profile.email}`);
    setTimeout(() => setTalkLabel("Let's talk →"), 2500);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop?.();
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start?.();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (target) => {
    setOpen(false);
    // Delay so overflow is restored before Lenis measures
    requestAnimationFrame(() => scrollToId(target));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-expo",
          scrolled
            ? "border-b border-line bg-void/70 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <nav className="frame flex h-16 items-center justify-between">
          <button
            onClick={() => go("home")}
            data-cursor
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-meta text-ink"
          >
            <span className="inline-block h-1.5 w-1.5 bg-signal" />
            AKY
            <span className="text-ink-faint transition-colors group-hover:text-ink-dim">
              / eng
            </span>
          </button>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  data-cursor
                  className="group relative font-mono text-[12px] uppercase tracking-meta text-ink-dim transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 ease-expo group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={onTalk}
              data-cursor
              className="font-mono text-[12px] uppercase tracking-meta text-ink-dim transition-colors hover:text-signal"
            >
              {talkLabel}
            </button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[120] flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <span
              className={cn(
                "block h-px bg-ink transition-all duration-300 ease-expo",
                open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
              )}
            />
            <span
              className={cn(
                "block h-px bg-ink transition-all duration-300 ease-expo",
                open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-void md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex flex-1 flex-col justify-center px-6">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <li key={item.target} className="overflow-hidden">
                    <motion.button
                      onClick={() => go(item.target)}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.05 }}
                      className="flex items-baseline gap-4 py-2 text-left"
                    >
                      <span className="font-mono text-[11px] tracking-meta text-signal">
                        0{i + 1}
                      </span>
                      <span className="font-display text-5xl uppercase tracking-tightest text-ink">
                        {item.label}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between border-t border-line px-6 py-6 font-mono text-[11px] uppercase tracking-meta text-ink-dim">
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={links.email}>Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
