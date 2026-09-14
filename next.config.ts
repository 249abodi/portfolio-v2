import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.0.13"],
  images: {
    unoptimized: true,
    formats: ["image/webp"],
  },
  trailingSlash: true,
};

export default nextConfig;