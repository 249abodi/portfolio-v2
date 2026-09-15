"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduceChange = (e: MediaQueryListEvent) => {
      if (e.matches) el.style.opacity = "0";
    };
    reduce.addEventListener("change", onReduceChange);

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      const { clientX, clientY } = e;
      frame = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = `translate3d(${clientX - 300}px, ${clientY - 300}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.opacity = "0";
    };

    el.style.opacity = "0";
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      reduce.removeEventListener("change", onReduceChange);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}