import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/history", destination: "/sessions", permanent: true },
      { source: "/insights", destination: "/profile", permanent: true },
      { source: "/streaks", destination: "/profile", permanent: true },
      { source: "/achievements", destination: "/profile", permanent: true },
    ];
  },
};

export default nextConfig;
