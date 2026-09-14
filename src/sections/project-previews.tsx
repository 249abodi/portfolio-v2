/* Stylized preview illustrations for project cards.
   Pure SVG — no screenshots. Colors resolve from theme CSS variables. */

type PreviewProps = { className?: string };

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 960 600" className="h-full w-full" role="img" aria-hidden>
      <rect width="960" height="600" rx="18" fill="var(--surface-sunken)" />
      <rect x="0" y="0" width="960" height="46" rx="18" fill="var(--surface)" />
      <rect x="0" y="24" width="960" height="22" fill="var(--surface)" />
      <circle cx="22" cy="23" r="5" fill="var(--border-strong)" />
      <circle cx="40" cy="23" r="5" fill="var(--border-strong)" />
      <circle cx="58" cy="23" r="5" fill="var(--border-strong)" />
      <rect x="344" y="14" width="272" height="18" rx="9" fill="var(--border)" />
      {children}
    </svg>
  );
}

function Bar({ x, y, w, h = 8, rx = 4, tone = "text" }: { x: number | string; y: number | string; w: number | string; h?: number | string; rx?: number | string; tone?: "text" | "faint" | "accent" | "strong" }) {
  const fill =
    tone === "accent"
      ? "var(--accent)"
      : tone === "strong"
        ? "var(--border-strong)"
        : tone === "faint"
          ? "var(--border)"
          : "var(--fg-faint)";
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />;
}

export function QavenoPreview({ className }: PreviewProps) {
  return (
    <div className={className}>
      <Chrome>
        <rect x="0" y="46" width="200" height="554" fill="var(--surface)" />
        <Bar x="16" y="70" w="120" h={10} tone="strong" />
        <rect x="16" y="100" width="168" height="34" rx="9" fill="var(--accent-soft)" />
        <Bar x="34" y="113" w="70" h={7} tone="accent" />
        {[150, 190, 230, 270].map((y) => (
          <rect key={y} x="16" y={y} width="168" height="34" rx="9" fill="var(--surface-raised)" stroke="var(--border)" />
        ))}
        <Bar x="34" y={163} w="60" h={7} tone="faint" />

        <rect x="224" y="70" width="500" height="14" rx="7" fill="var(--border-strong)" />
        <Bar x="224" y="104" w="180" h={8} tone="faint" />
        {[140, 190, 240, 290, 340].map((y, i) => (
          <g key={y}>
            {i === 2 ? (
              <rect x="224" y={y} width="500" height="40" rx="10" fill="var(--accent-soft)" />
            ) : (
              <rect x="224" y={y} width="500" height="40" rx="10" fill="var(--surface-raised)" stroke="var(--border)" />
            )}
            <circle cx={244} cy={y + 20} r="7" fill="var(--fg-faint)" />
            <Bar x={266} y={y + 10} w="180" h={7} />
            <Bar x={266} y={y + 24} w="120" h={6} tone="faint" />
            <Bar x={560} y={y + 17} w={i === 2 ? 90 : 70} h={7} tone="strong" />
          </g>
        ))}

        <rect x="748" y="70" width="188" height="484" rx="14" fill="var(--surface)" stroke="var(--border)" />
        <Bar x="772" y="94" w="90" h={9} tone="strong" />
        <Bar x="772" y="118" w="140" h={7} tone="faint" />
        <Bar x="772" y="140" w="110" h={7} tone="faint" />
        <rect x="772" y="210" width="140" height="74" rx="12" fill="var(--accent-soft)" />
        <Bar x="792" y="226" w="60" h={7} tone="accent" />
        <Bar x="792" y="246" w="100" h={9} tone="accent" />
        <rect x="772" y="320" width="140" height="74" rx="12" fill="var(--surface-raised)" stroke="var(--border)" />
        <Bar x="792" y="338" w="50" h={7} tone="faint" />
        <Bar x="792" y="356" w="80" h={9} tone="strong" />
        <rect x="772" y="520" width="140" height="32" rx="9" fill="var(--accent)" />
        <rect x="802" y="534" width="80" height="6" rx="3" fill="var(--accent-contrast)" />
      </Chrome>
    </div>
  );
}

export function ZelvoaPreview({ className }: PreviewProps) {
  return (
    <div className={className}>
      <Chrome>
        <rect x="0" y="46" width="220" height="554" fill="var(--surface)" />
        <Bar x="20" y="70" w="120" h={10} tone="strong" />
        {[104, 144, 184, 224].map((y) => (
          <rect key={y} x="20" y={y} width="180" height="30" rx="8" fill="var(--surface-raised)" stroke={y === 104 ? "none" : "var(--border)"} />
        ))}
        <rect x="36" y={117} width="80" height="7" rx="3.5" fill="var(--accent)" />

        <rect x="244" y="70" width="692" height="14" rx="7" fill="var(--border-strong)" />
        <Bar x="244" y="102" w="240" h={8} tone="faint" />
        <rect x="244" y="130" width="692" height="64" rx="12" fill="var(--surface-raised)" stroke="var(--border)" />
        {[276, 322, 368].map((y) => (
          <rect key={y} x="244" y={y} width="692" height="44" rx="10" fill="var(--surface-raised)" stroke="var(--border)" />
        ))}

        <rect x="748" y="430" width="188" height="124" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <Bar x="766" y="450" w="90" h={8} tone="strong" />
        <Bar x="766" y="472" w="130" h={6} tone="faint" />
        <rect x="766" y="500" width="152" height="34" rx="8" fill="var(--accent-soft)" />
        <rect x="790" y="515" width="70" height="6" rx="3" fill="var(--accent)" />
      </Chrome>
    </div>
  );
}

export function PortfolioPreview({ className }: PreviewProps) {
  return (
    <div className={className}>
      <Chrome>
        <Bar x="48" y="70" w="160" h={9} tone="accent" />
        <Bar x="48" y="96" w="360" h={18} rx={9} tone="strong" />
        <Bar x="48" y="128" w="300" h={7} tone="faint" />
        <Bar x="48" y="142" w="240" h={7} tone="faint" />

        <rect x="48" y="176" width="150" height="38" rx="19" fill="var(--accent)" />
        <rect x="214" y="176" width="150" height="38" rx="19" fill="none" stroke="var(--border-strong)" />

        <circle cx="760" cy="160" r="58" fill="var(--surface-raised)" stroke="var(--border-strong)" />
        <circle cx="760" cy="160" r="34" fill="var(--accent-soft)" />

        <rect x="48" y="280" width="400" height="150" rx="14" fill="var(--surface-raised)" stroke="var(--border)" />
        <Bar x="72" y="308" w="120" h={8} tone="accent" />
        <Bar x="72" y="332" w="200" h={9} tone="strong" />
        <Bar x="72" y="354" w="160" h={7} tone="faint" />
        <Bar x="72" y="370" w="180" h={7} tone="faint" />
        <rect x="72" y="398" width="90" height="24" rx="12" fill="var(--surface-sunken)" stroke="var(--border)" />

        <rect x="468" y="280" width="200" height="150" rx="14" fill="var(--surface-raised)" stroke="var(--border)" />
        <Bar x="492" y="308" w="90" h={8} tone="accent" />
        <Bar x="492" y="332" w="140" h={9} tone="strong" />
        <rect x="492" y="360" width="152" height="34" rx="8" fill="var(--accent-soft)" />
        <rect x="516" y="374" width="60" height="6" rx="3" fill="var(--accent)" />
      </Chrome>
    </div>
  );
}