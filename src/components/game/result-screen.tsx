"use client";

import Link from "next/link";

import { ResultCard } from "@/components/result-card";
import { ShareBar } from "@/components/share-bar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { trackEvent } from "@/lib/analytics";
import type { CompletionPayload } from "@/types/puzzle";

export function ResultScreen({
  payload,
  shareUrl,
  puzzleTitle,
}: {
  payload: CompletionPayload;
  shareUrl: string;
  puzzleTitle: string;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 shadow-soft">
        <p className="text-sm text-muted-foreground">You finished</p>
        <h2 className="text-2xl font-semibold tracking-tight">{puzzleTitle}</h2>
        <p className="text-muted-foreground">
          Score {payload.score} · {Math.ceil(payload.durationMs / 1000)}s ·
          Difficulty {payload.difficulty}
        </p>
      </div>

      <ResultCard score={payload.score} label={payload.resultLabel} percentile="86%" />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Share your result</h3>
        <ShareBar title={`I scored ${payload.score} on ${puzzleTitle}!`} url={shareUrl} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/daily">Next challenge</Link>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            trackEvent("leaderboard_submit", {
              puzzle_slug: payload.puzzleSlug,
              type: payload.type,
              difficulty: payload.difficulty,
              duration_ms: payload.durationMs,
              score: payload.score,
            });
            toast({
              title: "Login required",
              description: "Sign in to submit your score globally.",
            });
          }}
        >
          Submit to leaderboard
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
