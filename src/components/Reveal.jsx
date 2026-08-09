import { motion } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scroll-in reveal. Fades + rises on enter. Collapses to instant under
 * reduced motion. `as` lets it wrap any element.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
  amount = 0.3,
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
