"use client";

import posthog from "posthog-js";
import type { CompletionPayload, PuzzleType } from "@/types/puzzle";

type EventProps = {
  puzzle_slug?: string;
  type?: PuzzleType;
  difficulty?: number;
  duration_ms?: number;
  score?: number;
  device_type?: string;
  referrer?: string;
  utm_source?: string;
  utm_campaign?: string;
};

export function trackEvent(name: string, props: EventProps = {}) {
  const utmParams =
    typeof window !== "undefined"
      ? Object.fromEntries(new URLSearchParams(window.location.search))
      : {};

  posthog.capture(name, {
    ...props,
    device_type: props.device_type ||
      (typeof window !== "undefined" && window.innerWidth < 768
        ? "mobile"
        : "desktop"),
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
    utm_source: props.utm_source || (utmParams.utm_source as string | undefined),
    utm_campaign:
      props.utm_campaign || (utmParams.utm_campaign as string | undefined),
  });
}

export function trackPuzzleStart(slug: string, type: PuzzleType, difficulty: number) {
  trackEvent("puzzle_start", { puzzle_slug: slug, type, difficulty });
}

export function trackPuzzleComplete(payload: CompletionPayload) {
  trackEvent("puzzle_complete", {
    puzzle_slug: payload.puzzleSlug,
    type: payload.type,
    difficulty: payload.difficulty,
    duration_ms: payload.durationMs,
    score: payload.score,
  });
}
