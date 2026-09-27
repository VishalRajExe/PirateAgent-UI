/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/new-research", destination: "/dashboard/research/new", permanent: false },
      { source: "/workflows", destination: "/dashboard/workflows", permanent: false },
      { source: "/datasets", destination: "/dashboard/datasets", permanent: false },
      { source: "/sources", destination: "/dashboard/sources", permanent: false },
      { source: "/history", destination: "/dashboard/history", permanent: false },
      { source: "/activity", destination: "/dashboard/activity", permanent: false },
      { source: "/settings", destination: "/dashboard/settings", permanent: false },
    ];
  },
};
module.exports = nextConfig;
