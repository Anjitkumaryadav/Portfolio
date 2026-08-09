import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import CaseStudyOverlay from "../components/CaseStudyOverlay";
import HrmsMockup from "../components/mockups/HrmsMockup";
import BukmukMockup from "../components/mockups/BukmukMockup";
import TestMindMockup from "../components/mockups/TestMindMockup";
import { projects } from "../data/site";
import { useReducedMotion } from "../lib/useReducedMotion";
import { cn } from "../lib/cn";

const MOCKUPS = {
  hrms: HrmsMockup,
  bukmuk: BukmukMockup,
  testmind: TestMindMockup,
};

function ProjectChapter({ project, i, onOpen }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const mockY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const Mockup = MOCKUPS[project.mockup];
  const flip = i % 2 === 1;

  return (
    <article
      ref={ref}
      className="relative border-t border-line py-20 sm:py-28 lg:py-32"
    >
      {/* ghost index numeral */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: numberY }}
        className={cn(
          "pointer-events-none absolute top-8 -z-0 select-none font-display text-[34vw] font-medium leading-none tracking-tightest text-ink/[0.03] sm:text-[26vw] lg:text-[16vw]",
          flip ? "right-0 lg:right-4" : "left-0 lg:left-4"
        )}
      >
        {project.index}
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        {/* Text column */}
        <div
          className={cn(
            "lg:col-span-5",
            flip ? "lg:order-2 lg:col-start-8" : "lg:order-1 lg:col-start-1"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-meta text-signal">
              Project {project.index}
            </span>
            <span className="h-px w-10 bg-line" />
          </div>

          <h3 className="mt-5 font-display text-5xl font-medium uppercase leading-[0.92] tracking-tightest text-ink sm:text-6xl lg:text-7xl">
            <SplitText
              as="span"
              lines={[project.name]}
              lineClassName="pb-1"
            />
          </h3>

          <Reveal delay={0.1}>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-meta text-ink-dim">
              {project.kind}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-pretty font-display text-base leading-relaxed text-ink-dim">
              {project.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-meta text-ink-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <button
              onClick={() => onOpen(project)}
              data-cursor
              className="group mt-8 inline-flex items-center gap-3 border-b border-line pb-1 font-mono text-[12px] uppercase tracking-meta text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Explore Project
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </Reveal>
        </div>

        {/* Mockup column */}
        <motion.div
          style={reduced ? undefined : { y: mockY }}
          className={cn(
            "lg:col-span-6",
            flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7"
          )}
        >
          <Reveal y={40}>
            <Mockup />
          </Reveal>
        </motion.div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" data-section className="frame scroll-mt-20 py-24 sm:py-32">
      <SectionHeader index="03" label="Selected Work" />

      <Reveal className="mt-12 max-w-3xl">
        <h2 className="font-display text-4xl font-medium uppercase leading-[0.98] tracking-tightest text-ink sm:text-6xl">
          Three systems, built to{" "}
          <span className="font-serif italic lowercase text-signal">ship</span>.
        </h2>
      </Reveal>

      <div className="mt-8">
        {projects.map((p, i) => (
          <ProjectChapter key={p.id} project={p} i={i} onOpen={setActive} />
        ))}
        <div className="border-t border-line" />
      </div>

      <CaseStudyOverlay project={active} onClose={() => setActive(null)} />
    </section>
  );
}
