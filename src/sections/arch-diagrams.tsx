type DiagramProps = { className?: string };

function ArchBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={accent ? "var(--accent-soft)" : "var(--surface)"}
        stroke={accent ? "var(--accent)" : "var(--border-strong)"}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 5 : y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--fg)"
        fontSize={12}
        fontWeight={600}
        fontFamily="var(--font-display)"
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--fg-subtle)"
          fontSize={9.5}
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--border-strong)"
      strokeWidth={1.2}
      strokeDasharray="4 3"
      markerEnd="url(#arrowhead)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 8 3, 0 6" fill="var(--border-strong)" />
      </marker>
    </defs>
  );
}

export function QavenoArchDiagram({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={`h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label="QAVENO architecture diagram"
    >
      <ArrowDefs />

      {/* User layer */}
      <text x={400} y={28} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        USER LAYER
      </text>
      <ArchBox x={80} y={40} w={140} h={56} label="POS Terminal" sub="Electron" accent />
      <ArchBox x={330} y={40} w={140} h={56} label="Admin Panel" sub="Electron" accent />
      <ArchBox x={580} y={40} w={140} h={56} label="SaaS Dashboard" sub="Vercel" accent />

      {/* Arrows down to business logic */}
      <Arrow x1={150} y1={96} x2={150} y2={135} />
      <Arrow x1={400} y1={96} x2={400} y2={135} />
      <Arrow x1={650} y1={96} x2={650} y2={135} />

      {/* Business logic layer */}
      <text x={400} y={130} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        BUSINESS LOGIC
      </text>
      <ArchBox x={55} y={142} w={160} h={56} label="Sales & POS" sub="Node.js" />
      <ArchBox x={245} y={142} w={160} h={56} label="Inventory" sub="Node.js" />
      <ArchBox x={435} y={142} w={160} h={56} label="Branches & RBAC" sub="Node.js" />
      <ArchBox x={625} y={142} w={120} h={56} label="AI Insights" sub="Node.js" />

      {/* Arrows down to data layer */}
      <Arrow x1={135} y1={198} x2={135} y2={240} />
      <Arrow x1={325} y1={198} x2={325} y2={240} />
      <Arrow x1={515} y1={198} x2={515} y2={240} />
      <Arrow x1={685} y1={198} x2={685} y2={240} />

      {/* Data layer */}
      <text x={400} y={236} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        DATA LAYER
      </text>
      <ArchBox x={120} y={248} w={180} h={56} label="SQLite Database" sub="Offline-first" />
      <ArchBox x={370} y={248} w={180} h={56} label="Product Catalog" sub="Weighted-avg costing" />
      <ArchBox x={600} y={248} w={140} h={56} label="Audit Log" sub="All mutations" />

      {/* Sync arrow */}
      <text x={400} y={335} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        SYNC LAYER
      </text>
      <ArchBox x={250} y={348} w={300} h={50} label="Cloud Sync" sub="Optional · Conflict resolution" accent />

      <Arrow x1={210} y1={304} x2={340} y2={348} />
      <Arrow x1={460} y1={304} x2={460} y2={348} />
    </svg>
  );
}

export function ZelvoaArchDiagram({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 800 440"
      className={`h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label="ZELVOA architecture diagram"
    >
      <ArrowDefs />

      {/* Client layer */}
      <text x={400} y={28} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        CLIENT LAYER
      </text>
      <ArchBox x={100} y={40} w={160} h={56} label="Web App" sub="Next.js / React" accent />
      <ArchBox x={340} y={40} w={120} h={56} label="Auth" sub="OAuth flows" accent />
      <ArchBox x={540} y={40} w={160} h={56} label="Dashboard" sub="TypeScript" accent />

      {/* Arrows to API */}
      <Arrow x1={180} y1={96} x2={180} y2={140} />
      <Arrow x1={400} y1={96} x2={400} y2={140} />
      <Arrow x1={620} y1={96} x2={620} y2={140} />

      {/* API layer */}
      <text x={400} y={135} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        API LAYER
      </text>
      <ArchBox x={60} y={148} w={150} h={56} label="Content API" sub="CRUD + calendar" />
      <ArchBox x={240} y={148} w={150} h={56} label="Analytics API" sub="Metrics aggregation" />
      <ArchBox x={420} y={148} w={150} h={56} label="Inbox API" sub="Unified messages" />
      <ArchBox x={600} y={148} w={140} h={56} label="Campaign API" sub="Goals & timeline" />

      {/* Arrows to platform integrations */}
      <Arrow x1={135} y1={204} x2={135} y2={248} />
      <Arrow x1={315} y1={204} x2={315} y2={248} />
      <Arrow x1={495} y1={204} x2={495} y2={248} />
      <Arrow x1={670} y1={204} x2={670} y2={248} />

      {/* Platform integrations */}
      <text x={400} y={243} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        PLATFORM INTEGRATIONS
      </text>
      <ArchBox x={40} y={256} w={100} h={44} label="Instagram" sub="OAuth" />
      <ArchBox x={155} y={256} w={90} h={44} label="Facebook" sub="OAuth" />
      <ArchBox x={260} y={256} w={80} h={44} label="TikTok" sub="OAuth" />
      <ArchBox x={355} y={256} w={80} h={44} label="LinkedIn" sub="OAuth" />
      <ArchBox x={450} y={256} w={60} h={44} label="X" sub="OAuth" />
      <ArchBox x={540} y={256} w={100} h={44} label="AI Service" sub="Captions" accent />
      <ArchBox x={660} y={256} w={100} h={44} label="Job Queue" sub="Scheduling" />

      {/* Arrows to data */}
      <Arrow x1={400} y1={300} x2={400} y2={340} />

      {/* Data layer */}
      <text x={400} y={336} textAnchor="middle" fill="var(--fg-faint)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
        DATA LAYER
      </text>
      <ArchBox x={120} y={348} w={170} h={56} label="PostgreSQL" sub="Prisma ORM" />
      <ArchBox x={330} y={348} w={140} h={56} label="Organizations" sub="Multi-tenant" />
      <ArchBox x={510} y={348} w={170} h={56} label="Content Store" sub="Posts & media" />
    </svg>
  );
}
