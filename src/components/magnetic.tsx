"use client";

import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className = "", strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const max = 10;
    el.style.transform = `translate3d(${Math.max(-max, Math.min(max, relX * strength))}px, ${
      Math.max(-max, Math.min(max, relY * strength))
    }px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic inline-block ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  );
}