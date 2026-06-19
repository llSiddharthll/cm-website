import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three / R3F ship modern ESM; transpiling keeps older bundler paths happy.
  transpilePackages: ["three"],
  // Allow loading the dev server over the LAN IP (not just localhost), so dev
  // chunks + HMR aren't blocked as cross-origin. Add other hosts/devices here.
  allowedDevOrigins: ["192.168.29.217"],
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
