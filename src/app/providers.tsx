"use client";

import { ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Toaster } from "@/components/ui/toaster";

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (key && !posthog.__loaded) {
    posthog.init(key, {
      api_host: host || "https://app.posthog.com",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
    });
  }
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      {children}
      <Toaster />
    </PostHogProvider>
  );
}
