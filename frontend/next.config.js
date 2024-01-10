/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend-service:8000/api/:path*"
      },
      {
        source: "/docs",
        destination: "http://backend-service:8000/docs"
      },
      {
        source: "/openapi.json",
        destination: "http://backend-service:8000/openapi.json"
      },
    ];
  },
};

module.exports = nextConfig;