"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { mousePosition } from "@/lib/hero-3d-mouse";
import type { Hero3DSceneCanvasProps } from "./hero-3d-scene";

const Hero3DSceneCanvas = dynamic<Hero3DSceneCanvasProps>(
  () => import("./hero-3d-scene").then((m) => m.Hero3DSceneCanvas),
  {
    ssr: false,
    loading: () => <Hero3DFallback />,
  }
);

function Hero3DFallback() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="motion-float absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="32" fill="#0d0f14" stroke="rgba(79,124,255,0.25)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="10" fill="rgba(79,124,255,0.1)" />
      <ellipse
        cx="100"
        cy="100"
        rx="55"
        ry="16"
        fill="none"
        stroke="rgba(79,124,255,0.3)"
        strokeWidth="0.6"
        transform="rotate(-18 100 100)"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="65"
        ry="12"
        fill="none"
        stroke="rgba(126,160,255,0.15)"
        strokeWidth="0.4"
        transform="rotate(28 100 100)"
      />
      <circle cx="55" cy="86" r="2" fill="rgba(79,124,255,0.5)" />
      <circle cx="150" cy="120" r="1.5" fill="rgba(79,124,255,0.35)" />
    </svg>
  );
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

function useMediaQuery(query: string, defaultValue: boolean) {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => defaultValue
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const ready = useSyncExternalStore(
    () => () => {},
    () => checkWebGL(),
    () => false
  );

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const isMobile = useMediaQuery("(max-width: 767px)", true);

  useEffect(() => {
    if (!ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "200px 0px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [ready]);

  const frameloop: "always" | "never" =
    reducedMotion || !inView ? "never" : "always";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      tabIndex={-1}
    >
      {ready ? (
        <Hero3DSceneCanvas
          frameloop={frameloop}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      ) : (
        <Hero3DFallback />
      )}
    </div>
  );
}