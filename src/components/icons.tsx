import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };
}

export function ArrowRight({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Check({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function Menu({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function ChevronDown({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Mail({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function Sun({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Moon({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

/* --- Services --- */

export function Globe({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18Z" />
    </svg>
  );
}

export function Code({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </svg>
  );
}

export function Cloud({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M17.5 19a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 9.7 4.5 4.5 0 0 0 7 19Z" />
    </svg>
  );
}

export function Layout({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </svg>
  );
}

export function Plug({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M9 2v5" />
      <path d="M15 2v5" />
      <path d="M6 7h12v3a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6Z" />
      <path d="M12 16v6" />
    </svg>
  );
}

export function Frame({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M5 9h9M9 9v10" />
    </svg>
  );
}

/* --- Brand / social (filled glyphs allowed for logos) --- */

type BrandProps = IconProps;

export function Github({ size = 20, ...props }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49l-.01-1.88c-2.78.62-3.37-1.18-3.37-1.18-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5.01 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function Linkedin({ size = 20, ...props }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}

export function Youtube({ size = 20, ...props }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 7.2a3 3 0 0 0-2.11-2.12C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.39.53A3 3 0 0 0 .5 7.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.11 2.12c1.89.53 9.39.53 9.39.53s7.5 0 9.39-.53a3 3 0 0 0 2.11-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8ZM9.6 15.6V8.4l6.27 3.6Z" />
    </svg>
  );
}

export function Instagram({ size = 20, ...props }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 1.5c-3.14 0-3.52.01-4.76.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06-.06 1.24-.07 1.62-.07 4.76s.01 3.52.07 4.76c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.24.06 1.62.07 4.76.07s3.52-.01 4.76-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.24.07-1.62.07-4.76s-.01-3.52-.07-4.76c-.05-1.08-.23-1.67-.38-2.06-.2-.52-.44-.89-.83-1.28a3.7 3.7 0 0 0-1.28-.83c-.39-.15-.98-.33-2.06-.38-1.24-.06-1.62-.07-4.76-.07Zm0 2.54a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Zm0 1.5a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm6.1-.67a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0Z" />
    </svg>
  );
}

export function Facebook({ size = 20, ...props }: BrandProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  );
}

export function MapPin({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Terminal({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="m5 7 5 5-5 5" />
      <path d="M12 17h7" />
    </svg>
  );
}

/* --- Assistant --- */

export function Send({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4.5 12h15" />
      <path d="m13 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function Sparkles({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 4l1.4 3.9L17.5 9l-4.1 1.1L12 14l-1.4-3.9L6.5 9l4.1-1.1Z" />
      <path d="M18 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
    </svg>
  );
}

export function Trash({ size, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}