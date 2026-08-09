import { useEffect, useRef } from "react";
import { heroFloaters } from "../data/site";
import { prefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Canvas layer of drifting mono tech labels on three parallax depths,
 * offset by cursor. Single rAF loop, paused when the hero leaves view.
 */
export default function HeroFloaters() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const items = heroFloaters.map((label, i) => {
      const depth = (i % 3) + 1; // 1..3
      return {
        label,
        depth,
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.02 * depth,
        vy: (Math.random() - 0.5) * 0.02 * depth,
        size: depth === 1 ? 11 : depth === 2 ? 13 : 16,
        alpha: depth === 1 ? 0.16 : depth === 2 ? 0.24 : 0.34,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.font = "";
      for (const it of items) {
        if (!reduced) {
          it.x += it.vx / width;
          it.y += it.vy / height;
          if (it.x < -0.1) it.x = 1.1;
          if (it.x > 1.1) it.x = -0.1;
          if (it.y < -0.1) it.y = 1.1;
          if (it.y > 1.1) it.y = -0.1;
        }
        const px =
          it.x * width + mouse.x * 26 * it.depth;
        const py =
          it.y * height + mouse.y * 26 * it.depth;

        ctx.font = `${it.size}px "JetBrains Mono Variable", monospace`;
        ctx.fillStyle = `rgba(243,244,245,${it.alpha})`;
        ctx.fillText(it.label, px, py);

        // tiny bracket accent on the deepest layer
        if (it.depth === 3) {
          ctx.fillStyle = `rgba(210,161,94,${it.alpha})`;
          ctx.fillText("↳", px - 16, py);
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Pause when hero scrolled away
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
