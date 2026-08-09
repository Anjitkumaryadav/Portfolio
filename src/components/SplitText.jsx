import { motion } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Mask-slide line reveal: each line sits in an overflow-hidden track and
 * translates up from below. Pass `lines` as an array of strings/nodes.
 * Under reduced motion the lines render plainly.
 */
export default function SplitText({
  lines = [],
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
  as = "div",
  animate = "inView", // "inView" | "immediate"
}) {
  const reduced = useReducedMotion();
  const Wrapper = as;

  if (reduced) {
    return (
      <Wrapper className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Wrapper>
    );
  }

  const hidden = { y: "110%" };
  const shown = { y: "0%" };

  return (
    <Wrapper className={className}>
      {lines.map((line, i) => {
        const motionProps =
          animate === "immediate"
            ? { initial: hidden, animate: shown }
            : {
                initial: hidden,
                whileInView: shown,
                viewport: { once: true, amount: 0.5 },
              };
        return (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className={cn("block will-change-transform", lineClassName)}
              {...motionProps}
              transition={{ duration, ease: EASE, delay: delay + i * stagger }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
}
