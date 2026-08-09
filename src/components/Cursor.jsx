import { useEffect, useRef } from "react";
import { usePointerFine } from "../lib/usePointerFine";
import { prefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Custom cursor: a small dot that trails a hollow ring.
 * The ring grows over interactive elements (anything [data-cursor] or a/button).
 * Desktop + fine pointer only.
 */
export default function Cursor() {
  const fine = usePointerFine();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!fine || prefersReducedMotion()) return;
    document.body.classList.add("cursor-none-when-custom");

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const render = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const isInteractive = (el) =>
      el?.closest?.("a, button, [data-cursor], input, textarea, [role='button']");

    const onOver = (e) => {
      const active = isInteractive(e.target);
      ring.dataset.active = active ? "true" : "false";
    };

    const onDown = () => (ring.dataset.press = "true");
    const onUp = () => (ring.dataset.press = "false");
    const onLeaveWindow = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      document.body.classList.remove("cursor-none-when-custom");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-signal"
        style={{ transition: "opacity .3s" }}
      />
      <div
        ref={ringRef}
        data-active="false"
        data-press="false"
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-ink/40 transition-[width,height,border-color,opacity] duration-300 ease-expo data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-signal data-[press=true]:scale-90"
      />
    </div>
  );
}
