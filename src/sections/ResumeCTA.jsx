import { Download, ArrowUpRight } from "lucide-react";
import SplitText from "../components/SplitText";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { profile, links } from "../data/site";

export default function ResumeCTA() {
  return (
    <section id="resume" data-section className="frame scroll-mt-20 py-24 sm:py-32">
      <div className="border-y border-line py-16 sm:py-24">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-meta text-signal">[ 06 ]</span>
          <span className="font-mono text-[11px] uppercase tracking-meta text-ink-dim">
            Resume
          </span>
        </div>

        <h2 className="mt-8 font-display text-[13vw] font-medium uppercase leading-[0.9] tracking-tightest text-ink sm:text-[10vw] lg:text-[8vw]">
          <SplitText
            as="span"
            lines={[
              <span key="1">Let's build something</span>,
              <span key="2">
                worth{" "}
                <span className="font-serif italic lowercase text-signal">shipping</span>.
              </span>,
            ]}
          />
        </h2>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="solid"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Download Resume <Download size={15} strokeWidth={1.75} />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              View LinkedIn <ArrowUpRight size={15} strokeWidth={1.75} />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <ArrowUpRight size={15} strokeWidth={1.75} />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
