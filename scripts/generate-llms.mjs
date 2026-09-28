import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const data = JSON.parse(
  readFileSync(join(root, "src", "lib", "llms-data.json"), "utf8")
);

const { site, products } = data;

const links = products
  .map(({ name, url, description }) => `- [${name}](${url}): ${description}`)
  .join("\n");

const enUrl = site.url;
const arUrl = `${site.url.replace(/\/$/, "")}/ar/`;

const llmsTxt = `# ${site.name}

> ${site.oneLiner}

${site.name} is a software engineering student at Universiti Teknologi Malaysia and a full-stack web developer who designs and builds complete products — interfaces, APIs, databases, and everything in between.

The portfolio is available in two languages:
- English: ${enUrl}
- Arabic (RTL): ${arUrl}

## Products

${links}

## Contact

- Email: bm605079@gmail.com
- GitHub: https://github.com/249abodi
- YouTube: https://www.youtube.com/@3kbbb
- Instagram: https://www.instagram.com/249_abodii
`;

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "llms.txt"), llmsTxt, "utf8");

console.log("Generated public/llms.txt");