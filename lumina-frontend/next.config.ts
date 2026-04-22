import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // CDN principal del makeup API (cloudfront)
      {
        protocol: "https",
        hostname: "d3t32hsnjxo7q6.cloudfront.net",
      },
      // Algunos productos usan Shopify CDN
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      // Bucket S3 del makeup API (api_featured_image)
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
