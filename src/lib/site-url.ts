function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.URL) return process.env.URL;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const clean = path === "/" ? "/" : path.replace(/^\/+/, "/");
  return `${base}${clean}`;
}

export { getSiteUrl };