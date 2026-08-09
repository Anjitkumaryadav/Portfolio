import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { philosophy } from "../data/site";

const EASE = [0.16, 1, 0.3, 1];

export default function Philosophy() {
  return (
    <section id="philosophy" data-section className="frame scroll-mt-20 py-24 sm:py-32">
      <SectionHeader index="05" label="How I Think" />

      <Reveal className="mt-12">
        <h2 className="max-w-3xl font-display text-4xl font-medium uppercase leading-[0.98] tracking-tightest text-ink sm:text-6xl">
          Principles that <span className="font-serif italic lowercase text-signal">outlast</span> any
          stack.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        {philosophy.map((item, i) => (
          <motion.article
            key={item.index}
            className="group relative bg-void p-8 sm:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
          >
            <div className="flex items-baseline gap-5">
              <span className="font-display text-5xl font-medium leading-none tracking-tight text-ink-faint transition-colors duration-500 group-hover:text-signal sm:text-6xl">
                {item.index}
              </span>
              <div>
                <h3 className="font-display text-xl font-medium uppercase tracking-tight text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty font-display text-base leading-relaxed text-ink-dim">
                  {item.body}
                </p>
              </div>
            </div>
            {/* hover underline sweep */}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-500 ease-expo group-hover:w-full" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
