import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { experience } from "../data/site";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

function LedgerRow({ item, i }) {
  return (
    <article className="grid grid-cols-1 gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
      {/* Left: sticky identity */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-meta text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-mono text-[11px] uppercase tracking-meta",
                  item.isEducation ? "text-data" : "text-ink-dim"
                )}
              >
                {item.isEducation ? "Education" : "Experience"}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              {item.role}
            </h3>
            <p className="mt-2 font-display text-lg text-ink-dim">{item.company}</p>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-meta text-ink-faint">
              {item.period}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Right: scrolling detail */}
      <div className="lg:col-span-7 lg:col-start-6">
        <Reveal>
          <p className="text-pretty font-display text-lg leading-relaxed text-ink sm:text-xl">
            {item.summary}
          </p>
        </Reveal>

        {item.responsibilities.length > 0 && (
          <ul className="mt-8 space-y-4">
            {item.responsibilities.map((r, ri) => (
              <motion.li
                key={ri}
                className="flex gap-4 text-pretty font-display text-base leading-relaxed text-ink-dim"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: ri * 0.06 }}
              >
                <span className="mt-2 h-px w-6 flex-none bg-signal/60" />
                {r}
              </motion.li>
            ))}
          </ul>
        )}

        {item.stack.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {item.stack.map((t) => (
              <span
                key={t}
                className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-meta text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.4", "end 0.8"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" data-section className="frame scroll-mt-20 py-24 sm:py-32">
      <SectionHeader index="02" label="Experience / Timeline" />

      <Reveal className="mt-12 max-w-2xl">
        <h2 className="font-display text-4xl font-medium uppercase leading-[0.98] tracking-tightest text-ink sm:text-6xl">
          A short <span className="font-serif italic lowercase text-signal">changelog</span> of
          shipped work.
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-16">
        {/* progress rail (lg) */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-line lg:block" aria-hidden>
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-signal"
            style={{ height: "100%", scaleY: railScale }}
          />
        </div>

        <div className="lg:pl-10">
          {experience.map((item, i) => (
            <LedgerRow key={item.id} item={item} i={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
