import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import CaseStudyOverlay from "../components/CaseStudyOverlay";
import { STAGE_VISUALS, StageIcons } from "./testmind/StageVisuals";
import { projects } from "../data/site";
import { useReducedMotion } from "../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const testmind = projects.find((p) => p.id === "testmind");
const STAGES = testmind.pipeline;

function StagePanel({ stage, i, active, Visual }) {
  const Icon = StageIcons[i];
  return (
    <div className="flex h-full w-[86vw] flex-none flex-col justify-center px-6 sm:w-[62vw] lg:w-[46vw] lg:px-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-meta text-signal">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-line" />
        <Icon
          size={15}
          strokeWidth={1.75}
          className={active ? "text-signal" : "text-ink-faint"}
          style={{ transition: "color 0.4s" }}
        />
      </div>
      <h3 className="mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tightest text-ink sm:text-4xl lg:text-5xl">
        {stage.label}
      </h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-ink-dim">
        {stage.note}
      </p>
      <div className="mt-8">
        <Visual active={active} />
      </div>
    </div>
  );
}

function HorizontalPipeline({ onOpen }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (STAGES.length - 1));
          setActive(idx);
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[100svh] overflow-hidden">
      {/* progress header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-20">
        <div className="frame flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
            Test Mind · Pipeline
          </span>
          <div className="hidden items-center gap-1.5 sm:flex">
            {STAGES.map((s, i) => (
              <span
                key={s.key}
                className="h-1 w-6 rounded-full"
                style={{
                  background: i <= active ? "#D2A15E" : "rgba(255,255,255,0.12)",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* pinned track */}
      <div className="flex h-full items-center">
        <div ref={trackRef} className="flex h-full items-center will-change-transform">
          {/* lead-in label */}
          <div className="flex h-full w-[70vw] flex-none flex-col justify-center px-6 sm:w-[42vw] lg:px-16">
            <h2 className="font-display text-5xl font-medium uppercase leading-[0.92] tracking-tightest text-ink sm:text-6xl lg:text-7xl">
              Capture{" "}
              <span className="font-serif italic lowercase text-signal">to</span> execute.
            </h2>
            <p className="mt-6 max-w-sm text-pretty font-display text-base leading-relaxed text-ink-dim">
              How Test Mind turns a live web page into a running test suite — scroll
              through the pipeline.
            </p>
          </div>

          {STAGES.map((stage, i) => {
            const Visual = STAGE_VISUALS[i];
            return (
              <div key={stage.key} className="flex h-full flex-none items-center">
                {i > 0 && (
                  <ArrowRight
                    size={22}
                    strokeWidth={1.5}
                    className="mx-1 flex-none text-ink-faint"
                    style={{ color: i <= active ? "#D2A15E" : undefined }}
                  />
                )}
                <StagePanel stage={stage} i={i} active={i <= active} Visual={Visual} />
              </div>
            );
          })}

          {/* trailing CTA */}
          <div className="flex h-full w-[70vw] flex-none flex-col justify-center px-6 sm:w-[40vw] lg:px-16">
            <p className="max-w-xs text-pretty font-display text-xl leading-relaxed text-ink">
              A test automation platform that lets anyone build real, runnable tests.
            </p>
            <button
              onClick={onOpen}
              data-cursor
              className="group mt-8 inline-flex items-center gap-3 self-start border-b border-line pb-1 font-mono text-[12px] uppercase tracking-meta text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Explore Project
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerticalStepper({ onOpen }) {
  return (
    <div className="frame">
      <div className="relative border-l border-line pl-8">
        {STAGES.map((stage, i) => {
          const Visual = STAGE_VISUALS[i];
          const Icon = StageIcons[i];
          return (
            <Reveal key={stage.key} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-signal bg-void">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-meta text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={14} strokeWidth={1.75} className="text-ink-dim" />
              </div>
              <h3 className="mt-2 font-display text-2xl font-medium uppercase tracking-tight text-ink">
                {stage.label}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-meta text-ink-dim">
                {stage.note}
              </p>
              <div className="mt-5">
                <Visual active />
              </div>
            </Reveal>
          );
        })}
      </div>
      <button
        onClick={onOpen}
        data-cursor
        className="group mt-10 inline-flex items-center gap-3 border-b border-line pb-1 font-mono text-[12px] uppercase tracking-meta text-ink transition-colors hover:border-signal hover:text-signal"
      >
        Explore Project <ArrowUpRight size={15} strokeWidth={1.75} />
      </button>
    </div>
  );
}

export default function TestMindPipeline() {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const useHorizontal = isDesktop && !reduced;

  return (
    <section id="testmind" data-section className="scroll-mt-20 py-24 sm:py-28">
      <div className="frame">
        <SectionHeader index="—" label="Featured · Automation" />
        <Reveal className="mt-10 max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-meta text-signal">
            Project 03 — Test Mind
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium uppercase leading-[0.98] tracking-tightest text-ink sm:text-5xl">
            The product, shown — not{" "}
            <span className="font-serif italic lowercase text-signal">told</span>.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16">
        {useHorizontal ? (
          <HorizontalPipeline onOpen={() => setOpen(true)} />
        ) : (
          <VerticalStepper onOpen={() => setOpen(true)} />
        )}
      </div>

      <CaseStudyOverlay project={open ? testmind : null} onClose={() => setOpen(false)} />
    </section>
  );
}
