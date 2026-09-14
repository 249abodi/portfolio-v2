import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public");
mkdirSync(outDir, { recursive: true });

const opts = { failOn: "none" };

async function run() {
  // Optimized profile photo (served version) — source of truth stays in assets/
  await sharp(resolve(root, "assets/profile.jpg"), opts)
    .resize({ width: 768, withoutEnlargement: true })
    .flatten({ background: "#0d0f14" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(resolve(outDir, "profile.jpg"));

  // OG image 1200x630
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0a0c11"/>
          <stop offset="0.55" stop-color="#0d0f14"/>
          <stop offset="1" stop-color="#10131c"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
          <stop offset="0" stop-color="#4f7cff" stop-opacity="0.5"/>
          <stop offset="1" stop-color="#4f7cff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="accentBar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#4f7cff"/>
          <stop offset="1" stop-color="#7ea0ff"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
        <path d="M0 84 H1200 M0 168 H1200 M0 252 H1200 M0 336 H1200 M0 420 H1200 M0 504 H1200 M0 588 H1200"/>
        <path d="M84 0 V630 M168 0 V630 M252 0 V630 M336 0 V630 M420 0 V630 M504 0 V630 M588 0 V630 M672 0 V630 M756 0 V630 M840 0 V630 M924 0 V630 M1008 0 V630 M1092 0 V630"/>
      </g>
      <g font-family="Segoe UI, Inter, system-ui, sans-serif" fill="#f2f4f8">
        <text x="88" y="140" font-size="22" font-weight="600" fill="#4f7cff" letter-spacing="4">SOFTWARE ENGINEERING</text>
        <text x="84" y="250" font-size="76" font-weight="600" letter-spacing="-1">Abdulrahman Mohammed</text>
      </g>
      <text x="88" y="320" font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="30" fill="#a7afbd">Full-Stack Web Developer · SaaS Builder · Product-Focused</text>
      <rect x="88" y="360" width="180" height="6" rx="3" fill="url(#accentBar)"/>
      <text x="88" y="470" font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="24" fill="#838b99">QAVENO · ZELVOA — real products, built end to end.</text>
      <text x="88" y="540" font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="24" fill="#838b99">github.com/249abodi</text>
    </svg>`;

  await sharp(Buffer.from(svg), opts)
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, "og.png"));

  console.log("assets generated in public/");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});