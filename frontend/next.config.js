/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    const backendUrl = process.env.BACKEND_URL || 'http://backend-service:8000';
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`
      },
      {
        source: "/docs",
        destination: `${backendUrl}/docs`
      },
      {
        source: "/openapi.json",
        destination: `${backendUrl}/openapi.json`
      },
    ];
  },
};

module.exports = nextConfig;