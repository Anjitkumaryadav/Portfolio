import { useMagnetic } from "../lib/useMagnetic";
import { cn } from "../lib/cn";

/**
 * A magnetic button/link. Renders <a> when href is set, else <button>.
 * The inner label counter-translates slightly for depth.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "solid", // "solid" | "ghost"
  strength = 0.4,
  download,
  target,
  rel,
  type = "button",
  ...rest
}) {
  const ref = useMagnetic(strength);

  const base =
    "group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[12px] uppercase tracking-meta transition-colors duration-300 ease-expo will-change-transform";
  const variants = {
    solid:
      "bg-ink text-void hover:bg-signal",
    ghost:
      "border border-line-strong text-ink hover:border-signal hover:text-signal",
  };

  const cls = cn(base, variants[variant], className);

  const inner = (
    <span className="inline-flex items-center gap-2 transition-transform duration-300 ease-expo">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        download={download}
        target={target}
        rel={rel}
        data-cursor
        className={cls}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} onClick={onClick} data-cursor className={cls} {...rest}>
      {inner}
    </button>
  );
}
