/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        // maps req made to /api/* (from fe container) to backend-service:8000/api/* (in be container)
        source: "/api/:path*",
        destination: "http://backend-service:8000/api/:path*"
      },
      // both gke and docker-compose have the same name for the backend service
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