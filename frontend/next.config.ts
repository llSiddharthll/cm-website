import type { NextConfig } from "next";
import legacyRedirects from "./lib/legacy-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 301s from the old WordPress URLs (posts, pages, service pages) to the new
  // structure — preserves SEO + old links after the domain moves to this site.
  async redirects() {
    return legacyRedirects as {
      source: string;
      destination: string;
      permanent: boolean;
    }[];
  },
  // three / R3F ship modern ESM; transpiling keeps older bundler paths happy.
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Allow loading the dev server over the LAN IP (not just localhost), so dev
  // chunks + HMR aren't blocked as cross-origin. Add other hosts/devices here.
  allowedDevOrigins: ["192.168.29.217"],
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
