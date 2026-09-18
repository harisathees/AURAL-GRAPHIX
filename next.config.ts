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
  // server to set them. The equivalents live in public/_headers (Netlify /
  // Cloudflare Pages); mirror them in your host's config if you deploy elsewhere.
};

export default nextConfig;
