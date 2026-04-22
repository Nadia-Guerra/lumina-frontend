import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wildcard HTTPS — el makeup API sirve imágenes desde múltiples CDNs
      // (cloudfront, shopify, rackspace, s3...). Cuando se conecte el backend
      // de Lumina con sus propios assets, restringir a su dominio específico.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
