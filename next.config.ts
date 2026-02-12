import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import withPayload from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const payloadConfig = withPayload(nextConfig);

export default withSentryConfig(payloadConfig, {
  silent: true,
});
