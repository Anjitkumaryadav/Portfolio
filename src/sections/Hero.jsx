import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import HeroFloaters from "./HeroFloaters";
import { profile, links } from "../data/site";
import { scrollToId } from "../lib/useLenis";
import { useReducedMotion } from "../lib/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ started }) {
  const reduced = useReducedMotion();
  // Start hero animations only after the preloader lifts.
  const animate = started ? "immediate" : "immediate";
  const baseDelay = reduced ? 0 : 0.15;

  return (
    <section
      id="home"
      data-section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      <HeroFloaters />

      {/* top hairline meta */}
      <div className="frame relative z-10 flex items-center justify-between pt-6">
        <motion.span
          className="meta"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay, duration: 0.8 }}
        >
          Backend · Full-stack · Automation
        </motion.span>
        <motion.span
          className="meta hidden sm:block"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay, duration: 0.8 }}
        >
          {profile.location} · Available
        </motion.span>
      </div>

      {/* headline */}
      <div className="frame relative z-10 flex flex-1 flex-col justify-center py-10">
        <h1 className="font-display text-[13.5vw] font-medium uppercase leading-[0.92] tracking-tightest text-ink sm:text-[12vw] lg:text-[10.5vw]">
          <SplitText
            as="span"
            animate={animate}
            delay={baseDelay}
            stagger={0.09}
            lines={[
              <span key="1">I Build Software</span>,
              <span key="2">That Solves</span>,
              <span key="3" className="text-ink">
                <span className="font-serif italic lowercase tracking-normal text-signal">
                  real
                </span>{" "}
                Problems.
              </span>,
            ]}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-pretty font-display text-base text-ink-dim sm:text-lg"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.5, duration: 0.8, ease: EASE }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.65, duration: 0.8, ease: EASE }}
        >
          <MagneticButton variant="solid" onClick={() => scrollToId("projects")}>
            View Projects <ArrowDownRight size={15} strokeWidth={1.75} />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToId("contact")}>
            Contact Me
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume <ArrowUpRight size={15} strokeWidth={1.75} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* bottom status line */}
      <div className="frame relative z-10 flex items-center justify-between border-t border-line py-5">
        <span className="meta flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
          Currently at Impulsive Web
        </span>
        <button
          onClick={() => scrollToId("about")}
          data-cursor
          className="meta hidden items-center gap-2 transition-colors hover:text-ink sm:flex"
        >
          Scroll to explore
          <ArrowDownRight size={13} strokeWidth={1.75} />
        </button>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="meta transition-colors hover:text-signal"
        >
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
