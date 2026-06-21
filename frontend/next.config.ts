import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/sessions", destination: "/goals", permanent: true },
      { source: "/history", destination: "/goals", permanent: true },
      { source: "/streaks", destination: "/insights", permanent: true },
      { source: "/achievements", destination: "/insights", permanent: true },
      { source: "/signup", destination: "/login?signup=1", permanent: false },
      { source: "/workspace", destination: "/dashboard", permanent: false },
    ];
  },
};

export default nextConfig;
