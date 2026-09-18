import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site to ./out — no Node runtime needed at serve time.
  output: "export",
  images: {
    // The default loader needs a server; static export ships the files as-is.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 810, 1080, 1200, 1440, 1920, 2560],
  },
  poweredByHeader: false,
  compress: true,
  // NOTE: next.config headers() is a no-op under `output: "export"` — there is no
  // Next server left to set them. Production serves via nginx, so the security
  // headers live in the nginx server block; see DEPLOYMENT.md. public/_headers
  // carries the same set for Netlify / Cloudflare Pages, which nginx ignores.
};

export default nextConfig;
