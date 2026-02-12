"use client";

import { useEffect, useState } from "react";

import { MemoryGame } from "@/components/game/memory-game";
import { TimedQuiz } from "@/components/game/timed-quiz";
import { ResultScreen } from "@/components/game/result-screen";
import type { CompletionPayload, PuzzleContent } from "@/types/puzzle";
import { trackPuzzleComplete, trackPuzzleStart } from "@/lib/analytics";

export function GameRenderer({ puzzle }: { puzzle: PuzzleContent }) {
  const [completed, setCompleted] = useState<CompletionPayload | null>(null);
  const [challengeUrl, setChallengeUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChallengeUrl(window.location.href);
    }
  }, []);

  const handleComplete = (payload: CompletionPayload) => {
    setCompleted(payload);
    trackPuzzleComplete(payload);
  };

  if (completed) {
    return (
      <ResultScreen
        payload={completed}
        shareUrl={challengeUrl}
        puzzleTitle={puzzle.title}
      />
    );
  }

  return (
    <div className="space-y-6">
      {puzzle.type === "memory" ? (
        <MemoryGame
          puzzle={puzzle}
          onStart={() => trackPuzzleStart(puzzle.slug, puzzle.type, puzzle.difficulty)}
          onComplete={handleComplete}
        />
      ) : (
        <TimedQuiz
          puzzle={puzzle}
          onStart={() => trackPuzzleStart(puzzle.slug, puzzle.type, puzzle.difficulty)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
