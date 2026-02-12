"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CompletionPayload, MemoryPuzzle } from "@/types/puzzle";

export function MemoryGame({
  puzzle,
  onStart,
  onComplete,
}: {
  puzzle: MemoryPuzzle;
  onStart: () => void;
  onComplete: (payload: CompletionPayload) => void;
}) {
  const deck = useMemo(() => {
    const pairs = puzzle.memory.pairs.slice(0, 8);
    const doubled = [...pairs, ...pairs].map((card, index) => ({
      ...card,
      uid: `${card.id}-${index}`,
    }));
    return doubled.sort(() => Math.random() - 0.5);
  }, [puzzle.memory.pairs]);

  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const timer = setInterval(() => {
      setDuration(Date.now() - startTime);
    }, 500);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleFlip = (uid: string, id: string) => {
    if (flipped.length === 2 || matched.includes(uid) || flipped.includes(uid)) {
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
      onStart();
    }

    const nextFlipped = [...flipped, uid];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstUid, secondUid] = nextFlipped;
      const first = deck.find((card) => card.uid === firstUid);
      const second = deck.find((card) => card.uid === secondUid);

      if (first && second && first.id === second.id) {
        setMatched((prev) => [...prev, firstUid, secondUid]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  useEffect(() => {
    if (matched.length === deck.length && startTime) {
      const score = Math.max(
        100,
        Math.round(1200 - duration / 30 - moves * 15)
      );
      onComplete({
        puzzleId: puzzle.id,
        puzzleSlug: puzzle.slug,
        type: puzzle.type,
        difficulty: puzzle.difficulty,
        durationMs: duration,
        score,
        resultLabel: score > 900 ? "Memory Maestro" : "Card Conqueror",
      });
    }
  }, [matched, deck.length, duration, moves, onComplete, puzzle, startTime]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Moves</p>
          <p className="text-lg font-semibold">{moves}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="text-lg font-semibold">
            {Math.ceil(duration / 1000)}s
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Restart
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {deck.map((card) => {
          const isFlipped = flipped.includes(card.uid) || matched.includes(card.uid);
          return (
            <motion.button
              key={card.uid}
              whileHover={{ y: -2 }}
              className="relative h-24 w-full"
              onClick={() => handleFlip(card.uid, card.id)}
              aria-label={`Flip ${card.label}`}
            >
              <Card
                className={cn(
                  "absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border bg-white text-sm font-semibold shadow-soft transition-all",
                  isFlipped
                    ? "bg-gradient-to-br from-indigo-100 via-white to-emerald-100"
                    : "bg-gradient-to-br from-slate-900 to-slate-700 text-white"
                )}
              >
                {isFlipped ? card.label : "?"}
              </Card>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
