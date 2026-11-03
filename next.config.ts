import type { NextConfig } from "next";

const isPreviewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isPreviewExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: isPreviewExport,
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
