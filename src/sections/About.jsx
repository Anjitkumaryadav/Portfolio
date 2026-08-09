import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { aboutParagraphs, stats } from "../data/site";
import { useReducedMotion } from "../lib/useReducedMotion";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1];
const CHAIN = ["Idea", "API", "Database", "Product"];

function KineticWord({ word, index, total, progress, reduced }) {
  const range = [index / total, (index + 0.6) / total];
  const color = useTransform(progress, range, ["#565B62", "#F3F4F5"]);
  return (
    <motion.span style={reduced ? { color: "#F3F4F5" } : { color }}>
      {word}
    </motion.span>
  );
}

function KineticHeadline() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <h2
      ref={ref}
      className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-display text-[9vw] font-medium uppercase leading-[0.95] tracking-tightest text-ink sm:gap-x-6 sm:text-[8vw] lg:gap-x-8 lg:text-[6.4vw]"
    >
      <span className="text-ink-faint">From</span>
      {CHAIN.map((word, i) => (
        <span key={word} className="inline-flex items-baseline gap-x-5 sm:gap-x-6 lg:gap-x-8">
          <KineticWord
            word={word}
            index={i}
            total={CHAIN.length}
            progress={scrollYProgress}
            reduced={reduced}
          />
          {i < CHAIN.length - 1 && (
            <span className="font-serif italic text-signal">→</span>
          )}
        </span>
      ))}
    </h2>
  );
}

export default function About() {
  return (
    <section id="about" data-section className="frame scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <SectionHeader index="01" label="About / Approach" />

      <div className="mt-14">
        <KineticHeadline />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Portrait */}
        <Reveal className="lg:col-span-4 lg:col-start-1" y={30}>
          <div className="group relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-line">
            <img
              src="/photo.jpeg"
              alt="Portrait of Anjit Kumar Yadav"
              loading="lazy"
              decoding="async"
              width={450}
              height={450}
              className="h-full w-full object-cover object-center opacity-90 grayscale contrast-[1.05] transition-all duration-700 ease-expo group-hover:grayscale-0"
              style={{ filter: "grayscale(1) contrast(1.05) brightness(0.92)" }}
            />
            {/* duotone wash */}
            <div className="pointer-events-none absolute inset-0 mix-blend-color bg-[#1a1408]" />
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light grain opacity-[0.15] animate-grain" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-meta text-ink/80">
              Anjit K. Yadav
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-6">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={cn(
                    "text-pretty font-display text-lg leading-relaxed sm:text-xl",
                    i === 0 ? "text-ink" : "text-ink-dim"
                  )}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-void p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              >
                <div className="font-display text-3xl font-medium tracking-tight text-signal sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-meta text-ink-dim">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
