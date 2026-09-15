"use client";

import { useRef, type ElementType, type ReactNode } from "react";

type SpotlightCardProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ as: Tag = "div", children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      className={`card-spotlight ${className}`}
      onPointerMove={onMove}
    >
      {children}
    </Tag>
  );
}