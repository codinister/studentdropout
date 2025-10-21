/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  serverRuntimeConfig: {
    runtime: 'nodejs',
  },
};

export default nextConfig;
